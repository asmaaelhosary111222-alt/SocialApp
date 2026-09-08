// import { useEffect, useState } from "react";
// import {
//   getPostComments,
//   createComment,
//   getCommentReplies,
//   createReply,
//   likeComment,
//   editComment,
//   deleteComment,
//   type Comment,
//   type Reply,
// } from "../../../../services/postService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";

// interface CommentSectionProps {
//   postId: string;
// }

// export default function CommentSection({ postId }: CommentSectionProps) {
//   const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
// const [deleteError, setDeleteError] = useState<Record<string, string>>({});
//   const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
// const [editText, setEditText] = useState("");
// const [submittingEdit, setSubmittingEdit] = useState(false);
// const [editError, setEditError] = useState("");
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
// const [commentLikes, setCommentLikes] = useState<Record<string, { liked: boolean; count: number }>>({});
//   const [replies, setReplies] = useState<Record<string, Reply[]>>({});
//   const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>({});
//   const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>({});
//   const [repliesError, setRepliesError] = useState<Record<string, string>>({});

//   const [replyingTo, setReplyingTo] = useState<string | null>(null);
//   const [replyText, setReplyText] = useState("");
//   const [submittingReply, setSubmittingReply] = useState(false);

//   const fetchComments = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const data = await getPostComments(postId, token);
//     setComments(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

// useEffect(() => {
//   const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
//   const initial: Record<string, { liked: boolean; count: number }> = {};

//   comments.forEach((comment) => {
//     initial[comment._id] = {
//       liked: comment.likes?.includes(currentUser._id) ?? false,
//       count: comment.likesCount ?? 0,
//     };
//   });

//   setCommentLikes(initial);
// }, [comments]);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token || !content.trim()) return;

//     setError("");
//     setSubmitting(true);

//     try {
//       await createComment(postId, content, token, image ?? undefined);

//       setContent("");
//       setImage(null);
//       setImagePreview(null);

//       await fetchComments();
//     } catch (error) {
//       console.error(error);
//       setError("Failed to post comment. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const fetchReplies = async (commentId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
//     setRepliesError((prev) => ({ ...prev, [commentId]: "" }));

//     try {
//       const data = await getCommentReplies(postId, commentId, token);
//       setReplies((prev) => ({ ...prev, [commentId]: data }));
//     } catch (error) {
//       console.error(error);
//       setRepliesError((prev) => ({
//         ...prev,
//         [commentId]: "Failed to load replies.",
//       }));
//     } finally {
//       setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
//     }
//   };

//   const toggleViewReplies = async (commentId: string) => {
//     const isCurrentlyVisible = visibleReplies[commentId];

//     if (isCurrentlyVisible) {
//       setVisibleReplies((prev) => ({ ...prev, [commentId]: false }));
//       return;
//     }

//     if (!replies[commentId]) {
//       await fetchReplies(commentId);
//     }

//     setVisibleReplies((prev) => ({ ...prev, [commentId]: true }));
//   };

//   const toggleReplyForm = (commentId: string) => {
//     if (replyingTo === commentId) {
//       setReplyingTo(null);
//       setReplyText("");
//     } else {
//       setReplyingTo(commentId);
//       setReplyText("");
//     }
//   };

//   const handleReplySubmit = async (e: React.FormEvent, commentId: string) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token || !replyText.trim()) return;

//     setSubmittingReply(true);

//     try {
//       await createReply(postId, commentId, replyText, token);

//       setReplyText("");
//       setReplyingTo(null);

//       await fetchReplies(commentId);
//       setVisibleReplies((prev) => ({ ...prev, [commentId]: true }));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmittingReply(false);
//     }
//   };
//   const handleLikeComment = async (commentId: string) => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   const current = commentLikes[commentId] || { liked: false, count: 0 };
//   const optimistic = {
//     liked: !current.liked,
//     count: current.liked ? current.count - 1 : current.count + 1,
//   };

