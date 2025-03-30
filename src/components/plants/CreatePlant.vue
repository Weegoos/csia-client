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
    <section class="inoutSection">
      <q-input
        v-model="customName"
        placeholder="Enter custom name"
        stack-label
        class="text-white q-my-md input"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      />

      <q-input
        v-model="substrate"
        placeholder="Enter substrate"
        stack-label
        class="text-white q-my-md input"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
        list="substrate-list"
      />

      <datalist id="substrate-list">
        <option
          v-for="(item, index) in substrateInfo"
          :key="index"
          :value="item"
        ></option>
      </datalist>

      <q-input
        v-model="formattedDateForPlantTime"
        placeholder="Enter plant time"
        stack-label
        class="text-white q-my-md input"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <!-- Календарь для выбора даты -->
        <template v-slot:prepend>
          <q-icon color="white" name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                color="black"
                class="text-black"
                v-model="plantDate"
                mask="YYYY-MM-DD"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <!-- Выбор времени -->
        <template v-slot:append>
          <q-icon color="white" name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                color="black"
                class="text-black"
                v-model="plantTime"
                mask="HH:mm:ss"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-model="formattedDateForCollectionTime"
        placeholder="Enter collection time"
        stack-label
        class="text-white q-my-md input"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <!-- Календарь для выбора даты -->
        <template v-slot:prepend>
          <q-icon color="white" name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                color="black"
                class="text-black"
                v-model="collectionDate"
                mask="YYYY-MM-DD"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <!-- Выбор времени -->
        <template v-slot:append>
          <q-icon color="white" name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                color="black"
                class="text-black"
                v-model="collectionTime"
                mask="HH:mm:ss"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="notes"
        placeholder="Type your notes here"
        stack-label
        class="text-white q-my-md input"
        color="white"
        autogrow
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      />
      <q-btn
        color="green-4"
        style="width: 100%"
        rounded
        no-caps
        label="Add a plant"
        @click="createPlant"
      />
    </section>
  </div>
</template>

<script setup>
import { LocalStorage, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { getMethod } from "src/composables/apiMethod/get";
import { postMethod } from "src/composables/apiMethod/post";
import { useApiStore } from "src/stores/api-store";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();
const router = useRouter();

const plantDate = ref(""); // Дата в формате "YYYY-MM-DD"
const plantTime = ref(""); // Время в формате "HH:mm:ss"
const formattedDateForPlantTime = ref("");

const formattedDateForCollectionTime = ref("");
const collectionDate = ref(""); // Дата в формате "YYYY-MM-DD"
const collectionTime = ref(""); // Время в формате "HH:mm:ss"
const customName = ref("");
const substrate = ref("");
const notes = ref("");

const pushToMainPage = () => {
  router.push("/");
};

const substrateInfo = ref([]);

const getList = async () => {
  try {
    await getMethod(
      serverURL,
      "params/allSubstrates",
      substrateInfo,
      $q,
      "Ошибка при получении списка подложек"
    );
  } catch (error) {
    console.error("Ошибка при получении списка:", error);
  }
};

const createPlant = async () => {
  await apiStore.getUserProfile();
  const info = apiStore.userData;

  try {
    if (plantDate.value && plantTime.value) {
      const combinedDate = new Date(`${plantDate.value}T${plantTime.value}`);
      const combinedDateForCollection = new Date(
        `${collectionDate.value}T${collectionTime.value}`
      );
      if (!isNaN(combinedDate.getTime())) {
        formattedDateForPlantTime.value = combinedDate.toISOString();
        formattedDateForCollectionTime.value =
          combinedDateForCollection.toISOString();
        const payload = {
          custom_name: customName.value,
          email: info.email,
          plant_name: LocalStorage.getItem("plantInfo"),
          plantTime: formattedDateForPlantTime.value,
          substrate: substrate.value,
          notes: notes.value,
          collectionTime: formattedDateForCollectionTime.value,
        };
        postMethod(
          serverURL,
          "user/addPlant",
          payload,
          $q,
          "Plant is created "
        );
        console.log(payload);
        LocalStorage.remove("plantInfo");
      } else {
        throw new Error("Некорректная дата или время");
      }
    } else {
      console.error("Выберите дату и время");
    }
  } catch (e) {
    console.error("Ошибка при преобразовании даты:", e);
  }
};

onMounted(() => {
  getList();
});
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
