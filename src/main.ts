import Vue from "vue";
import App from "./App.vue";

import router from './router'
/* eslint-disable */
Vue.config.productionTip = false;


const _Vue = Vue as any //定义为any类型，仅仅是防止ts函数重载错误。

new _Vue({
  router,
  render: (h: Function) => h(App),
}).$mount("#app");
