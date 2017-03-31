<template>
  <li class="todo__item">
    <ui-checkbox
      :value="isComplete"
      :label="name"
      @change="$emit('toggle')"
    />
  </li>
</template>

<script>
export default {
  props: ['name', 'complete'],
  data: function() {
    return {
      isComplete: this.complete
    }
  }
}
</script>

<style lang="css">
  .todo__item {
    display: flex;
    margin-bottom: 10px;
    font-weight: bold;
    transition: all 1s;
  }
</style>
