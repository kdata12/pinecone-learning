/**
 * Sample data used for testing and examples
 */

export const PHUC_RESUME_PLAIN_TEXT = `
Software Engineer Mid‑level Full‑time role. 
Location: Phoenix, Arizona, USA. 
Skills: JavaScript, TypeScript, React, Next.js, Node.js, Go, Python, AWS (Lambda, S3, EventBridge, SQS, RDS, ECS, CDK), Docker, MySQL, MongoDB, Redis, GraphQL, Jest, CI/CD, TailwindCSS, CSS Modules. 
Software Engineer with 2+ years professional experience across Deloitte and early‑stage startups, seeking mid‑level full‑time roles. Location: Phoenix, Arizona (open to remote/hybrid). Skills: JavaScript, TypeScript, React, Next.js, Node.js, Go, Python, Rust, AWS (Lambda, S3, EventBridge, SQS, RDS, ECS, CDK, CloudFormation), Docker, MySQL, MongoDB, Redis, GraphQL, CI/CD, Jest, TailwindCSS. Built a visa‑issuance platform serving 10 million applicants annually for 230 embassies, achieving 98 Lighthouse score and >98 % unit test coverage. Designed event‑driven micro‑services handling 10 K daily active users and reduced database latency by 93 %. Secret‑cleared US citizen passionate about distributed systems, AI products, and developer experience, with strong mentoring and cross‑functional collaboration skills.
`

export const BRAG_ENTRY_1 = `
InnovaTech Labs – Mid-Level Software Engineer

Week of May 12–16, 2025

Monday, May 12:
- Designed and scoped a new "Smart Notification" microservice to replace legacy polling jobs, drafting initial ER diagrams and API contracts using Swagger.

- Paired with a senior engineer to set up a proof-of-concept in Go, focusing on low-latency fan-out to WebSocket clients.

- Submitted the design proposal to the team and received positive feedback from Product ("the new push model will cut user complaints in half").

Wednesday, May 14:

- Deployed the POC service to our staging Kubernetes cluster (EKS) using a CI/CD pipeline update (added new CodeBuild step). Build time improved by 18 % due to caching Docker layers.

-Discovered a Redis cache misconfiguration causing inconsistent subscription lookups; patched the Helm chart, reducing "cache miss" errors by 65 % in staging.

- Held a design review with QA and Security teams; addressed concerns around token expiration and race conditions by adding a signed JWT with a sliding expiration window.

Thursday, May 15:

- Shifted focus to front-end integration: added a "Subscribe" button in the React dashboard (TypeScript + TailwindCSS), hooking into GET /topics and POST /subscriptions. Ensured optimistic UI updates to improve perceived speed.

- Collaborated with UX designer to finalize spinner animations and hover states, resulting in a clean user experience.

- Mentored two junior engineers through their first pull requests, guiding them on writing unit tests in Jest and integrating with GitHub Actions.

Friday, May 16:

- Presented "Push-Based Notifications Roadmap" in the weekly Engineering All-Hands: showed before/after latency comparisons (legacy polling avg: 3 s, new POC: 200 ms).

- Received kudos from Team Lead: "Great work lowering server load by ~30 % and setting us up for real-time features."

- Documented endpoint usage and authentication flow in our internal Confluence, adding examples in cURL and Postman.
`