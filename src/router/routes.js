const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    // children: [
    //   { path: '', component: () => import('pages/IndexPage.vue') }
    // ]
  },
  {
    path: "/profile",
    component: () => import("pages/ProfilePage.vue"),
  },
  {
    path: "/plants",
    component: () => import("pages/PlantsPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
