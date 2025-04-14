import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "../i18n/en-US/index";

export default boot(({ app }) => {
  const savedLocale = localStorage.getItem("locale") || "en-US";
  const i18n = createI18n({
    locale: savedLocale,
    globalInjection: true,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
