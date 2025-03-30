<template>
  <div class="col" align="right">
    <q-btn icon="settings" round @click="pushToSettings" />
  </div>
  <div class="q-col-gutter-md row items-start">
    <div class="col-6 q-my-sm">
      <q-img style="border-radius: 5px" :src="img" no-native-menu> </q-img>
    </div>
  </div>
  <div>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-white bg-grey"
        active-color="black"
        indicator-color="black"
        align="justify"
        narrow-indicator
        animated
      >
        <q-tab name="profile" label="Profile" />
        <q-tab name="plants" label="Plants" />
      </q-tabs>

      <q-separator />

      <q-tab-panels class="text-white bg-black" v-model="tab" animated>
        <q-tab-panel name="profile">
          <ProfilePage />
        </q-tab-panel>

        <q-tab-panel name="plants">
          <p>
            Total number of plants:
            <span class="text-bold">{{ userInfo.plants.length }} </span>
          </p>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import ProfilePage from "./ProfilePage.vue";
import { Cookies, useQuasar } from "quasar";
import { useApiStore } from "src/stores/api-store";
import { useRouter } from "vue-router";
import { getMethod } from "src/composables/apiMethod/get";
import axios from "axios";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const apiStore = useApiStore();
const router = useRouter();

const tab = ref("profile");
const img = ref("");

const userInfo = ref("");
const getUserImg = async () => {
  await apiStore.getUserProfile();
  userInfo.value = apiStore.userData;
  console.log(userInfo.value.profileImage);

  try {
    const response = await axios.get(
      `${serverURL}user/image/${userInfo.value.profileImage}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        withCredentials: true,
        responseType: "blob", // Указываем, что ожидаем бинарные данные (изображение)
      }
    );

    // Создаем Blob с указанием типа изображения
    const blob = new Blob([response.data], { type: "image/jpeg" });
    img.value = URL.createObjectURL(blob);

    console.log("Изображение получено:", img.value);
  } catch (error) {
    console.log("Ошибка получения изображения:", error);
  }
};

onMounted(() => {
  getUserImg();
});
</script>

<style></style>
