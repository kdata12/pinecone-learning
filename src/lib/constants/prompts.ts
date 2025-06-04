/**
 * AI prompts used throughout the application
 */

export const FORMAT_AND_SUMMARIZE_JOB_POSTING = (post: string): string => `
Below is an example of how to convert a raw job posting JSON into the desired JOB_FORMAT. Follow this pattern exactly for any new posting.

===== EXAMPLE INPUT (as JSON) =====

{
  "company": "StellarSoft Solutions",
  "position": "Senior Python Developer",
  "job_location": "Remote (USA)",
  "job_type": "Full-time",
  "job_level": "Senior",
  "job_summary": "StellarSoft Solutions is a market leader in data analytics platforms serving Fortune 500 clients. We believe in a culture of collaboration, continuous learning, and innovation.\\n\\nResponsibilities:\\n- Design, develop, and maintain Python-based microservices for data ingestion pipelines, ensuring 99.9% uptime.\\n- Lead code reviews and mentor a team of 5 junior and mid-level engineers on best practices, test coverage, and system design.\\n- Collaborate with DevOps to architect and automate CI/CD pipelines using Jenkins, Docker, and Kubernetes, reducing deployment times by 40%.\\n- Optimize SQL queries, database schemas, and ETL jobs in PostgreSQL to improve data processing performance by 30% for a 10TB dataset.\\n- Partner with the data science team to integrate machine learning models into production, including feature engineering and model inference endpoints.\\n- Work with product managers to translate business requirements into technical specifications, participate in sprint planning, and estimate tasks.\\n- Contribute to technical roadmap discussions and drive architectural decisions for a microservices-based platform.\\n\\nRequirements:\\n- 5+ years of professional experience in Python development, including Django or Flask.\\n- Deep expertise in designing RESTful APIs, WebSocket endpoints, and asynchronous job queues (Celery/RabbitMQ).\\n- Hands-on experience with AWS services (Lambda, S3, RDS, ECS, CloudFormation) and IaC tools.\\n- Proficiency in SQL (PostgreSQL) and NoSQL (MongoDB) databases, including indexing strategies and query optimization.\\n- Strong background in containerization (Docker) and orchestration (Kubernetes/EKS).\\n- Familiarity with machine learning frameworks (TensorFlow or PyTorch) and model deployment best practices.\\n- Excellent communication skills, ability to present complex technical topics to non-technical stakeholders, and proven leadership track record.",
  "job_skills": "Python, Django, Flask, Jenkins, Docker, Kubernetes, AWS Lambda, AWS S3, AWS RDS, PostgreSQL, MongoDB, Celery, RabbitMQ, TensorFlow, PyTorch, REST, WebSocket, CI/CD, Agile, Microservices"
}

===== EXAMPLE OUTPUT (as JSON) =====

{
  "title_metadata": "Senior Python Developer · Senior · Full-time · Remote (USA)",
  "skills_list": [
    "Python",
    "Django",
    "Flask",
    "REST",
    "WebSocket",
    "Celery",
    "RabbitMQ",
    "AWS Lambda",
    "AWS S3",
    "AWS RDS",
    "ECS",
    "CloudFormation",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "CI/CD",
    "TensorFlow",
    "PyTorch",
    "Microservices",
    "Agile"
  ],
  "role_summary": [
    "Architect and implement Python-based microservices for data ingestion pipelines, maintaining 99.9% uptime and handling up to 100k events per minute.",
    "Lead a team of five engineers through code reviews, mentorship sessions, and pair programming, enforcing coding standards and raising overall test coverage above 90%.",
    "Collaborate with DevOps to design and automate CI/CD pipelines using Jenkins, Docker, and Kubernetes, cutting deployment times by 40% and ensuring zero-downtime releases.",
    "Optimize complex SQL queries and redesign data schemas in PostgreSQL to accelerate ETL processes by 30% for over 10TB of analytics data, while enforcing proper indexing strategies.",
    "Partner with data scientists to integrate machine learning models—handling feature engineering, serving inference endpoints, and monitoring model performance in production.",
    "Drive technical discussions with product managers, translate business requirements into scalable architecture, and influence decisions on service decomposition and infrastructure improvements."
  ]
}

===== END EXAMPLE =====

Now, convert the following raw job posting JSON into exactly that same JSON structure. Do not include any extra text—only output valid JSON with fields \"title_metadata\", \"skills_list\" (array of strings), and \"role_summary\" (array of strings):
DO NOT INCLUDE THE "\`\`\`json\`\`\`" IN THE OUTPUT
${post}
`

