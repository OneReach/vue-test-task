import Vue from 'vue';
import Router from 'vue-router';
import todo from 'components/todo';
import Result from 'components/Result';

Vue.use(Router);

export default new Router({
  routes : [
    {
      path      : '/initial',
      name      : 'todo',
      component : todo
    },
    {
      path      : '/',
      name      : 'result',
      component : Result
    },
  ]
})
