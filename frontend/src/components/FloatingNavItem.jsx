import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  rest: { width: 48, backgroundColor: "rgba(39,39,42,0.9)", color: "#e4e4e7" },
  hover: { width: 144, backgroundColor: "#facc15", color: "#0b0b0b" }
};

const labelVariants = {
  rest: { opacity: 0, x: -8 },
  hover: { opacity: 1, x: 0 }
};

export default function FloatingNavItem({ item, Icon }) {
  return (
    <NavLink to={item.path} className="group block w-36">
      {({ isActive }) => (
        <div className="relative h-12 w-36">
          <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={itemVariants}
            transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
            className={`absolute right-0 top-0 h-12 rounded-full shadow-lg border border-zinc-700/60 transition-all duration-150 origin-right flex items-center ${
              isActive ? "shadow-yellow-500/30" : ""
            }`}
          >
            <motion.span
              variants={labelVariants}
              transition={{ duration: 0.12 }}
              className="whitespace-nowrap pl-4 pr-14 text-sm font-semibold leading-none flex items-center h-full"
            >
              {item.name}
            </motion.span>
            <span className="absolute right-0 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900/60 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)] transition-[background-color,filter] duration-200 group-hover:bg-black/20 group-hover:drop-shadow-[0_0_14px_rgba(250,204,21,0.6)]">
              <Icon className="text-xl" />
            </span>
          </motion.div>
        </div>
      )}
    </NavLink>
  );
}
