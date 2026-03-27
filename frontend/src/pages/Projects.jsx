const projects = [
  {
    title: "Aurora Commerce",
    summary: "Headless storefront with lightning-fast search and checkout.",
    tags: ["React", "Tailwind", "Node"]
  },
  {
    title: "Signal OS",
    summary: "Realtime dashboard for observability and incident response.",
    tags: ["Vite", "Framer Motion", "API"]
  },
  {
    title: "Orbit Labs",
    summary: "Developer platform with modular onboarding and docs.",
    tags: ["Design System", "SPA", "UX"]
  }
];

export default function Projects() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.4em] text-yellow-400/80">PROJECTS</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
          Selected work
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-zinc-300">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-yellow-400/40 px-3 py-1 text-xs text-yellow-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
