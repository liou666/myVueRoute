import Vue from "vue";

import VueRouter from "@/my-vue-router";
import { RouterOptions } from "@/my-vue-router/interface";

import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouterOptions> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "tab",
        name: "Tab",
        component: () => import("../views/Tab.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  //   mode: "hash",
  //   base: process.env.BASE_URL,
  routes,
});

export default router;
