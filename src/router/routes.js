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
    path: "/notify-settings",
    component: () => import("components/notification/NotificationSettings.vue"),
  },
  {
    path: "/profile-settings",
    component: () => import("components/profile/SettingsPageForProfile.vue"),
  },
  {
    path: "/create-plant",
    component: () => import("src/components/plants/ViewPlant.vue"),
  },
  {
    path: "/chatbot",
    component: () => import("pages/ChatBot.vue"),
  },
  {
    path: "/guide",
    component: () => import("pages/GuidePage.vue"),
  },
  {
    path: "/add-plant",
    component: () => import("components/plants/CreatePlant.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
