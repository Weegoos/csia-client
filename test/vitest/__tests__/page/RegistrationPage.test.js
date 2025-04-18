import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import RegistrationPage from "src/pages/RegistrationPage.vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../src/i18n/en-US/index";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

describe("tests from RegistrationPage", () => {
  const wrapper = mount(RegistrationPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });
  it("should find registrationMainText data-testid ", () => {
    const registrationMainText = wrapper.find(
      '[data-testid="registrationMainText"]'
    );
    expect(registrationMainText.exists()).toBe(true);
  });

  it("should find registrationSubText data-testid", () => {
    const registrationSubText = wrapper.find(
      '[data-testid="registrationSubText"]'
    );
    expect(registrationSubText.exists()).toBe(true);
  });

  it("should find fullNameInput data-testid", () => {
    const fullNameInput = wrapper.find('[data-testid="fullNameInput"]');
    expect(fullNameInput.exists()).toBe(true);

    fullNameInput.setValue("exampleFullName");
    expect(fullNameInput.element.value).toBe("exampleFullName");
  });

  it("should find emailInput data-testid", () => {
    const emailInput = wrapper.find('[data-testid="emailInput"]');
    expect(emailInput.exists()).toBe(true);

    emailInput.setValue("example@gmail.com");
    expect(emailInput.element.value).toBe("example@gmail.com");
    expect(emailInput.element.value).toMatchSnapshot();
  });

  it("should find registrationCarousel data-testid", () => {
    const registrationCarousel = wrapper.find(
      '[data-testid="registrationCarousel"]'
    );
    expect(registrationCarousel.exists()).toBe(true);
  });
});
