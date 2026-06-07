import api from "./api.js";

export const fetchTasks = (params) =>
  api.get("/tasks", { params }).then((res) => res.data);

export const createTaskRequest = (data) =>
  api.post("/tasks", data).then((res) => res.data);

export const updateTaskRequest = (id, data) =>
  api.put(`/tasks/${id}`, data).then((res) => res.data);

export const toggleTaskStatusRequest = (id, status) =>
  api.patch(`/tasks/${id}/status`, status ? { status } : {}).then((res) => res.data);

export const deleteTaskRequest = (id) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);
