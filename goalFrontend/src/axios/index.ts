import axios from "axios";
import { verifyAndRefreshAccessToken } from "@/utils/helpers";

const authFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

authFetch.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
authFetch.defaults.headers.common["Content-Type"] = "application/json";
authFetch.defaults.headers.common["Accept"] = "application/json";

authFetch.interceptors.request.use(
  async (request) => {
    try {
      let accessToken = localStorage.getItem("access");

      if (accessToken) {
        console.log('verifying access token ')
        accessToken = JSON.parse(accessToken);
        accessToken = await verifyAndRefreshAccessToken(accessToken);

        if (request && request.headers) {
          request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      } else {
        console.error("Access token not found in localStorage");
        throw new Error("Access token not found");
      }

      return request;
    } catch (error:any) {
      console.error("Error in request interceptor:", error.message);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Response error:", error.response);
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access - possibly due to expired token");
    }
    return Promise.reject(error);
  }
);

export default authFetch;
