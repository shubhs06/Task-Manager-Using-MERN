import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <p className="text-6xl font-bold text-brand-600 dark:text-brand-400">404</p>
    <h1 className="mt-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
      Page not found
    </h1>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
      The page you&apos;re looking for doesn&apos;t exist.
    </p>
    <Link to="/dashboard" className="btn-primary mt-6">
      Go to Dashboard
    </Link>
  </div>
);

export default NotFound;
