// src/components/home/feed/postlist/postcard/PostCard.tsx

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
  faGlobe,
  faEllipsis,
  faBookmark,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import type { Post } from "../../../../../types/post";

import {
  likePost,
  updatePost,
  deletePost,
  bookmarkPost,
  getPostLikes,
  sharePost,
} from "../../../../services/postService";

import CommentSection from "./comments/CommentSection";

interface PostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  theme?: "light" | "dark";
}

export default function PostCard({
  post,
  setPosts,
  theme = "light",
}: PostCardProps) {
  const isDark = theme === "dark";

  // =========================
  // States
  // =========================
  const [showLikes, setShowLikes] = useState(false);
  const [likedUsers, setLikedUsers] = useState<any[]>([]);
  const [isLoadingLikes, setIsLoadingLikes] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.body || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareText, setShareText] = useState("");

  // =========================
  // Current user
  // =========================
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isOwner = currentUser._id === post.user._id;

  // =========================
  // Like state
  // =========================
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [likesCount, setLikesCount] = useState(post.likesCount);

  // =========================
  // Like Post
  // =========================
  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const result = await likePost(post._id, token);
      setIsLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  // =========================
  // Update Post
  // =========================
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!editText.trim()) return;

    setIsUpdating(true);

    try {
      await updatePost(post._id, editText, token);

      setPosts((prevPosts) =>
        prevPosts.map((item) =>
          item._id === post._id ? { ...item, body: editText } : item
        )
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // =========================
  // Delete Post
  // =========================
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await deletePost(post._id, token);

      setPosts((prevPosts) => prevPosts.filter((item) => item._id !== post._id));
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // =========================
  // Bookmark Post
  // =========================
  const handleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await bookmarkPost(post._id, token);
      const result = response.data.data;

      setIsBookmarked(result.bookmarked);
      setBookmarksCount(result.bookmarksCount);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to bookmark post:", error);
    }
  };

  // =========================
  // Show Likes
  // =========================
  const handleShowLikes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setIsLoadingLikes(true);

      const response = await getPostLikes(post._id, token);

      setLikedUsers(response.data.data.likes);
      setShowLikes(true);
    } catch (error) {
      console.error("Failed to fetch post likes:", error);
    } finally {
      setIsLoadingLikes(false);
    }
  };

  // =========================
  // Share Post
  // =========================
  const handleShare = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!shareText.trim()) return;

    try {
      const response = await sharePost(post._id, shareText, token);
      const sharedPost = response.data.data.post;

      setPosts((prevPosts) => [sharedPost, ...prevPosts]);

      setShareText("");
      setIsSharing(false);
    } catch (error) {
      console.error("Failed to share post:", error);
    }
  };

  // =========================
  // JSX
  // =========================
  return (
    <div
      className={`rounded-lg p-4 ${
        isDark ? "bg-slate-900/70 border border-white/10" : "bg-white shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
              {post.user.name}
            </div>
            <div className={`flex items-center gap-1 text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>·</span>
              <FontAwesomeIcon icon={faGlobe} className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={isDark ? "text-slate-400 hover:text-white" : "text-gray-400 hover:text-gray-700"}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>

          {isMenuOpen && (
            <div
              className={`absolute right-0 top-8 z-20 w-40 rounded-lg py-2 shadow-lg border ${
                isDark ? "bg-slate-900 border-white/10" : "bg-white border-gray-100"
              }`}
            >
              <button
                onClick={handleBookmark}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                  isDark ? "text-slate-200 hover:bg-white/5" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon icon={faBookmark} />
                {isBookmarked ? "Unsave post" : "Save post"}
              </button>

              {isOwner && (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditing(true);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                      isDark ? "text-slate-200 hover:bg-white/5" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit post
                  </button>

                  <button
                    onClick={handleDelete}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
                      isDark ? "text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete post
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      {isEditing ? (
        <div className="mt-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
            className={`w-full rounded-lg p-3 text-sm resize-none outline-none border ${
              isDark
                ? "bg-slate-800 border-white/10 text-slate-100 focus:border-pink-400"
                : "focus:border-indigo-400"
            }`}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(post.body || "");
              }}
              className={`px-3 py-1.5 text-sm rounded-lg ${
                isDark ? "text-slate-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isUpdating || !editText.trim()}
              className={`px-3 py-1.5 text-sm text-white rounded-lg disabled:opacity-40 ${
                isDark ? "bg-gradient-to-r from-purple-600 to-pink-500" : "bg-indigo-600"
              }`}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        post.body && (
          <p className={`mt-3 text-sm ${isDark ? "text-slate-200" : "text-gray-900"}`}>
            {post.body}
          </p>
        )
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-3 w-full aspect-4/3 object-cover rounded-lg"
        />
      )}

      {/* Stats */}
      <div className={`flex items-center justify-between mt-3 text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
        <button onClick={handleShowLikes} className="text-sm hover:underline">
          {likesCount} likes
        </button>
        <div className="flex gap-3">
          <span>{post.sharesCount} shares</span>
          <span>{post.commentsCount} comments</span>
          <span className={`cursor-pointer hover:underline ${isDark ? "text-pink-400" : "text-indigo-600"}`}>
            View details
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`flex items-center justify-between mt-2 pt-2 border-t text-sm ${
          isDark ? "border-white/10 text-slate-300" : "text-gray-600"
        }`}
      >
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 ${
            isLiked
              ? isDark
                ? "text-pink-400 font-semibold"
                : "text-indigo-600 font-semibold"
              : isDark
              ? "hover:text-pink-400"
              : "hover:text-indigo-600"
          }`}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          Like
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 ${isDark ? "hover:text-pink-400" : "hover:text-indigo-600"}`}
        >
          <FontAwesomeIcon icon={faComment} />
          Comment
        </button>

        <button
          onClick={() => setIsSharing(true)}
          className={`flex items-center gap-2 ${isDark ? "hover:text-pink-400" : "hover:text-indigo-600"}`}
        >
          <FontAwesomeIcon icon={faShare} />
          Share
        </button>
      </div>

      {/* Top comment */}
      {post.topComment && (
        <div className={`mt-3 pt-3 border-t ${isDark ? "border-white/10" : ""}`}>
          <div className={`text-xs font-semibold mb-1 ${isDark ? "text-slate-500" : "text-gray-400"}`}>
            TOP COMMENT
          </div>
          <div className={`flex items-start gap-2 rounded-lg p-2 ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
            <img
              src={post.topComment.commentCreator.photo}
              alt={post.topComment.commentCreator.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="text-sm">
              <span className={`font-semibold ${isDark ? "text-white" : ""}`}>
                {post.topComment.commentCreator.name}
              </span>
              <p className={isDark ? "text-slate-400" : "text-gray-600"}>
                {post.topComment.content}
              </p>
            </div>
          </div>

          {post.commentsCount > 0 && (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className={`text-xs mt-1 cursor-pointer hover:underline ${
                isDark ? "text-pink-400" : "text-indigo-600"
              }`}
            >
              {isExpanded ? "Hide comments" : "View all comments"}
            </div>
          )}
        </div>
      )}

      {/* Comments */}
      {isExpanded && <CommentSection postId={post._id} />}

      {/* Share box */}
      {isSharing && (
        <div className={`mt-4 rounded-lg border p-4 ${isDark ? "border-white/10 bg-white/5" : ""}`}>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            placeholder="Write something about this post..."
            rows={3}
            className={`w-full resize-none rounded-lg border p-3 text-sm outline-none ${
              isDark
                ? "bg-slate-800 border-white/10 text-slate-100 focus:border-pink-400"
                : "focus:border-indigo-400"
            }`}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => {
                setIsSharing(false);
                setShareText("");
              }}
              className={`rounded-lg px-4 py-2 text-sm ${
                isDark ? "text-slate-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>

            <button
              onClick={handleShare}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white ${
                isDark ? "bg-gradient-to-r from-purple-600 to-pink-500" : "bg-indigo-600"
              }`}
            >
              <FontAwesomeIcon icon={faShare} />
              Share
            </button>
          </div>
        </div>
      )}

      {/* Likes modal */}
      {showLikes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className={`w-96 rounded-xl p-5 shadow-xl ${isDark ? "bg-slate-900 border border-white/10" : "bg-white"}`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? "text-white" : ""}`}>Likes</h2>
              <button
                onClick={() => setShowLikes(false)}
                className={isDark ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}
              >
                ✕
              </button>
            </div>

            {isLoadingLikes ? (
              <p className={isDark ? "text-slate-400" : "text-gray-500"}>Loading...</p>
            ) : likedUsers.length === 0 ? (
              <p className={isDark ? "text-slate-400" : "text-gray-500"}>No likes yet.</p>
            ) : (
              <div className="space-y-3">
                {likedUsers.map((user) => (
                  <div key={user._id} className="flex items-center gap-3">
                    <img src={user.photo} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className={`font-medium ${isDark ? "text-white" : ""}`}>{user.name}</p>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}>@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowLikes(false)}
              className={`mt-5 w-full rounded-lg py-2 ${
                isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}