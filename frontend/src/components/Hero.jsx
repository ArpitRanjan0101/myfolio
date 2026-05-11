import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroRouteBackground from "./HeroRouteBackground.jsx";
import heroDummy from "../assets/hero-dummy.svg";

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="relative grid gap-12 overflow-hidden items-center lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <HeroRouteBackground />

      <div className="relative z-10 space-y-6 order-1 lg:order-2">
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
              className="group relative inline-flex min-w-[260px] items-center overflow-hidden rounded-full border border-yellow-400/70 bg-zinc-900/40 px-14 py-2 text-base font-semibold uppercase tracking-widest text-white shadow-lg shadow-black/40 transition-colors duration-200 hover:text-black"
            >
              <span className="absolute inset-0 -translate-x-full bg-yellow-400 transition-transform duration-200 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 leading-none">About Me</span>
              <span className="relative z-10 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform duration-200 ease-out group-hover:translate-x-1">
                {"\u2192"}
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center lg:justify-start order-2 lg:order-1">
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-28 w-28 rounded-2xl bg-yellow-500" />
          <div className="absolute -left-10 bottom-6 h-20 w-20 rounded-2xl bg-yellow-400/60" />

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
              className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]"
            >
              <div
                className="absolute inset-0 rounded-3xl bg-zinc-950/70 border border-zinc-800 shadow-[0_0_60px_rgba(250,204,21,0.18)] overflow-hidden"
              >
                <img
                  src={heroDummy}
                  alt="Hero preview"
                  className="h-full w-full object-cover opacity-95"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-yellow-400/15" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
