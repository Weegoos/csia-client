<template>
  <div>
    <section data-testid="termsWrapperTestID" class="q-my-md">
      <q-btn
        data-testid="pushToProfileTestID"
        icon="mdi-arrow-left"
        @click="pushToProfile"
      />
      <p class="q-pa-md text-h5 text-bold" data-testid="termsMainText">
        Terms and Conditions
      </p>
    </section>
    <section
      style="background-color: #30322e; border-radius: 7px"
      class="q-pa-sm"
    >
      <div class="text-h5 q-pa-md">Terms and Conditions</div>
      <div>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon
                class="generalIconStyle q-pa-sm"
                color="green-4"
                name="mdi-scale-balance"
              />
            </q-item-section>

            <q-item-section color="white">
              <q-item-label
                >By using this application, you agree to the following
                terms:</q-item-label
              >
              <q-item-label caption>
                <ul style="padding-left: 16px; margin: 0; color: white">
                  <li>
                    You must be at least 18 years old to use this service.
                  </li>
                  <li>
                    Your personal data is collected and processed in accordance
                    with our privacy policy.
                  </li>
                  <li>
                    You may not use the platform for any illegal or unauthorized
                    purpose.
                  </li>
                  <li>
                    We reserve the right to suspend or terminate accounts that
                    violate our policies.
                  </li>
                  <li>
                    All content provided is for informational purposes and does
                    not constitute professional advice.
                  </li>
                  <li>
                    We are not responsible for any damages resulting from your
                    use of the platform.
                  </li>
                  <li>
                    Terms and conditions are subject to change without notice.
                    You are responsible for reviewing them periodically.
                  </li>
                </ul>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// global variables
const router = useRouter();
const pushToProfile = () => {
  router.push("/profile-settings");
};
</script>

<style></style>
