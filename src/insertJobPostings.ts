import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { INDICES, pinecone } from "./config/pinecone";
import { openAI } from "./config/openai";
import { FORMAT_AND_SUMMARIZE_JOB_POSTING } from "./prompts/jobPosting";
import { IntegratedRecord, RecordMetadata } from "@pinecone-database/pinecone";

interface RawCsvRow {
  job_title: string;
  company: string;
  job_location: string;
  job_link: string;
  first_seen: string;
  search_city: string;
  search_country: string;
  job_level: string;
  job_type: string;
  job_summary: string;
  job_skills: string;
}

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

interface SynthesizedJobPosting {
  title_metadata: string,
  skills_list: string[],
  role_summary: string[]
}

const synthesizeAndFormatJobPosting = async (data: RawCsvRow): Promise<SynthesizedJobPosting> => {
  // call openai to format job posting based on skill, impact,

  const response = await openAI.chat.completions.create({
    model: 'o3-mini',
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

const transformToPineconeDocument = (data: SynthesizedJobPosting, id: string):IntegratedRecord<RecordMetadata> => {
  const textToEmbed =  `
    title_metadata: ${data.title_metadata}
    skills_list: ${data.skills_list}
    role_summary: ${data.role_summary}
  `.trim()

  return {
    id,
    chunk_text: textToEmbed,
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


    await index.upsertRecords(batch)

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ Upsert completed successfully.");
  }
}

(async () => {
  try {
    const csvJobs = await parseFirstNRows("./postings.csv", 20);

    const synthesizedJobs = await Promise.all(csvJobs.map(async (job) => await synthesizeAndFormatJobPosting(job)));

    const transformedJobs = synthesizedJobs.map((job, index) => transformToPineconeDocument(job, index.toString()))

    await upsertJobsInBatches(transformedJobs)

  } catch (err) {
    console.error(err);
  }
})();