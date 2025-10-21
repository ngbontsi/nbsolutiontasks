
# Task Manager Skeleton v2 (Kafka + Postgres + Redis)

This skeleton contains a backend Spring Boot application (JDK17) with:
- PostgreSQL (persistence)
- Redis (caching)
- Kafka + Zookeeper (messaging)
- Lombok + MapStruct
- Docker Compose for local development
- Simple GitHub Actions CI

Quick start (local):
1. Install Docker & Docker Compose.
2. From project root run: docker compose up --build
3. Wait for services to start. Backend will seed initial data.
4. Visit: http://localhost:8080/api/tasks

Notes:
- The app uses JPA with `spring.jpa.hibernate.ddl-auto=update` for local convenience.
- MapStruct and Lombok require annotation processing (configured in pom).
- Kafka images are Bitnami; they are convenient for local testing.
# Task Manager - Skeleton (Frontend + Backend + CI/CD)

This skeleton contains:
- `frontend/` — single page HTML/JS/CSS offline app (tags, localStorage)
- `backend/` — minimal Spring Boot app (in-memory) with REST endpoints
- `Dockerfile` — for the backend
- `.github/workflows/` — CI and Docker publish workflows


## Goals
1. Have a repeatable repo structure to use for client projects.
2. CI: build/test the backend via GitHub Actions.
3. CD: build and publish Docker image to GitHub Container Registry (GHCR).
4. Deploy: use AWS Free Tier for a working copy — recommended path below.


## Recommended AWS Free-Tier deployment (simple and beginner-friendly)
Two practical options:
- **Elastic Beanstalk** (recommended): easy, supports Java and Docker, good for small apps and testing.
- **Lightsail**: beginner-friendly VM + static IP; you manage the OS but it's simple.

Elastic Beanstalk Quick steps:
1. Create an AWS account (Free Tier). Monitor free-tier usage.
2. In the AWS Console -> Elastic Beanstalk -> Create Application.
3. Choose platform Java or Docker (if using the Docker image).
4. Upload your built jar or point EB to your Docker image in GHCR.
5. Create environment; EB will provision EC2, load balancer, security groups automatically.


## GitHub Actions
- `ci.yml` runs tests and builds the jar.
- `docker-publish.yml` builds and pushes a Docker image to GHCR (you may change tags).

## Next steps I can do for you (pick any)
- I can initialize a Git repo and push this skeleton to your GitHub (you provide access or create a repo).
- I can produce Terraform templates to provision Elastic Beanstalk or an EC2 instance (free-tier friendly).
- I can add a basic migration from frontend localStorage to backend REST sync.


## Notes about Free Tier (important)
- AWS Free Tier includes 750 hours/month for a micro EC2 instance (t2.micro / t3.micro) for the first 12 months for new accounts — check AWS Free Tier page for exact limits and current offers.
- Elastic Beanstalk environments may create resources that incur cost if misconfigured — always monitor the Billing dashboard.

References:
- AWS Free Tier: https://aws.amazon.com/free/  (see AWS docs for current limits)
- Elastic Beanstalk Java quickstart: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/java-quickstart.html
- GitHub Actions: publishing docker images: https://docs.github.com/actions/guides/publishing-docker-images
