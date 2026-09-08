import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, Search, UserRoundPlus } from "lucide-react";
import { getSuggestions } from "../../services/authService";
import type { UserSuggestion } from "../../../types/user";

export default function SuggestedFriends() {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSuggestions() {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await getSuggestions(token);

        setSuggestions(response.data.data.suggestions);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    }

    fetchSuggestions();
  }, []);

  const filteredSuggestions = suggestions
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div
      className="
        rounded-2xl
        bg-[#141A30]/80 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(124,58,237,0.15)]
        p-4
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-0.5">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#EC4899]" />

          <h2 className="text-sm font-semibold text-[#F8FAFC]">
            Suggested Friends
          </h2>
        </div>

        <span
          className="
            flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full
            bg-gradient-to-r from-[#7C3AED]/40 to-[#EC4899]/40
            border border-white/10
            text-[#F8FAFC] text-[10px] font-semibold
          "
        >
          {suggestions.length}
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#94A3B8]" />

        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full h-9 rounded-xl
            bg-white/5 border border-white/10
            pl-9 pr-3 text-xs text-[#F8FAFC]
            placeholder:text-[#94A3B8]
            outline-none
            focus:border-[#EC4899]/50 focus:shadow-[0_0_12px_rgba(236,72,153,0.25)]
            transition-shadow
          "
        />
      </div>

      {/* Friends */}
      <div className="space-y-2">
        {filteredSuggestions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <Users className="w-5 h-5 text-[#94A3B8]" />
            <p className="text-xs text-[#94A3B8]">No friends found</p>
          </div>
        ) : (
          filteredSuggestions.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              whileHover={{ y: -2 }}
              className="
                rounded-2xl
                bg-white/5 border border-white/10
                p-2.5
                transition-shadow
                hover:shadow-[0_0_16px_rgba(236,72,153,0.2)]
                hover:border-[#EC4899]/30
              "
            >
              {/* Top row */}
              <div className="flex items-center gap-2.5">
                {/* Profile picture */}
                <img
                  src={user.photo}
                  alt={user.name}
                  className="
                    w-10 h-10 rounded-full object-cover shrink-0
                    ring-2 ring-[#7C3AED]/40
                    shadow-[0_0_10px_rgba(124,58,237,0.25)]
                  "
                />

                {/* Name + username */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#F8FAFC] truncate">
                    {user.name}
                  </p>

                  <p className="text-[10px] text-[#94A3B8] truncate">
                    @{user.username}
                  </p>
                </div>

                {/* Follow */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="
                    shrink-0 flex items-center gap-1 rounded-full
                    bg-gradient-to-r from-[#7C3AED]/70 to-[#EC4899]/70
                    px-2.5 py-1.5 text-[10px] font-semibold text-[#F8FAFC]
                    hover:from-[#7C3AED] hover:to-[#EC4899]
                    hover:shadow-[0_0_14px_rgba(236,72,153,0.4)]
                    transition-all
                  "
                >
                  <UserRoundPlus className="w-3 h-3" />
                  Follow
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-1.5 mt-2 ml-[50px]">
                <span
                  className="
                    rounded-full bg-white/5 border border-white/10
                    px-2 py-0.5 text-[9px] text-[#94A3B8]
                  "
                >
                  {user.followersCount} followers
                </span>

                {user.mutualFollowersCount > 0 && (
                  <span
                    className="
                      rounded-full
                      bg-gradient-to-r from-[#7C3AED]/30 to-[#EC4899]/30
                      border border-white/10
                      px-2 py-0.5 text-[9px] text-[#F8FAFC]
                    "
                  >
                    {user.mutualFollowersCount} mutual
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* View more */}
      {suggestions.length > 5 && (
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.15 }}
          className="
            w-full mt-3 h-8 rounded-xl
            bg-white/5 border border-white/10
            text-[11px] font-semibold text-[#94A3B8]
            hover:text-[#F8FAFC] hover:border-[#EC4899]/40
            hover:shadow-[0_0_12px_rgba(236,72,153,0.25)]
            transition-all
          "
        >
          View more
        </motion.button>
      )}
    </div>
  );
}