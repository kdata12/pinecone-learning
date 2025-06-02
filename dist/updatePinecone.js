"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinecone_1 = require("./config/pinecone");
const pinecone_2 = require("./config/pinecone");
async function main() {
    console.log('Updating Pinecone ...');
    // update indices
    const pineconeIndices = await pinecone_2.pinecone.listIndexes();
    Object.values(pinecone_1.INDICES).forEach(async (index) => {
        if (!pineconeIndices.indexes?.find((pineConIndex) => pineConIndex.name === index)) {
            await pinecone_2.pinecone.createIndexForModel({
                name: index,
                cloud: 'aws',
                region: 'us-east-1',
                embed: {
                    model: 'llama-text-embed-v2',
                    fieldMap: { text: 'chunk_text' },
                },
                waitUntilReady: true,
            });
        }
    });
}
(async () => {
    await main();
})();
