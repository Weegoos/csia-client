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
        class="q-mr-sm"
      />
      <q-btn
        style="background-color: #30322e"
        round
        icon="mdi-account-check"
        @click="pushToAdminPage"
      />
    </section>
    <p class="text-h5 text-bold" data-testid="indexPageMainText">
      {{ t("indexPage.mainText") }}
    </p>
    <span class="text-body1" data-testid="indexPageSubText">
      {{ t("indexPage.captionText") }}
    </span>
    <section
      class="q-pa-sm q-my-md"
      style="background-color: #30322e; border-radius: 8px"
      v-if="allMyPlants.content && allMyPlants.content.length === 0"
      data-testid="indexPageNoPlantsText"
    >
      <p class="text-body2 text-bold">{{ t("indexPage.addPlant") }}</p>
      <p>
        {{ t("indexPage.buttonCaptionText") }}
      </p>
    </section>
    <section v-else data-testid="indexPagePlantsText">
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
                {{ t("indexPage.collectTime") }}:
                {{ plant.collectTime }}
              </q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-icon name="mdi-arrow-right" color="white" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-pagination
        class="justify-center"
        v-model="current"
        color="green-4"
        :min="1"
        :max="maxPage"
        @update:model-value="pagination"
        :boundary-numbers="true"
      />
    </section>
    <q-btn
      color="green-4 q-mt-md"
      rounded
      style="width: 100%"
      :label="t('indexPage.addPlantBtnLabel')"
      no-caps
      @click="addPlant"
    />
    <ViewDetailedInformationAboutPlant
      :openWindow="openWindow"
      :allInfoAboutPlant="allInfoAboutPlant"
      @closeWindow="closeWindow"
    />
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { getMethod } from "src/composables/apiMethod/get";
import ViewDetailedInformationAboutPlant from "../components/myPlant/ViewDetailedInformationAboutPlant.vue";
import { checkAccessToken } from "src/composables/javascript-function/token";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
export default {
  components: {
    ViewDetailedInformationAboutPlant,
  },
  setup() {
    // global variables
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const serverURL = proxy.$serverURL;
    const maxItemsPerPage = proxy.$maxItemsPerPage;
    const $q = useQuasar();
    const { t } = useI18n();

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

    const closeWindow = () => {
      openWindow.value = false;
    };

    const allMyPlants = ref([]);
    const getAllMyPlants = async (page) => {
      await getMethod(
        serverURL,
        `user/myPlants?page=${page}&size=${maxItemsPerPage}`,
        allMyPlants,
        $q,
        "Error: "
      );

      console.log(allMyPlants.value);
    };

    // pagination
    const current = ref(1);
    const pagination = (page) => {
      console.log("Текущая страница:", page);
      current.value = page;
      console.log(current.value);

      getAllMyPlants(current.value - 1);
    };

    const maxPage = ref("");
    watch(
      () => allMyPlants.value,
      (newVal) => {
        if (newVal && newVal.page.size) {
          maxPage.value = Math.ceil(
            newVal.page.totalElements / newVal.page.size
          );
        } else {
          maxPage.value = 1;
        }
      }
    );

    onMounted(() => {
      getAllMyPlants(current.value - 1);
      checkAccessToken();
    });

    const pushToAdminPage = () => {
      router.push("/admin/users");
    };

    return {
      pushToNofications,
      addPlant,
      pushToGuide,
      openDetailedMyPlant,
      allMyPlants,
      openWindow,
      allInfoAboutPlant,
      closeWindow,
      current,
      pagination,
      maxPage,
      pushToAdminPage,
      t,
    };
  },
};
</script>

<style></style>
