import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, Smile, X, Loader2 } from "lucide-react";
import { createPost } from "../../../services/postService";
import type { Post } from "../../../../types/post";

interface CreatePostProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function CreatePost({ setPosts }: CreatePostProps) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

async function handlePost() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  if (!text.trim() && !image) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await createPost(
      text,
      "public",
      token,
      image ?? undefined
    );

    const newPost = response.data.data.post;

    console.log("Post created:", newPost);

    const postWithUser = {
      ...newPost,
      user: {
        ...newPost.user,
        ...user,
      },
    };

    setPosts((prevPosts) => [postWithUser, ...prevPosts]);

    setText("");
    setImage(null);
  } catch (error) {
    console.error("Failed to create post:", error);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div
      className="
        rounded-2xl
        bg-[#141A30]/80 backdrop-blur-xl
        border border-white/10
        shadow-[0_8px_30px_rgba(124,58,237,0.15)]
        p-4 sm:p-5
      "
    >
      <div className="flex gap-3">
        {/* Avatar */}
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="
              w-10 h-10 rounded-full object-cover shrink-0
              ring-2 ring-[#7C3AED]/40
              shadow-[0_0_10px_rgba(124,58,237,0.25)]
            "
          />
        ) : (
          <div
            className="
              w-10 h-10 rounded-full shrink-0
              bg-gradient-to-br from-[#7C3AED] to-[#FF7A59]
              ring-2 ring-[#7C3AED]/40
            "
          />
        )}

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`What's on your mind, ${user?.name || "there"}?`}
          rows={2}
          className="
            flex-1 resize-none
            bg-white/5 border border-white/10
            rounded-xl p-3 text-sm
            text-[#F8FAFC] placeholder:text-[#94A3B8]
            outline-none
            focus:border-[#EC4899]/50 focus:shadow-[0_0_14px_rgba(236,72,153,0.25)]
            transition-shadow
          "
        />
      </div>

      {/* Image preview */}
      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mt-3 relative"
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="
                w-full max-h-80 object-cover rounded-xl
                border border-white/10
                shadow-[0_0_20px_rgba(236,72,153,0.2)]
              "
            />

            <motion.button
              type="button"
              onClick={() => setImage(null)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.15 }}
              className="
                absolute top-2 right-2
                w-8 h-8 flex items-center justify-center
                rounded-full
                bg-[#0D1224]/80 backdrop-blur-md
                border border-white/10
                text-[#F8FAFC]
                hover:border-[#EC4899]/40
              "
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
        <div className="flex gap-4 text-sm text-[#94A3B8]">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#EC4899] transition-colors">
            <Image className="w-4 h-4" />
            Photo/video
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />
          </label>

          <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#EC4899] transition-colors">
            <Smile className="w-4 h-4" />
            Feeling/activity
          </span>
        </div>

        <motion.button
          onClick={handlePost}
          disabled={isLoading || (text.trim() === "" && !image)}
          whileHover={!isLoading ? { scale: 1.03 } : {}}
          whileTap={!isLoading ? { scale: 0.97 } : {}}
          transition={{ duration: 0.15 }}
          className="
            flex items-center gap-2
            rounded-full px-5 py-2 text-sm font-semibold
            text-white
            bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#FF7A59]
            shadow-[0_0_16px_rgba(236,72,153,0.35)]
            hover:shadow-[0_0_24px_rgba(236,72,153,0.5)]
            transition-shadow
            disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
          "
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLoading ? "Posting..." : "Post"}
        </motion.button>
      </div>
    </div>
  );
}