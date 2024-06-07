import axios from "axios";
import { verifyAndRefreshAccessToken } from "@/utils/helpers";
import { useAuthStore } from "@/stores/counter";
import router from "@/router";
const authFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

authFetch.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
authFetch.defaults.headers.common["Content-Type"] = "application/json";
authFetch.defaults.headers.common["Accept"] = "application/json";

authFetch.interceptors.request.use(
  async (request) => {
    try {
      const authStore = useAuthStore();
      let accessToken = authStore.token;
      if (accessToken) {
        console.log("verifying access token ");
        accessToken = await verifyAndRefreshAccessToken(accessToken);
        authStore.setToken(accessToken);
        if (request && request.headers) {
          request.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      } else {
        await router.push({ name: "login" });
        console.error("Access token not found in localStorage");
        throw new Error("Access token not found");
      }

      return request;
    } catch (error: any) {
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
  async (error) => {
    const authStore = useAuthStore();
    console.log("Response error:", error.response);
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access - possibly due to expired token");
      // Attempt to refresh the token
      try {
        const newAccessToken = await verifyAndRefreshAccessToken(
          authStore.token
        );
        authStore.setToken(newAccessToken);

        // Retry the original request with the new token
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authFetch(originalRequest);
      } catch (refreshError) {
        authStore.clearAuth();
        await router.push({ name: "login" });
        return Promise.reject(refreshError);
      }
    }
  }
);

export default authFetch;
