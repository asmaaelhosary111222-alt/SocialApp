import axios from "axios";

import type {
  UserSuggestion,
  UserProfile,
} from "../../types/user";
// library to help u send requests to an api 
const BASE_URL = "https://route-posts.routemisr.com";
// storu=ing the backend main address in a const
// a function called signin that receives two things the login and pass 
export function signin(login: string, password: string) {

  // send a post request to the signin endepoint {sending data to the backend}
  return axios.post(`${BASE_URL}/users/signin`, {
    email: login,
    password: password,
  });
}

export function signup(data: {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  rePassword: string;
}) {
  return axios.post(`${BASE_URL}/users/signup`, data);
}

export function getProfileData(token: string) {
  return axios.get<{ data: { user: UserProfile } }>(
    `${BASE_URL}/users/profile-data`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export function getSuggestions(
  token: string,
  page: number = 1,
  limit: number = 10
) {
  return axios.get<{ data: { suggestions: UserSuggestion[] } }>(
    `${BASE_URL}/users/suggestions?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export function changePassword(
  password: string,
  newPassword: string,
  token: string
) {
  return axios.patch(
    `${BASE_URL}/users/change-password`,
    {
      password,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
export function uploadPhoto(
  photo: File,
  token: string
) {
  const formData = new FormData();

  formData.append("photo", photo);

  return axios.put(
    `${BASE_URL}/users/upload-photo`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}