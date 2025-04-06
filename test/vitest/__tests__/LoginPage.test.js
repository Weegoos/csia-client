import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import LoginPage from "src/pages/LoginPage.vue";
import { describe, it, vi } from "vitest";

installQuasarPlugin();

const pinia = createPinia();

describe("tests for LoginPage", () => {
  const wrapper = mount(LoginPage, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("", () => {
    // Test logic for LoginPage
  });
});
