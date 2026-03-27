import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-950 text-zinc-200 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,116,144,0.18),transparent_50%)]" />
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
      <Navbar />
    </div>
  );
}
