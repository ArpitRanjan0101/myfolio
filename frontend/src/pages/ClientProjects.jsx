const clients = [
  {
    name: "Flux Studios",
    highlight: "Landing redesign + conversion optimization"
  },
  {
    name: "Nova Finance",
    highlight: "Dashboard UX overhaul and data visualization"
  },
  {
    name: "Helios Health",
    highlight: "Patient portal and scheduling flow"
  }
];

export default function ClientProjects() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.4em] text-yellow-400/80">CLIENTS</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
          Client collaborations
        </h1>
      </div>
      <div className="grid gap-4">
        {clients.map((client) => (
          <div
            key={client.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{client.name}</h3>
            <p className="mt-2 text-sm text-zinc-300">{client.highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
