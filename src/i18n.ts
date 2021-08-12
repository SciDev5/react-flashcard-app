import i18next, { InterpolationOptions, TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import languageEN from "./translations/en/en.json";


let t:TFunction;

const isDeveloper = process.env.NODE_ENV === "development";

const i18n = i18next.use(LanguageDetector).use(initReactI18next).init({
    /* debugger For Development environment */
    debug: isDeveloper,

    resources: {
        en: languageEN
    },
    supportedLngs: ["en"],
    // Disable language fallbacks in dev mode to more easily find missing translation key problems.
    fallbackLng: isDeveloper ? false : "en",
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ",",
        format: (value?:unknown, format?:string, lang?:string, options?: (InterpolationOptions & { [key: string]: unknown; })):string => {
            switch (format) {
            case "number":
                if (typeof(value) === "number")
                    return value.toLocaleString(lang);
                else return t("general.error.format.typeMismatch");
            default: return t("general.error.format.noFormat");
            }
        }
    },
    react: {
        bindI18n: "languageChanged loaded",
        nsMode: "default",
        useSuspense: true
    }
},(e,tIn)=>{
    if (e) throw e;
    else t=tIn;
});

export default i18n;
