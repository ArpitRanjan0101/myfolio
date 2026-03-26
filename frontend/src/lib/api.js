const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const publicApi = {
  getSite: () => request("/api/public/site"),
  getProjects: () => request("/api/public/projects"),
  getClientProjects: () => request("/api/public/client-projects")
};

export const authApi = {
  login: (payload) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};

export const adminApi = {
  getSite: (token) =>
    request("/api/admin/site", {
      headers: { Authorization: `Bearer ${token}` }
    }),
  updateSite: (token, payload) =>
    request("/api/admin/site", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),
  getProjects: (token) =>
    request("/api/admin/projects", {
      headers: { Authorization: `Bearer ${token}` }
    }),
  createProject: (token, payload) =>
    request("/api/admin/projects", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),
  updateProject: (token, id, payload) =>
    request(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),
  deleteProject: (token, id) =>
    request(`/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }),
  getClientProjects: (token) =>
    request("/api/admin/client-projects", {
      headers: { Authorization: `Bearer ${token}` }
    }),
  createClientProject: (token, payload) =>
    request("/api/admin/client-projects", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),
  updateClientProject: (token, id, payload) =>
    request(`/api/admin/client-projects/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),
  deleteClientProject: (token, id) =>
    request(`/api/admin/client-projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
};
