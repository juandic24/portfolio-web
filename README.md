# Juan Diego Cortés — Developer Portfolio

**Live (static):** https://juandic24.github.io/portfolio-web/

Personal portfolio website with a retro RPG / terminal aesthetic. The repo contains two versions: a full-stack version (React + ASP.NET Core + PostgreSQL + Docker) and a static version deployed to GitHub Pages.

---

## Versions

| Version | Folder | Deployment | Description |
|---|---|---|---|
| Full-stack | `frontend/` + `backend/` | Docker / Railway | React frontend + ASP.NET Core API + PostgreSQL |
| Static | `frontend-static/` | GitHub Pages | React frontend with static data + Web3Forms |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | ASP.NET Core 10, Entity Framework Core 10 |
| Database | PostgreSQL 16 |
| Auth | JWT Bearer tokens |
| Reverse proxy | Nginx |
| Containerization | Docker, Docker Compose |
| Static deployment | GitHub Pages, GitHub Actions |
| Contact (static) | Web3Forms |

---

## Features

- Retro terminal/RPG aesthetic — Press Start 2P font, CRT scanlines, pixel borders, chiptune music synthesized via Web Audio API
- Projects section — served from the REST API (full-stack) or static data file (static)
- Contact form — stores messages in the DB and sends email via Resend (full-stack) or submits via Web3Forms (static)
- JWT-protected admin endpoints for managing projects (CRUD)
- Rate limiting on contact (5 req / 10 min) and login (10 req / 5 min) endpoints
- Nginx reverse proxy — frontend and API served from the same origin under `/api/`

---

## Project Structure

```
portfolio/
├── docker-compose.yml
├── .env.example
├── .github/
│   └── workflows/
│       └── deploy.yml          # Builds frontend-static/ and deploys to gh-pages
├── backend/
│   └── Portfolio.API/
│       ├── Controllers/
│       ├── Services/
│       ├── Repositories/
│       ├── Models/
│       ├── DTOs/
│       ├── Data/
│       ├── Migrations/
│       └── Program.cs
├── frontend/                   # Full-stack version (connects to the API)
│   ├── nginx.conf.template
│   ├── public/
│   │   └── cv.pdf
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
└── frontend-static/            # Static version (GitHub Pages)
    ├── public/
    │   └── cv.pdf
    └── src/
        ├── components/
        ├── data/
        │   └── projects.ts     # Project data (edit here to add/update projects)
        ├── hooks/
        ├── services/
        └── types/
```

---

## Running Locally

### Full-stack version

**Prerequisites:** Docker Desktop

1. Clone the repository:
   ```bash
   git clone https://github.com/juandic24/portfolio-web.git
   cd portfolio-web
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env
   ```

3. Fill in the values in `.env` (see [Environment Variables](#environment-variables) below).

4. Start all services:
   ```bash
   docker-compose up --build
   ```

5. Open `http://localhost` in your browser.

> If you previously ran the project and changed database credentials, run `docker-compose down -v` first to reset the PostgreSQL volume.

### Static version

**Prerequisites:** Node.js 20+

1. Create `frontend-static/.env.local` with your Web3Forms key:
   ```env
   VITE_WEB3FORMS_KEY=your_key_here
   ```

2. Install dependencies and start the dev server:
   ```bash
   cd frontend-static
   npm install
   npm run dev
   ```

---

## Environment Variables

### Full-stack (`.env`)

Copy `.env.example` to `.env` and configure each value:

```env
# PostgreSQL
POSTGRES_DB=portfoliodb
POSTGRES_USER=portfoliouser
POSTGRES_PASSWORD=your-strong-password

# JWT — use a random string of at least 32 characters
JWT_SECRET=your-random-secret-min-32-chars
JWT_ISSUER=portfolio-api
JWT_AUDIENCE=portfolio-client

# Resend (https://resend.com) — HTTP-based email delivery
RESEND_API_KEY=re_your_api_key
RESEND_FROM=Portfolio Contact <you@yourdomain.com>
RESEND_CONTACT_RECEIVER=your@email.com

# Admin account for managing projects via the API
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-admin-password
```

### Static (`frontend-static/.env.local`)

```env
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

For GitHub Actions deployment, add `WEB3FORMS_KEY` as a repository secret (Settings → Secrets and variables → Actions).

---

## API Endpoints

### Projects (public)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/{id}` | Get project by ID |

### Projects (admin — requires JWT)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/{id}` | Update a project |
| DELETE | `/api/projects/{id}` | Delete a project |

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Get a JWT token |

### Contact

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submit a contact message |

---

## Deployment

### Static (GitHub Pages)

Pushes to `main` that include changes under `frontend-static/` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the app and deploys it to the `gh-pages` branch automatically.

### Full-stack (Docker)

The project is designed to be deployed as three separate services — frontend, API, and database — on a platform that supports Docker (e.g., Railway).

- **Frontend**: `frontend/` — Nginx container, serves the React build and proxies `/api/` to the backend
- **Backend**: `backend/Portfolio.API/` — ASP.NET Core container, runs EF Core migrations on startup
- **Database**: PostgreSQL managed instance

Set all environment variables from the [Environment Variables](#environment-variables) section on the hosting platform. The API host for the Nginx proxy is configured via the `API_HOST` environment variable on the frontend service.

---

## Author

**Juan Diego Cortés** — Backend Developer · C# / .NET  
[GitHub](https://github.com/juandic24) · [LinkedIn](https://www.linkedin.com/in/juan-diego-cortestorres/)

---

## License

MIT — see [LICENSE](LICENSE)
