<template>
  <div class="q-pa-md bg-black">
    <section class="text-white q-mb-md">
      <p class="text-h5 text-bold">Log in to the system</p>
      <p class="text-body2">
        Please enter your credentials to access your account
      </p>
    </section>
    <section>
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
        label="Sign in with email"
        @click="login"
      />
      <q-btn
        color="black"
        style="width: 100%"
        rounded
        no-caps
        class="q-my-md"
        label="Sign up with email"
        @click="pushToRegistration"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// global variables
const router = useRouter();

const isPwd = ref(true);
const email = ref("");
const password = ref("");
const slide = ref("fullname");
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const login = () => {
  console.log("Registering with", {
    email: email.value,
    password: password.value,
  });
};

const pushToRegistration = () => {
  router.push("/registration");
};
</script>

<style scoped>
.input {
  background-color: #30322e;
  border-radius: 54px;
}
</style>
