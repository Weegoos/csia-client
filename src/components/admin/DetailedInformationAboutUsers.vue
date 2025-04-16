<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card dark style="width: 800px">
        <q-card-section>
          <div>
            <span class="infoHeadline">Full Name: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.fio }}</p>
          </div>
          <div>
            <span class="infoHeadline">Username: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.username }}</p>
          </div>
          <div>
            <span class="infoHeadline">Email: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.email }}</p>
          </div>
          <div>
            <span class="infoHeadline">Role: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.role.name }}</p>
          </div>
          <div>
            <span class="infoHeadline">Level: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.level }}</p>
          </div>
          <div>
            <span class="infoHeadline">Number of plants: </span>
            <p class="infoStyle">{{ props.allInfoAboutUser.plants.length }}</p>
          </div>
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
