from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Ticket, User
from app.schemas import TicketCreate, TicketOut
from app.auth_utils import get_current_user
from app.ai_service import classify_ticket

router = APIRouter()


@router.post("/", response_model=TicketOut, status_code=201)
def create_ticket(
    ticket_in: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ai_result = classify_ticket(ticket_in.subject, ticket_in.description)

    ticket = Ticket(
        subject=ticket_in.subject,
        description=ticket_in.description,
        language=ticket_in.language,
        category=ai_result.get("category"),
        priority=ai_result.get("priority", "medium"),
        sentiment=ai_result.get("sentiment"),
        sentiment_score=ai_result.get("sentiment_score"),
        root_cause_tag=ai_result.get("root_cause_tag"),
        ai_summary=ai_result.get("ai_summary"),
        owner_id=current_user.id,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("/", response_model=List[TicketOut])
def list_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return db.query(Ticket).filter(Ticket.owner_id == current_user.id).order_by(Ticket.created_at.desc()).all()


@router.get("/{ticket_id}", response_model=TicketOut)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = db.query(Ticket).filter(
        Ticket.id == ticket_id, Ticket.owner_id == current_user.id
    ).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.delete("/{ticket_id}", status_code=204)
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = db.query(Ticket).filter(
        Ticket.id == ticket_id, Ticket.owner_id == current_user.id
    ).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    db.delete(ticket)
    db.commit()
