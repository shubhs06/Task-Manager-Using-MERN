import api from "./api.js";

export const registerRequest = (data) =>
  api.post("/auth/register", data).then((res) => res.data);

export const loginRequest = (data) =>
  api.post("/auth/login", data).then((res) => res.data);

export const getProfileRequest = () =>
  api.get("/auth/profile").then((res) => res.data);
