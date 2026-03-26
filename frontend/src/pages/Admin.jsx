import { useEffect, useMemo, useState } from "react";
import { adminApi, authApi } from "../lib/api.js";

const TABS = ["Site", "Projects", "Client Projects"];

function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await authApi.login({ email, password });
      onLogin(data.token);
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-lg items-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-300">
            Access the portfolio dashboard.
          </p>
          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="mt-4 text-sm text-rose-300">{error}</p>
          ) : null}
          <button
            className="mt-6 w-full rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300 disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function TabButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        active
          ? "bg-amber-400 text-slate-900"
          : "border border-white/10 text-slate-200 hover:border-amber-300 hover:text-amber-200"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}

function SocialLinksEditor({ value, onChange }) {
  const [items, setItems] = useState(value || []);

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  const updateItem = (index, field, fieldValue) => {
    const updated = items.map((item, idx) =>
      idx === index ? { ...item, [field]: fieldValue } : item
    );
    setItems(updated);
    onChange(updated);
  };

  const addItem = () => {
    const updated = [...items, { label: "", url: "" }];
    setItems(updated);
    onChange(updated);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, idx) => idx !== index);
    setItems(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`social-${index}`} className="grid gap-3 md:grid-cols-2">
          <input
            className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
            placeholder="Label (LinkedIn)"
            value={item.label}
            onChange={(event) => updateItem(index, "label", event.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
              placeholder="https://..."
              value={item.url}
              onChange={(event) =>
                updateItem(index, "url", event.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="rounded-2xl border border-white/10 px-3 text-xs text-slate-300 hover:border-rose-400 hover:text-rose-300"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 hover:border-amber-300 hover:text-amber-200"
      >
        Add Social Link
      </button>
    </div>
  );
}

function SitePanel({ token }) {
  const [site, setSite] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    adminApi
      .getSite(token)
      .then((data) => setSite(data || {}))
      .catch(() => {});
  }, [token]);

  if (!site) {
    return <p className="text-slate-300">Loading site settings...</p>;
  }

  const updateField = (field, value) => {
    setSite((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setStatus("Saving...");
    try {
      const updated = await adminApi.updateSite(token, site);
      setSite(updated);
      setStatus("Saved");
      setTimeout(() => setStatus(""), 1500);
    } catch (err) {
      setStatus("Save failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Hero Name"
          value={site.heroName || ""}
          onChange={(event) => updateField("heroName", event.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Hero Title"
          value={site.heroTitle || ""}
          onChange={(event) => updateField("heroTitle", event.target.value)}
        />
      </div>
      <input
        className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
        placeholder="Hero Subtitle"
        value={site.heroSubtitle || ""}
        onChange={(event) => updateField("heroSubtitle", event.target.value)}
      />
      <textarea
        className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
        placeholder="About section"
        value={site.about || ""}
        onChange={(event) => updateField("about", event.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Location"
          value={site.location || ""}
          onChange={(event) => updateField("location", event.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Email"
          value={site.email || ""}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Phone"
          value={site.phone || ""}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Resume URL"
          value={site.resumeUrl || ""}
          onChange={(event) => updateField("resumeUrl", event.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Hero Image URL"
          value={site.heroImageUrl || ""}
          onChange={(event) => updateField("heroImageUrl", event.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm"
          placeholder="Accent Color (hex)"
          value={site.accentColor || ""}
          onChange={(event) => updateField("accentColor", event.target.value)}
        />
      </div>
      <div>
        <p className="mb-3 text-sm text-slate-300">Social Links</p>
        <SocialLinksEditor
          value={site.socialLinks || []}
          onChange={(value) => updateField("socialLinks", value)}
        />
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300"
      >
        Save Site Settings
      </button>
      {status ? <p className="text-sm text-slate-300">{status}</p> : null}
    </div>
  );
}

function ProjectsPanel({ token, type }) {
  const isClient = type === "client";
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = isClient
      ? adminApi.getClientProjects
      : adminApi.getProjects;
    fetchData(token).then((data) => setItems(data || []));
  }, [token, isClient]);

  const emptyItem = isClient
    ? {
        clientName: "",
        title: "",
        description: "",
        role: "",
        stack: [],
        outcome: "",
        liveUrl: ""
      }
    : {
        title: "",
        description: "",
        stack: [],
        liveUrl: "",
        repoUrl: "",
        featured: false
      };

  const handleAdd = async () => {
    const create = isClient
      ? adminApi.createClientProject
      : adminApi.createProject;
    const created = await create(token, emptyItem);
    setItems((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id, payload) => {
    const update = isClient
      ? adminApi.updateClientProject
      : adminApi.updateProject;
    const updated = await update(token, id, payload);
    setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
    setStatus("Saved");
    setTimeout(() => setStatus(""), 1200);
  };

  const handleDelete = async (id) => {
    const remove = isClient
      ? adminApi.deleteClientProject
      : adminApi.deleteProject;
    await remove(token, id);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const parseStack = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleAdd}
        className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300"
      >
        Add {isClient ? "Client Project" : "Project"}
      </button>
      {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {isClient ? (
                <input
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                  placeholder="Client Name"
                  value={item.clientName || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((entry) =>
                        entry._id === item._id
                          ? { ...entry, clientName: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              ) : null}
              <input
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                placeholder="Title"
                value={item.title || ""}
                onChange={(event) =>
                  setItems((prev) =>
                    prev.map((entry) =>
                      entry._id === item._id
                        ? { ...entry, title: event.target.value }
                        : entry
                    )
                  )
                }
              />
            </div>
            <textarea
              className="mt-4 min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
              placeholder="Description"
              value={item.description || ""}
              onChange={(event) =>
                setItems((prev) =>
                  prev.map((entry) =>
                    entry._id === item._id
                      ? { ...entry, description: event.target.value }
                      : entry
                  )
                )
              }
            />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                placeholder="Stack (comma separated)"
                value={(item.stack || []).join(", ")}
                onChange={(event) =>
                  setItems((prev) =>
                    prev.map((entry) =>
                      entry._id === item._id
                        ? { ...entry, stack: parseStack(event.target.value) }
                        : entry
                    )
                  )
                }
              />
              {isClient ? (
                <input
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                  placeholder="Role"
                  value={item.role || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((entry) =>
                        entry._id === item._id
                          ? { ...entry, role: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              ) : (
                <input
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                  placeholder="Repository URL"
                  value={item.repoUrl || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((entry) =>
                        entry._id === item._id
                          ? { ...entry, repoUrl: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                placeholder="Live URL"
                value={item.liveUrl || ""}
                onChange={(event) =>
                  setItems((prev) =>
                    prev.map((entry) =>
                      entry._id === item._id
                        ? { ...entry, liveUrl: event.target.value }
                        : entry
                    )
                  )
                }
              />
              {isClient ? (
                <input
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm"
                  placeholder="Outcome"
                  value={item.outcome || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((entry) =>
                        entry._id === item._id
                          ? { ...entry, outcome: event.target.value }
                          : entry
                      )
                    )
                  }
                />
              ) : (
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(item.featured)}
                    onChange={(event) =>
                      setItems((prev) =>
                        prev.map((entry) =>
                          entry._id === item._id
                            ? { ...entry, featured: event.target.checked }
                            : entry
                        )
                      )
                    }
                  />
                  Featured on home
                </label>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleUpdate(item._id, item)}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 hover:border-amber-300 hover:text-amber-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 hover:border-rose-400 hover:text-rose-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-slate-300">
            No {isClient ? "client projects" : "projects"} yet. Add your first
            one.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function AdminDashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const content = useMemo(() => {
    if (activeTab === "Site") {
      return <SitePanel token={token} />;
    }
    if (activeTab === "Projects") {
      return <ProjectsPanel token={token} type="project" />;
    }
    return <ProjectsPanel token={token} type="client" />;
  }, [activeTab, token]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <p className="text-sm text-slate-300">
              Manage your portfolio content.
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 hover:border-amber-300 hover:text-amber-200"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div className="flex flex-wrap gap-3">
          {TABS.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              active={tab === activeTab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useLocalStorage("myfolio_admin_token", "");

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return <AdminDashboard token={token} onLogout={() => setToken("")} />;
}
