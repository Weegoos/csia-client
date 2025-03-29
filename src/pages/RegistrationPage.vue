<template>
  <div class="q-pa-md bg-black">
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold">Create account with email</p>
      <p class="text-body2">Enter your details below to create your account</p>
    </section>
    <section>
      <q-input
        v-model="fullName"
        placeholder="Enter your full name"
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
        v-model="email"
        placeholder="Enter your email"
        stack-label
        class="text-white input q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      />
      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        placeholder="Enter your password"
        stack-label
        class="text-white input q-my-md"
        color="white"
        input-class="text-white"
        label-class="text-white"
        input-style="color: white;"
        rounded
        outlined
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            color="grey"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        color="green-4"
        style="width: 100%"
        rounded
        no-caps
        label="Sign up with email"
        @click="register"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("");

const isPwd = ref(true);
const fullName = ref("");
const email = ref("");
const password = ref("");
const register = () => {
  console.log("Registering with", {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  });
  // Add your registration logic here
};
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
