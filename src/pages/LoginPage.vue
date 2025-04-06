<template>
  <div
    class="q-pa-md bg-black"
    :class="$q.screen.width > mobileWidth ? 'fixed-center' : ''"
  >
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold" data-testid="loginMainText">
        Log in to the system
      </p>
      <p class="text-body2" data-testid="loginSubText">
        Please enter your credentials to access your account
      </p>
    </section>
    <section>
      <q-input
        data-testid="emailInput"
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
        data-testid="passwordInput"
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
        label="Sign in with email"
        @click="login"
      />
      <q-btn
        color="black"
        style="width: 100%"
        rounded
        no-caps
        class="q-my-md"
        label="Sign up with email"
        @click="pushToRegistration"
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { Cookies, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // global variables
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const serverURL = proxy.$serverURL;
    const mobileWidth = proxy.$mobileWidth;
    const notifyStore = useNotifyStore();
    const $q = useQuasar();

    const isPwd = ref(true);
    const email = ref("");
    const password = ref("");

    const login = async () => {
      const payload = {
        email: email.value,
        password: password.value,
      };
      try {
        const response = await axios.post(`${serverURL}auth/login`, payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        console.log(response.data);
        Cookies.set("accessToken", response.data.accessToken);
        Cookies.set("refreshToken", response.data.refreshToken);
        notifyStore.nofifySuccess($q, "The user has successfully logged in");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    const pushToRegistration = () => {
      router.push("/registration");
    };

    return {
      mobileWidth,
      isPwd,
      email,
      password,
      login,
      pushToRegistration,
    };
  },
};
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
