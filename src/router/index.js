import Vue from 'vue';
import Router from 'vue-router';
import todo from 'components/todo';
import todoItem from 'components/todoItem';

Vue.use(Router);

export default new Router({
  routes : [
    {
      path      : '/',
      name      : 'todo',
      component : todo
    },
    {
      path: '/task/:id',
      component: todoItem,
      name: 'todoItem',
      props: true
    }
  ]
})
