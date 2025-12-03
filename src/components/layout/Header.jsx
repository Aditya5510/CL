import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isCourses = !isAdmin;

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 mt-4 pointer-events-none">
      <div className="bg-gray-800 border border-gray-700 shadow-lg max-w-2xl w-full pointer-events-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 hover:bg-gray-700 text-white transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="w-7 h-7 bg-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CL</span>
            </div>
          </div>
          <nav className="flex gap-1">
            <Link
              to="/courses"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                isCourses
                  ? "bg-yellow-500 text-gray-900"
                  : "text-white hover:bg-gray-700"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                isAdmin
                  ? "bg-yellow-500 text-gray-900"
                  : "text-white hover:bg-gray-700"
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
