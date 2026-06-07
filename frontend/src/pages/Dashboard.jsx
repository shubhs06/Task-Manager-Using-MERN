import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext.jsx";
import useDebounce from "../hooks/useDebounce.js";
import {
  fetchTasks,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  toggleTaskStatusRequest,
} from "../services/taskService.js";

import StatCard from "../components/StatCard.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskFormModal from "../components/TaskFormModal.jsx";
import Pagination from "../components/Pagination.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Spinner from "../components/Spinner.jsx";

const PAGE_LIMIT = 10;

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const [loading, setLoading] = useState(true);
  const [mutatingId, setMutatingId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTasks({
        search: debouncedSearch,
        status,
        page,
        limit: PAGE_LIMIT,
      });
      setTasks(data.tasks);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, page]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Reset to first page whenever the search or filter changes.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await updateTaskRequest(editingTask._id, values);
        toast.success("Task updated");
      } else {
        await createTaskRequest(values);
        toast.success("Task created");
      }
      setModalOpen(false);
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    setMutatingId(task._id);
    try {
      await toggleTaskStatusRequest(task._id);
      await loadTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setMutatingId(null);
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    setMutatingId(task._id);
    try {
      await deleteTaskRequest(task._id);
      toast.success("Task deleted");
      // If we removed the last item on a page, step back a page.
      if (tasks.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await loadTasks();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    } finally {
      setMutatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Welcome, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Here&apos;s an overview of your tasks
          </p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          + New Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={stats.totalTasks} tone="brand" />
        <StatCard label="Pending" value={stats.pendingTasks} tone="amber" />
        <StatCard
          label="Completed"
          value={stats.completedTasks}
          tone="green"
        />
      </div>

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          message={
            search || status !== "All"
              ? "Try adjusting your search or filter."
              : "Create your first task to get started."
          }
          action={
            <button type="button" className="btn-primary" onClick={openCreate}>
              + New Task
            </button>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
                busy={mutatingId === task._id}
              />
            ))}
          </div>

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onChange={setPage}
          />
        </>
      )}

      <TaskFormModal
        open={modalOpen}
        task={editingTask}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default Dashboard;
