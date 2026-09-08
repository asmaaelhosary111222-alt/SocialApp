import { Bell } from "lucide-react";
import { motion } from "motion/react";

export default function NotificationBell() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        relative
        flex h-11 w-11
        items-center justify-center
        rounded-xl
        border border-white/10
        bg-white/[0.04]
        text-[#94A3B8]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-pink-500/30
        hover:bg-white/[0.08]
        hover:text-white
        hover:shadow-lg
        hover:shadow-pink-500/10
      "
      aria-label="Notifications"
    >
      <Bell
        size={20}
        strokeWidth={1.8}
      />

      {/* Notification indicator */}
      <span
        className="
          absolute
          right-2
          top-2
          h-2
          w-2
          rounded-full
          bg-gradient-to-r
          from-[#EC4899]
          to-[#FF7A59]
          shadow-[0_0_8px_rgba(236,72,153,0.8)]
        "
      />
    </motion.button>
  );
}