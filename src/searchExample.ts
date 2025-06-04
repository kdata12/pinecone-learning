import { INDICES, pinecone } from "./config/pinecone";
import { BRAG_ENTRY_1 } from "./lib/constants/sample-data";
import { summarizeBragbookEntries } from "./summarizeBragEntries";

async function findRelevantJobs(achievementSummary: string[], topK: number = 5, filter: object | undefined = undefined) {
  const index = pinecone.index(INDICES.JOB_POSTINGS);

  const searchText = achievementSummary.join(' ');

  try {
    const searchResults = await index.searchRecords({
      query: {
        topK,
        inputs: { text: searchText },
        filter
      }
    });

    console.log(`Found ${searchResults.result.hits.length} relevant job postings:\n`);

    searchResults.result.hits.forEach((hit, idx) => {
      const fields = hit.fields as Record<string, any>;
      console.log(`${idx + 1}. ${fields?.job_title} at ${fields?.company}`);
      console.log(`   Level: ${fields?.job_level} | Type: ${fields?.job_type}`);
      console.log(`   Location: ${fields?.job_location}`);
      console.log(`   Skills: ${fields?.skills?.slice(0, 5).join(', ')}${fields?.skills?.length > 5 ? '...' : ''}`);
      console.log(`   Relevance Score: ${hit._score.toFixed(4)}\n`);
    });

    return searchResults.result.hits;
  } catch (error) {
    console.error('Error searching for jobs:', error);
    throw error;
  }
}

/**
 * Main function to demonstrate the complete workflow
 */
async function demonstrateBragbookJobMatching() {
  try {
    console.log('🎯 BRAGBOOK TO JOB MATCHING DEMO\n');

    // Step 1: Summarize bragbook entries
    console.log('Step 1: Summarizing bragbook entries...\n');
    const summary = await summarizeBragbookEntries(BRAG_ENTRY_1);

    console.log('✅ Achievement Summary Generated:');
    summary.achievement_summary.forEach((achievement, idx) => {
      console.log(`${idx + 1}. ${achievement}`);
    });
    console.log('\n' + '='.repeat(80) + '\n');

    // Step 2: Search for relevant jobs
    console.log('Step 2: Finding relevant job opportunities...\n');
    await findRelevantJobs(summary.achievement_summary);

  
  } catch (error) {
    console.error('Error in bragbook job matching demo:', error);
  }
}

if (require.main === module) {
  demonstrateBragbookJobMatching();
}