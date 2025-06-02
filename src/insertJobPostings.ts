import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { INDICES, pinecone } from "./config/pinecone";

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
          // 1. Remove further 'data' listeners
          parser.removeAllListeners("data");
          // 2. Pause the parser (so no more 'data' events fire)
          parser.pause();
          // 3. Destroy the underlying read stream to free resources
          readStream.destroy();
          // 4. Resolve with what we have so far
          resolve(results);
        }
      })
      .on("end", () => {
        // If the file had fewer than maxRows, we end up here
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  })
}

const transform = (data: RawCsvRow[]) => {
  return data.map((row, i) => {
    
  })
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
    const first20 = await parseFirstNRows("./postings.csv", 1000);

    const transformedData = transform(first20);

    await upsertJobsInBatches(transformedData, 96)

  } catch (err) {
    console.error(err);
  }
})();