from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Ticket, User, Status
from app.schemas import AnalyticsSummary
from app.auth_utils import get_current_user

router = APIRouter()


@router.get("/summary", response_model=AnalyticsSummary)
def get_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tickets = db.query(Ticket).filter(Ticket.owner_id == current_user.id).all()

    category_counts = Counter(t.category or "uncategorized" for t in tickets)
    priority_counts = Counter(t.priority for t in tickets)
    sentiment_counts = Counter(t.sentiment or "unknown" for t in tickets)
    root_cause_counts = Counter(t.root_cause_tag for t in tickets if t.root_cause_tag)

    return {
        "total_tickets": len(tickets),
        "open_tickets": sum(1 for t in tickets if t.status == Status.open),
        "by_category": dict(category_counts),
        "by_priority": dict(priority_counts),
        "by_sentiment": dict(sentiment_counts),
        "top_root_causes": root_cause_counts.most_common(5),
    }
