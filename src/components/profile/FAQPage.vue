<template>
  <div>
    <section class="q-my-md">
      <q-btn icon="mdi-arrow-left" @click="pushToProfile" />
      <p class="q-pa-md text-h5 text-bold">FAQ</p>
    </section>

    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-md"
    >
      <div class="text-h5 q-mb-md">Frequently Asked Questions</div>
      <q-list>
        <q-expansion-item
          v-for="(faq, index) in faqs"
          :key="index"
          expand-icon="mdi-chevron-down"
          icon="mdi-help-circle-outline"
          :label="faq.question"
          header-class="text-white"
          class="bg-grey-9 text-white q-mb-sm"
        >
          <div class="q-pa-sm">{{ faq.answer }}</div>
        </q-expansion-item>
      </q-list>
    </section>

    <q-btn
      style="width: 100%"
      class="q-mt-md text-black"
      rounded
      no-caps
      color="green-4"
      label="Contact Support"
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

const faqs = [
  {
    question: "How can I change my account type?",
    answer:
      "Currently, changing your account type is not supported. Please contact support for more details.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can delete your account by clicking the 'Delete account and all data' button at the bottom of the page. This action is irreversible.",
  },
  {
    question: "Where can I update my phone number or email?",
    answer:
      "To update your contact details, please go to your profile settings and edit your information.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we follow industry-standard practices to protect your data. If you have concerns, feel free to reach out to our support team.",
  },
  {
    question: "Can I recover my deleted account?",
    answer:
      "Unfortunately, once an account is deleted, all associated data is permanently removed and cannot be recovered.",
  },
  {
    question: "How do I report a bug or issue?",
    answer:
      "You can report bugs by contacting our support team via the 'Contact Support' button or sending us an email.",
  },
];
</script>

<style></style>
