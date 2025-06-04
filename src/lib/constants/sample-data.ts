/**
 * Sample data used for testing and examples
 */

export const PHUC_RESUME_PLAIN_TEXT = `
Software Engineer Mid‑level Full‑time role. 
Location: Phoenix, Arizona, USA. 
Skills: JavaScript, TypeScript, React, Next.js, Node.js, Go, Python, AWS (Lambda, S3, EventBridge, SQS, RDS, ECS, CDK), Docker, MySQL, MongoDB, Redis, GraphQL, Jest, CI/CD, TailwindCSS, CSS Modules. 
Software Engineer with 2+ years professional experience across Deloitte and early‑stage startups, seeking mid‑level full‑time roles. Location: Phoenix, Arizona (open to remote/hybrid). Skills: JavaScript, TypeScript, React, Next.js, Node.js, Go, Python, Rust, AWS (Lambda, S3, EventBridge, SQS, RDS, ECS, CDK, CloudFormation), Docker, MySQL, MongoDB, Redis, GraphQL, CI/CD, Jest, TailwindCSS. Built a visa‑issuance platform serving 10 million applicants annually for 230 embassies, achieving 98 Lighthouse score and >98 % unit test coverage. Designed event‑driven micro‑services handling 10 K daily active users and reduced database latency by 93 %. Secret‑cleared US citizen passionate about distributed systems, AI products, and developer experience, with strong mentoring and cross‑functional collaboration skills.
`

export const SAMPLE_BRAG_ENTRY = `
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

export const SAMPLE_BRAG_ENTRY_SIMILAR_TO_JOB_POSTING_1 = `
Role: Associate Software Engineer (Remote)

Company: TechWorks Automation

Monday, July 8:

- Designed and implemented a new WPF desktop application in C#/.NET to monitor PLC (Programmable Logic Controller) status for our client’s assembly line. Integrated real-time data polling with user-configurable alarms, reducing manual oversight by 60 %.

- Collaborated with electrical engineers to reverse-engineer ladder logic protocols and expose key sensor readings via a robust C++ DLL, which our C# layer consumed.

Tuesday, July 9:

- Built two ASP.NET MVC pages and corresponding WebAPI controllers to allow supervisors to push configuration changes from the web UI directly to the PLC network. Ensured end-to-end security by adding JWT-based authentication and role checks.

- Wrote unit and integration tests (using MSTest and FluentAssertions) covering 85 % of our new controller code paths.

Wednesday, July 10:

- Analyzed existing Microsoft SQL Server schemas to identify slow-running ETL jobs. Optimized stored procedures and added missing nonclustered indexes—improved nightly data import performance by 45 %.

- Partnered with the data team to create a small SSIS package that archived ten million records to a separate data mart, preserving transactional history while keeping the primary OLTP database under 200 GB.

Thursday, July 11:

- Integrated Git workflows with Azure DevOps: configured branch policies and pull request templates, reducing merge conflicts by 30 %. Led a 30-minute knowledge share on “Best Practices for Feature Branches” in our weekly stand-up.

- Deployed our latest WebAPI to an Azure App Service slot using CI/CD pipelines (YAML in Azure DevOps), enabling zero-downtime swaps and automatic rollback on failure.

Friday, July 12:

- Refactored the front-end of our ASP.NET MVC application with HTML5/CSS and JavaScript to support a responsive design; replaced an old jQuery widget with a lightweight React component, improving page load time by 25 %.

- Mentored a summer intern on building a small Unity visualization of PLC data for training demos—guided them through C# scripting, prefab creation, and runtime data binding.

`