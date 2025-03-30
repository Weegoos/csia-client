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
                      props.allInfoAboutPlant.currentState || "Not specified"
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
              </q-list>
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="edit">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
</script>

<style></style>
