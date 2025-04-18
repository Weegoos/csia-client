import { vi, beforeEach, beforeAll } from "vitest";

// This file will be run before each test file

beforeEach(() => {
  vi.mock("src/boot/config.js", () => ({
    serverURL: "https://csia-back.onrender.com/",
    clientURL: "https://kazplant.netlify.app/#/",
    maxItemsPerPage: 10,
    mobileWidth: 800,
  }));

  vi.mock("axios");

  vi.mock("src/stores/notify-store", () => ({
    useNotifyStore: () => ({
      loading: vi.fn(),
      notifyError: vi.fn(),
    }),
  }));
  vi.mock("src/composables/javascript-function/token.js", () => ({
    checkAccessToken: vi.fn(() => true),
  }));

  vi.mock("vue-router", () => {
    return {
      useRoute: () => ({
        params: {},
        query: {},
      }),
      useRouter: () => ({
        push: vi.fn(),
      }),
    };
  });

  vi.mock("src/composables/apiMethod/get", () => ({
    getMethod: vi.fn().mockResolvedValue({}), // можно вернуть мок-данные
  }));
});
