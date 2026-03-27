import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HiMiniMoon, HiMiniSun, HiMiniAcademicCap, HiMiniCodeBracket } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Navbar from "./Navbar.jsx";

export default function Layout() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme === "light" ? "light" : "dark";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        isLight
          ? "bg-gradient-to-br from-white via-slate-100 to-amber-50 text-slate-700"
          : "bg-gradient-to-br from-black via-slate-900 to-slate-950 text-zinc-200"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? "bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.12),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.18),transparent_50%)]"
        }`}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
      <div className="fixed right-6 top-6 z-50 flex items-center gap-3">
        <div
          className={`flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg backdrop-blur ${
            isLight
              ? "border-slate-300/70 bg-white/80 shadow-amber-200/60"
              : "border-zinc-700/60 bg-zinc-900/60 shadow-yellow-500/20"
          }`}
        >
          {[
            {
              name: "LinkedIn",
              href: "https://www.linkedin.com/in/your-handle",
              Icon: FaLinkedinIn
            },
            {
              name: "GitHub",
              href: "https://github.com/your-handle",
              Icon: FaGithub
            },
            {
              name: "LeetCode",
              href: "https://leetcode.com/your-handle",
              Icon: HiMiniCodeBracket
            },
            {
              name: "NeetCode",
              href: "https://neetcode.io",
              Icon: HiMiniAcademicCap
            }
          ].map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="group relative grid h-9 w-9 place-items-center rounded-full text-[color:var(--pill-icon)] transition hover:text-[color:var(--pill-icon-hover)]"
            >
              <span className="absolute inset-0 rounded-full border border-transparent transition group-hover:border-yellow-400/60" />
              <Icon className="relative text-[18px]" />
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setTheme(isLight ? "dark" : "light")}
          aria-label="Toggle color theme"
          className={`h-12 w-12 rounded-full border shadow-lg transition hover:scale-105 ${
            isLight
              ? "border-slate-300/70 bg-white/80 text-yellow-500 shadow-amber-200/70"
              : "border-zinc-700/60 bg-zinc-900/60 text-yellow-300 shadow-yellow-500/20"
          }`}
        >
          {isLight ? (
            <HiMiniMoon className="mx-auto text-xl" />
          ) : (
            <HiMiniSun className="mx-auto text-xl" />
          )}
        </button>
      </div>
      <Navbar />
    </div>
  );
}
