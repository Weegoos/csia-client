import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import IndexPage from "src/pages/IndexPage.vue";
import { describe, expect, it, vi } from "vitest";
import { getMethod } from "src/composables/apiMethod/get";

installQuasarPlugin();

let testData = [
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
  {
    id: "67e84fccf009297bde2d8e38",
    name: "Watercress",
    type: "Herbaceous plant",
    difficulty: "Moderate",
    characteristic: {
      water: {
        when: "Keep soil consistently moist, but not waterlogged",
        tip: "Requires frequent light watering, especially during germination",
        difficulty: "Moderate",
      },
      light: {
        preferredLight: "Bright, indirect sunlight or partial shade",
        suitableWith: "Suitable for east or north-facing windows",
      },
      toxicity: {
        toxicTo: "Non-toxic",
        power: "Safe for pets and children",
      },
      humidity: {
        scale: "Moderate to high humidity",
        ratio: "50–70%",
      },
      common_problems: {
        name: "Wilting",
        detail:
          "Can occur if the soil dries out too quickly or receives too much direct sun",
      },
      common_pests: {
        name: "Flea beetles",
        detail: "May create small holes in leaves",
      },
      liquid_fertilizing:
        "Fertilize every 3 weeks with diluted organic fertilizer",
      temperatures: {
        sentence: "Thrives in cool temperatures between 10°C and 20°C",
        start: 10,
        end: 20,
        indoorMonths: "October – March",
        outDoorMonths: "April – September",
      },
      clean:
        "Trim overgrown stems and remove yellow leaves to encourage fresh growth",
      leaves: {
        color: "Green",
        type: "Small, oval to slightly serrated",
      },
      dimensions: {
        beginHeight: 5,
        endHeight: 15,
        beginSpread: 3,
        endSpread: 10,
      },
    },
    images: [],
  },
];

vi.mock("src/composables/apiMethod/get", () => ({
  getMethod: vi.fn(() => Promise.resolve({ data: testData })),
}));

describe("tests for IndexPage", () => {
  const wrapper = mount(IndexPage, {
    global: {
      plugins: [Quasar],
    },
  });
  it("should find indexPageMainText data-testid", () => {
    const indexPageMainText = wrapper.find('[data-testid="indexPageMainText"]');
    expect(indexPageMainText.exists()).toBe(true);
    expect(indexPageMainText.text()).toContain("Good");
    expect(indexPageMainText).toMatchSnapshot();
  });
});
