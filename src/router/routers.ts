import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/views/layout/HomeLayout.vue"

const Routers: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomeLayout
  },
    {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/common/page-404.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login/LoginView.vue')
  }
];

export default Routers;