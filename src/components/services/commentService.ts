// src/services/commentService.ts

import axios from "axios";

const baseUrl = "https://route-posts.routemisr.com";

// =========================
// COMMENT TYPE
// =========================

export interface Comment {
  _id: string;
  content: string;
  image?: string;

  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };

  createdAt: string;
  repliesCount: number;
  likes: string[];
  likesCount: number;
}

// =========================
// REPLY TYPE
// =========================

export interface Reply {
  _id: string;
  content: string;

  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };

  post: string;
  parentComment: string;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
}

// =========================
// GET COMMENTS
// =========================

export const getPostComments = async (
  postId: string,
  token: string
): Promise<Comment[]> => {
  const response = await axios.get(
    `${baseUrl}/posts/${postId}/comments?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.comments;
};

// =========================
// CREATE COMMENT
// =========================

export const createComment = async (
  postId: string,
  content: string,
  token: string,
  image?: File
): Promise<any> => {
  const formData = new FormData();

  formData.append("content", content);

  if (image) {
    formData.append("image", image);
  }

  const response = await axios.post(
    `${baseUrl}/posts/${postId}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =========================
// LIKE / UNLIKE COMMENT
// =========================

export const likeComment = async (
  postId: string,
  commentId: string,
  token: string
): Promise<any> => {
  const response = await axios.put(
    `${baseUrl}/posts/${postId}/comments/${commentId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =========================
// GET REPLIES
// =========================

export const getCommentReplies = async (
  postId: string,
  commentId: string,
  token: string
): Promise<Reply[]> => {
  const response = await axios.get(
    `${baseUrl}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.replies;
};

// =========================
// CREATE REPLY
// =========================

export const createReply = async (
  postId: string,
  commentId: string,
  content: string,
  token: string
): Promise<any> => {
  const formData = new FormData();

  formData.append("content", content);

  const response = await axios.post(
    `${baseUrl}/posts/${postId}/comments/${commentId}/replies`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =========================
// EDIT COMMENT
// =========================

export const editComment = async (
  postId: string,
  commentId: string,
  content: string,
  token: string
): Promise<any> => {
  const response = await axios.put(
    `${baseUrl}/posts/${postId}/comments/${commentId}`,
    {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =========================
// DELETE COMMENT
// =========================

export const deleteComment = async (
  postId: string,
  commentId: string,
  token: string
): Promise<any> => {
  const response = await axios.delete(
    `${baseUrl}/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};