<template>
  <div class="text-white">
    <q-intersection transition="flip-right" class="example-item">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="(plant, index) in allPlants.content"
          :key="index"
          @click="openCreatePlant(plant)"
        >
          <q-item-section avatar>
            <q-icon color="green-4" name="mdi-leaf" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-bold">{{
              plant.name
            }}</q-item-label>
            <q-item-label class="text-white" caption lines="2">{{
              plant.characteristic.temperatures.sentence
            }}</q-item-label>
            <q-item-label class="text-white" caption lines="2">
              <q-btn
                color="green-4"
                dense
                flat
                no-caps
                :label="plant.difficulty"
              />
            </q-item-label>
          </q-item-section>
          <q-item-section side center>
            <q-icon name="mdi-arrow-right" color="white" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-intersection>
  </div>
</template>

<script setup>
import { LocalStorage, QBtn, useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";
import CreatePlant from "./CreatePlant.vue";
import { useRouter } from "vue-router";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const router = useRouter();

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

const openCreatePlant = (info) => {
  router.push("/add-plant");
  LocalStorage.set("plantInfo", info.name);
};
</script>

<style scoped></style>
