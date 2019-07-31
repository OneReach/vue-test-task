<template>
  <li class="todo-item">
    <ui-checkbox
      :id="todo.id"
      :value="todo.isChecked"
      class="todo-item__checkbox"
      color="primary"
      @change="handleCheck"/>
    <span :class="['todo-item__text', { checked: todo.isChecked }]">{{ todo.text }}</span>
    <button v-show="todo.isChecked" class="todo-item__button" @click="deleteTodo(todo.id)">delete</button>
  </li>
</template>

<script>
import { UiCheckbox } from 'keen-ui';
import { mapActions } from 'vuex';

export default {
  name: 'TodoItem',
  components: {
    UiCheckbox,
  },
  props: {
    id: {
      type: String,
      default: 'todo',
    },
    todo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['checkTodo', 'deleteTodo']),
    handleCheck(isChecked) {
      const id = this.id;
      this.checkTodo({ id, isChecked });
      this.$emit('check');
    },
  },
};
</script>

<style lang="scss">
@import 'todo-item';
</style>
