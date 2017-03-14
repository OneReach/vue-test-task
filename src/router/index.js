import Vue from 'vue';
import Router from 'vue-router';
import todo from 'components/todo';

Vue.use(Router);

export default new Router({
  routes : [
    {
      path      : '/',
      name      : 'todo',
      component : todo,
    }
  ]
})
