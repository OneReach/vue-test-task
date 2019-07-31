<template>
  <form class="todo-footer" @submit.prevent="submitHandle">
    <ui-textbox v-model="input" class="todo-footer__input" placeholder="add an item here"/>
    <ui-button class="todo-footer__button" size="small" color="primary">Add item</ui-button>
  </form>
</template>

<script>
import { UiTextbox, UiButton } from 'keen-ui';

export default {
  name: 'TodoFooter',
  components: {
    UiTextbox,
    UiButton,
  },
  model: {
    prop: 'inputValue',
    event: 'change',
  },
  props: {
    inputValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: this.inputValue,
    };
  },
  methods: {
    submitHandle() {
      if (!this.input) return;
      this.$emit('change', this.input);
      this.input = '';
    },
  },
};
</script>

<style lang="scss">
@import 'todo-footer';
</style>
