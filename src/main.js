// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import router from './router';

// import 'material-design-icons/iconfont/material-icons.css';

import KeenUI from 'keen-ui';
import storage from './storage.js';
import R from 'ramda';
import 'keen-ui/dist/keen-ui.css';

Vue.use(KeenUI);
Vue.use(storage);
Vue.use(R);
/* eslint-disable no-new */
new Vue({
  el         : '#app',
  router,
  template   : '<App/>',
  components : {App}
});
