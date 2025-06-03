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

${post}
`


