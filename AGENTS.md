## Goal
- Maintain a multi-service platform (Spring Boot microservices + React frontends) with live client demos and marketing website, all deployed via GitHub Pages.

## Constraints & Preferences
- Develop on `develop` or feature branches; never edit `gh-pages` directly
- All React apps use `HashRouter` for GitHub Pages compatibility
- npm/WSL via Ubuntu for builds; Windows PowerShell for file operations
- Client demos must remain standalone apps, not dashboard modules
- Workflow: `develop` → `npm run build` → `.\deploy.ps1` (never commit dist/)

## Progress
### Done
- Replaced hardcoded JWT/DB secrets with `${ENV_VAR}` references, created `.env.example`
- Restructured monorepo into `backend/`, `frontend/`, `devops/`
- Built internal admin dashboard (`decoded_dashboard`) with React/Vite, deployed to `https://ngbontsi.github.io/decodedsolutions/dashboard/`
- Converted static marketing site to Vite + React + TS (separate repo: `ngbontsi/decodedsolutionsite`)
- Created portfolio page on website with 3 live demo cards (butcher shop, guesthouse, dashboard)
- Built and deployed butcher shop client (`butcher-shop/`) with catalog, cart, wishlist, 2-step checkout → `https://ngbontsi.github.io/decodedsolutions/butcher-shop/`
- Built and deployed guesthouse client (`guesthouse-client/`) with property browsing, room selection, date/guest picker, booking confirmation, "My Bookings" tracker → `https://ngbontsi.github.io/decodedsolutions/guesthouse-client/`
- Removed guesthouse monitoring pages from dashboard
- Fixed Vite base paths for all apps to match GitHub Pages URL structure
- Cleared merge conflicts, synced `develop` and `main`, deleted `master` branch
- Created `deploy.ps1` and `deploy.sh` — single-command rebuild + deploy for all apps
- Identified GitHub Pages for `decodedsolutionsite` was pointing at `master` branch instead of `gh-pages` (this caused the blank page)
- Fixed all 5 backend Dockerfiles to use Java 21 (was Java 17)
- Externalized secrets from all application.yml files (JWT, DB credentials) into env vars
- Deleted stale `feature/decoded_dashboard` branch locally
- Cleaned gh-pages: removed leaked source files (workflows, Flutter configs, backend source, .env.example)
- Added register page to dashboard (`RegisterPage.tsx`) with name, email, password, role fields
- Added `register` function to `AuthContext` — calls `POST /api/auth/register`, auto-logs in after registration
- Updated `LoginPage.tsx` with "Don't have an account?" link to `/register`
- Updated `App.tsx` with `/register` route
- Added CSS styles for form-row, select, and register-link
- Deleted `task-api` from source, docker-compose, gateway routes, and DB init (taskdb removed)
- Added `ownerId` columns to Restaurant, MenuItem, Guesthouse, Room, Product entities
- Updated all controllers and services to read `X-User-Id` and `X-User-Role` headers for RLS enforcement
- Added admin bypass: ADMIN role sees all data, others scoped to their own `ownerId`
- Built and injected all JARs into running containers (api-gateway, restaurant, guesthouse, marketplace)
- Verified RLS end-to-end: create scoped to caller, list filtered by ownerId, writes enforce ownership
- Updated OFFLINE.md with task-api removal and RLS documentation

## Mock Data Status
| App | Data Source | Real Backend? |
|-----|------------|---------------|
| **butcher-shop** | `src/data/products.ts` (static import) | No — 100% mock |
| **guesthouse-client** | `src/data/properties.ts` (static import) | No — 100% mock |
| **decoded_dashboard** | Inline mock data per page | No — 100% mock |
| **task_app** (Flutter) | HTTP calls to localhost:8080 | Yes — real API |

### In Progress
- Butcher shop needs real product content populated from user's hard-copy documents
- User to provide product data via voice-to-text or spreadsheet template

