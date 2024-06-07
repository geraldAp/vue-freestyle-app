import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./actions";
import { useAuthStore } from "@/stores/counter";
export const verifyAndRefreshAccessToken = async (
  accessToken: string | null
): Promise<string> => {
  if (!accessToken) {
    throw new Error("No access token provided");
  }

  try {
    const decodedToken: any = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp >= currentTime) {
      const time = decodedToken.exp - currentTime;
      console.log("returning access token : ", time);
      return accessToken;
    } else {
      console.log("Token expired, attempting to refresh");
    }
  } catch (error) {
    console.error("Error decoding access token:", error);
    throw new Error("Invalid access token");
  }

  const refreshToken = localStorage.getItem("refresh") as string;
  console.log('The refresh token we are trying to get : ', refreshToken)
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  try {
    console.log('Refreshing access token')
    const refreshedAccessToken = await refreshAccessToken(
      refreshToken
    );
    localStorage.setItem("access", refreshedAccessToken);
    console.log("Returning Refreshed access token :", refreshAccessToken);
    return refreshedAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    throw new Error("Failed to refresh access token");
  }
};
