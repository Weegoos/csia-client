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
                  @click="onClick"
                />
              </q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-icon name="mdi-arrow-right" color="white" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-intersection>
    </section>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const pushToMainPage = () => {
  router.push("/");
};

const plantInfo = ref([]);
const getAllPlants = async () => {
  await getMethod(
    serverURL,
    `plant/allPlants?page=0&size=10`,
    plantInfo,
    $q,
    "Error: "
  );
};

onMounted(async () => {
  getAllPlants();
});
</script>

<style></style>
