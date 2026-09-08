import { motion } from "motion/react";
import {
  Bookmark,
  FileText,
  Mail,
  Users,
} from "lucide-react";

import type { User } from "../../types/user";

type Tab = "posts" | "saved";

interface ProfileInfoProps {
  user: User;
  postsCount: number;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function ProfileInfo({
  user,
  postsCount,
  activeTab,
  onTabChange,
}: ProfileInfoProps) {
  return (
    <div className="space-y-5">
      {/* ==================== ABOUT ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-5 shadow-xl shadow-black/20"
      >
        {/* Decorative glow */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] shadow-lg shadow-purple-500/20">
              <Users className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                About
              </h2>

              <p className="text-xs text-[#94A3B8]">
                A little about this profile
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                <Mail className="h-4 w-4 text-purple-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Email
                </p>

                <p className="mt-0.5 truncate text-sm text-[#CBD5E1]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Activity */}
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/10">
                <Users className="h-4 w-4 text-pink-400" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Activity
                </p>

                <p className="mt-0.5 text-sm text-[#CBD5E1]">
                  Active on Route Posts
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== TABS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-2 shadow-xl shadow-black/20"
      >
        <div className="flex items-center gap-2">
          {/* My Posts */}
          <button
            type="button"
            onClick={() => onTabChange("posts")}
            className={`group relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "posts"
                ? "bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#FF7A59] text-white shadow-lg shadow-pink-500/20"
                : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText
              className={`h-4 w-4 transition-transform duration-300 ${
                activeTab === "posts"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />

            <span>My Posts</span>

            {activeTab === "posts" && (
              <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">
                {postsCount}
              </span>
            )}
          </button>

          {/* Saved */}
          <button
            type="button"
            onClick={() => onTabChange("saved")}
            className={`group relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === "saved"
                ? "bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#FF7A59] text-white shadow-lg shadow-pink-500/20"
                : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 transition-transform duration-300 ${
                activeTab === "saved"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }`}
            />

            <span>Saved</span>

            {activeTab === "saved" && (
              <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">
                {user.bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* ==================== PROFILE STATS ==================== */}
      <div className="grid grid-cols-2 gap-4">
        <ProfileStat
          icon={<FileText className="h-4 w-4" />}
          label="My Posts"
          value={postsCount}
          gradient="purple"
        />

        <ProfileStat
          icon={<Bookmark className="h-4 w-4" />}
          label="Saved Posts"
          value={user.bookmarksCount}
          gradient="pink"
        />
      </div>
    </div>
  );
}

/* ==================== STAT CARD ==================== */

interface ProfileStatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  gradient: "purple" | "pink";
}

function ProfileStat({
  icon,
  label,
  value,
  gradient,
}: ProfileStatProps) {
  const isPurple = gradient === "purple";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-5 shadow-xl shadow-black/20"
    >
      {/* Background glow */}
      <div
        className={`absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${
          isPurple
            ? "bg-purple-600/20 opacity-60"
            : "bg-pink-500/20 opacity-60"
        }`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ${
            isPurple
              ? "from-[#7C3AED] to-[#EC4899] shadow-purple-500/20"
              : "from-[#EC4899] to-[#FF7A59] shadow-pink-500/20"
          }`}
        >
          <span className="text-white">
            {icon}
          </span>
        </div>

        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#64748B]">
          {label}
        </p>

        {/* Value */}
        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}