<template>
  <div>
    <section align="right">
      <q-btn
        class="bg-grey"
        round
        color="black"
        icon="mdi-bell-outline"
        @click="pushToNofications"
      />
    </section>
    Index Page
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();

const pushToNofications = () => {
  router.push("/notifications");
};
</script>

<style></style>
