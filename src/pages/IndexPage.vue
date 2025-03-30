<template>
  <div>
    <section align="right">
      <q-btn
        class="bg-grey q-mr-sm"
        round
        color="black"
        icon="mdi-bell-outline"
        @click="pushToNofications"
      />
      <q-btn
        style="background-color: #30322e"
        round
        icon="mdi-book-open-outline"
        @click="pushToGuide"
      />
    </section>
    <p class="text-h5 text-bold">Good day</p>
    <span class="text-body1">Your plants are so glad you are here.</span>
    <section
      class="q-pa-sm q-my-md"
      style="background-color: #30322e; border-radius: 8px"
      v-if="allMyPlants == []"
    >
      <p class="text-body2 text-bold">Add your first plant</p>
      <p>
        Planta will then create a care schedule for it to make sure it thrives
      </p>
    </section>
    <section v-else>
      <div>
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(plant, index) in allMyPlants.content"
            :key="index"
            @click="openDetailedMyPlant(plant)"
          >
            <q-item-section avatar class="text-white">
              <q-icon color="green-4" name="mdi-leaf" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-bold">{{
                plant.custom_name
              }}</q-item-label>
              <q-item-label class="text-white" caption lines="2">{{
                plant.substrate
              }}</q-item-label>
              <q-item-label class="text-white" caption lines="2">
                Collect time:
                {{ plant.collectTime }}
              </q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-icon name="mdi-arrow-right" color="white" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
    <q-btn
      color="green-4 q-mt-md"
      rounded
      style="width: 100%"
      label="Add plant"
      no-caps
      @click="addPlant"
    />
    <ViewDetailedInformationAboutPlant
      :openWindow="openWindow"
      :allInfoAboutPlant="allInfoAboutPlant"
    />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import ViewDetailedInformationAboutPlant from "src/components/myPlant.vue/ViewDetailedInformationAboutPlant.vue";
import { getMethod } from "src/composables/apiMethod/get";
import { checkAccessToken } from "src/composables/javascript-function/token";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const pushToNofications = () => {
  router.push("/notifications");
};

const addPlant = () => {
  router.push("/create-plant");
};

const pushToGuide = () => {
  router.push("/guide");
};

const allInfoAboutPlant = ref([]);
const openWindow = ref(false);
const openDetailedMyPlant = (info) => {
  allInfoAboutPlant.value = info;
  openWindow.value = true;
};

const allMyPlants = ref([]);
const getAllMyPlants = async () => {
  await getMethod(
    serverURL,
    `user/myPlants?page=0&size=10`,
    allMyPlants,
    $q,
    "Error: "
  );

  console.log(allMyPlants.value);
};

onMounted(() => {
  getAllMyPlants();
  checkAccessToken();
});
</script>

<style></style>
