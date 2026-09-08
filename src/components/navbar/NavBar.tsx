import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Feed", icon: Home },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/notifications", label: "Notifications", icon: Bell },
];

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        relative
        z-50
        flex items-center justify-between
        px-6 py-3
        bg-[#0D1224]/90
        backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* ================= LOGO ================= */}

      <Link
        to="/"
        className="flex items-center gap-2.5 shrink-0"
      >
        <div
          className="
            w-9 h-9
            rounded-xl
            bg-gradient-to-br
            from-[#7C3AED]
            to-[#FF4D8D]
            flex items-center justify-center
            text-white
            text-sm
            font-bold
            shadow-[0_0_18px_rgba(236,72,153,0.45)]
          "
        >
          R
        </div>

        <span
          className="
            text-lg
            font-semibold
            text-[#F8FAFC]
            tracking-tight
          "
        >
          Route Posts
        </span>
      </Link>

      {/* ================= DESKTOP NAVIGATION ================= */}

      <div className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative
                flex items-center gap-2
                px-4 py-2
                rounded-full
                text-sm
                font-medium
                transition-colors

                ${
                  active
                    ? "text-[#F8FAFC]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC]"
                }
              `}
            >
              {active && (
                <motion.span
                  layoutId="navActivePill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-r
                    from-[#7C3AED]/30
                    to-[#EC4899]/30
                    border border-white/10
                    shadow-[0_0_20px_rgba(236,72,153,0.35)]
                  "
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* ================= MOBILE NAV BUTTON ================= */}

      <button
        type="button"
        onClick={() => {
          setIsMobileNavOpen((prev) => !prev);
          setIsMenuOpen(false);
        }}
        className="
          md:hidden
          flex items-center justify-center
          w-9 h-9
          rounded-full
          bg-white/5
          border border-white/10
          text-[#94A3B8]
          hover:text-[#F8FAFC]
          transition
        "
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* ================= MOBILE NAVIGATION ================= */}

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="
              md:hidden
              absolute
              left-0
              right-0
              top-full
              mx-4
              mt-2
              p-2
              rounded-2xl
              bg-[#141A30]
              backdrop-blur-xl
              border border-white/10
              shadow-xl
              z-[9990]
            "
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition

                    ${
                      active
                        ? "bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30 text-[#F8FAFC]"
                        : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />

                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= USER AREA ================= */}

      <div
        ref={menuRef}
        className="
          relative
          z-[9999]
        "
      >
        {/* USER BUTTON */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsMobileNavOpen(false);
          }}
          className="
            flex items-center gap-2.5
            rounded-full
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            py-1.5
            pl-1.5
            pr-3
            hover:bg-white/10
            transition
          "
        >
          {/* Profile photo */}

          {user?.photo ? (
            <img
              src={user.photo}
              alt={user.name || "Profile"}
              className="
                w-8 h-8
                rounded-full
                object-cover
                ring-2
                ring-[#EC4899]/60
                shadow-[0_0_10px_rgba(236,72,153,0.35)]
              "
            />
          ) : (
            <div
              className="
                w-8 h-8
                rounded-full
                bg-gradient-to-br
                from-[#7C3AED]
                to-[#FF7A59]
                ring-2
                ring-[#EC4899]/60
              "
            />
          )}

          {/* Username */}

          <span
            className="
              text-sm
              font-medium
              text-[#F8FAFC]
              hidden sm:inline
            "
          >
            {user?.name || "Guest"}
          </span>

          {/* Chevron */}

          <motion.span
            animate={{
              rotate: isMenuOpen ? 180 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-[#94A3B8]"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.button>

        {/* ================= PROFILE DROPDOWN ================= */}

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.97,
              }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="
                absolute
                right-0
                top-full
                mt-3

                z-[99999]

                w-56

                overflow-hidden

                rounded-2xl

                border
                border-white/10

                bg-[#141A30]

                shadow-[0_20px_60px_rgba(0,0,0,0.6)]

                backdrop-blur-xl
              "
            >
              {/* PROFILE */}

              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex items-center gap-3
                  px-5 py-4

                  text-sm
                  font-semibold
                  text-[#F8FAFC]

                  transition-all
                  duration-200

                  hover:bg-white/5
                "
              >
                <User className="w-5 h-5 text-[#A855F7]" />

                <span>Profile</span>
              </Link>

              {/* SETTINGS */}

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/change-password");
                }}
                className="
                  flex w-full items-center gap-3
                  px-5 py-4

                  text-left
                  text-sm
                  font-semibold
                  text-[#F8FAFC]

                  transition-all
                  duration-200

                  hover:bg-white/5
                "
              >
                <Settings className="w-5 h-5 text-[#EC4899]" />

                <span>Settings</span>
              </button>

              {/* DIVIDER */}

              <div className="mx-4 border-t border-white/10" />

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3
                  px-5 py-4

                  text-left
                  text-sm
                  font-semibold
                  text-[#FF7A59]

                  transition-all
                  duration-200

                  hover:bg-[#FF7A59]/10
                "
              >
                <LogOut className="w-5 h-5" />

                <span>Logout</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}