### Done (RLS Implementation)
- Deleted task-api from source, docker-compose, gateway routes, and DB init
- Added ownerId to Restaurant, MenuItem, Guesthouse, Room, Product entities
- Updated DTOs, repos, controllers, services for ownership enforcement
- Admin bypass via X-User-Role header (ADMIN sees all data)
- Built and injected JARs into all 4 running containers
- Verified RLS end-to-end across all 3 services

### Blocked
- (none)

## Key Decisions
- `HashRouter` across all SPAs to avoid 404 on GitHub Pages static hosting
- Client demos (butcher, guesthouse) kept as standalone apps, not embedded in dashboard
- Website project lives in its own repo (`decodedsolutionsite`) with its own deployment pipeline
- Build artifacts (dist/) never committed to source branches — only deployed via gh-pages
- All deployment automated via `deploy.ps1`/`deploy.sh` to avoid manual branch switching
- Dockerfiles updated to Java 21 to match pom.xml target
- Secrets externalized to env vars with sensible defaults in application.yml
- **RLS approach**: Application-level Row-Level Security via `ownerId` fields + `X-User-Id`/`X-User-Role` header enforcement. ADMIN role bypasses ownership checks. task-api deleted (was reference RLS implementation).
- **JAR inject workflow**: Build with WSL `mvn` → `docker cp` → restart, avoids full image rebuild for fast iteration.

## Next Steps
- Provide butcher shop product data (voice-to-text or CSV template)
- Update products.ts with real products, prices, categories, images
- Rebuild and deploy via `.\deploy.ps1`
- Change `decodedsolutionsite` Pages source from `master` to `gh-pages` in repo settings
- (Future) Wire frontend demos to real Spring Boot backend APIs when ready

## Critical Context
- Backend: 5 Spring Boot microservices (api-gateway, auth, guesthouse, marketplace, restaurant) with Docker configs — **backend running on localhost:8080-8084**
- Auth-service has Keycloak dependency but no Keycloak docker-compose or config found
- Guesthouse-service missing `application.yml` (was deleted/recreated)
- `frontend/task_app/` is a Flutter project — only app with real API integration (Flutter SDK not installed)
- WSL mount: `/mnt/c/Users/admin/Desktop/decoded\ solution\ platform/platform/`
- `.git/index.lock` may stall git operations; delete with `Remove-Item -Force .git/index.lock`
- gh-pages currently serves: static landing page (root), butcher-shop/, guesthouse-client/, dashboard/
- RLS enforced via `X-User-Id`/`X-User-Role` headers; ADMIN bypasses ownership checks

## Relevant Files
- `devops/docker-compose.yml`: Updated build paths & env vars for secrets
- `.env.example`: Template for `JWT_SECRET`, `DB_USERNAME`, `DB_PASSWORD`
- `frontend/decoded_dashboard/`: Admin dashboard (React/Vite/HashRouter, deployed `/dashboard/`)
- `frontend/butcher-shop/`: Butcher e-commerce demo (cart/wishlist/checkout, deployed `/butcher-shop/`)
- `frontend/butcher-shop/src/data/products.ts`: Mock product data — needs real content
- `frontend/butcher-shop/src/types/index.ts`: `Product` and `CartItem` types
- `frontend/guesthouse-client/`: Guesthouse booking demo (rooms/dates/bookings, deployed `/guesthouse-client/`)
- `business Processes/website/`: Marketing site (separate repo `ngbontsi/decodedsolutionsite`)
- `deploy.ps1` / `deploy.sh`: Unified deployment scripts in platform root
- `backend/*/Dockerfile`: Now all using `eclipse-temurin:21-jdk-alpine` / `21-jre-alpine`
- `backend/*/src/main/resources/application.yml`: Secrets now use `${ENV_VAR:default}` pattern
- `frontend/task_app/`: Flutter mobile app (only app with real API integration)
- `backend/*/src/main/java/**/service/*.java`: All services now enforce RLS via ownerId checks
- `backend/*/src/main/java/**/controller/*.java`: Controllers read X-User-Id/X-User-Role headers
- `OFFLINE.md`: Complete offline reference including RLS documentation
