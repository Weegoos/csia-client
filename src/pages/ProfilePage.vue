<template>
  <div>
    <p>
      Full Name: <span class="text-bold">{{ userInfo.fio }}</span>
    </p>
    <p>
      Email: <span class="text-bold">{{ userInfo.email }}</span>
    </p>
  </div>
</template>

<script setup>
import { useApiStore } from "src/stores/api-store";
import { onMounted, ref } from "vue";

const apiStore = useApiStore();

const userInfo = ref("");
const getAllInfoAboutUser = async () => {
  await apiStore.getUserProfile();
  userInfo.value = apiStore.userData;
  console.log(userInfo.value);
};

onMounted(() => {
  getAllInfoAboutUser();
});
</script>

<style></style>
