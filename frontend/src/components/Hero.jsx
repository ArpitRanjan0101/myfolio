import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center">
      <div className="relative">
        <div className="absolute -left-6 -top-6 h-28 w-28 rounded-2xl bg-yellow-500" />
        <div className="absolute -left-10 bottom-6 h-20 w-20 rounded-2xl bg-yellow-400/60" />
        <div className="relative z-10 -translate-x-8 md:-translate-x-12">
          <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-[0_0_50px_rgba(250,204,21,0.15)] overflow-hidden">
            <div className="h-[360px] md:h-[520px] flex items-center justify-center text-zinc-500 text-sm">
              Add hero image in admin panel
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.5em] text-yellow-400/80">WELCOME</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-white">
            Your Name
          </h1>
          <h2 className="mt-3 text-2xl sm:text-3xl text-yellow-400 font-medium">
            Full Stack Developer
          </h2>
        </motion.div>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-base text-zinc-300 leading-relaxed"
        >
          I design and build clean, high-performance web experiences that feel
          premium, fast, and delightful to use.
        </motion.p>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/about"
              className="group relative inline-flex min-w-[230px] items-center justify-center overflow-hidden rounded-full border border-yellow-400/70 bg-zinc-900/40 px-12 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-black/40"
            >
              <span className="absolute inset-0 -translate-x-full bg-yellow-400 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10">About Me</span>
              <span className="relative z-10 ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
