import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-brand-500 text-white" : "text-gray-600 hover:bg-brand-50"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-white border-r border-gray-200 p-5 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-brand-700">InsightDesk</h1>
          <p className="text-xs text-gray-400">AI Ticket Triage</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/tickets" className={linkClass}>
            Tickets
          </NavLink>
          <NavLink to="/tickets/new" className={linkClass}>
            + New Ticket
          </NavLink>
        </nav>
        <button
          onClick={logout}
          className="text-sm text-gray-400 hover:text-red-500 text-left"
        >
          Log out
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
