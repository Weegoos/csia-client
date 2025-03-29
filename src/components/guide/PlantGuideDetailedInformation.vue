<template>
  <div v-show="isClicked">
    <section v-if="isClicked === true">
      <q-btn icon="mdi-arrow-left" @click="goToTheWrapper" />
    </section>
    <section class="info">
      <span class="text-h4 text-body">{{ allInformationAboutPlant.name }}</span
      ><br />
      <span class="text-subtitle1 text-grey">
        {{ allInformationAboutPlant.type }}
      </span>
    </section>
    <section class="sentences q-pa-sm q-my-md">
      <span class="text-body2 text-white">
        {{ allInformationAboutPlant.temperatures.sentence }}
      </span>
      <br />
      <br />
    </section>
    <section>
      <div class="row q-gutter-md">
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-flower" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.difficulty }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-thermometer" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.light }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-water" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.difficulty }}
          </p>
        </section>
        <section class="col sentences q-pt-md" dense align="center">
          <q-icon name="mdi-fire-alert" size="24px" />
          <p class="text-subtitle1">
            {{ allInformationAboutPlant.toxicity }}
          </p>
        </section>
        <section class="sentences"></section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isClickedToTheDetailedPage: {
    type: Boolean,
    default: false,
  },
  allInformationAboutPlant: {
    type: Object,
    default: () => ({}),
  },
});

const isClicked = ref(props.isClickedToTheDetailedPage);
watch(
  () => props.isClickedToTheDetailedPage,
  (newValue) => {
    isClicked.value = newValue;
  }
);

const emit = defineEmits(["goToTheWrapper"]);
const goToTheWrapper = () => {
  emit("goToTheWrapper");
};
</script>

<style scoped>
.sentences {
  background-color: #30322e;
  border-radius: 8px;
}
</style>
