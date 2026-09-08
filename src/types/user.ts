export interface User {
  _id: string;

  name: string;

  username: string;

  email: string;

  dateOfBirth: string;

  gender: string;

  photo: string;

  cover: string;

  followers: string[];

  following: string[];

  followersCount: number;

  followingCount: number;

  bookmarksCount: number;

  createdAt: string;

  id: string;
}


export interface UserProfileResponse {
  isFollowing: boolean;

  user: User;
}