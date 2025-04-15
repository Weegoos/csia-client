<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card dark>
        <q-card-section class="row items-center">
          {{ props.allInfoAboutUser }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="closeDetailedInformationAboutUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// global variables
const props = defineProps({
  isOpenedDetailedInfoAboutUser: {
    default: false,
    type: Boolean,
    required: true,
  },
  allInfoAboutUser: {
    type: Object,
    required: true,
  },
});
const confirm = ref(props.isOpenedDetailedInfoAboutUser);

watch(
  () => props.isOpenedDetailedInfoAboutUser,
  (newVal) => {
    confirm.value = newVal;
  }
);

const emit = defineEmits(["closeDetailedInformationAboutUser"]);
const closeDetailedInformationAboutUser = () => {
  emit("closeDetailedInformationAboutUser");
};
</script>

<style></style>
