import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./locales/en.json";
import VI from "./locales/vi.json";

const resources = {
  en: {
    translation: EN,
  },
  vi: {
    translation: VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
