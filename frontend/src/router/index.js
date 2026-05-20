import { createRouter, createWebHistory } from "vue-router";

import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";

const routes = [
  {
    path: "/",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
  path: "/admin",
  name: "admin",
  component: AdminDashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;