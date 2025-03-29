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
    <p class="text-h5 text-bold">Good day</p>
    <span class="text-body1">Your plants are so glad you are here.</span>
    <section
      class="q-pa-sm q-my-md"
      style="background-color: #30322e; border-radius: 8px"
    >
      <p class="text-body2 text-bold">Add your first plant</p>
      <p>
        Planta will then create a care schedule for it to make sure it thrives
      </p>
    </section>
    <q-btn
      color="green-4 q-mt-md"
      rounded
      style="width: 100%"
      label="Add plant"
      no-caps
      @click="addPlant"
    />
    <q-btn
      class="absolute-bottom-right q-ma-md"
      style="background-color: #30322e"
      round
      icon="search"
      @click="onClick"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();

const pushToNofications = () => {
  router.push("/notifications");
};

const addPlant = () => {
  router.push("/create-plant");
};
</script>

<style></style>
