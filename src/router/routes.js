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
  {
    path: "/registration",
    component: () => import("pages/RegistrationPage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/notifications",
    component: () => import("pages/NotificationPage.vue"),
  },
  {
    path: "/settings",
    component: () => import("pages/SettingsPage.vue"),
  },
  {
    path: "/notify-settings",
    component: () => import("components/notification/NotificationSettings.vue"),
  },
  {
    path: "/create-plant",
    component: () => import("components/plants/CreatePlants.vue"),
  },
  {
    path: "/chatbot",
    component: () => import("pages/ChatBot.vue"),
  },
  {
    path: "/guide",
    component: () => import("pages/GuidePage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
