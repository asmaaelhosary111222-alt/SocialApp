import { useEffect, useState } from "react";
import {
  getPostComments,
  createComment,
  getCommentReplies,
  createReply,
  likeComment,
  editComment,
  deleteComment,
  type Comment,
  type Reply,
} from "../../../../../services/commentService";

import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Create comment
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Comment likes
  const [commentLikes, setCommentLikes] = useState<
    Record<string, { liked: boolean; count: number }>
  >({});

  // Replies
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [visibleReplies, setVisibleReplies] = useState<
    Record<string, boolean>
  >({});
  const [loadingReplies, setLoadingReplies] = useState<
    Record<string, boolean>
  >({});
  const [repliesError, setRepliesError] = useState<Record<string, string>>(
    {}
  );

  // Reply form
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  // Edit
  const [editingCommentId, setEditingCommentId] = useState<string | null>(
    null
  );
  const [editText, setEditText] = useState("");
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const [deleteError, setDeleteError] = useState<Record<string, string>>({});

  // =========================
  // GET COMMENTS
  // =========================

  const fetchComments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        return;
      }

      const data = await getPostComments(postId, token);

      setComments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // =========================
  // INITIALIZE COMMENT LIKES
  // =========================

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const likesState: Record<
      string,
      { liked: boolean; count: number }
    > = {};

    comments.forEach((comment) => {
      likesState[comment._id] = {
        liked: currentUser
          ? comment.likes.includes(currentUser._id)
          : false,
        count: comment.likesCount,
      };
    });

    setCommentLikes(likesState);
  }, [comments]);

  // =========================
  // CREATE COMMENT
  // =========================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in.");
        return;
      }

      await createComment(postId, content, token, image || undefined);

      setContent("");
      setImage(null);
      setImagePreview(null);

      await fetchComments();
    } catch (err) {
      console.error(err);
      setError("Failed to create comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // GET REPLIES
  // =========================

  const fetchReplies = async (commentId: string) => {
    try {
      setLoadingReplies((prev) => ({
        ...prev,
        [commentId]: true,
      }));

      setRepliesError((prev) => ({
        ...prev,
        [commentId]: "",
      }));

      const token = localStorage.getItem("token");

      if (!token) {
        setRepliesError((prev) => ({
          ...prev,
          [commentId]: "You must be logged in.",
        }));
        return;
      }

      const data = await getCommentReplies(
        postId,
        commentId,
        token
      );

      setReplies((prev) => ({
        ...prev,
        [commentId]: data,
      }));
    } catch (err) {
      console.error(err);

      setRepliesError((prev) => ({
        ...prev,
        [commentId]: "Failed to load replies.",
      }));
    } finally {
      setLoadingReplies((prev) => ({
        ...prev,
        [commentId]: false,
      }));
    }
  };

  // =========================
  // TOGGLE REPLIES
  // =========================

  const toggleViewReplies = async (commentId: string) => {
    if (visibleReplies[commentId]) {
      setVisibleReplies((prev) => ({
        ...prev,
        [commentId]: false,
      }));

      return;
    }

    if (!replies[commentId]) {
      await fetchReplies(commentId);
    }

    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: true,
    }));
  };

  // =========================
  // TOGGLE REPLY FORM
  // =========================

  const toggleReplyForm = (commentId: string) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(commentId);
      setReplyText("");
    }
  };

  // =========================
  // CREATE REPLY
  // =========================

  const handleReplySubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();

    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await createReply(
        postId,
        commentId,
        replyText,
        token
      );

      setReplyText("");

      await fetchReplies(commentId);

      setVisibleReplies((prev) => ({
        ...prev,
        [commentId]: true,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReply(false);
    }
  };

  // =========================
  // LIKE COMMENT
  // =========================

  const handleLikeComment = async (commentId: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const current =
      commentLikes[commentId] || {
        liked: false,
        count: 0,
      };

    // Optimistic update
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: {
        liked: !current.liked,
        count: current.liked
          ? current.count - 1
          : current.count + 1,
      },
    }));

    try {
      await likeComment(postId, commentId, token);
    } catch (err) {
      console.error(err);

      // Revert if API fails
      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: current,
      }));
    }
  };

  // =========================
  // EDIT COMMENT
  // =========================

  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.content);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
    setEditError("");
  };

  const handleEditSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    commentId: string
  ) => {
    e.preventDefault();

    if (!editText.trim()) return;

    try {
      setSubmittingEdit(true);
      setEditError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setEditError("You must be logged in.");
        return;
      }

      await editComment(
        postId,
        commentId,
        editText,
        token
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                content: editText,
              }
            : comment
        )
      );

      cancelEdit();
    } catch (err) {
      console.error(err);
      setEditError("Failed to edit comment.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  // =========================
  // DELETE COMMENT
  // =========================

  const handleDeleteComment = async (commentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      setDeletingCommentId(commentId);

      const token = localStorage.getItem("token");

      if (!token) {
        setDeleteError((prev) => ({
          ...prev,
          [commentId]: "You must be logged in.",
        }));

        return;
      }

      await deleteComment(
        postId,
        commentId,
        token
      );

      setComments((prev) =>
        prev.filter(
          (comment) => comment._id !== commentId
        )
      );
    } catch (err) {
      console.error(err);

      setDeleteError((prev) => ({
        ...prev,
        [commentId]: "Failed to delete comment.",
      }));
    } finally {
      setDeletingCommentId(null);
    }
  };

  // =========================
  // RENDER
  // =========================

  if (loading) {
    return (
      <div className="py-4 text-sm text-gray-500">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="mt-4">
      {/* COMMENTS */}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            likeState={
              commentLikes[comment._id] || {
                liked: false,
                count: 0,
              }
            }
            onLike={() =>
              handleLikeComment(comment._id)
            }
            isEditing={
              editingCommentId === comment._id
            }
            editText={editText}
            onEditTextChange={setEditText}
            onStartEdit={() => startEdit(comment)}
            onCancelEdit={cancelEdit}
            onEditSubmit={(e) =>
              handleEditSubmit(e, comment._id)
            }
            submittingEdit={submittingEdit}
            editError={editError}
            deleteError={
              deleteError[comment._id]
            }
            onDelete={() =>
              handleDeleteComment(comment._id)
            }
            isDeleting={
              deletingCommentId === comment._id
            }
            onReply={() =>
              toggleReplyForm(comment._id)
            }
            isReplying={
              replyingTo === comment._id
            }
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onReplySubmit={(e) =>
              handleReplySubmit(e, comment._id)
            }
            submittingReply={submittingReply}
            replies={
              replies[comment._id] || []
            }
            repliesVisible={
              !!visibleReplies[comment._id]
            }
            onToggleReplies={() =>
              toggleViewReplies(comment._id)
            }
            loadingReplies={
              !!loadingReplies[comment._id]
            }
            repliesError={
              repliesError[comment._id] || ""
            }
          />
        ))}
      </div>

      {/* MAIN ERROR */}

      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* COMMENT FORM */}

      <CommentForm
        content={content}
        onContentChange={setContent}
        image={image}
        onImageChange={setImage}
        imagePreview={imagePreview}
        onImagePreviewChange={setImagePreview}
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </div>
  );
}