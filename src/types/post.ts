// src/types/post.ts

export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface TopComment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: PostUser;
  createdAt: string;
}

export interface Post {
  _id: string;
  body?: string;        // some posts have no text, only an image
  image?: string;        // some posts have no image, only text
  privacy: string;
  user: PostUser;
  likes: string[];        // array of user IDs who liked it
  likesCount: number;
  commentsCount: number;
  topComment: TopComment | null;
  sharesCount: number;
  createdAt: string;
  bookmarked: boolean;
}