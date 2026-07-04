import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`).then(({ data }) => setTicket(data));
  }, [id]);

  if (!ticket) return <p className="text-gray-400">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{ticket.subject}</h2>
      <p className="text-sm text-gray-400 mb-6">
        Created {new Date(ticket.created_at).toLocaleString()}
      </p>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
        <p className="text-gray-600 text-sm whitespace-pre-line">{ticket.description}</p>
      </div>

      <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
        <h3 className="font-semibold text-brand-700 mb-4">🤖 AI Analysis</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Category</p>
            <p className="font-medium text-gray-700">{ticket.category}</p>
          </div>
          <div>
            <p className="text-gray-400">Priority</p>
            <p className="font-medium text-gray-700 capitalize">{ticket.priority}</p>
          </div>
          <div>
            <p className="text-gray-400">Sentiment</p>
            <p className="font-medium text-gray-700 capitalize">
              {ticket.sentiment} ({ticket.sentiment_score})
            </p>
          </div>
          <div>
            <p className="text-gray-400">Root cause</p>
            <p className="font-medium text-gray-700">{ticket.root_cause_tag}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-400 text-sm">Summary</p>
          <p className="font-medium text-gray-700 text-sm">{ticket.ai_summary}</p>
        </div>
      </div>
    </div>
  );
}
