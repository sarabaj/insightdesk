import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-brand-700 mb-1">Create account</h1>
        <p className="text-sm text-gray-400 mb-6">Start triaging tickets with AI</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
        )}

        <label className="text-sm text-gray-600">Full name</label>
        <input
          required
          value={form.full_name}
          onChange={update("full_name")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4"
        />

        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4"
        />

        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={update("password")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-lg py-2 font-medium transition"
        >
          Create account
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
