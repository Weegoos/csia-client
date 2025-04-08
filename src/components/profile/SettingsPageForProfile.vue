<template>
  <div>
    <section class="q-my-md">
      <q-btn icon="mdi-arrow-left" @click="pushToPlants" />
      <p class="q-pa-md text-h5 text-bold">Settings</p>
    </section>
    <section class="row q-my-md">
      <div class="col" align="center">
        <q-icon
          name="person"
          class="q-pa-sm"
          style="background-color: #30322e; border-radius: 54px"
          size="54px"
        />
      </div>
    </section>
    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm"
    >
      <div class="text-h5 q-pa-md">General</div>
      <div>
        <q-list>
          <q-item clickable v-ripple @click="openAccountPage()">
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                name="mdi-account"
              />
            </q-item-section>
            <q-item-section>Account</q-item-section>
            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="openEditPage()">
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                name="mdi-pencil"
              />
            </q-item-section>
            <q-item-section>Edit</q-item-section>
            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div>
        <q-dialog v-model="confirm" persistent>
          <q-card class="text-black bg-white">
            <q-card-section>
              <q-input v-model="fio" type="text" label="Full name" />
              <q-input v-model="password" type="password" label="Password" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red-4" @click="closeWindow" />
              <q-btn flat label="Edit" color="primary" @click="editProfile" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </section>

    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm q-my-md"
    >
      <div class="text-h5 q-pa-md">Help</div>
      <div>
        <q-list>
          <q-item
            clickable
            v-ripple
            v-for="(button, index) in helpButtons"
            :key="index"
            @click="pushToLink(button.link)"
          >
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                :name="button.icon"
              />
            </q-item-section>
            <q-item-section>{{ button.label }}</q-item-section>
            <q-item-section avatar left>
              <q-icon color="white" name="mdi-arrow-right" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div>
        <q-dialog v-model="confirm" persistent>
          <q-card class="text-black bg-white">
            <q-card-section>
              <q-input v-model="fio" type="text" label="Full name" />
              <q-input v-model="password" type="password" label="Password" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red-4" @click="closeWindow" />
              <q-btn flat label="Edit" color="primary" @click="editProfile" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </section>
    <q-btn
      style="width: 100%"
      class="q-my-sm"
      rounded
      color="red-4"
      label="Log Out"
      no-caps
      @click="logout"
    />
  </div>
</template>

<script setup>
import { Cookies, useQuasar } from "quasar";
import axios from "axios";
import { checkAccessToken } from "src/composables/javascript-function/token";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const router = useRouter();
const pushToPlants = () => {
  router.push("/plants");
};

const pushToLink = (link) => {
  router.push(link);
};

const helpButtons = [
  {
    label: "Contact us",
    icon: "mdi-phone",
    link: "/profile/contact",
  },

  {
    label: "Knowledge base / FAQ",
    icon: "mdi-book-open",
  },

  {
    label: "Terms and conditions",
    icon: "mdi-file-document",
  },

  {
    label: "About application",
    icon: "mdi-information",
  },
];

const logout = async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.reload();
};

onMounted(() => {
  checkAccessToken();
});

const confirm = ref(false);
const openEditPage = () => {
  confirm.value = true;
};

const closeWindow = () => {
  confirm.value = false;
};

const fio = ref("");
const password = ref("");

const openAccountPage = () => {
  router.push("/profile/account");
};

const editProfile = async () => {
  try {
    const payload = {
      newPassword: password.value, // Поправка здесь
      fio: fio.value,
    };

    await axios.patch(
      `${serverURL}user/editProfile`, // Скорректированный URL
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`, // Проверяем токен
        },
      }
    );

    console.log("Профиль успешно обновлен");
    $q.notify({ type: "positive", message: "Profile is changed" });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    console.error("Детали ошибки:", error.response?.data);
    $q.notify({
      type: "negative",
      message: "Error: " + error.response?.data?.message,
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

<style></style>
