// src/services/postService.ts

import axios from "axios";
import type { Post } from "../../types/post";

const baseUrl = "https://route-posts.routemisr.com";

// =========================
// GET ALL POSTS
// =========================

export const getAllPosts = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<Post[]> => {
  const response = await axios.get(
    `${baseUrl}/posts?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.posts;
};

// =========================
// LIKE / UNLIKE POST
// =========================

export const likePost = async (
  postId: string,
  token: string
) => {
  const response = await axios.put(
    `${baseUrl}/posts/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

// =========================
// GET USER POSTS
// =========================

export function getUserPosts(
  userId: string,
  token: string
) {
  return axios.get(
    `${baseUrl}/users/${userId}/posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// CREATE POST
// =========================

export function createPost(
  body: string,
  privacy: string,
  token: string,
  image?: File
) {
  const formData = new FormData();

  formData.append("body", body);
  formData.append("privacy", privacy);

  if (image) {
    formData.append("image", image);
  }

  return axios.post(
    `${baseUrl}/posts`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// UPDATE POST
// =========================

export function updatePost(
  postId: string,
  body: string,
  token: string,
  image?: File
) {
  const formData = new FormData();

  formData.append("body", body);

  if (image) {
    formData.append("image", image);
  }

  return axios.put(
    `${baseUrl}/posts/${postId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// DELETE POST
// =========================

export function deletePost(
  postId: string,
  token: string
) {
  return axios.delete(
    `${baseUrl}/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// BOOKMARK POST
// =========================

export function bookmarkPost(
  postId: string,
  token: string
) {
  return axios.put(
    `${baseUrl}/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// GET POST LIKES
// =========================

export function getPostLikes(
  postId: string,
  token: string,
  page: number = 1,
  limit: number = 20
) {
  return axios.get(
    `${baseUrl}/posts/${postId}/likes?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// SHARE POST
// =========================

export function sharePost(
  postId: string,
  body: string,
  token: string
) {
  return axios.post(
    `${baseUrl}/posts/${postId}/share`,
    {
      body,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// =========================
// GET HOME FEED
// =========================

export const getFeedPosts = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  posts: Post[];
  pagination: {
    currentPage: number;
    numberOfPages: number;
  };
}> => {
  const response = await axios.get(
    `${baseUrl}/posts/feed?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    posts: response.data.data.posts,
    pagination: response.data.meta.pagination,
  };
};