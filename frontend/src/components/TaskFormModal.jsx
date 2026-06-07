import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Spinner from "./Spinner.jsx";

/**
 * Modal dialog used for both creating and editing a task. When `task` is
 * provided the form is pre-filled and acts as an "update" form.
 */
const TaskFormModal = ({ open, task, onClose, onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "", status: "Pending" },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "Pending",
      });
    }
  }, [open, task, reset]);

  if (!open) return null;

  const isEdit = Boolean(task);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          {isEdit ? "Update Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="input"
              placeholder="e.g. Write project report"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="input resize-none"
              placeholder="Add some details..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {isEdit && (
            <div>
              <label className="label" htmlFor="status">
                Status
              </label>
              <select id="status" className="input" {...register("status")}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting && <Spinner size="sm" className="!border-white !border-t-transparent" />}
              {isEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
