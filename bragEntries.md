**BragBook Entry: InnovaTech Labs – Mid-Level Software Engineer**

---

### Week of May 12–16, 2025

* **Monday, May 12:**

  * Designed and scoped a new “Smart Notification” microservice to replace legacy polling jobs, drafting initial ER diagrams and API contracts using Swagger.
  * Paired with a senior engineer to set up a proof-of-concept in Go, focusing on low-latency fan-out to WebSocket clients.
  * Submitted the design proposal to the team and received positive feedback from Product (“the new push model will cut user complaints in half”).

* **Tuesday, May 13:**

  * Implemented the first two endpoints of the notification service (`POST /topics`, `POST /subscriptions`) in Go, following our company’s clean-architecture guidelines (handlers → use cases → repositories).
  * Wrote unit tests achieving 92 % coverage for core business logic using Go’s `testing` package and Testify.

* **Wednesday, May 14:**

  * Deployed the POC service to our staging Kubernetes cluster (EKS) using a CI/CD pipeline update (added new CodeBuild step). Build time improved by 18 % due to caching Docker layers.
  * Discovered a Redis cache misconfiguration causing inconsistent subscription lookups; patched the Helm chart, reducing “cache miss” errors by 65 % in staging.
  * Held a design review with QA and Security teams; addressed concerns around token expiration and race conditions by adding a signed JWT with a sliding expiration window.

* **Thursday, May 15:**

  * Shifted focus to front-end integration: added a “Subscribe” button in the React dashboard (TypeScript + TailwindCSS), hooking into `GET /topics` and `POST /subscriptions`. Ensured optimistic UI updates to improve perceived speed.
  * Collaborated with UX designer to finalize spinner animations and hover states, resulting in a clean user experience.
  * Mentored two junior engineers through their first pull requests, guiding them on writing unit tests in Jest and integrating with GitHub Actions.

* **Friday, May 16:**

  * Presented “Push-Based Notifications Roadmap” in the weekly Engineering All-Hands: showed before/after latency comparisons (legacy polling avg: 3 s, new POC: 200 ms).
  * Received kudos from Team Lead: “Great work lowering server load by \~30 % and setting us up for real-time features.”
  * Documented endpoint usage and authentication flow in our internal Confluence, adding examples in cURL and Postman.

---

### Week of May 19–23, 2025

* **Monday, May 19:**

  * Picked up a high-priority bug: “Intermittent 500 errors” on the account-settings page under heavy load. Root-caused a thread-safety issue in our Java service (improper singleton).
  * Refactored the configuration loader to be a thread-safe `@ConfigurationProperties` bean in Spring Boot, eliminating the race condition; regression tests confirmed zero failures.
  * Deployed hotfix to production at 2 am; monitored logs for 4 hours—no recurrence of 500s (previously affected \~2 % of users).

* **Tuesday, May 20:**

  * Kickstarted a project to migrate our MySQL data­nexus from single-AZ RDS to multi-AZ for improved resilience; drafted Terraform scripts in CDK to provision new replicas and async read-only endpoints.
  * Conducted load-testing in staging with JMeter; discovered replication lag peaked at 1.2 s under 200 TPS, proposed read throttling for critical endpoints to cap at 150 TPS.

* **Wednesday, May 21:**

  * Continued front-end work: built a reusable React hook `useNotificationSubscription()` using SWR for polling fallback if WebSocket disconnects. Achieved a 40 ms faster initial load compared to previous solutions.
  * Added comprehensive Storybook stories for the “Subscribe” component; this improved QA handoffs and reduced front-end test failures by 25 %.
  * Held a 1:1 with my manager, aligned on career growth and discussed potential workshops to deepen my Rust knowledge (company-sponsored).

* **Thursday, May 22:**

  * Collaborated with DevOps to improve our Jenkins CI pipeline: converted Groovy scripts to a declarative pipeline; parallelized linting and test stages, reducing total CI time by 22 %.
  * Introduced automated code quality checks using SonarQube, raising code coverage threshold from 80 % to 85 % for merging.

* **Friday, May 23:**

  * Delivered a lightning talk on “Go Channels vs. Goroutines Best Practices” during our internal Lunch & Learn: demoed common pitfalls and showcased patterns for safe concurrency. Over 30 colleagues attended, and I received multiple follow-up questions.
  * Wrote a blog post for the “InnovaTech dev blog” summarizing the talk; it’s scheduled to publish next Monday.
  * Wrapped up week by reviewing three pull requests, giving detailed feedback on error handling and log structure to align with our centralized ELK stack conventions.

