import { useState } from "react";
import { motion } from "motion/react";
import { Home, FileText, Users, Bookmark } from "lucide-react";

const SIDEBAR_ITEMS = [
  { key: "feed", label: "Feed", icon: Home },
  { key: "myposts", label: "My Posts", icon: FileText },
  { key: "community", label: "Community", icon: Users },
  { key: "saved", label: "Saved", icon: Bookmark },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("feed");

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        w-full sm:w-56
        rounded-2xl
        bg-[#141A30]/80 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(124,58,237,0.15)]
        p-3
        space-y-1.5
      "
    >
      {SIDEBAR_ITEMS.map((item) => {
        const active = activeItem === item.key;
        const Icon = item.icon;

        return (
          <motion.div
            key={item.key}
            onClick={() => setActiveItem(item.key)}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            className={`
              relative flex items-center gap-3 px-4 py-2.5 rounded-xl
              cursor-pointer text-sm font-medium
              transition-colors
              ${
                active
                  ? "text-[#F8FAFC]"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              }
            `}
          >
            {active && (
              <motion.div
                layoutId="sidebarActivePill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="
                  absolute inset-0 rounded-xl
                  bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30
                  border border-white/10
                  shadow-[0_0_18px_rgba(236,72,153,0.3)]
                "
              />
            )}

            {!active && (
              <div
                className="
                  absolute inset-0 rounded-xl opacity-0
                  hover:opacity-100 transition-opacity
                  bg-white/5
                "
              />
            )}

            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
              className="relative z-10"
            >
              <Icon className="w-4 h-4" />
            </motion.span>

            <span className="relative z-10">{item.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}