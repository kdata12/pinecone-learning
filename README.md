# Pinecone Learning Project

A practical learning project demonstrating how to use Pinecone vector database with OpenAI for intelligent job posting search and matching based on personal achievements (bragbook entries).


## 🛠️ Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PINECONE_API_KEY=your_pinecone_api_key_here
   OPEN_AI_KEY=your_openai_api_key_here
   ```

3. **Prepare job posting data**
   Place your job posting CSV file named `postings.csv` in the root directory.

## Usage

### 1. Setup Pinecone Index

First, create the necessary Pinecone indices:

```bash
npm run dev:update
```

This runs `src/updatePinecone.ts` which creates the required indices with integrated embedding inference.

### 2. Insert Job Postings

Load job postings from CSV into Pinecone:

```bash
npm run dev:insert
```

This processes the first 50 rows from `postings.csv`, uses AI to standardize the job descriptions, and stores them as vectors.

### 3. Search for Relevant Jobs

Run the search example to see job matching in action:

```bash
npm run dev:search
```

This demonstrates how to:

- Summarize bragbook entries using AI
- Search for jobs that match your achievements
- Apply filters (e.g., remote jobs, specific skills)

## 📁 Project Structure

```
src/
├── config/
│   ├── pinecone.ts      # Pinecone configuration and indices
│   └── openai.ts        # OpenAI client setup
├── lib/
│   ├── types/           # TypeScript type definitions
│   └── constants/       # Prompts and sample data
├── insertJobPostings.ts # CSV processing and job insertion
├── searchExample.ts     # Demonstration of search functionality
├── summarizeBragEntries.ts # AI-powered achievement summarization
└── updatePinecone.ts    # Index creation and management
```

## 🔧 Scripts

- `npm run dev:insert` - Insert job postings from CSV into Pinecone
- `npm run dev:search` - Run search example with sample bragbook data
- `npm run build` - Compile TypeScript to JavaScript
- `npm run clean` - Remove compiled files

## 🧠 How It Works

### Job Posting Processing

1. **CSV Parsing**: Read job postings from CSV file
2. **AI Standardization**: Use GPT to extract and format key information:
   - Title metadata
   - Role summary
   - Skills list
3. **Vector Storage**: Store processed jobs in Pinecone with searchable embeddings

### Achievement Matching

1. **Bragbook Analysis**: AI converts work accomplishments into professional summaries
2. **Semantic Search**: Use embeddings to find jobs matching your achievements
3. **Filtered Results**: Apply criteria like location, job type, or required skills

### Search Features

- **Relevance Scoring**: Jobs ranked by similarity to your achievements
- **Metadata Filtering**: Filter by job type, level, location, or skills
- **Batch Processing**: Efficient handling of large job datasets

## 🔬 Example Use Case

The project includes a complete example showing how someone with C# development experience and specific achievements can find relevant remote jobs:

1. **Input**: Bragbook entries describing technical accomplishments
2. **Processing**: AI summarizes achievements into job-relevant skills
3. **Search**: Find remote C# jobs matching those skills
4. **Output**: Ranked list of relevant opportunities with relevance scores

