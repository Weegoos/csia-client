<template>
  <div>
    <section class="q-my-md">
      <q-btn icon="mdi-arrow-left" @click="pushToProfile" />
      <p class="q-pa-md text-h5 text-bold">Account</p>
    </section>
    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm"
    >
      <div class="text-h5 q-pa-md">Account type</div>
      <div>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                name="mdi-leaf"
              />
            </q-item-section>
            <q-item-section color="white">
              <q-item-label>Account type</q-item-label>
              <q-item-label caption>Standard</q-item-label>
            </q-item-section>

            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <q-btn
      style="width: 100%"
      class="q-mt-sm text-black"
      rounded
      no-caps
      color="red-4"
      label="Delete account and all data"
      @click="onClick"
    />
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
