<template>
  <div>
    <q-dialog class="text-black" v-model="confirm" persistent>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="information" label="information" />
          <q-tab name="edit" label="Edit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="information">
            <q-card-section class="row items-center">
              <q-list dense>
                <q-expansion-item
                  popup
                  icon="filter_1"
                  label="Basic Information"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Name:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.custom_name
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Email:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.email
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Plant ID:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.plantId
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Planting Time:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.plantTime
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Substrate:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.substrate
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Collection Time:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.collectTime
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Current Status:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.currentState ||
                            "Not specified"
                          }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item class="q-pt-xs q-pb-xs">
                        <q-item-section>
                          Notes:
                          <span class="text-bold">{{
                            props.allInfoAboutPlant.notes
                          }}</span>
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item popup icon="filter_2" label="Indicators">
                  <q-item
                    class="q-pt-xs q-pb-xs"
                    v-for="(indicator, index) in props.allInfoAboutPlant
                      .indicators"
                    :key="index"
                  >
                    <q-item-section>
                      <div>
                        Humidity:
                        <span class="text-bold">{{
                          indicator.humidity ?? "Not specified"
                        }}</span>
                      </div>
                      <div>
                        Air Temperature:
                        <span class="text-bold">{{
                          indicator.temperatureAir ?? "Not specified"
                        }}</span>
                      </div>
                      <div>
                        Ground Temperature:
                        <span class="text-bold">{{
                          indicator.temperatureGround ?? "Not specified"
                        }}</span>
                      </div>
                      <div>
                        Height:
                        <span class="text-bold">{{
                          indicator.height ?? "Not specified"
                        }}</span>
                      </div>
                      <div>
                        Date:
                        <span class="text-bold">{{
                          indicator.date ?? "Not specified"
                        }}</span>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="edit" style="width: 250px">
            <div class="text-h6">Edit Indicators</div>
            <q-input v-model="humidity" type="number" label="Humidity" />
            <q-input
              v-model="temperatureGround"
              type="number"
              label="Ground temperature"
            />
            <q-input
              v-model="temperatureAir"
              type="number"
              label="Air temperature"
            />
            <q-input v-model="height" type="number" label="Height" />
            <q-btn
              color="green-4"
              class="q-my-sm"
              style="width: 100%"
              rounded
              no-caps
              label="Edit"
              @click="edit"
            />
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" @click="closeWindow" />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { postMethod } from "src/composables/apiMethod/post";
import { getCurrentInstance, ref, watch } from "vue";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const props = defineProps({
  openWindow: {
    type: Boolean,
    default: false,
  },
  allInfoAboutPlant: {
    type: Object,
    default: () => ({}),
  },
});

const confirm = ref(props.openWindow);
const tab = ref("information");
watch(
  () => props.openWindow,
  (newValue) => {
    confirm.value = newValue;
  }
);

const emit = defineEmits(["closeWindow"]);
const closeWindow = () => {
  emit("closeWindow");
};

const humidity = ref(0);
const temperatureGround = ref(0);
const temperatureAir = ref(0);
const height = ref(0);
const edit = async () => {
  const payload = {
    custom_name: props.allInfoAboutPlant.custom_name,
    humidity: humidity.value,
    temperatureGround: humidity.value,
    temperatureAir: temperatureAir.value,
    height: height.value,
  };
  try {
    await postMethod(
      serverURL,
      "user/indicate",
      payload,
      $q,
      "Indicators are edited"
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
