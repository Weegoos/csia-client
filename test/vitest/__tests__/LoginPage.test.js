import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import LoginPage from "src/pages/LoginPage.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();

const pinia = createPinia();

describe("tests for LoginPage", () => {
  const wrapper = mount(LoginPage, {
    global: {
      plugins: [pinia, Quasar],
    },
  });
  it("should find loginMainText data-testid", () => {
    const loginMainText = wrapper.find('[data-testid="loginMainText"]');
    expect(loginMainText.exists()).toBe(true);
    expect(loginMainText.text()).toContain("Log in");
    expect(loginMainText).toMatchSnapshot();
  });

  it("should find loginSubText data-testid", () => {
    const loginSubText = wrapper.find('[data-testid="loginSubText"]');
    expect(loginSubText.exists()).toBe(true);
    expect(loginSubText.text()).toContain("Please enter your credentials");
    expect(loginSubText).toMatchSnapshot();
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
