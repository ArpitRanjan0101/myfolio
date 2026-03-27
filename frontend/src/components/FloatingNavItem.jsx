import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  rest: { width: 48 },
  hover: { width: 132 }
};

const labelVariants = {
  rest: { opacity: 0, x: -8 },
  hover: { opacity: 1, x: 0 }
};

export default function FloatingNavItem({ item, Icon }) {
  return (
    <NavLink to={item.path} className="block">
      {({ isActive }) => (
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={itemVariants}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className={`h-12 rounded-full overflow-hidden flex items-center gap-2 shadow-lg border border-zinc-700/60 transition-all duration-300 ${
            isActive
              ? "bg-yellow-500 text-black shadow-yellow-500/30"
              : "bg-zinc-800/90 text-zinc-200"
          }`}
        >
          <span className="w-12 h-12 flex items-center justify-center shrink-0">
            <Icon className="text-lg" />
          </span>
          <motion.span
            variants={labelVariants}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap pr-4 text-sm font-medium"
          >
            {item.name}
          </motion.span>
        </motion.div>
      )}
    </NavLink>
  );
}
