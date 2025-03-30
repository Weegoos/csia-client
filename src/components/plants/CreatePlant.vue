<template>
  <div>
    <section class="col q-mb-md" align="left">
      <q-btn
        rounded
        color="black"
        dense
        icon="mdi-arrow-left"
        @click="pushToMainPage"
      />
    </section>
    <section>
      <p class="text-h5 text-body">Now add your first plant</p>
      <span class="text-body2">Idenfify plant with search</span>
    </section>
    <section class="inoutSection">
      <q-input
        v-model="customName"
        placeholder="Enter custom name"
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
        v-model="substrate"
        placeholder="Enter substrate"
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
        v-model="formattedDateForPlantTime"
        placeholder="Enter substrate"
        stack-label
        class="text-white q-my-md input"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <!-- Календарь для выбора даты -->
        <template v-slot:prepend>
          <q-icon color="white" name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                color="black"
                class="text-black"
                v-model="date"
                mask="YYYY-MM-DD"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <!-- Выбор времени -->
        <template v-slot:append>
          <q-icon color="white" name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                color="black"
                class="text-black"
                v-model="time"
                mask="HH:mm:ss"
                format24h
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn
        color="green-4"
        style="width: 100%"
        rounded
        no-caps
        label="Add a plant"
        @click="createPlant"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const date = ref(""); // Дата в формате "YYYY-MM-DD"
const time = ref(""); // Время в формате "HH:mm:ss"
const formattedDateForPlantTime = ref("");
const customName = ref("");
const substrate = ref("");

const pushToMainPage = () => {};

const createPlant = () => {
  try {
    // Проверяем, чтобы оба значения были заданы
    if (date.value && time.value) {
      const combinedDate = new Date(`${date.value}T${time.value}`);
      if (!isNaN(combinedDate.getTime())) {
        formattedDateForPlantTime.value = combinedDate.toISOString();
        const payload = {
          customName: customName.value,
          substrate: substrate.value,
          plantTime: formattedDateForPlantTime.value,
        };
        console.log(payload);
      } else {
        throw new Error("Некорректная дата или время");
      }
    } else {
      console.error("Выберите дату и время");
    }
  } catch (e) {
    console.error("Ошибка при преобразовании даты:", e);
  }
};
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
