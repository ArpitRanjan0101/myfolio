import Hero from "../components/Hero.jsx";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <section className="grid gap-6 md:grid-cols-3">
        {["Fast Builds", "Scalable Systems", "Design Driven"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-lg"
          >
            <p className="text-sm text-yellow-400/80">Focus</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{item}</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Curated workflows and design systems that ship premium experiences
              with confidence.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
