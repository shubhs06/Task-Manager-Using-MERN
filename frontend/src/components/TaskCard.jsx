const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, busy }) => {
  const isCompleted = task.status === "Completed";

  return (
    <div className="card flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3
          className={`font-semibold text-slate-800 dark:text-slate-100 ${
            isCompleted ? "line-through opacity-70" : ""
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words">
        {task.description}
      </p>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Created {formatDate(task.createdAt)}
      </p>

      <div className="mt-1 flex flex-wrap gap-2">
        <button
          type="button"
          className={isCompleted ? "btn-secondary" : "btn-primary"}
          onClick={() => onToggleStatus(task)}
          disabled={busy}
        >
          {isCompleted ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onEdit(task)}
          disabled={busy}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(task)}
          disabled={busy}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
