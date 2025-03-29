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
    <section>
      <q-input
        v-model="search"
        placeholder="Search for plant"
        stack-label
        class="text-white searchInput q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <template v-slot:append>
          <q-icon color="white" name="search" />
        </template>
      </q-input>
    </section>
    <section>
      <q-scroll-area style="width: 400px; height: 200px">
        <div class="row no-wrap q-gutter-md">
          <q-btn color="primary" rounded label="Все" @click="allPlant" />
          <div v-for="n in 10" :key="n">
            <q-btn color="primary" rounded label="OK" @click="onClick" />
          </div>
        </div>
      </q-scroll-area>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();

const pushToMainPage = () => {
  router.push("/");
};
</script>

<style scoped>
.searchInput {
  background-color: #30322e;
  color: white;
  border-radius: 54px;
}
</style>
