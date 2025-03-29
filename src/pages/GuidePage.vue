<template>
  <div>
    <div class="wrapper" v-show="!isClickedToTheDetailedPage">
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
        <p class="text-h5 text-body">Find plant</p>
        <span class="text-body2">Idenfify plant with search</span>
      </section>
      <section>
        <q-intersection transition="flip-right" class="example-item">
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(plant, index) in plantInfo.content"
              :key="index"
              @click="seeDetailedInformationAboutPlant(plant)"
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
        <q-pagination
          class="justify-center"
          v-model="current"
          color="green-4"
          :min="1"
          :max="maxPage"
          @update:model-value="pagination"
          :boundary-numbers="true"
        />
      </section>
    </div>
    <div v-if="isClickedToTheDetailedPage">
      <PlantGuideDetailedInformation
        :isClickedToTheDetailedPage="isClickedToTheDetailedPage"
        :allInformationAboutPlant="allInformationAboutPlant"
        @goToTheWrapper="isClickedToTheDetailedPage = false"
      />
    </div>
  </div>
</template>

<script setup>
import { all } from "axios";
import { useQuasar } from "quasar";
import PlantGuideDetailedInformation from "src/components/guide/PlantGuideDetailedInformation.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const maxItemsPerPage = proxy.$maxItemsPerPage;
const $q = useQuasar();

const pushToMainPage = () => {
  router.push("/");
};

const plantInfo = ref([]);
const getAllPlants = async (page) => {
  await getMethod(
    serverURL,
    `plant/allPlants?page=${page}&size=${maxItemsPerPage}`,
    plantInfo,
    $q,
    "Error: "
  );

  console.log(page);
};

// see detailed information about plant
const isClickedToTheDetailedPage = ref(false);
const allInformationAboutPlant = ref([]);
const seeDetailedInformationAboutPlant = (info) => {
  console.log(info);
  isClickedToTheDetailedPage.value = true;
  allInformationAboutPlant.value = info;
};

// pagination
const current = ref(1);
const pagination = (page) => {
  console.log("Текущая страница:", page);
  current.value = page;
  console.log(current.value);

  getAllPlants(current.value - 1);
};

const maxPage = ref("");
watch(
  () => plantInfo.value,
  (newVal) => {
    if (newVal && newVal.page.size) {
      maxPage.value = Math.ceil(newVal.page.totalElements / newVal.page.size);
    } else {
      maxPage.value = 1;
    }
  }
);

onMounted(() => {
  getAllPlants(current.value - 1);
});
</script>

<style></style>
