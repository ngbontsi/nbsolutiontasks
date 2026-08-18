# Decoded Solutions Platform

A full-stack SaaS platform built with Spring Boot microservices and React frontends, designed for South African small businesses.

## Architecture

```
decoded-platform/
  backend/                          # Spring Boot 3.4 microservices (Java 21)
    api-gateway/                    # Spring Cloud Gateway (port 8080)
    auth-service/                   # JWT auth, RBAC, audit logs (port 8081)
    restaurant-service/             # Restaurant and menu management (port 8082)
    guesthouse-service/             # Guesthouse, rooms and reservations (port 8083)
    marketplace-service/            # Products, cart, orders (port 8084)
  frontend/                         # React 19 + Vite + TypeScript
    decoded_dashboard/              # Admin dashboard
    butcher-shop/                   # E-commerce demo (cart, checkout)
    guesthouse-client/              # Booking demo (rooms, reservations)
    zozos-shop/                     # Restaurant menu app
    vuyolwethu/                     # Client product gallery
    portfolio/                      # Freelance portfolio site
  mobile/
    decoded-tasks/                  # PWA task manager
  devops/
    docker-compose.yml              # Local development stack
    db/                             # SQL init and RLS policies
    scripts/                        # Setup and deployment helpers
  deploy.ps1                        # Unified deploy to GitHub Pages
  render.yaml                       # Render.com Blueprint (production)
  start-containers.ps1              # Start Docker containers
```

## Tech Stack

- **Backend**: Java 21, Spring Boot 3.4, Spring Cloud Gateway
- **Database**: PostgreSQL 16 (Neon), Redis 7 (Render KV)
- **Auth**: JWT tokens, role-based access control (7 roles)
- **Security**: Row-Level Security (PostgreSQL native + application-level)
- **Frontend**: React 19, TypeScript, Vite 6
- **Deployment**: Render (backend), GitHub Pages (frontends), Neon (DB)

## Quick Start

### Local Development

```powershell
# Start backend services
.\start-containers.ps1

# Start a frontend (e.g., dashboard)
cd frontend\decoded_dashboard
npm install
npm run dev
```

### Production Deployment

```powershell
# Deploy all frontends to GitHub Pages
.\deploy.ps1
```

Backend services deploy automatically via Render when `main` is updated.

## Services

- **API Gateway**: http://localhost:8080 / https://decoded-api-gateway.onrender.com
- **Auth Service**: http://localhost:8081 / https://decoded-auth.onrender.com
- **Restaurant Service**: http://localhost:8082 / https://decoded-restaurant.onrender.com
- **Guesthouse Service**: http://localhost:8083 / https://decoded-guesthouse.onrender.com
- **Marketplace Service**: http://localhost:8084 / https://decoded-marketplace.onrender.com

## Frontend Demos

- **Dashboard**: https://ngbontsi.github.io/decodedsolutions/dashboard/
- **Butcher Shop**: https://ngbontsi.github.io/decodedsolutions/butcher-shop/
- **Guesthouse Client**: https://ngbontsi.github.io/decodedsolutions/guesthouse-client/
- **Zozo's Kitchen**: https://ngbontsi.github.io/decodedsolutions/zozos-shop/
- **Vuyolwethu**: https://ngbontsi.github.io/decodedsolutions/vuyolwethu/
- **Portfolio**: https://ngbontsi.github.io/decodedsolutions/freelance-work/

## Project Structure

- `backend/` - 5 Spring Boot microservices with Docker configs
- `frontend/` - 6 React/Vite/TypeScript applications
- `mobile/` - PWA task manager (Decoded Tasks)
- `devops/` - Docker Compose, database init, deployment scripts
- `deploy.ps1` - Single-command rebuild and deploy for all frontends
- `render.yaml` - Render.com Blueprint for production deployment
