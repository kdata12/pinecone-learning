import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { INDICES, pinecone } from "./config/pinecone";
import { openAI, defaultModel } from "./config/openai";
import { FORMAT_AND_SUMMARIZE_JOB_POSTING } from "./lib/constants/prompts";
import { RawCsvRow, SynthesizedJobPosting } from "./lib/types";

async function parseFirstNRows(csvFilePath: string, maxRows: number): Promise<RawCsvRow[]> {
  return new Promise((resolve, reject) => {
    const results: RawCsvRow[] = [];
    let rowCount = 0;

    const absolutePath = path.resolve(csvFilePath);
    const readStream = fs.createReadStream(absolutePath);

    const parser = csvParser();

    readStream
      .pipe(parser)
      .on('data', (row: RawCsvRow) => {
        rowCount += 1;
        results.push(row);

        if (rowCount >= maxRows) {
          parser.removeAllListeners("data");
          parser.pause();
          readStream.destroy();
          resolve(results);
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  })
}

const synthesizeAndFormatJobPosting = async (data: RawCsvRow): Promise<SynthesizedJobPosting> => {
  const response = await openAI.chat.completions.create({
    model: defaultModel,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that converts raw job descriptions into a standardized, embedding-friendly format.'
      },
      {
        role: 'user',
        content: FORMAT_AND_SUMMARIZE_JOB_POSTING(JSON.stringify(data))
      }
    ]
  })

  const raw = response.choices[0].message.content;
  try {
    if (raw == null) {
      throw new Error('synthesizeAndFormatJobPosting returned a null value');
    }
    return JSON.parse(raw) as SynthesizedJobPosting;
  } catch (err) {
    console.error('Failed to parse JSON from GPT:', raw);
    throw err;
  }
}

const transformToPineconeDocument = (data: SynthesizedJobPosting, originalJob: RawCsvRow, id: string) => {
  const textToEmbed = `
    titleMetadata: ${data.title_metadata}
    roleSummary: ${data.role_summary.join(' ')}
  `.trim()

  return {
    id,
    chunk_text: textToEmbed,
    job_title: originalJob.job_title,
    job_link: originalJob.job_link,
    company: originalJob.company,
    job_level: originalJob.job_level,
    job_type: originalJob.job_type,
    job_location: originalJob.job_location,
    search_city: originalJob.search_city,
    search_country: originalJob.search_country,
    first_seen: originalJob.first_seen,
    skills: data.skills_list,
  }
}

const upsertJobsInBatches = async (jobs: any[], batchSize: number = 50) => {
  const index = pinecone.index(INDICES.JOB_POSTINGS);

  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);

    console.log(
      `Upserting batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(jobs.length / batchSize)}...`
    );

    console.log("Metadata being sent for record 0:", batch[0].metadata);

    await index.upsertRecords(batch);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Upsert completed successfully.");
  }
}

(async () => {
  try {
    console.log('inserting job postings into pinecone index ...')
    const csvJobs = await parseFirstNRows("./postings.csv", 50);

    const indexes = await pinecone.listIndexes();
    const indexExists = indexes.indexes?.some(index => index.name === INDICES.JOB_POSTINGS);

    if (!indexExists) {
      console.log('Pinecone index does not exist.');
      return;
    }

    const synthesizedJobs = await Promise.all(csvJobs.map(async (job) => await synthesizeAndFormatJobPosting(job)));

    const transformedJobs = synthesizedJobs.map((job, index) => transformToPineconeDocument(job, csvJobs[index], index.toString()))

    await upsertJobsInBatches(transformedJobs)

    console.log('done inserting ...')
  } catch (err) {
    console.error(err);
  }
})();