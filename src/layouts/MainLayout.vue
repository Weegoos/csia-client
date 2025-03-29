<template>
  <div>
    <q-layout view="hHr LpR lFf" container style="height: 100vh">
      <q-header reveal elevated class="bg-black">
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title> Planta </q-toolbar-title>
          <q-btn
            round
            dense
            icon="notifications"
            color="green-4"
            class="q-mr-xs"
          />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
      <q-footer
        reveal
        elevated
        style="background-color: #30222e"
        align="center"
      >
        <q-toolbar
          class="text-white justify-center"
          style="background-color: #30222e"
        >
          <div class="row q-gutter-xl q-pa-sm justify-center items-center">
            <div
              class="col-auto"
              v-for="(button, index) in navigationButton"
              :key="index"
              @click="navigateTo(button.link)"
            >
              <q-btn
                :color="fullPath === button.link ? 'green-4' : ''"
                round
                :icon="button.icon"
                class="q-mr-xs"
                :class="fullPath === button.link ? 'text-white' : 'text-green'"
              />
            </div>
          </div>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// global variables
const router = useRouter();
const route = useRoute();

const navigationButton = [
  {
    icon: "mdi-home-outline",
    link: "/",
  },
  {
    icon: "mdi-leaf",
    link: "/plants",
  },
  {
    icon: "eva-person-outline",
    link: "/profile",
  },
];

const fullPath = ref(route.fullPath);

watch(
  () => route.fullPath,
  (newPath) => {
    fullPath.value = newPath;
  }
);
const navigateTo = (link) => {
  router.push(link);
};
</script>

<style></style>
