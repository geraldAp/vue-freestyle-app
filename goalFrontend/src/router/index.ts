import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";

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
    },
    {
      path: "/goal/:id",
      name: "goal",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/goal/Goal.vue"),
    },
  ],
});

export default router;
