import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="flex items-center gap-2 text-lg font-bold text-brand-600 dark:text-brand-400"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
            T
          </span>
          TaskFlow
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated && (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline dark:text-slate-300">
                {user?.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
