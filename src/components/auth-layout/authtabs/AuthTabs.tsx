import { NavLink } from "react-router-dom";

export default function AuthTabs() {
  // Reusable Tailwind classes
  const baseClasses = `
    relative
    flex-1
    rounded-xl
    px-4
    py-2.5
    text-center
    text-sm
    font-semibold
    transition-all
    duration-300
  `;

  // Active tab
  const activeClasses = `
    bg-gradient-to-r
    from-[#7C3AED]
    via-[#EC4899]
    to-[#FF7A59]
    text-white
    shadow-lg
    shadow-pink-500/20
  `;

  // Inactive tab
  const inactiveClasses = `
    text-[#94A3B8]
    hover:bg-white/[0.05]
    hover:text-white
  `;

  return (
    <div
      className="
        flex
        w-full
        rounded-2xl
        border
        border-white/10
        bg-[#080B18]/70
        p-1
        backdrop-blur-xl
      "
    >
      {/* Login */}
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `${baseClasses} ${
            isActive ? activeClasses : inactiveClasses
          }`
        }
      >
        Login
      </NavLink>

      {/* Register */}
      <NavLink
        to="/register"
        className={({ isActive }) =>
          `${baseClasses} ${
            isActive ? activeClasses : inactiveClasses
          }`
        }
      >
        Register
      </NavLink>
    </div>
  );
}