# Production Deployment Guide — Google Cloud

## Architecture Overview

```
Users ─→ https://ngbontsi.github.io/decodedsolutions/dashboard/
                │ (static on GitHub Pages)
                ↓ API calls
https://api.decodedsolutions.com ─→ GCP Load Balancer / Caddy (SSL)
                │
                ↓
         GCE VM: docker: api-gateway (:8080)
            │    │    │    │
       auth  rest  gh  mktpl  ← each on :8081-8084
            │    │    │    │
         └──── postgresql:16 ──── redis:7
```

## Step 1 — Create a Google Cloud VM

### Via gcloud CLI
```bash
# Install Google Cloud SDK first: https://cloud.google.com/sdk/docs/install

# Create VM (free-tier eligible: e2-micro in us-east1/us-west1/...)
gcloud compute instances create decoded-platform \
    --zone=us-east1-b \
    --machine-type=e2-micro \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --tags=http-server,https-server \
    --boot-disk-size=30GB

# Allow HTTP/HTTPS traffic
gcloud compute firewall-rules create allow-http --allow tcp:80 --target-tags http-server
gcloud compute firewall-rules create allow-https --allow tcp:443 --target-tags https-server

# SSH into the VM
gcloud compute ssh decoded-platform --zone=us-east1-b
```

### Or via GCP Console
1. Go to **Compute Engine → VM Instances → Create**
2. Name: `decoded-platform`
3. Machine: **e2-micro** (free tier — 2 vCPU, 1GB RAM)
4. Boot disk: **Ubuntu 22.04 LTS**, 30GB
5. Firewall: allow **HTTP** and **HTTPS**
6. Click **Create**

## Step 2 — Install dependencies on the VM

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Log out and back in for Docker group to take effect
exit
gcloud compute ssh decoded-platform --zone=us-east1-b

# Docker Compose plugin
sudo apt install -y docker-compose-plugin

# Caddy (auto SSL reverse proxy)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy

# Git
sudo apt install -y git
```

## Step 3 — Clone the develop branch and configure

```bash
git clone --branch develop https://github.com/ngbontsi/decodedsolutions.git
cd decodedsolutions/platform

# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 48)
DB_PASSWORD=$(openssl rand -base64 24)

# Create .env file
cat > .env << EOF
JWT_SECRET=${JWT_SECRET}
DB_USERNAME=platformuser
DB_PASSWORD=${DB_PASSWORD}
EOF

# Keep a copy of these credentials somewhere safe
echo "--- SAVE THIS ---"
echo "JWT_SECRET: ${JWT_SECRET}"
echo "DB_PASSWORD: ${DB_PASSWORD}"
```

## Step 4 — Start the backend

```bash
docker compose -f devops/docker-compose.yml --env-file .env up -d
```

Check everything:
```bash
docker ps
# Should show 7 containers: api-gateway, auth, restaurant, guesthouse, marketplace, db, redis
```

Test the API:
```bash
curl -s http://localhost:8080/api/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@decoded.com","password":"admin123"}'
# Should return a JWT token
```

## Step 5 — Apply RLS

```bash
docker cp devops/db/rls/setup_rls.sql $(docker ps -q --filter name=db):/tmp/setup_rls.sql
docker exec $(docker ps -q --filter name=db) psql -U platformuser -f /tmp/setup_rls.sql
```

## Step 6 — Set up Caddy reverse proxy

```bash
sudo tee /etc/caddy/Caddyfile << 'EOF'
api.decodedsolutions.com {
    reverse_proxy localhost:8080 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
    }
}
EOF

