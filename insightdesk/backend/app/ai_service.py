"""
AI classification service for InsightDesk.

Uses the Anthropic API to analyze incoming support tickets (Arabic or English)
and automatically extract: category, priority, sentiment, a likely root-cause
tag, and a short summary. This mirrors real triage workflows used in
operations/support teams, but automated with an LLM instead of manual review.
"""
import json
import os
import anthropic

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

CLASSIFICATION_PROMPT = """You are a support ticket triage assistant. Analyze the ticket below
(it may be in Arabic, English, or a mix of both) and return ONLY a JSON object
with these exact keys, no other text:

{{
  "category": "one short category, e.g. 'billing', 'bug', 'account access', 'feature request'",
  "priority": "one of: low, medium, high, critical",
  "sentiment": "one of: positive, neutral, negative, frustrated",
  "sentiment_score": "a float from -1.0 (very negative) to 1.0 (very positive)",
  "root_cause_tag": "a short likely root cause, e.g. 'payment gateway timeout'",
  "ai_summary": "one sentence summary of the issue, in English"
}}

Ticket subject: {subject}
Ticket description: {description}
"""


def classify_ticket(subject: str, description: str) -> dict:
    """Calls Claude to classify a ticket. Falls back to safe defaults on error."""
    try:
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=400,
            messages=[
                {
                    "role": "user",
                    "content": CLASSIFICATION_PROMPT.format(
                        subject=subject, description=description
                    ),
                }
            ],
        )
        raw_text = message.content[0].text.strip()
        raw_text = raw_text.replace("```json", "").replace("```", "").strip()
        return json.loads(raw_text)
    except Exception as e:
        return {
            "category": "uncategorized",
            "priority": "medium",
            "sentiment": "neutral",
            "sentiment_score": 0.0,
            "root_cause_tag": "unknown",
            "ai_summary": f"AI classification unavailable: {str(e)}",
        }
