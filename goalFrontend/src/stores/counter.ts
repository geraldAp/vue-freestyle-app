import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { verifyAndRefreshAccessToken } from "@/utils/helpers";
import router from "@/router";
import type { UserInfo } from "@/types/types";

function getUserData(): UserInfo | null {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? (JSON.parse(userDataString) as UserInfo) : null;
}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: "" as string,
    goalId: "" as string,

    token: (localStorage.getItem("access") as string) || ("" as string),
    userInfo: getUserData() || {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUserId(id: string) {
      this.userId = id;
    },
    setUserInfo(userData: UserInfo) {
      this.userInfo = { ...userData };
    },
    setGoalId(id: string) {
      this.goalId = id;
    },
    setToken(token: string) {
      this.token = token;
    },
    clearAuth() {
      this.userId = "";
      this.goalId = "";
      this.token = "";
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      router.push({ name: "login" });
    },
    async verifyAndRefreshToken() {
      try {
        if (this.token) {
          const validToken = await verifyAndRefreshAccessToken(this.token);
          this.setToken(validToken);
        }
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },
  },
});

export const useCompletionStore = defineStore("completion", () => {
  const goalComplete = ref(false);
  function setGoalCompletion(completionStatus: boolean) {
    goalComplete.value = completionStatus;
  }
  return { goalComplete, setGoalCompletion };
});
