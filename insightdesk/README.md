# InsightDesk 🎫

InsightDesk is a full-stack support ticket management and analytics platform with AI-assisted ticket classification.

The system allows users to create and manage support tickets, while an AI service analyzes each ticket and extracts useful information such as category, priority, sentiment, summary, and possible root cause. The results are shown in an analytics dashboard to help identify common issues and ticket patterns.

## Overview

Support teams often receive many tickets that need to be reviewed, categorized, and prioritized manually. InsightDesk provides a simple workflow for submitting tickets and using AI to support the first step of ticket analysis.

The project supports Arabic and English ticket content and includes authentication, ticket management, AI classification, and dashboard analytics.

## Features

- User registration and login using JWT authentication
- Create, view, list, and delete support tickets
- AI-assisted ticket classification
- Arabic and English ticket support
- Extracts category, priority, sentiment, summary, and possible root cause
- Analytics dashboard for ticket categories, priorities, sentiment, and recurring root causes
- User-specific ticket management

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Recharts, React Router |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL |
| AI | Anthropic Claude API |
| Authentication | JWT, bcrypt password hashing |

## Architecture

```text
React Frontend
      |
      | REST API
      v
FastAPI Backend
      |
      | SQLAlchemy
      v
PostgreSQL Database

FastAPI also connects to Claude API for ticket classification.
```

## Project Structure

```text
insightdesk/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── ai_service.py
│   │   ├── auth_utils.py
│   │   ├── database.py
│   │   ├── main.py
│   │   └── schemas.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── api.js
        └── App.jsx
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Anthropic API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

For Windows:

```bash
venv\Scripts\activate
```

The API documentation will be available at:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |
| POST | `/api/tickets` | Create a new ticket |
| GET | `/api/tickets` | List user tickets |
| GET | `/api/tickets/{id}` | View ticket details |
| DELETE | `/api/tickets/{id}` | Delete a ticket |
| GET | `/api/analytics/summary` | Get dashboard analytics |

## Future Improvements

- Add ticket status updates
- Add admin and agent roles
- Add team-level ticket visibility
- Add file attachments for tickets
- Add real-time dashboard updates
- Improve AI classification using a labeled dataset

## Purpose

This project was built to practice full-stack development, backend API design, authentication, database integration, dashboard analytics, and AI-assisted text classification.
