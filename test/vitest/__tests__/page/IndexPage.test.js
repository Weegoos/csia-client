import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import IndexPage from "src/pages/IndexPage.vue";
import { describe, expect, it, vi } from "vitest";
import { createI18n } from "vue-i18n";
import messages from "../../../../src/i18n/en-US/index";
installQuasarPlugin();

const i18n = createI18n({
  legacy: false,
  locale: "ru-RU",
  messages,
});

let testData = {
  content: [],
  page: {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

vi.mock("src/composables/apiMethod/get", () => ({
  getMethod: vi.fn(() => Promise.resolve({ data: testData })),
}));

function createWrapper() {
  return mount(IndexPage, {
    global: {
      plugins: [Quasar, i18n],
    },
  });
}

describe("tests for IndexPage", () => {
  it("should find indexPageMainText data-testid", () => {
    const wrapper = createWrapper();
    const indexPageMainText = wrapper.find('[data-testid="indexPageMainText"]');
    expect(indexPageMainText.exists()).toBe(true);
  });

  it("should find indexPageSubText data-testid", () => {
    const wrapper = createWrapper();
    const indexPageSubText = wrapper.find('[data-testid="indexPageSubText"]');
    expect(indexPageSubText.exists()).toBe(true);
  });

  it("should find indexPageNoPlantsText data-testid", async () => {
    const wrapper = createWrapper();
    wrapper.vm.allMyPlants = testData;
    await flushPromises();
    const section = wrapper.find('[data-testid="indexPageNoPlantsText"]');
    expect(section.exists()).toBe(true);
  });

  it("should find indexPagePlantsText data-testid", async () => {
    const wrapper = createWrapper();
    wrapper.vm.allMyPlants = testData;
    await flushPromises();
    const section = wrapper.find('[data-testid="indexPagePlantsText"]');
    expect(section.exists()).toBe(false);
  });
});