//   setCommentLikes((prev) => ({ ...prev, [commentId]: optimistic }));

//   try {
//     await likeComment(postId, commentId, token);
//   } catch (error) {
//     console.error(error);
//     setCommentLikes((prev) => ({ ...prev, [commentId]: current }));
//   }
// };

// const startEdit = (comment: Comment) => {
//   setEditingCommentId(comment._id);
//   setEditText(comment.content);
//   setEditError("");
// };

// const cancelEdit = () => {
//   setEditingCommentId(null);
//   setEditText("");
//   setEditError("");
// };

// const handleEditSubmit = async (e: React.FormEvent, commentId: string) => {
//   e.preventDefault();

//   const token = localStorage.getItem("token");
//   if (!token || !editText.trim()) return;

//   setSubmittingEdit(true);
//   setEditError("");

//   try {
//     await editComment(postId, commentId, editText, token);

//     setComments((prev) =>
//       prev.map((c) => (c._id === commentId ? { ...c, content: editText } : c))
//     );

//     setEditingCommentId(null);
//     setEditText("");
//   } catch (error) {
//     console.error(error);
//     setEditError("Failed to save changes.");
//   } finally {
//     setSubmittingEdit(false);
//   }
// };
// const handleDeleteComment = async (commentId: string) => {
//   const confirmed = window.confirm("Delete this comment?");
//   if (!confirmed) return;

//   const token = localStorage.getItem("token");
//   if (!token) return;

//   setDeletingCommentId(commentId);
//   setDeleteError((prev) => ({ ...prev, [commentId]: "" }));

//   try {
//     await deleteComment(postId, commentId, token);
//     setComments((prev) => prev.filter((c) => c._id !== commentId));
//   } catch (error) {
//     console.error(error);
//     setDeleteError((prev) => ({
//       ...prev,
//       [commentId]: "Failed to delete comment.",
//     }));
//   } finally {
//     setDeletingCommentId(null);
//   }
// };

//   if (loading) {
//     return <div className="text-xs text-gray-400 mt-3">Loading comments...</div>;
//   }

//   return (
//     <div className="mt-3 pt-3 border-t space-y-2">
//       {comments.map((comment) => (
//         <div key={comment._id} className="flex items-start gap-2">
//           <img
//             src={comment.commentCreator.photo}
//             alt={comment.commentCreator.name}
//             className="w-7 h-7 rounded-full object-cover"
//           />

//           <div className="flex-1">
//             <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
//               <span className="font-semibold">{comment.commentCreator.name}</span>

//               {editingCommentId === comment._id ? (
//                 <form onSubmit={(e) => handleEditSubmit(e, comment._id)} className="mt-1">
//                   <input
//                     type="text"
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="w-full border rounded-full px-3 py-1 text-sm outline-none"
//                   />
//                   {editError && <p className="text-xs text-red-500 mt-1">{editError}</p>}
//                   <div className="flex gap-3 mt-1 text-xs">
//                     <button
//                       type="submit"
//                       disabled={submittingEdit || !editText.trim()}
//                       className="text-blue-600 font-semibold disabled:text-gray-300"
//                     >
//                       Save
//                     </button>
//                     <button type="button" onClick={cancelEdit} className="text-gray-500">
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <p className="text-gray-600">{comment.content}</p>
//               )}

//               {comment.image && (
//                 <img
//                   src={comment.image}
//                   alt="Comment attachment"
//                   className="mt-2 max-w-xs max-h-60 rounded-lg object-cover"
//                 />
//               )}
//             </div>

//             {deleteError[comment._id] && (
//               <p className="text-xs text-red-500 mt-1">{deleteError[comment._id]}</p>
//             )}

//             <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
//               <span
//                 onClick={() => handleLikeComment(comment._id)}
//                 className={`cursor-pointer ${
//                   commentLikes[comment._id]?.liked
//                     ? "text-indigo-600 font-semibold"
//                     : "hover:text-indigo-600"
//                 }`}
//               >
//                 Like{commentLikes[comment._id]?.count > 0 ? ` (${commentLikes[comment._id].count})` : ""}
//               </span>

