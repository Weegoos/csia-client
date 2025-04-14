<template>
  <div
    class="q-pa-md bg-black"
    :class="$q.screen.width > mobileWidth ? 'fixed-center' : ''"
  >
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold" data-testid="registrationMainText">
        {{ t("registration.mainText") }}
      </p>
      <p class="text-body2" data-testid="registrationSubText">
        {{ t("registration.captionText") }}
      </p>
    </section>
    <section>
      <q-input
        data-testid="fullNameInput"
        v-model="fullName"
        :placeholder="t('registration.fullNameText')"
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
        data-testid="emailInput"
        v-model="email"
        :placeholder="t('registration.emailText')"
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
        :placeholder="t('registration.passwordText')"
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
        :label="t('registration.signupWithEmail')"
        @click="register"
      />
      <q-btn
        color="black"
        style="width: 100%"
        rounded
        no-caps
        class="q-my-md"
        :label="t('registration.signinWithEmail')"
        @click="pushToLogin"
      />
    </section>
    <section>
      <q-carousel
        data-testid="registrationCarousel"
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
            {{ t("registration.carousel.block1.text") }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="email" class="column no-wrap flex-center">
          <q-icon name="email" size="56px" />
          <div class="q-mt-md text-center">
            {{ t("registration.carousel.block2.text") }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="password" class="column no-wrap flex-center">
          <q-icon name="mdi-lock-outline" size="56px" />

          <div class="q-mt-md text-center">
            {{ t("registration.carousel.block2.text") }}
          </div>
        </q-carousel-slide>
      </q-carousel>
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
import { useQuasar } from "quasar";
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
      fullName,
      email,
      password,
      slide,
      register,
      pushToLogin,
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
