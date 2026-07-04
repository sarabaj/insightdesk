import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function NewTicket() {
  const [form, setForm] = useState({ subject: "", description: "", language: "auto" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/tickets", form);
      navigate(`/tickets/${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Ticket</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100">
        <label className="text-sm text-gray-600">Subject</label>
        <input
          required
          value={form.subject}
          onChange={update("subject")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4"
        />

        <label className="text-sm text-gray-600">Description</label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={update("description")}
          placeholder="Describe the issue in Arabic or English…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Analyzing with AI…" : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}
