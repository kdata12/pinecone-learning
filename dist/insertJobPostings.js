"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const pinecone_1 = require("./config/pinecone");
async function parseFirstNRows(csvFilePath, maxRows) {
    return new Promise((resolve, reject) => {
        const results = [];
        let rowCount = 0;
        const absolutePath = path_1.default.resolve(csvFilePath);
        const readStream = fs_1.default.createReadStream(absolutePath);
        const parser = (0, csv_parser_1.default)();
        readStream
            .pipe(parser)
            .on('data', (row) => {
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
    });
}
const transform = (data) => {
    return data.map((row, i) => ({
        _id: i,
        chunk_text: `
      job_title: ${row.job_title};
      company: ${row.company};
      job_location: ${row.job_location};
      job_link: ${row.job_link};
      first_seen: ${row.first_seen};
      search_city: ${row.search_city};
      search_country: ${row.search_country};
      job_level: ${row.job_level};
      job_type: ${row.job_type};
      job_summary: ${row.job_summary};
      job_skills: ${row.job_skills};
    `,
        metadata: {
            ...row
        }
    }));
};
const upsertJobsInBatches = async (jobs, batchSize = 50) => {
    const index = pinecone_1.pinecone.index(pinecone_1.INDICES.JOB_POSTINGS);
    for (let i = 0; i < jobs.length; i += batchSize) {
        const batch = jobs.slice(i, i + batchSize);
        await index.upsertRecords(batch);
        // Small delay to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
};
(async () => {
    try {
        const first20 = await parseFirstNRows("./postings.csv", 20);
        const transformedData = transform(first20);
        await upsertJobsInBatches(transformedData, 20);
    }
    catch (err) {
        console.error("Failed to parse CSV:", err);
    }
})();
