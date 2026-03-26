export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
          Portfolio in progress
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Build a bold digital presence with React, Tailwind, and a Node
          backend.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          This starter gives you a full stack foundation: a Vite + React +
          Tailwind frontend and an Express + MongoDB backend, wired together
          with Docker for smooth local development.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            href="http://localhost:4000/health"
            target="_blank"
            rel="noreferrer"
          >
            Check API health
          </a>
          <span className="rounded-full border border-slate-600 px-6 py-3 text-sm text-slate-300">
            Update `frontend/src/App.jsx` to match your story
          </span>
        </div>
      </section>
    </main>
  );
}