---

### Week of May 26–30, 2025

* **Monday, May 26:**

  * Launched v1.0 of the “Smart Notification” service into production: completed blue-green deployment via CodePipeline to ensure zero downtime. Observed a 50 % reduction in server CPU utilization during peak traffic windows.
  * Monitored Sentry for the first 24 hours—no critical exceptions; responded to a low-severity JSON-parsing warning within 2 hours.

* **Tuesday, May 27:**

  * Started a refactor of our monolithic Node.js account-service into separate Lambda functions (per endpoint) behind API Gateway. Completed migration of `/user/login` and `/user/register`, each now cold-start < 200 ms.
  * Reduced operational costs by 12 % on that service, per AWS billing dashboard estimates.

* **Wednesday, May 28:**

  * Integrated AWS Quicksight dashboards into our internal portal to visualize daily active subscriptions and error trends; automated daily CSV exports via Lambda + S3.
  * Collaborated with Data Analyst to build a real-time metric for “failed deliveries per minute”—added alerts in CloudWatch when rate > 5 errors/min.

* **Thursday, May 29:**

  * Received feedback from Sales on “notification opt-in flow”: some customers requested multi-tenant support. Scoped out requirements to allow “organization” grouping in our DynamoDB schema; drafted new data model.
  * Held a working session with two engineers to discuss partition keys vs. composite keys; decided on a GSI strategy that should support 1 M+ tenants without performance impact.

* **Friday, May 30:**

  * Paused feature development to mentor a junior engineer on debugging a memory leak in Rust service (improper channel cloning). Spent 2 hours walking through `Valgrind` and `perf`, and they successfully identified and fixed the root cause.
  * Ended the week by writing a “Postmortem” doc on a minor API Gateway outage: contributed root cause analysis, remediation plan, and action items to prevent similar issues. Shared it in the SRE Slack channel.

---

### Week of June 2–6, 2025

* **Monday, June 2:**

  * Collaborated with Product on a new feature: “User-Defined Notification Rules” (complex filtering). Scoped schema changes: moving user preferences from a single JSON blob to a relational table in Aurora MySQL.
  * Created initial migration scripts via Liquibase; previewed changes in our dev environment.

* **Tuesday, June 3:**

  * Implemented the backend for rule evaluation in Go: wrote a function to evaluate boolean expressions (e.g., “priority > 5 AND region == ‘EMEA’”) using the `expr` library. Added benchmarks—evaluation time ≈ 0.8 ms per rule (goal < 1 ms).
  * Partnered with a QA engineer to define test cases covering edge scenarios (nested AND/OR clauses, invalid syntax), raising test coverage to 94 %.

* **Wednesday, June 4:**

  * Spun up a sandbox environment to A/B test default push vs. pull behavior for new rule system; collected feedback from a pilot group of 50 beta users.
  * Analyzed results: engagement increased by 18 % among beta users who received tailored notifications. Shared charts with Product Manager.

* **Thursday, June 5:**

  * Simplified our Dockerfile for the core API: switched from Ubuntu base to Alpine, cutting docker image size from 650 MB → 85 MB. This shaved \~30 s off cold start times in ECS Fargate.
  * Revised Kubernetes readiness/liveness probes to reduce false positives; cut down pod restarts by 70 % over 24 hours.

* **Friday, June 6:**

  * Co-led a cross-functional sprint demo: showcased “User-Defined Notification Rules” and “Go Migration” metrics (latency down 40 % overall). Received praise from CTO: “This roadmap aligns perfectly with next-quarter OKRs.”
  * Drafted OKR objectives for Q3:

    1. Migrate remaining monolith services to serverless with 99 %+ uptime.
    2. Implement machine-learning classification for notifications (accuracy > 85 %).
    3. Improve front-end test coverage to 90 %.

---

**Notes on Tone & Content:**

* Entries include day-to-day specifics (code changes, meetings, mentoring, metrics).
* Achievements are quantified (e.g., latency improvements, cost savings, coverage percentages).
* Reflect realistic collaboration (with Product, QA, Sales, SRE).
* Mix of individual work, team coordination, and knowledge-sharing activities.
* Use of actual tooling and languages: Go, Node.js, AWS services, React, Jest, Kubernetes, Docker.

These bullet points should align closely with how a real mid-level software engineer documents weekly wins, metrics, and learning moments in a BragBook-style app.
