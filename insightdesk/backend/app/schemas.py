from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# ---------- Auth ----------
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- Tickets ----------
class TicketCreate(BaseModel):
    subject: str
    description: str
    language: Optional[str] = "auto"


class TicketOut(BaseModel):
    id: int
    subject: str
    description: str
    language: str
    category: Optional[str]
    priority: str
    sentiment: Optional[str]
    sentiment_score: Optional[float]
    root_cause_tag: Optional[str]
    ai_summary: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AnalyticsSummary(BaseModel):
    total_tickets: int
    open_tickets: int
    by_category: dict
    by_priority: dict
    by_sentiment: dict
    top_root_causes: list
