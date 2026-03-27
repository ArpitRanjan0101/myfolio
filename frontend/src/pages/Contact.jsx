export default function Contact() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.4em] text-yellow-400/80">CONTACT</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
          Let's build something premium
        </h1>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <p className="text-sm text-zinc-300">
          Tell me about your product, timeline, and team. I usually respond
          within 24 hours.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="rounded-full border border-yellow-400/40 px-4 py-2 text-yellow-300">
            hello@yourdomain.com
          </span>
          <span className="rounded-full border border-yellow-400/40 px-4 py-2 text-yellow-300">
            +1 (555) 123-4567
          </span>
        </div>
      </div>
    </section>
  );
}
