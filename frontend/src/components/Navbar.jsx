import FloatingNavItem from "./FloatingNavItem.jsx";
import { navItems } from "../data/navItems.js";
import {
  HiHome,
  HiUser,
  HiBriefcase,
  HiFolder,
  HiEnvelope
} from "react-icons/hi2";

const iconMap = {
  HiHome,
  HiUser,
  HiBriefcase,
  HiFolder,
  HiEnvelope
};

export default function Navbar() {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {navItems.map((item) => {
        const Icon = iconMap[item.icon] || HiHome;
        return <FloatingNavItem key={item.name} item={item} Icon={Icon} />;
      })}
    </nav>
  );
}
