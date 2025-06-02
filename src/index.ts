import { PHUC_RESUME_PLAIN_TEXT } from "./config/constants";
import { INDICES, pinecone } from "./config/pinecone";

function extractResumeKeywords(resumeText: string): string {
  // Extract skills, technologies, and experience level
  const skillsRegex = /Languages\s*\|\s*([^]*?)(?=Technologies|$)/i;
  const techRegex = /Technologies\s*\|\s*([^]*?)(?=$)/i;

  const skillsMatch = resumeText.match(skillsRegex);
  const techMatch = resumeText.match(techRegex);

  const skills = skillsMatch ? skillsMatch[1].trim() : '';
  const technologies = techMatch ? techMatch[1].trim() : '';

  // Extract job titles and seniority level
  const jobTitles = [
    'Software Engineer', 'Backend Engineering Intern', 'Software Engineering Intern'
  ];

  // Create optimized search query focusing on what matters for job matching
  const optimizedQuery = `
Senior Software Engineer Backend Full Stack Developer.
Programming languages: ${skills}.
Technologies: ${technologies}.
Experience with AWS Lambda S3 CloudFormation Docker CI/CD REST API.
Looking for full-time software engineering positions.
  `.trim().replace(/\s+/g, ' ');

  return optimizedQuery;
}

async function searchWithDifferentQueries() {
  const index = pinecone.index(INDICES.JOB_POSTINGS);

  // Test different query strategies
  const queries = [
    // Original resume
    PHUC_RESUME_PLAIN_TEXT,

    // Optimized resume keywords
    extractResumeKeywords(PHUC_RESUME_PLAIN_TEXT),

    // Simple skills-focused query
    "Senior Software Engineer JavaScript TypeScript React Next.js Node.js AWS Python",

    // Job-title focused query
    "Software Engineer Full Stack Developer Backend Engineer"
  ];

  for (let i = 0; i < queries.length; i++) {
    const queryType = ['Full Resume', 'Optimized Keywords', 'Skills-Focused', 'Job-Title Focused'][i];
    console.log(`\n🔍 ${queryType} Query Results:`);
    console.log(`Query: ${queries[i].substring(0, 100)}...`);

    try {
      const results = await index.searchRecords({
        query: {
          topK: 3,
          inputs: { text: queries[i] },
        },
      });

      results.result.hits.forEach((hit, idx) => {
        console.log(`${idx + 1}. Score: ${hit._score.toFixed(4)}`);
        console.log(`   Job: ${(hit.fields as any)?.chunk_text?.substring(0, 200)}...`);
        console.log('---');
      });
    } catch (error) {
      console.error(`Error with ${queryType} query:`, error);
    }
  }
}

async function main() {
  await searchWithDifferentQueries();
}

main();