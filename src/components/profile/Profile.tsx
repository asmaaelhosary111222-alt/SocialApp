import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Bookmark,
  CalendarDays,
  FileText,
  Heart,
  Mail,
  MessageCircle,
  Share2,
  UserRound,
  Users,
} from "lucide-react";

import { getProfileData } from "../services/authService";
import { getUserPosts } from "../services/postService";
import type { UserProfile } from "../../types/user";
import type { Post } from "../../types/post";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const profileResponse = await getProfileData(token);

        const user = profileResponse.data.data.user;

        setProfile(user);

        const postsResponse = await getUserPosts(
          user._id,
          token
        );

        setPosts(postsResponse.data.data.posts);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080B18] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#EC4899] animate-spin" />

          <p className="text-sm text-[#94A3B8]">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#080B18] flex items-center justify-center px-4">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-5 text-center">
          <p className="text-sm text-red-400">
            Could not load profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B18] text-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Profile Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141A30]/90 shadow-2xl shadow-black/30"
        >
          {/* Cover */}
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FF7A59]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(124,58,237,0.5),transparent_35%)]" />

            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 w-72 h-40 rounded-full bg-purple-500/20 blur-3xl" />
          </div>

          {/* Profile Content */}
          <div className="relative px-5 pb-6 sm:px-8">

            {/* Avatar */}
            <div className="-mt-16 relative w-fit">
              <div className="p-1 rounded-full bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FF7A59] shadow-xl shadow-purple-500/20">
                <div className="rounded-full bg-[#141A30] p-1">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                      <UserRound className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-400 border-4 border-[#141A30]" />
            </div>

            {/* User + Stats */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">

              {/* User info */}
              <div className="pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {profile.name}
                  </h1>

                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/20 text-xs font-medium text-[#EC4899]">
                    Route Posts member
                  </span>
                </div>

                <p className="mt-1 text-sm sm:text-base text-[#94A3B8]">
                  @{profile.username}
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <StatCard
                  icon={<Users className="w-4 h-4" />}
                  label="Followers"
                  value={profile.followersCount}
                />

                <StatCard
                  icon={<UserRound className="w-4 h-4" />}
                  label="Following"
                  value={profile.followingCount}
                />

                <StatCard
                  icon={<Bookmark className="w-4 h-4" />}
                  label="Bookmarks"
                  value={profile.bookmarksCount}
                />
              </div>
            </div>

            {/* About + Post Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">

              {/* About */}
              <div className="rounded-2xl border border-white/10 bg-[#0D1224]/70 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <UserRound className="w-4 h-4 text-[#EC4899]" />
                  </div>

                  <h2 className="font-semibold">
                    About
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <Mail className="w-4 h-4 text-[#EC4899]" />
                    <span className="truncate">
                      {profile.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <CalendarDays className="w-4 h-4 text-[#EC4899]" />
                    <span>
                      Active on Route Posts
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Stats */}
              <div className="grid grid-cols-2 gap-4">
                <ProfileStat
                  icon={<FileText className="w-5 h-5" />}
                  label="My Posts"
                  value={posts.length}
                />

                <ProfileStat
                  icon={<Bookmark className="w-5 h-5" />}
                  label="Saved Posts"
                  value={profile.bookmarksCount}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 rounded-2xl border border-white/10 bg-[#141A30]/80 p-2 flex items-center gap-2"
        >
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
          >
            <FileText className="w-4 h-4" />
            My Posts
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
          >
            <Bookmark className="w-4 h-4" />
            Saved
          </button>
        </motion.div>

        {/* Posts */}
        <div className="mt-5 space-y-5">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.3),
              }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#141A30]/90 shadow-xl shadow-black/10"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-5">
                {post.user.photo ? (
                  <img
                    src={post.user.photo}
                    alt={post.user.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
                    <UserRound className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-[#F8FAFC] truncate">
                    {post.user.name}
                  </p>

                  <p className="text-xs text-[#64748B]">
                    @{post.user.username}
                  </p>
                </div>

                <button
                  type="button"
                  className="ml-auto px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
                >
                  View details
                </button>
              </div>

              {/* Post Body */}
              {post.body && (
                <p className="px-5 pb-5 text-sm sm:text-base leading-7 text-[#E2E8F0] whitespace-pre-wrap">
                  {post.body}
                </p>
              )}

              {/* Post Image */}
              {post.image && (
                <div className="bg-[#080B18] border-y border-white/5">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-[700px] object-contain"
                  />
                </div>
              )}

              {/* Post Statistics */}
              <div className="px-5 py-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs sm:text-sm text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  {post.likesCount} likes
                </span>

                <span className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  {post.sharesCount} shares
                </span>

                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  {post.commentsCount} comments
                </span>

                <span className="ml-auto text-[#64748B]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.article>
          ))}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#141A30]/50 py-14 text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#EC4899]" />
              </div>

              <h3 className="font-semibold text-[#F8FAFC]">
                No posts yet
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">
                Your posts will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
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
    <div className="min-w-[90px] rounded-xl border border-white/10 bg-[#0D1224]/80 px-3 py-3 sm:px-5 text-center">
      <div className="flex justify-center text-[#EC4899] mb-1">
        {icon}
      </div>

      <p className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
        {value}
      </p>

      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#64748B]">
        {label}
      </p>
    </div>
  );
}

/* =========================
   PROFILE STAT
========================= */

interface ProfileStatProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

function ProfileStat({
  icon,
  label,
  value,
}: ProfileStatProps) {
  return (
    <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/5 p-5">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-[#EC4899]">
          {icon}
        </div>

        <span className="text-2xl font-bold text-[#F8FAFC]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>
    </div>
  );
}