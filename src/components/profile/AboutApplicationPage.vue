<template>
  <div>
    <section class="q-my-md">
      <q-btn icon="mdi-arrow-left" @click="pushToProfile" />
      <p class="q-pa-md text-h5 text-bold">About Application</p>
    </section>

    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm"
    >
      <div class="text-h5 q-pa-md">Application Information</div>
      <div>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                name="mdi-information"
              />
            </q-item-section>
            <q-item-section color="white">
              <q-item-label>App Name</q-item-label>
              <q-item-label caption style="color: white"
                >This application is designed to provide a seamless experience
                for organizing and managing sports tournaments across
                Kazakhstan. Whether you are a participant or an organizer, our
                platform offers features to simplify coordination, scheduling,
                and communication.</q-item-label
              >
            </q-item-section>

            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="blue-4"
                name="mdi-account-group"
              />
            </q-item-section>
            <q-item-section color="white">
              <q-item-label>Who is it for?</q-item-label>
              <q-item-label caption style="color: white"
                >Our app is perfect for athletes, coaches, organizers, and
                anyone interested in competitive sports. Users can browse
                tournaments, join events, and stay updated with real-time
                notifications.</q-item-label
              >
            </q-item-section>

            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="orange-4"
                name="mdi-update"
              />
            </q-item-section>
            <q-item-section color="white">
              <q-item-label>Latest Update</q-item-label>
              <q-item-label caption style="color: white"
                >The latest version introduces improved performance, new
                filtering options for tournaments, and enhanced security
                features to protect user data.</q-item-label
              >
            </q-item-section>

            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const pushToProfile = () => {
  router.push("/profile-settings");
};
</script>

<style></style>