//               <span
//                 onClick={() => toggleReplyForm(comment._id)}
//                 className="cursor-pointer hover:text-indigo-600"
//               >
//                 Reply
//               </span>

//               {editingCommentId !== comment._id && (
//                <span
//                   onClick={() => startEdit(comment)}
//                   className="cursor-pointer text-yellow-600 hover:text-yellow-700"
//                 >
//                   Edit
//                 </span>
//               )}

//               <span
//                 onClick={() => handleDeleteComment(comment._id)}
//                 className="cursor-pointer text-red-600 hover:text-red-700"
//               >
//                 {deletingCommentId === comment._id ? "Deleting..." : "Delete"}
//               </span>

//               {comment.repliesCount > 0 && (
//                 <span
//                   onClick={() => toggleViewReplies(comment._id)}
//                   className="cursor-pointer hover:text-indigo-600"
//                 >
//                   {visibleReplies[comment._id]
//                     ? "Hide replies"
//                     : `View ${comment.repliesCount} ${
//                         comment.repliesCount === 1 ? "reply" : "replies"
//                       }`}
//                 </span>
//               )}
//             </div>

//             {replyingTo === comment._id && (
//               <form
//                 onSubmit={(e) => handleReplySubmit(e, comment._id)}
//                 className="mt-2 flex items-center gap-2"
//               >
//                 <input
//                   type="text"
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                   placeholder="Write a reply..."
//                   className="flex-1 border rounded-full px-3 py-1 text-xs outline-none"
//                 />
//                 <button
//                   type="submit"
//                   disabled={submittingReply || !replyText.trim()}
//                   className="text-xs text-blue-600 font-semibold disabled:text-gray-300"
//                 >
//                   Reply
//                 </button>
//               </form>
//             )}

//             {visibleReplies[comment._id] && (
//               <div className="mt-2 space-y-2">
//                 {loadingReplies[comment._id] && (
//                   <div className="text-xs text-gray-400">Loading replies...</div>
//                 )}

//                 {repliesError[comment._id] && (
//                   <div className="text-xs text-red-500">
//                     {repliesError[comment._id]}
//                   </div>
//                 )}

//                 {!loadingReplies[comment._id] &&
//                   (replies[comment._id] || []).map((reply) => (
//                     <div key={reply._id} className="flex items-start gap-2">
//                       <img
//                         src={reply.commentCreator.photo}
//                         alt={reply.commentCreator.name}
//                         className="w-6 h-6 rounded-full object-cover"
//                       />
//                       <div className="bg-gray-100 rounded-lg px-3 py-1.5 text-xs">
//                         <span className="font-semibold">{reply.commentCreator.name}</span>
//                         <span className="text-gray-400 ml-1">
//                           @{reply.commentCreator.username}
//                         </span>
//                         <p className="text-gray-600">{reply.content}</p>
//                         <span className="text-gray-400">
//                           {new Date(reply.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {error && <p className="text-sm text-red-500">{error}</p>}

//       {imagePreview && (
//         <div className="relative w-20 h-20">
//           <img
//             src={imagePreview}
//             alt="Selected"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write a comment..."
//           className="flex-1 border rounded-full px-3 py-1.5 text-sm outline-none"
//         />

//         <label className="cursor-pointer text-gray-500 hover:text-indigo-600">
//           <FontAwesomeIcon icon={faImage} />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0] ?? null;
//               setImage(file);
//               setImagePreview(file ? URL.createObjectURL(file) : null);
//             }}
//             className="hidden"
//           />
//         </label>

//         <button
//           type="submit"
//           disabled={submitting || !content.trim()}
//           className="text-sm text-blue-600 font-semibold disabled:text-gray-300"
//         >
//           Post
//         </button>
//       </form>
//     </div>
//   );
// }