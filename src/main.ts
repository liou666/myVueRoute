import Vue from "vue";
import App from "./App.vue";

import router from './router'
/* eslint-disable */
Vue.config.productionTip = false;


const _Vue = Vue as any

new _Vue({
  router,
  render: (h: Function) => h(App),
}).$mount("#app");
