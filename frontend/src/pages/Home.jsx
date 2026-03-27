import { useEffect, useMemo, useState } from "react";
import { publicApi } from "../lib/api.js";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "client-projects", label: "Client Projects" },
  { id: "contact", label: "Contact" }
];

function RightNav({ activeId }) {
  return (
    <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`group flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
            activeId === item.id
              ? "border-amber-400 bg-amber-400/10 text-amber-300"
              : "border-white/10 text-slate-200 hover:border-amber-300 hover:text-amber-200"
          }`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs">
            {item.label[0]}
          </span>
          <span className="w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-auto group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-200/80">
        {subtitle}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-sm text-slate-300">{project.description}</p>
      {project.stack?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        {project.liveUrl ? (
          <a
            className="text-amber-300 hover:text-amber-200"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            className="text-slate-200 hover:text-white"
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  const [site, setSite] = useState(null);
  const [projects, setProjects] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);
  const [activeId, setActiveId] = useState("home");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      publicApi.getSite(),
      publicApi.getProjects(),
      publicApi.getClientProjects()
    ])
      .then(([siteData, projectData, clientData]) => {
        if (!isMounted) return;
        setSite(siteData);
        setProjects(projectData || []);
        setClientProjects(clientData || []);
      })
      .catch(() => {
        if (!isMounted) return;
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) =>
      document.getElementById(item.id)
    );
    function onScroll() {
      const scrollPosition = window.scrollY + 200;
      let currentId = "home";
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          currentId = section.id;
          break;
        }
      }
      setActiveId(currentId);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = useMemo(() => site?.socialLinks || [], [site]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100"
          : "bg-gradient-to-br from-amber-50 via-white to-slate-100 text-slate-900"
      }`}
    >
      <RightNav activeId={activeId} />
      <button
        type="button"
        onClick={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
        className={`fixed right-6 top-6 z-20 hidden h-12 w-12 items-center justify-center rounded-full border shadow-lg transition lg:flex ${
          theme === "dark"
            ? "border-white/10 bg-white/10 text-amber-200 hover:border-amber-300"
            : "border-slate-200 bg-white text-slate-700 hover:border-amber-400"
        }`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3a1 1 0 0 1 1 1v1.5a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zM12 18.5a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1zM4.5 11a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h1.5zM21 11a1 1 0 0 1 0 2h-1.5a1 1 0 1 1 0-2H21zM6.2 6.2a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 1 1-1.4 1.4L6.2 7.6a1 1 0 0 1 0-1.4zM16.3 16.3a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1-1.4 1.4l-1.1-1.1a1 1 0 0 1 0-1.4zM6.2 17.8a1 1 0 0 1 0-1.4l1.1-1.1a1 1 0 0 1 1.4 1.4l-1.1 1.1a1 1 0 0 1-1.4 0zM16.3 7.7a1 1 0 0 1 0-1.4l1.1-1.1a1 1 0 1 1 1.4 1.4l-1.1 1.1a1 1 0 0 1-1.4 0z" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a7 7 0 1 0 11 11z" />
          </svg>
        )}
      </button>

      <section id="home" className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.25),transparent_45%)]"
          }`}
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div
              className={`absolute -left-6 -top-6 h-20 w-24 rounded-[28px] ${
                theme === "dark" ? "bg-amber-400" : "bg-amber-300"
              }`}
            />
            <div
              className={`relative overflow-hidden rounded-[36px] border p-4 ${
                theme === "dark"
                  ? "border-white/10 bg-black/40"
                  : "border-amber-200/60 bg-white/80"
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[28px] bg-black">
                {site?.heroImageUrl ? (
                  <img
                    src={site.heroImageUrl}
                    alt="Portrait"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                    Add hero image in admin panel
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <p
              className={`text-xs uppercase tracking-[0.5em] ${
                theme === "dark" ? "text-amber-200/80" : "text-amber-600"
              }`}
            >
              Welcome
            </p>
            <h1
              className={`mt-6 text-4xl font-semibold sm:text-6xl ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {site?.heroName || "Your Name"}
            </h1>
            <h2
              className={`mt-3 text-2xl font-semibold sm:text-3xl ${
                theme === "dark" ? "text-amber-300" : "text-amber-600"
              }`}
            >
              {site?.heroTitle || "Full Stack Developer"}
            </h2>
            <p
              className={`mt-6 max-w-xl text-lg ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {site?.heroSubtitle ||
                "Designing delightful, high-performance digital products."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
              >
                View Projects
              </a>
              {site?.resumeUrl ? (
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${
                    theme === "dark"
                      ? "border-white/15 text-white hover:border-amber-300 hover:text-amber-200"
                      : "border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700"
                  }`}
                >
                  Download Resume
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="About Me" subtitle="Craft & Story" />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <p className="text-lg leading-relaxed text-slate-300">
            {site?.about ||
              "Share your story, values, and the kind of impact you deliver for clients."}
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-200/70">
              Details
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <p>{site?.location || "Your City, Country"}</p>
              <p>{site?.email || "you@example.com"}</p>
              <p>{site?.phone || "+91 00000 00000"}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="Projects" subtitle="Selected Work" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.length ? (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
              Add projects from the admin panel.
            </div>
          )}
        </div>
      </section>

      <section
        id="client-projects"
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <SectionHeading title="Client Projects" subtitle="Collaboration" />
        <div className="grid gap-6 md:grid-cols-2">
          {clientProjects.length ? (
            clientProjects.map((project) => (
              <div
                key={project._id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {project.clientName}
                </h3>
                <p className="mt-2 text-sm text-amber-200">
                  {project.title}
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  {project.description}
                </p>
                {project.stack?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={`${project._id}-${tech}`}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
              Add client projects from the admin panel.
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title="Contact" subtitle="Let’s Build" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-lg text-slate-300">
              Ready to collaborate or need a standout digital experience? Drop a
              message and I will get back fast.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 px-4 py-2">
                {site?.email || "you@example.com"}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                {site?.phone || "+91 00000 00000"}
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-200/70">
              Social
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.length ? (
                socials.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-amber-300 hover:text-amber-200"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <span className="text-sm text-slate-400">
                  Add social links in admin panel.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
