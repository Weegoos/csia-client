<template>
  <div>
    <section class="q-my-md">
      <q-btn icon="mdi-arrow-left" @click="pushToProfile" />
      <p class="q-pa-md text-h5 text-bold">Contact Us</p>
    </section>
    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm"
    >
      <div class="text-h6">Why contact us?</div>
      <p class="q-mt-sm">
        If you have any questions, concerns, or suggestions, feel free to reach
        out. Our team is always here to help you with anything you might need
        regarding your account, settings, or other app features.
      </p>

      <p class="q-mt-sm">
        You can also use this form to report bugs or request new features. We
        highly value feedback from our users and strive to make your experience
        better every day.
      </p>

      <p class="q-mt-sm">
        Please be as detailed as possible so we can assist you faster and more
        efficiently. Thank you for helping us improve!
      </p>
    </section>
    <section
      class="q-mt-md q-pa-md"
      style="background-color: #30322e; border-radius: 7px"
    >
      <div class="text-h6">Data Deletion Policy</div>
      <p class="q-mt-sm">
        When you choose to delete your account, all personal information and
        associated data will be permanently removed from our system. This action
        is irreversible. If you are unsure, we recommend contacting our support
        team first.
      </p>
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
