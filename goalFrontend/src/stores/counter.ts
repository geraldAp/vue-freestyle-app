import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: "" as string,
    goalId: "" as string,
    token: "" as string,
  }),

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
  },
});
