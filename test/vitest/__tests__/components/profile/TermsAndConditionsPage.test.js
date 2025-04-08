import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import TermsAndConditionsPage from "src/components/profile/TermsAndConditionsPage.vue";
import { describe, expect, it } from "vitest";

installQuasarPlugin();

describe("tests for TermsAndConditionsPage", () => {
  const wrapper = mount(TermsAndConditionsPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find the termsWrapperTestID data-testid", () => {
    const termsWrapperTestID = wrapper.find(
      '[data-testid="termsWrapperTestID"]'
    );
    expect(termsWrapperTestID.exists()).toBe(true);
  });

  it("should find the pushToProfileTestID data-testid", () => {
    const pushToProfileTestID = wrapper.find(
      '[data-testid="pushToProfileTestID"]'
    );
    expect(pushToProfileTestID.exists()).toBe(true);
  });

  it("should find the termsMainText data-testid", () => {
    const termsMainText = wrapper.find('[data-testid="termsMainText"]');
    expect(termsMainText.exists()).toBe(true);
  });
});
