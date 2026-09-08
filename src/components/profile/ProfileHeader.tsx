import { motion } from "motion/react";
import {
  BadgeCheck,
  Bookmark,
  UserPlus,
  Users,
} from "lucide-react";

import type { User } from "../../types/user";

interface ProfileHeaderProps {
  user: User;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  user,
  isFollowing,
  isOwnProfile,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141A30]/90 shadow-2xl shadow-black/30"
    >
      {/* =========================
          COVER
      ========================= */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FF7A59]" />

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.45),transparent_35%)]" />

        <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Real cover image */}
        {user.cover && (
          <img
            src={user.cover}
            alt="Profile cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B18]/60 via-transparent to-transparent" />
      </div>

      {/* =========================
          PROFILE CONTENT
      ========================= */}
      <div className="relative px-5 sm:px-8 pb-7">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">

          {/* =========================
              AVATAR + USER INFO
          ========================= */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-16 relative z-10">

            {/* Avatar */}
            <div className="relative w-fit">
              <div className="p-1 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FF7A59] shadow-xl shadow-pink-500/20">
                <div className="rounded-full bg-[#141A30] p-1">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Online indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 border-4 border-[#141A30]" />
            </div>

            {/* User information */}
            <div className="pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {user.name}
                </h1>

                <BadgeCheck className="w-5 h-5 text-[#EC4899] fill-pink-500/10" />
              </div>

              <p className="mt-1 text-sm sm:text-base text-[#94A3B8]">
                @{user.username}
              </p>

              <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20 border border-pink-400/20 text-xs font-medium text-[#F8FAFC]">
                <Users className="w-3.5 h-3.5 text-[#EC4899]" />
                Route Posts member
              </span>
            </div>
          </div>

          {/* =========================
              STATISTICS
          ========================= */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatCard
              icon={<Users className="w-4 h-4" />}
              label="Followers"
              value={user.followersCount}
            />

            <StatCard
              icon={<UserPlus className="w-4 h-4" />}
              label="Following"
              value={user.followingCount}
            />

            <StatCard
              icon={<Bookmark className="w-4 h-4" />}
              label="Bookmarks"
              value={user.bookmarksCount}
            />
          </div>
        </div>

        {/* =========================
            FOLLOW BUTTON
        ========================= */}
        {!isOwnProfile && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`mt-6 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isFollowing
                ? "border border-white/10 bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white"
                : "bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#FF7A59] text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30"
            }`}
          >
            {isFollowing ? (
              <>
                <Users className="w-4 h-4" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Follow
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* =========================
   STAT CARD
========================= */

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="min-w-[88px] sm:min-w-[105px] rounded-xl border border-white/10 bg-white/[0.04] px-3 sm:px-5 py-3 text-center backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
    >
      <div className="flex justify-center mb-1.5 text-[#EC4899]">
        {icon}
      </div>

      <p className="text-lg sm:text-xl font-bold text-white">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
        {label}
      </p>
    </motion.div>
  );
}