export const SUMMARIZE_BRAGBOOK_ENTRIES = (entries: string): string => `
Below is an example of how to convert bragbook entries (weekly work accomplishments) into a concise achievement summary optimized for job matching. Follow this pattern exactly.

===== EXAMPLE INPUT =====

Week of May 12–16, 2025
Monday, May 12:
- Designed and scoped a new "Smart Notification" microservice to replace legacy polling jobs, drafting initial ER diagrams and API contracts using Swagger.
- Paired with a senior engineer to set up a proof-of-concept in Go, focusing on low-latency fan-out to WebSocket clients.
- Submitted the design proposal to the team and received positive feedback from Product ("the new push model will cut user complaints in half").

Wednesday, May 14:
- Deployed the POC service to our staging Kubernetes cluster (EKS) using a CI/CD pipeline update (added new CodeBuild step). Build time improved by 18% due to caching Docker layers.
- Discovered a Redis cache misconfiguration causing inconsistent subscription lookups; patched the Helm chart, reducing "cache miss" errors by 65% in staging.
- Held a design review with QA and Security teams; addressed concerns around token expiration and race conditions by adding a signed JWT with a sliding expiration window.

Thursday, May 15:
- Shifted focus to front-end integration: added a "Subscribe" button in the React dashboard (TypeScript + TailwindCSS), hooking into GET /topics and POST /subscriptions. Ensured optimistic UI updates to improve perceived speed.
- Collaborated with UX designer to finalize spinner animations and hover states, resulting in a clean user experience.
- Mentored two junior engineers through their first pull requests, guiding them on writing unit tests in Jest and integrating with GitHub Actions.

Friday, May 16:
- Presented "Push-Based Notifications Roadmap" in the weekly Engineering All-Hands: showed before/after latency comparisons (legacy polling avg: 3s, new POC: 200ms).
- Received kudos from Team Lead: "Great work lowering server load by ~30% and setting us up for real-time features."
- Documented endpoint usage and authentication flow in our internal Confluence, adding examples in cURL and Postman.

===== EXAMPLE OUTPUT =====

{
  "achievement_summary": [
    "Architected and deployed a high-performance microservice using Go and Kubernetes, replacing legacy polling systems with real-time WebSocket notifications and reducing latency from 3 seconds to 200ms.",
    "Led cross-functional collaboration with Product, QA, and Security teams to design secure notification systems, implementing JWT-based authentication and addressing scalability concerns through comprehensive technical reviews.",
    "Optimized CI/CD infrastructure and resolved critical Redis caching issues, improving build times by 18% and reducing cache miss errors by 65% through strategic Helm chart configurations.",
    "Mentored junior engineers and presented technical roadmaps to leadership, demonstrating system improvements that reduced server load by 30% while establishing documentation standards and testing practices.",
    "Delivered full-stack integration from backend APIs to React frontend components, ensuring optimal user experience through TypeScript implementation and collaboration with UX design teams."
  ]
}

===== END EXAMPLE =====

Your task: Convert the following bragbook entries into exactly that same JSON structure. Focus on quantifiable achievements, technical impact, leadership activities, and collaborative accomplishments. Do not include any extra text—only output valid JSON with an "achievement_summary" field containing 4-5 bullet points:

${entries}
` 