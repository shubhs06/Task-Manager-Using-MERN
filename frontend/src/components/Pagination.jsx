const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        className="btn-secondary"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="text-sm text-slate-600 dark:text-slate-300">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
