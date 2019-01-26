import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { messages } from '../locales';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages
})

const loadedLocales = ['en'];

const setI18nLocale = (locale: string): string => {
  i18n.locale = locale;
  axios.defaults.headers.common['Accept-Language'] = locale;

  const htmlTag = document.querySelector('html');

  if (htmlTag) {
    htmlTag.setAttribute('lang', locale);
  }

  return locale;
}

export function loadLanguageAsync (locale: string): Promise<string> {
  if (i18n.locale !== locale) {
    if (!loadedLocales.includes(locale)) {
      return Promise.all([
        import(`../locales/${locale}`),
        import(`vee-validate/dist/locale/${locale}`)
      ]).then(([localeModule, validateLocale]) => {
        const localeMessages = {
          ...localeModule[locale],
          validations: validateLocale.default.messages
        };

        i18n.setLocaleMessage(locale, localeMessages);
        loadedLocales.push(locale);

        return setI18nLocale(locale);
      });
    }

    return Promise.resolve(setI18nLocale(locale));
  }

  return Promise.resolve(locale);
}
