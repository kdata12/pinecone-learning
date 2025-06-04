import { INDICES } from "./config/pinecone";
import { pinecone } from './config/pinecone';

async function main() {
  console.log('Updating Pinecone ...')

  // update indices
  const pineconeIndices = await pinecone.listIndexes();

  Object.values(INDICES).forEach(async (index) => {
    // create index with integrated embedding inference if not exist yet - for testing purposes.
    if (!pineconeIndices.indexes?.find((pineConIndex) => pineConIndex.name === index)) {
      await pinecone.createIndexForModel({
        name: index,
        cloud: 'aws',
        region: 'us-east-1',
        embed: {
          model: 'llama-text-embed-v2',
          fieldMap: { text: 'chunk_text' },
        },
        waitUntilReady: true,
      })
    }
  })
}

(async () => {
  await main();
})()