<template>
  <div>
    <section class="col q-mb-md" align="left">
      <q-btn
        rounded
        color="black"
        dense
        icon="mdi-arrow-left"
        @click="pushToMainPage"
      />
    </section>
    <section>
      <p class="text-h5 text-body">Now add your first plant</p>
      <span class="text-body2">Idenfify plant with search</span>
    </section>
    <section>
      <q-input
        v-model="search"
        placeholder="Search for plant"
        stack-label
        class="text-white searchInput q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <template v-slot:append>
          <q-icon color="white" name="search" />
        </template>
      </q-input>
    </section>
    <section>
      <q-scroll-area style="width: 100%; height: 75px">
        <div class="row no-wrap q-gutter-md">
          <q-btn color="green-4" rounded label="All" @click="allPlant" />
          <div v-for="(btn, index) in allDifficulties" :key="index">
            <q-btn
              color="green-4"
              rounded
              :label="btn"
              @click="getAllPlantByDifficulties(btn)"
            />
          </div>
        </div>
      </q-scroll-area>
      <div v-show="allPage">
        <GetAllPlants />
      </div>
      <div v-show="allPage == false">
        <GetPlantsByDifficulties :plantInfo="plantInfo" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import GetAllPlants from "./GetAllPlants.vue";
import GetPlantsByDifficulties from "./GetPlantsByDifficulties.vue";

// global variables
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const allPage = ref(true);

const search = ref("");

const pushToMainPage = () => {
  router.push("/");
};

const allDifficulties = ref([]);
const getAllMethods = async () => {
  await getMethod(
    serverURL,
    "params/allDifficulties",
    allDifficulties,
    $q,
    "Error: "
  );
  console.log(allDifficulties.value);
};
const allPlant = () => {
  allPage.value = true;
};

const plantInfo = ref([]);
const getAllPlantByDifficulties = async (difficulty) => {
  console.log(difficulty);
  allPage.value = false;
  await getMethod(
    serverURL,
    `plant/allPlantsOfDifficulty?difficulty=${difficulty}&page=0&size=10`,
    plantInfo,
    $q,
    "Error: "
  );
};

onMounted(async () => {
  getAllMethods();
});
</script>

<style scoped>
.searchInput {
  background-color: #30322e;
  color: white;
  border-radius: 54px;
}
</style>
