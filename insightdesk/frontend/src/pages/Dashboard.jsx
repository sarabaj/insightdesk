import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../api.js";

const COLORS = ["#3b5bdb", "#5c7cfa", "#91a7ff", "#bac8ff", "#dbe4ff"];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/analytics/summary").then(({ data }) => setSummary(data));
  }, []);

  if (!summary) return <p className="text-gray-400">Loading analytics…</p>;

  const categoryData = Object.entries(summary.by_category).map(([name, value]) => ({
    name,
    value,
  }));
  const priorityData = Object.entries(summary.by_priority).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <p className="text-sm text-gray-400">Total tickets</p>
          <p className="text-3xl font-bold text-brand-700">{summary.total_tickets}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <p className="text-sm text-gray-400">Open tickets</p>
          <p className="text-3xl font-bold text-brand-700">{summary.open_tickets}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">Tickets by category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b5bdb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-4">Tickets by priority</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={80} label>
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-4">Top root causes</h3>
        {summary.top_root_causes.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet — create some tickets.</p>
        ) : (
          <ul className="space-y-2">
            {summary.top_root_causes.map(([cause, count]) => (
              <li key={cause} className="flex justify-between text-sm">
                <span className="text-gray-600">{cause}</span>
                <span className="font-medium text-brand-700">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
