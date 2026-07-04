"""
InsightDesk API
AI-powered support ticket triage and analytics platform.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import tickets, auth, analytics

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="InsightDesk API",
    description="AI-powered support ticket triage, root-cause tagging, and analytics.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tickets.router, prefix="/api/tickets", tags=["tickets"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])


@app.get("/")
def health_check():
    return {"status": "ok", "service": "InsightDesk API"}
