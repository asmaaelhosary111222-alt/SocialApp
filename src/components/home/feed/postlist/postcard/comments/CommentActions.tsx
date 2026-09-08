interface CommentActionsProps {
  liked: boolean;
  likesCount: number;

  onLike: () => void;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;

  isEditing: boolean;
  isDeleting: boolean;

  repliesCount: number;
  repliesVisible: boolean;
  onToggleReplies: () => void;
}

export default function CommentActions({
  liked,
  likesCount,
  onLike,
  onReply,
  onEdit,
  onDelete,
  isEditing,
  isDeleting,
  repliesCount,
  repliesVisible,
  onToggleReplies,
}: CommentActionsProps) {
  return (
    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
      {/* LIKE */}

      <button
        type="button"
        onClick={onLike}
        className={liked ? "text-blue-500" : ""}
      >
        Like {likesCount > 0 && `(${likesCount})`}
      </button>

      {/* REPLY */}

      <button
        type="button"
        onClick={onReply}
      >
        Reply
      </button>

      {/* EDIT */}

      {!isEditing && (
        <button
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
      )}

      {/* DELETE */}

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="text-red-500"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {/* VIEW REPLIES */}

      {repliesCount > 0 && (
        <button
          type="button"
          onClick={onToggleReplies}
        >
          {repliesVisible
            ? "Hide replies"
            : `View ${repliesCount} ${
                repliesCount === 1
                  ? "reply"
                  : "replies"
              }`}
        </button>
      )}
    </div>
  );
}