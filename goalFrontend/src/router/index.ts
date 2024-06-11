import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import { useAuthStore } from "@/stores/counter";
import NotFound404 from '@/views/404/NotFound404.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/auth/SignUp.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
      props: route => ({ status: route.query.status || 'all' })
    },
    {
      path: "/goal/:id",
      name: "goal",
      component: () => import("../views/goal/Goal.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*", // Catch-all route for undefined paths
      name: "not-found",
      component: NotFound404
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    try {
      await authStore.verifyAndRefreshToken();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else if ((to.name === "login" || to.name === "sign-up") && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
