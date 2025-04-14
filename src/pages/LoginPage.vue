<template>
  <div
    class="q-pa-md bg-black"
    :class="$q.screen.width > mobileWidth ? 'fixed-center' : ''"
  >
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold" data-testid="loginMainText">
        {{ t("login.mainText") }}
      </p>
      <p class="text-body2" data-testid="loginSubText">
        {{ t("login.captionText") }}
      </p>
    </section>
    <section>
      <q-input
        data-testid="emailInput"
        v-model="email"
        :placeholder="t('login.emailText')"
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
        :placeholder="t('login.passwordText')"
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
        :label="t('login.clickButtonText')"
        @click="login"
      />
      <q-btn
        color="black"
        style="width: 100%"
        rounded
        no-caps
        class="q-my-md"
        :label="t('login.clickToTheRegistration')"
        @click="pushToRegistration"
      />
    </section>
    <q-btn-dropdown
      class="fixed-bottom-right q-mb-md"
      :class="$q.screen.width < mobileWidth ? 'q-mx-md' : 'q-mx-lg'"
      color="black"
      rounded
      icon="mdi-web"
    >
      <q-list class="bg-black" v-for="(lang, index) in options" :key="index">
        <q-item
          clickable
          v-close-popup
          @click="() => selectLanguage(lang.value)"
        >
          <q-item-section>
            <q-item-label>{{ lang.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import axios from "axios";
import { Cookies, useQuasar } from "quasar";
import { useNotifyStore } from "src/stores/notify-store";
import { getCurrentInstance, ref } from "vue";
import { useI18n } from "vue-i18n";
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
    const { t, locale } = useI18n();

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

    const language = ref(locale.value);
    const options = [
      { label: "Русский", value: "ru-RU" },
      { label: "English", value: "en-US" },
      { label: "Қазақша", value: "kz-KZ" },
    ];

    const selectLanguage = (val) => {
      language.value = val;
      locale.value = val;
      localStorage.setItem("locale", val);
    };

    return {
      mobileWidth,
      isPwd,
      email,
      password,
      login,
      pushToRegistration,
      t,
      options,
      locale,
      selectLanguage,
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
