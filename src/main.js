// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import router from './router';

// import 'material-design-icons/iconfont/material-icons.css';

import { store } from './store/store'
import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

Vue.use(KeenUI);

/* eslint-disable no-new */
new Vue({
    el         : '#app',
    router,
    store,
    template   : '<App/>',
    components : {App}
});
