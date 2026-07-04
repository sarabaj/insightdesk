import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);
      const { data } = await api.post("/auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (err) {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-sm border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-brand-700 mb-1">InsightDesk</h1>
        <p className="text-sm text-gray-400 mb-6">Sign in to your account</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
        )}

        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 mb-6 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <button
          type="submit"
          className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-lg py-2 font-medium transition"
        >
          Log in
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          No account?{" "}
          <Link to="/register" className="text-brand-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
