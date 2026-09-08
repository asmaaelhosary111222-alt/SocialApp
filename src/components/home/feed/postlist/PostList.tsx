import { motion } from "motion/react";
import PostCard from "./postcard/PostCard";
import type { Post } from "../../../../types/post";

interface PostListProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  theme?: "light" | "dark";
}

export default function PostList({
  posts,
  setPosts,
  theme = "dark",
}: PostListProps) {
  return (
    <div className="space-y-5">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: Math.min(index * 0.05, 0.3),
            ease: "easeOut",
          }}
        >
          <PostCard
            post={post}
            setPosts={setPosts}
            theme={theme}
          />
        </motion.div>
      ))}
    </div>
  );
}