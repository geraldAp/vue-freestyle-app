import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { verifyAndRefreshAccessToken } from "@/utils/helpers";
import router from "@/router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: "" as string,
    goalId: "" as string,
    token: localStorage.getItem("access") as string || "" as string,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUserId(id: string) {
      this.userId = id;
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
      router.push({ name: "login" })
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
