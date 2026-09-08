import type { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface CommentFormProps {
  content: string;
  onContentChange: (value: string) => void;

  image: File | null;
  onImageChange: (file: File | null) => void;

  imagePreview: string | null;
  onImagePreviewChange: (
    preview: string | null
  ) => void;

  submitting: boolean;

  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
}

export default function CommentForm({
  content,
  onContentChange,
  image,
  onImageChange,
  imagePreview,
  onImagePreviewChange,
  submitting,
  onSubmit,
}: CommentFormProps) {
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onImageChange(file);

    const previewUrl =
      URL.createObjectURL(file);

    onImagePreviewChange(previewUrl);
  };

  return (
    <div className="mt-4">
      {/* IMAGE PREVIEW */}

      {imagePreview && (
        <div className="mb-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-40 rounded-lg object-cover"
          />
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={content}
          onChange={(e) =>
            onContentChange(e.target.value)
          }
          placeholder="Write a comment..."
          className="flex-1 border rounded-full px-4 py-2 text-sm"
        />

        {/* IMAGE UPLOAD */}

        <label className="cursor-pointer text-gray-500">
          <FontAwesomeIcon icon={faImage} />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* POST */}

        <button
          type="submit"
          disabled={
            submitting || !content.trim()
          }
          className="text-blue-500 font-medium"
        >
          {submitting ? "Posting..." : "Post"}
        </button>
      </form>

      {/* CURRENT FILE */}

      {image && (
        <p className="text-xs text-gray-400 mt-1">
          {image.name}
        </p>
      )}
    </div>
  );
}