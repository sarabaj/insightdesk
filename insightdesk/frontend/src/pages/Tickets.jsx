import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";

const priorityColor = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets").then(({ data }) => setTickets(data));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tickets</h2>
        <Link
          to="/tickets/new"
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New Ticket
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Sentiment</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="border-t border-gray-50 hover:bg-brand-50 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <Link to={`/tickets/${t.id}`} className="font-medium text-gray-700">
                    {t.subject}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-500">{t.category || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor[t.priority] || ""}`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{t.sentiment || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{t.status}</td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                  No tickets yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
