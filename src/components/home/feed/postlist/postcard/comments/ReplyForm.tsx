import type { FormEvent } from "react";
import type { Reply } from "../../../../../services/commentService";
interface ReplyFormProps {
  replyText: string;
  onReplyTextChange: (value: string) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
  submitting: boolean;
}

export default function ReplyForm({
  replyText,
  onReplyTextChange,
  onSubmit,
  submitting,
}: ReplyFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-2 flex items-center gap-2"
    >
      <input
        type="text"
        value={replyText}
        onChange={(e) =>
          onReplyTextChange(e.target.value)
        }
        placeholder="Write a reply..."
        className="flex-1 border rounded-full px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={
          submitting || !replyText.trim()
        }
        className="text-blue-500 text-sm"
      >
        {submitting ? "Posting..." : "Reply"}
      </button>
    </form>
  );
}