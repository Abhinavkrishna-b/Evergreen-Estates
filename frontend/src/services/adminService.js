import API from "./api";
import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// DASHBOARD
export const getDashboardStats = async () => {
  const { data } = await ADMIN_API.get("/dashboard");
  return data.data;
};

//PROPERTIES
export const getAllPropertiesAdmin = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status)       params.append("status", filters.status);
  if (filters.city)         params.append("city", filters.city);
  if (filters.propertyType) params.append("propertyType", filters.propertyType);
  const { data } = await ADMIN_API.get(`/properties?${params.toString()}`);
  return data.data.properties;
};

export const getPendingProperties = async () => {
  const { data } = await ADMIN_API.get("/properties/pending");
  return data.data.properties;
};

export const verifyProperty = async (id, action, rejectionReason = '') => {
  const body = { action };
  if (action === 'reject') body.rejectionReason = rejectionReason;
  const { data } = await ADMIN_API.put(`/properties/${id}/verify`, body);
  return data;
};

export const setPropertyBadge = async (id, badge) => {
  const { data } = await ADMIN_API.put(`/properties/${id}/badge`, { badge });
  return data;
};

export const forceDeleteProperty = async (id) => {
  const { data } = await ADMIN_API.delete(`/properties/${id}`);
  return data;
};

//USERS
export const getAllUsers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.role)   params.append("role", filters.role);
  if (filters.status) params.append("status", filters.status);
  if (filters.search) params.append("search", filters.search);
  const { data } = await ADMIN_API.get(`/users?${params.toString()}`);
  return data.data.users;
};

export const banUser = async (id) => {
  const { data } = await ADMIN_API.put(`/users/${id}/ban`);
  return data;
};

export const unbanUser = async (id) => {
  const { data } = await ADMIN_API.put(`/users/${id}/unban`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await ADMIN_API.delete(`/users/${id}`);
  return data;
};

//SETTINGS
export const changeAdminPassword = async (currentPassword, newPassword) => {
  const { data } = await ADMIN_API.put("/settings/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
};
