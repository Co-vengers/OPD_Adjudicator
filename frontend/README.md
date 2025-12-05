# Frontend

Purpose
- Compact developer-focused notes for the frontend build, local dev and containerized deployment.

Quick start (local)
1. Install deps: `npm install`
2. Start dev server: `npm start` (opens at http://localhost:3000)

Build (production)
- `npm run build` → produces static assets in `build/`
- Served in this repo by Nginx in the Docker setup.

Docker / Deploy
- Image built from [frontend/Dockerfile](frontend/Dockerfile). Build+serve steps:
  - Build: `docker build -t plum_frontend ./frontend`
  - The container serves files from `/usr/share/nginx/html` using [frontend/nginx.conf](frontend/nginx.conf)
- Compose: see [docker-compose.yml](docker-compose.yml) for how frontend and backend are wired.

Important files
- App entry: [frontend/src/index.js](frontend/src/index.js)
- Top-level app: [frontend/src/App.js](frontend/src/App.js)
- Components: [frontend/src/components/ClaimHistory.js](frontend/src/components/ClaimHistory.js), [frontend/src/components/ClaimAnalysis.js](frontend/src/components/ClaimAnalysis.js), [frontend/src/components/Sidebar.js](frontend/src/components/Sidebar.js)
- Styling: [frontend/tailwind.config.js](frontend/tailwind.config.js), [frontend/src/index.css](frontend/src/index.css), [frontend/src/App.css](frontend/src/App.css)
- Public template: [frontend/public/index.html](frontend/public/index.html)
- Package metadata: [frontend/package.json](frontend/package.json)
- Local README (this repo): [frontend/README.md](frontend/README.md)

Env / API
- Frontend expects the backend API at the URL referenced in code (examples use `https://opd-backend-1.onrender.com`). Update API host in source if running locally.

Troubleshooting
- Build failures: check node version (uses Node 18 in Dockerfile) and installed tailwind/postcss versions in `devDependencies`.
- CORS: backend config allows all origins; see [Backend/README.md](Backend/README.md) and [docker-compose.yml](docker-compose.yml) for service links.

Contact points in repo
- Backend docs: [Backend/README.md](Backend/README.md)
- Compose orchestrator: [docker-compose.yml](docker-compose.yml)
