# InsightDesk 🎫🤖

**AI-powered support ticket triage and root-cause analytics platform.**

InsightDesk automatically classifies incoming support tickets — written in
Arabic, English, or a mix of both — extracting category, priority, sentiment,
and a likely root cause using an LLM, then surfaces the patterns on a live
analytics dashboard. It's built to mirror how real support/operations teams
triage and analyze recurring issues, but automates the manual first pass.

## Why this project

Manually triaging support tickets is repetitive and inconsistent — two agents
often tag the same issue differently. InsightDesk uses an LLM to apply
**consistent classification** across every ticket the moment it's submitted,
and aggregates that data so a team can spot recurring root causes before they
become a pattern of complaints.

## Features

- 🔐 **JWT authentication** — register/login, tickets scoped per user
- 🤖 **AI classification on submit** — category, priority, sentiment
  (with a numeric score), likely root cause, and a one-line summary
- 🌍 **Bilingual support** — tickets can be written in Arabic or English
- 📊 **Analytics dashboard** — ticket volume by category/priority, sentiment
  breakdown, and top recurring root causes
- 🗂️ **Full CRUD** — create, list, view, and delete tickets

## Tech stack

| Layer      | Technology                                      |
|------------|--------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Recharts, React Router |
| Backend    | FastAPI, SQLAlchemy, Pydantic                    |
| Database   | PostgreSQL                                       |
| AI         | Anthropic Claude API (ticket classification)     |
| Auth       | JWT (python-jose) + bcrypt password hashing       |

## Architecture

```
┌─────────────┐      REST/JSON       ┌──────────────┐      SQL       ┌──────────────┐
│   React SPA  │ ───────────────────▶ │  FastAPI     │ ─────────────▶ │  PostgreSQL   │
│  (Vite +     │ ◀─────────────────── │  backend     │ ◀───────────── │              │
│  Tailwind)   │                      │              │                └──────────────┘
└─────────────┘                      └──────┬───────┘
                                             │ classify_ticket()
                                             ▼
                                     ┌──────────────┐
                                     │ Claude API   │
                                     │ (Anthropic)  │
                                     └──────────────┘
```

## Getting started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL running locally (or a connection string to a hosted instance)
- An Anthropic API key ([console.anthropic.com](https://console.anthropic.com))

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env          # then fill in DATABASE_URL, SECRET_KEY, ANTHROPIC_API_KEY

uvicorn app.main:app --reload
```

API docs available at `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App available at `http://localhost:5173`.

## API overview

| Method | Endpoint                | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/api/auth/register`     | Create a new user              |
| POST   | `/api/auth/login`        | Get a JWT access token         |
| POST   | `/api/tickets`           | Create a ticket (triggers AI)  |
| GET    | `/api/tickets`           | List the current user's tickets|
| GET    | `/api/tickets/{id}`      | Get one ticket + AI insights   |
| DELETE | `/api/tickets/{id}`      | Delete a ticket                |
| GET    | `/api/analytics/summary` | Aggregated dashboard stats     |

## Project structure

```
insightdesk/
├── backend/
│   ├── app/
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # auth, tickets, analytics endpoints
│   │   ├── ai_service.py  # Claude classification logic
│   │   ├── auth_utils.py  # JWT + password hashing
│   │   ├── database.py
│   │   ├── main.py
│   │   └── schemas.py     # Pydantic request/response models
│   └── requirements.txt
└── frontend/
    └── src/
        ├── components/
        ├── pages/          # Login, Register, Dashboard, Tickets, TicketDetail
        ├── api.js
        └── App.jsx
```

## Possible extensions

- Role-based access (agent vs admin) with team-wide ticket visibility
- Webhook ingestion from email/Slack to auto-create tickets
- Fine-tuned classification with a labeled dataset instead of prompt-only
- Real-time updates via WebSockets when ticket status changes

## License

MIT
