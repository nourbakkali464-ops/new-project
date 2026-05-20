import { createRouter, createWebHistory } from "vue-router";

import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;