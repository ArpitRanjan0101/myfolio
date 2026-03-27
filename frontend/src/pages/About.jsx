export default function About() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.4em] text-yellow-400/80">ABOUT</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
          Crafting modern interfaces
        </h1>
      </div>
      <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
        I specialize in building high-end frontend experiences with a focus on
        performance, accessibility, and visual polish. From prototyping to
        production, I align design and engineering to ship delightful products.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          "8+ years shipping interfaces",
          "React + Vite product systems",
          "Design systems and component libraries",
          "Motion and interaction design"
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <p className="text-sm text-zinc-200">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
