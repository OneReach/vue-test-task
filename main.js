import Vue from 'vue';
// eslint-disable-next-line import/extensions
import App from './App.vue';
import store from '../store';
import 'keen-ui/dist/keen-ui.min.css';
import LsService from '../services/lsService';

Vue.config.productionTip = false;
Vue.prototype.$lsService = new LsService();

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
