// 👇 СРАЗУ после импорта vitest
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// теперь можно все импорты
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import GuidePage from "src/pages/GuidePage.vue";
import { describe, it, expect, beforeAll } from "vitest";
import { nextTick } from "vue";

// Установка плагина
installQuasarPlugin();

// Тестовые данные
let testData = {
  content: [
    {
      id: "67e84d8a26054e6d4674640e",
      name: "Rukkola",
      type: "Herbaceous plant",
      difficulty: "Easy",
      characteristic: {
        water: {
          when: "Water when the topsoil is dry",
          tip: "Prefers regular but not heavy watering",
          difficulty: "Easy",
        },
        light: {
          preferredLight: "Sunny location or partial shade",
          suitableWith: "Suitable for south or east-facing windows",
        },
        toxicity: {
          toxicTo: "Non-toxic",
          power: "Safe for pets",
        },
        humidity: {
          scale: "Moderate humidity",
          ratio: "40–60%",
        },
        common_problems: {
          name: "Root rot",
          detail: "Occurs if soil is overwatered",
        },
        common_pests: {
          name: "Aphids",
          detail: "Often found on young leaves",
        },
        liquid_fertilizing: "Fertilize every 2 weeks with organic fertilizer",
        temperatures: {
          sentence: "Grows best in temperatures between 10°C and 25°C",
          start: 10,
          end: 25,
          indoorMonths: "October – March",
          outDoorMonths: "April – September",
        },
        clean: "Remove dry and yellowing leaves regularly",
        leaves: {
          color: "Green",
          type: "Pinnate, narrow",
        },
        dimensions: {
          beginHeight: 10,
          endHeight: 30,
          beginSpread: 5,
          endSpread: 20,
        },
      },
      images: ["67e85dbd4539f1454e250655", "67e85e014539f1454e250657"],
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 3,
    totalPages: 1,
  },
};

// Тест
function createWrapper() {
  return mount(GuidePage, {
    global: {
      plugins: [Quasar],
    },
  });
}

describe("tests for GuidePage", () => {
  it("should find plantInfoTestId data-testid and child components", async () => {
    const wrapper = createWrapper();

    wrapper.vm.plantInfo.content = testData.content;

    // Даем время для рендеринга и асинхронных операций
    await flushPromises();
    await nextTick();

    // Проверка существования parent элемента
    const sectionEl = wrapper.find('[data-testid="plantInfoTestId"]');
    expect(sectionEl.exists()).toBe(true);
  });

  it("should check the itemSection data-testid", async () => {
    const wrapper = createWrapper();
    wrapper.vm.plantInfo.content = testData.content;
    await flushPromises();
    await nextTick();

    const itemSectionEl = wrapper.findAll('[data-testid="itemSection"]');
    console.log(wrapper.vm.plantInfo);
    console.log(itemSectionEl);

    // // Дополнительные проверки для других элементов
    // const plantItemEls = wrapper.findAll("q-item");
    // expect(plantItemEls.length).toBe(testData.content.length);
  });
});
