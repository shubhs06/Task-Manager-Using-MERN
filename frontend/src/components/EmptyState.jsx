const EmptyState = ({ title = "Nothing here yet", message, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/40">
    <svg
      className="mb-4 h-12 w-12 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 13h6m-6 4h6M9 9h1M4 5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
    </svg>
    <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
      {title}
    </h3>
    {message && (
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {message}
      </p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
