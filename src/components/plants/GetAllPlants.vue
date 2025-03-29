<template>
  <div class="text-white">
    <q-intersection transition="flip-right" class="example-item">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="(plant, index) in allPlants.content"
          :key="index"
        >
          <q-item-section avatar>
            <q-icon color="green-4" name="mdi-leaf" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-bold">{{
              plant.name
            }}</q-item-label>
            <q-item-label class="text-white" caption lines="2">{{
              plant.temperatures.sentence
            }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="mdi-arrow-right" color="white" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-intersection>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const allPlants = ref([]);

const getAllPlants = async () => {
  await getMethod(
    serverURL,
    `plant/allPlants?page=0&size=10`,
    allPlants,
    $q,
    "Error: "
  );
};

onMounted(() => {
  getAllPlants();
});
</script>

<style></style>
