import axios from "axios";
import type { UserProfileResponse } from "../../types/user";

const baseUrl =
  "https://route-posts.routemisr.com";

export const getUserProfile = async (
  userId: string,
  token: string
): Promise<UserProfileResponse> => {
  const response = await axios.get(
    `${baseUrl}/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(
    "🔥 RAW API RESPONSE:",
    response.data
  );

  return response.data.data;
};