import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { i18n } from './i18n';
import validationMessages from 'vee-validate/dist/locale/en';

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validations',
  dictionary: {
    en: validationMessages
  }
});
