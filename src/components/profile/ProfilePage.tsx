import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { FileText, Loader2, UserRound } from "lucide-react";

import ProfileInfo from "./ProfileInfo";
import ProfileHeader from "./ProfileHeader";
import PostList from "../home/feed/postlist/PostList";

import type { User } from "../../types/user";
import type { Post } from "../../types/post";

import { getUserPosts } from "../services/postService";
import { getProfileData } from "../services/authService";

export default function ProfilePage() {
  const { userId: paramUserId } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<"posts" | "saved">("posts");

  const isOwnProfile = !paramUserId;

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        let currentUser: User;

        if (isOwnProfile) {
          // Get the currently logged-in user's profile
          const profileResponse = await getProfileData(token);

          currentUser = profileResponse.data.data.user;

          setUser(currentUser);
          setIsFollowing(false);
        } else {
          // We don't have a confirmed API endpoint for
          // another user's profile yet.
          console.error(
            "Viewing another user's profile is not connected yet."
          );

          setLoading(false);
          return;
        }

        // Get this user's posts
        const postsResponse = await getUserPosts(
          currentUser._id,
          token
        );

        setPosts(postsResponse.data.data.posts);
      } catch (error) {
        console.error("FAILED TO FETCH PROFILE:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [isOwnProfile]);

  /* ==================== LOADING ==================== */

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#141A30]">
              <Loader2 className="h-6 w-6 animate-spin text-[#EC4899]" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              Loading profile
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Getting everything ready...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ==================== USER NOT FOUND ==================== */

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-8 text-center shadow-2xl shadow-black/20"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
            <UserRound className="h-7 w-7 text-[#94A3B8]" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-white">
            User not found
          </h2>

          <p className="mt-2 text-sm text-[#64748B]">
            We couldn't load this profile right now.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      {/* ==================== BACKGROUND GLOW ==================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-purple-600/5 blur-[120px]" />

        <div className="absolute right-[10%] top-[45%] h-80 w-80 rounded-full bg-pink-500/5 blur-[130px]" />

        <div className="absolute bottom-[5%] left-[40%] h-72 w-72 rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      {/* ==================== PROFILE HEADER ==================== */}

      <ProfileHeader
        user={user}
        isFollowing={isFollowing}
        isOwnProfile={isOwnProfile}
      />

      {/* ==================== PROFILE INFO ==================== */}

      <div className="mt-5">
        <ProfileInfo
          user={user}
          postsCount={posts.length}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* ==================== CONTENT ==================== */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-5"
      >
        {activeTab === "posts" ? (
          posts.length > 0 ? (
            <PostList
              posts={posts}
              setPosts={setPosts}
            />
          ) : (
            <EmptyPosts />
          )
        ) : (
          <SavedPostsUnavailable />
        )}
      </motion.section>
    </motion.main>
  );
}

/* =========================================================
   EMPTY POSTS
========================================================= */

function EmptyPosts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-10 text-center shadow-xl shadow-black/20"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-white/10">
        <FileText className="h-6 w-6 text-[#EC4899]" />
      </div>

      <h3 className="mt-4 text-base font-bold text-white">
        No posts yet
      </h3>

      <p className="mt-2 text-sm text-[#64748B]">
        This profile hasn't shared anything yet.
      </p>
    </motion.div>
  );
}

/* =========================================================
   SAVED POSTS UNAVAILABLE
========================================================= */

function SavedPostsUnavailable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-[#141A30]/80 backdrop-blur-xl p-10 text-center shadow-xl shadow-black/20"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 border border-white/10">
        <FileText className="h-6 w-6 text-[#EC4899]" />
      </div>

      <h3 className="mt-4 text-base font-bold text-white">
        Saved posts
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
        Saved posts aren't available yet — this needs a
        backend endpoint that doesn't exist in the API right now.
      </p>
    </motion.div>
  );
}