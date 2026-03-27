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
    <NavLink to={item.path} className="block w-32">
      {({ isActive }) => (
        <div className="relative h-12 w-32">
          <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className={`absolute right-0 top-0 h-12 rounded-full overflow-hidden shadow-lg border border-zinc-700/60 transition-all duration-300 origin-right ${
              isActive
                ? "bg-yellow-500 text-black shadow-yellow-500/30"
                : "bg-zinc-800/90 text-zinc-200"
            }`}
          >
            <motion.span
              variants={labelVariants}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap pl-4 pr-14 text-sm font-medium"
            >
              {item.name}
            </motion.span>
            <span className="absolute right-0 top-0 w-12 h-12 flex items-center justify-center">
              <Icon className="text-lg" />
            </span>
          </motion.div>
        </div>
      )}
    </NavLink>
  );
}
