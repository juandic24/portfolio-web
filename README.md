# Juan Diego Cortés — Developer Portfolio

**Live:** https://portfoliojdc.up.railway.app

Personal portfolio website built with a retro RPG / terminal aesthetic. Features a React frontend served via Nginx, a REST API backend in ASP.NET Core, and a PostgreSQL database — all containerized with Docker Compose.

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

---

## Features

- Retro terminal/RPG aesthetic — Press Start 2P font, CRT scanlines, pixel borders, chiptune music synthesized via Web Audio API
- Dynamic projects section — content served from the REST API
- Contact form — stores messages in the database and sends email notifications via Resend (HTTP API)
- JWT-protected admin endpoints for managing projects (CRUD)
- Rate limiting on contact (5 req / 10 min) and login (10 req / 5 min) endpoints
- Nginx reverse proxy — frontend and API served from the same origin under `/api/`

---

## Project Structure

```
portfolio/
├── docker-compose.yml
├── .env.example
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
└── frontend/
    ├── nginx.conf.template
    ├── public/
    │   └── cv.pdf
    └── src/
        ├── components/
        ├── hooks/
        ├── services/
        └── types/
```

---

## Running Locally

### Prerequisites

- Docker Desktop

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/juandic24/portfolio.git
   cd portfolio
   ```

2. Create your environment file from the example:
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

---

## Environment Variables

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

## Seeding Projects

After the API is running, authenticate first to get a token:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "your-admin@email.com", "password": "your-admin-password"}'
```

Then create a project using the returned token:

```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Project Name",
    "shortDescription": "One-line description shown on the card.",
    "fullDescription": "Full description shown in the modal.",
    "technologies": ["C#", ".NET", "PostgreSQL", "Docker"],
    "gitHubUrl": "https://github.com/juandic24/repo",
    "liveUrl": null,
    "imageUrl": null,
    "isFeatured": true
  }'
```

---

## Deployment

The project is designed to be deployed as three separate services — frontend, API, and database — on a platform that supports Docker (e.g., Railway).

Each service maps to a subfolder:
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
