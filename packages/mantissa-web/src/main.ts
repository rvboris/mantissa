import Vue from 'vue';
import './plugins/vuetify';
import App from './app.vue';
import { router } from './router';
import store from './store';
import './register-service-worker';
import { createProvider } from './plugins/vue-apollo';
import { i18n } from './plugins/i18n'
import './plugins/vee-validate';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  i18n,
  render: (h) => h(App)
}).$mount('#app');
