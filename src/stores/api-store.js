import { defineStore } from "pinia";
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { useNotifyStore } from "./notify-store";
import { getMethod } from "src/composables/apiMethod/get";
import { ref } from "vue";

export const useApiStore = defineStore("api", {
  state: () => ({
    userData: ref([]),
  }),
  actions: {
    async getUserProfile() {
      const notifyStore = useNotifyStore();
      const $q = useQuasar();
      // notifyStore.loading($q, "Данные загружаются...", QSpinnerGears);
      try {
        const response = await axios.get("http://localhost:8080/user/profile", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          withCredentials: true,
        });
        this.userData = response.data;
        console.log(response.data);
      } catch (error) {
        // notifyStore.notifyError(
        //   $q,
        //   `Ошибка передачи данных о пользователе: ${error}`
        // );
        console.error(error);
      } finally {
        // $q.loading.hide();
      }
    },
  },
  persist: true,
});
