import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import LoginPage from "src/pages/LoginPage.vue";
import { describe, expect, it } from "vitest";
import messages from "../../../../src/i18n/en-US/index";
import { createI18n } from "vue-i18n";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

const pinia = createPinia();

describe("tests for LoginPage", () => {
  const wrapper = mount(LoginPage, {
    global: {
      plugins: [pinia, Quasar, i18n],
    },
  });
  it("should find loginMainText data-testid", () => {
    const loginMainText = wrapper.find('[data-testid="loginMainText"]');
    expect(loginMainText.exists()).toBe(true);
  });

  it("should find loginSubText data-testid", () => {
    const loginSubText = wrapper.find('[data-testid="loginSubText"]');
    expect(loginSubText.exists()).toBe(true);
  });

  it("should find emailInput data-testid", () => {
    const emailInput = wrapper.find('[data-testid="emailInput"]');
    expect(emailInput.exists()).toBe(true);

    emailInput.setValue("example@mail.ru");
    expect(emailInput.element.value).toBe("example@mail.ru");
  });

  it("should find passwordInput data-testid", () => {
    const passwordInput = wrapper.find('[data-testid="passwordInput"]');
    expect(passwordInput.exists()).toBe(true);

    passwordInput.setValue("examplePassword");
    expect(passwordInput.element.value).toBe("examplePassword");
  });
});
