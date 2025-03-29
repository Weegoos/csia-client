<template>
  <div class="q-pa-md bg-black">
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold">Create account with email</p>
      <p class="text-body2">Enter your details below to create your account</p>
    </section>
    <section>
      <q-input
        v-model="fullName"
        placeholder="Enter your full name"
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
        v-model="email"
        placeholder="Enter your email"
        stack-label
        class="text-white input q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      />
      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        placeholder="Enter your password"
        stack-label
        class="text-white input q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            color="grey"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        color="green-4"
        style="width: 100%"
        rounded
        no-caps
        label="Sign up with email"
        @click="register"
      />
      <q-btn
        color="black"
        style="width: 100%"
        rounded
        no-caps
        class="q-my-md"
        label="Sign in with email"
        @click="pushToLogin"
      />
    </section>
    <section>
      <q-carousel
        v-model="slide"
        vertical
        transition-prev="slide-down"
        transition-next="slide-up"
        animated
        infinite
        autoplay
        :autoplay-interval="3000"
        height="150px"
        width="100%"
        class="bg-black text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="fullname" class="column no-wrap flex-center">
          <q-icon name="mdi-account" size="56px" />

          <div class="q-mt-md text-center">
            Be sure to write the full name for the accuracy of the information.
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="email" class="column no-wrap flex-center">
          <q-icon name="email" size="56px" />
          <div class="q-mt-md text-center">
            Use work email to work with the app.
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="password" class="column no-wrap flex-center">
          <q-icon name="mdi-lock-outline" size="56px" />

          <div class="q-mt-md text-center">
            The password must consist of 6 characters.
          </div>
        </q-carousel-slide>
      </q-carousel>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const notifyStore = useNotifyStore();
const $q = useQuasar();

const isPwd = ref(true);
const fullName = ref("");
const email = ref("");
const password = ref("");
const slide = ref("fullname");

const register = async () => {
  const payload = {
    email: email.value,
    password: password.value,
    fio: fullName.value,
  };
  try {
    const response = await axios.post(`${serverURL}auth/signup`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response.data);
    notifyStore.nofifySuccess($q, response.data);
  } catch (error) {
    console.error(error);
  }
};

const pushToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
