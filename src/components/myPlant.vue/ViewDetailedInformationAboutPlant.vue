<template>
  <div>
    <q-dialog class="text-black" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ props.allInfoAboutPlant }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
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

watch(
  () => props.openWindow,
  (newValue) => {
    confirm.value = newValue;
  }
);
</script>

<style></style>
