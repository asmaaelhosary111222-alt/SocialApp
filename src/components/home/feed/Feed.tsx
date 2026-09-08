import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2, ChevronDown } from "lucide-react";
import CreatePost from "./createpost/CreatePost";
import PostList from "./postlist/PostList";
import { getAllPosts } from "../../services/postService";
import type { Post } from "../../../types/post";

function PostSkeleton() {
  return (
    <div
      className="
        rounded-2xl
        bg-[#141A30]/80 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(124,58,237,0.12)]
        p-5
        animate-pulse
      "
    >
      {/* Header: avatar + name/date skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#EC4899]/30" />
        <div className="space-y-2">
          <div className="h-3 w-32 rounded-full bg-white/10" />
          <div className="h-2.5 w-20 rounded-full bg-white/5" />
        </div>
      </div>

      {/* Body text skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded-full bg-white/10" />
        <div className="h-3 w-4/5 rounded-full bg-white/10" />
      </div>

      {/* Post-content/image skeleton */}
      <div className="mt-4 h-40 w-full rounded-xl bg-white/5" />

      {/* Stats row skeleton */}
      <div className="mt-4 flex gap-4">
        <div className="h-2.5 w-14 rounded-full bg-white/10" />
        <div className="h-2.5 w-14 rounded-full bg-white/10" />
        <div className="h-2.5 w-14 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAllPosts(token, page, 10);

        setPosts(data);

        if (data.length < 10) {
          setHasMorePosts(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleLoadMore = async () => {
    const token = localStorage.getItem("token");

    if (!token || isLoadingMore) return;

    try {
      setIsLoadingMore(true);

      const nextPage = page + 1;

      const data = await getAllPosts(token, nextPage, 10);

      setPosts((prevPosts) => [...prevPosts, ...data]);

      setPage(nextPage);

      if (data.length < 10) {
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-0 space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-0 space-y-5"
    >
      <CreatePost setPosts={setPosts} />

      <PostList posts={posts} setPosts={setPosts} />

      {hasMorePosts && (
        <motion.button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          whileHover={!isLoadingMore ? { y: -2 } : {}}
          whileTap={!isLoadingMore ? { scale: 0.98 } : {}}
          transition={{ duration: 0.15 }}
          className="
            w-full flex items-center justify-center gap-2
            rounded-2xl py-3 text-sm font-medium
            bg-gradient-to-r from-[#7C3AED]/20 to-[#EC4899]/20
            border border-white/10
            text-[#F8FAFC]
            shadow-[0_0_0_rgba(236,72,153,0)]
            hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]
            hover:border-[#EC4899]/40
            transition-shadow
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoadingMore ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Load More
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
}