sudo systemctl restart caddy
```

Now verify HTTPS is working:
```bash
curl -s https://api.decodedsolutions.com/api/auth/login -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@decoded.com","password":"admin123"}'
```

> **Note:** Caddy auto-provisions SSL via Let's Encrypt. It requires the domain's DNS to already point at your VM's external IP.

## Step 7 — Reserve a static external IP

By default, GCP VMs get an ephemeral IP that changes on restart. Reserve a static one:

```bash
gcloud compute addresses create decoded-platform-ip --region=us-east1
gcloud compute addresses describe decoded-platform-ip --region=us-east1
# → returns: address: <YOUR_STATIC_IP>
```

Then update your domain's DNS A record to point to this static IP.

## Step 8 — Update frontend to use live API

### Option A: Serve both frontend and API from same VM (recommended)

Add to `/etc/caddy/Caddyfile`:

```
decodedsolutions.com {
    root * /var/www/decodedsolutions
    file_server

    @api {
        path /api/*
    }
    handle @api {
        reverse_proxy localhost:8080
    }
}
```

Build and upload the frontend:
```bash
# On your local machine
cd frontend/decoded_dashboard
npm run build

# Upload to VM
gcloud compute scp --recurse dist/* decoded-platform:/var/www/decodedsolutions/dashboard/ --zone=us-east1-b
# Or if you haven't set up gcloud scp:
scp -r dist/* <EXTERNAL_IP>:/var/www/decodedsolutions/dashboard/
```

### Option B: Keep GitHub Pages, set API env var

Set `VITE_API_BASE_URL=https://api.decodedsolutions.com` before building:

```powershell
# PowerShell on Windows
$env:VITE_API_BASE_URL="https://api.decodedsolutions.com"
npm run build
npx gh-pages -d dist --dest dashboard
```

## Step 9 — Update CORS in gateway

Edit `backend/api-gateway/src/main/resources/application.yml`:

```yaml
allowedOrigins:
  - "https://ngbontsi.github.io"
  - "https://decodedsolutions.com"
  - "https://api.decodedsolutions.com"
```

Rebuild the gateway:
```bash
docker compose -f devops/docker-compose.yml build api-gateway
docker compose -f devops/docker-compose.yml up -d api-gateway
```

## Step 10 — CI/CD (GitHub Actions)

Create `.github/workflows/deploy.yml` (on the `develop` branch):

```yaml
name: Deploy

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: develop

      - name: SSH and deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/decodedsolutions/platform
            git pull origin develop
            docker compose -f devops/docker-compose.yml up -d --build
```

Set these GitHub Actions secrets (Settings → Secrets → Actions):
| Secret | Value |
|--------|-------|
| `SERVER_HOST` | Your VM's static external IP |
| `SERVER_USER` | Your GCP VM username (usually your email prefix, or `root`) |
| `SSH_PRIVATE_KEY` | Your private SSH key |

### Generate an SSH key for CI/CD

```bash
# On your VM
ssh-keygen -t ed25519 -f ~/.ssh/github-actions -C "github-actions"
cat ~/.ssh/github-actions.pub >> ~/.ssh/authorized_keys

# Show the private key (copy this into GitHub secret)
cat ~/.ssh/github-actions
```

### Auto-pull on every push

The workflow above SSHes into the VM, pulls `develop`, and rebuilds containers. Zero downtime: Docker Compose restarts only changed services.

## Quick checklist

| Item | Done? |
|------|-------|
| GCP e2-micro VM created | □ |
| Docker + Caddy installed | □ |
| `develop` branch cloned | □ |
| `.env` secrets generated | □ |
| Backend containers running | □ |
| RLS SQL applied | □ |
| Static IP reserved + DNS updated | □ |
| Caddy SSL working (`https://api.decodedsolutions.com`) | □ |
| CORS updated for production domains | □ |
| Frontend pointing to live API | □ |
| CI/CD GitHub Actions set up | □ |

## Costs

| Item | Approx cost |
|------|-------------|
| GCP e2-micro VM | Free tier eligible |
| 30GB persistent disk | ~$1.50/mo |
| Domain | ~$10/yr |
| SSL | Free (Caddy auto) |
| **Total** | **~$1.50/mo + $10/yr** |

