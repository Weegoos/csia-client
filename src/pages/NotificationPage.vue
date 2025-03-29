<template>
  <div class="q-pa-md">
    <div>
      <section class="row">
        <div class="col" align="right">
          <q-btn icon="settings" round @click="pushToSettings" />
        </div>
      </section>
      <section>
        <p class="text-h6 text-bold">Inbox</p>
      </section>
      <section
        class="q-pa-sm"
        style="background-color: #30322e; border-radius: 8px"
      >
        <p class="text-body2 text-bold">No messages yet</p>
        <p>New messages will appear here</p>
      </section>
      <!-- <q-intersection
        v-for="index in 60"
        :key="index"
        transition="flip-right"
        class="example-item"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> Q </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Contact #{{ index }}</q-item-label>
            <q-item-label caption lines="1">some@email.com</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chat_bubble" color="green" />
          </q-item-section>
        </q-item>
      </q-intersection> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();

const pushToSettings = () => {
  router.push("/notify-settings");
};
</script>
