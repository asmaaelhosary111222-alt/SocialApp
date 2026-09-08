import type { FormEvent } from "react";
import type {
  Comment,
  Reply,
} from "../../../../../services/commentService";
import CommentActions from "./CommentActions";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";

interface CommentItemProps {
  comment: Comment;

  likeState: {
    liked: boolean;
    count: number;
  };

  onLike: () => void;

  isEditing: boolean;
  editText: string;
  onEditTextChange: (value: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEditSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  submittingEdit: boolean;
  editError: string;

  deleteError?: string;
  onDelete: () => void;
  isDeleting: boolean;

  onReply: () => void;
  isReplying: boolean;
  replyText: string;
  onReplyTextChange: (value: string) => void;
  onReplySubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  submittingReply: boolean;

  replies: Reply[];
  repliesVisible: boolean;
  onToggleReplies: () => void;
  loadingReplies: boolean;
  repliesError: string;
}

export default function CommentItem({
  comment,
  likeState,
  onLike,
  isEditing,
  editText,
  onEditTextChange,
  onStartEdit,
  onCancelEdit,
  onEditSubmit,
  submittingEdit,
  editError,
  deleteError,
  onDelete,
  isDeleting,
  onReply,
  isReplying,
  replyText,
  onReplyTextChange,
  onReplySubmit,
  submittingReply,
  replies,
  repliesVisible,
  onToggleReplies,
  loadingReplies,
  repliesError,
}: CommentItemProps) {
  return (
    <div className="flex items-start gap-2">
      {/* AVATAR */}

      <img
        src={comment.commentCreator.photo}
        alt={comment.commentCreator.name}
        className="w-8 h-8 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* COMMENT BODY */}

        <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
          <span className="font-semibold">
            {comment.commentCreator.name}
          </span>

          {/* EDIT MODE */}

          {isEditing ? (
            <form
              onSubmit={onEditSubmit}
              className="mt-2"
            >
              <input
                type="text"
                value={editText}
                onChange={(e) =>
                  onEditTextChange(e.target.value)
                }
                className="w-full border rounded-md px-2 py-1"
                autoFocus
              />

              {editError && (
                <p className="text-red-500 text-xs mt-1">
                  {editError}
                </p>
              )}

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={submittingEdit}
                  className="text-blue-500"
                >
                  {submittingEdit
                    ? "Saving..."
                    : "Save"}
                </button>

                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="text-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-1">
              {comment.content}
            </p>
          )}

          {/* COMMENT IMAGE */}

          {comment.image && (
            <img
              src={comment.image}
              alt="Comment attachment"
              className="mt-2 max-h-60 rounded-lg object-cover"
            />
          )}
        </div>

        {/* DELETE ERROR */}

        {deleteError && (
          <p className="text-red-500 text-xs mt-1">
            {deleteError}
          </p>
        )}

        {/* ACTIONS */}

        <CommentActions
          liked={likeState.liked}
          likesCount={likeState.count}
          onLike={onLike}
          onReply={onReply}
          onEdit={onStartEdit}
          onDelete={onDelete}
          isEditing={isEditing}
          isDeleting={isDeleting}
          repliesCount={comment.repliesCount}
          repliesVisible={repliesVisible}
          onToggleReplies={onToggleReplies}
        />

        {/* REPLY FORM */}

        {isReplying && (
          <ReplyForm
            replyText={replyText}
            onReplyTextChange={onReplyTextChange}
            onSubmit={onReplySubmit}
            submitting={submittingReply}
          />
        )}

        {/* REPLIES */}

        {repliesVisible && (
          <div className="ml-6 mt-3 space-y-3">
            {loadingReplies && (
              <p className="text-xs text-gray-500">
                Loading replies...
              </p>
            )}

            {repliesError && (
              <p className="text-xs text-red-500">
                {repliesError}
              </p>
            )}

            {replies.map((reply) => (
              <ReplyItem
                key={reply._id}
                reply={reply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}