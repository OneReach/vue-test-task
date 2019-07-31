<template>
  <div class="todo">
    <h1>Checklist</h1>
    <div class="todo-filter">
      <button :class="['todo-filter__button', { active: !filter }]" @click="filterTodos(filter = false)">Pending</button>
      <button :class="['todo-filter__button', { active: filter }]" @click="filterTodos(filter = true)">Completed</button>
    </div>
    <transition-group name="fade" class="todo__list" tag="ul">
      <todo-item
        v-for="todo in todos"
        v-show="todo.isVisible"
        :id="todo.id"
        :key="todo.id"
        :todo="todo"
        @check="addBtnAnim"/>
    </transition-group>
    <todo-footer v-model="inputValue" @change="pushTodo"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import TodoFooter from '../TodoFooter';
import TodoItem from '../TodoItem';

export default {
  name: 'Todo',
  components: {
    TodoFooter,
    TodoItem,
  },
  data() {
    return {
      inputValue: '',
      filter: false,
    };
  },
  computed: {
    ...mapGetters(['todos']),
  },
  created() {
    this.SET_TODOS(this.$lsService.getItem('todos'));
    this.filterTodos(this.filter);
  },
  methods: {
    ...mapMutations(['SET_TODOS']),
    ...mapActions(['addTodo', 'filterTodos']),
    pushTodo() {
      const todo = {
        text: this.inputValue,
        id: this.id(),
        isChecked: false,
        isVisible: true,
      };
      setTimeout(() => {
        this.addAnimation();
      }, 0);
      this.addTodo(todo);
      this.filterTodos(this.filter);
      this.$lsService.setItem('todos', this.todos);
    },
    addAnimation() {
      const item = document.querySelectorAll('.todo-item')[document.querySelectorAll('.todo-item').length - 1];
      item.classList.add('slide');
      setTimeout(() => {
        item.classList.remove('slide');
      }, 500);
    },
    id() {
      return Math.random().toString(36).substr(2, 9);
    },
    addBtnAnim() {
      this.filterTodos(this.filter);
      document.querySelectorAll('.todo-filter__button').forEach((el) => {
        if (el.classList.length === 1) {
          el.classList.add('zoom');
          setTimeout(() => {
            el.classList.remove('zoom');
          }, 500);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import 'todo';
</style>
