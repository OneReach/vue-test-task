<template>
  <li class="item">
    <ui-checkbox
      :name="task.name"
      :value="task.complete"
      :label="task.name"
      :checked="task.complete"
      v-on:change="toggleComplete(task)"
      />
  </li>
</template>

<!-- <input
  type="checkbox"
  v-model="task.complete"
  class="ui-checkbox__input"
  checked="true"
  />
  <div class="ui-checkbox__checkmark">
    <div class="ui-checkbox__focus-ring"></div>
  </div>
{{ task.name }} -->
<!-- <ui-checkbox
  v-model="task.complete"
  :label="task.name"
  /> -->

<script>
export default {
  props: ['task'],
  methods: {
    toggleComplete: function (task) {
      task.complete = !task.complete
    }
  }
}
</script>

<style lang="css">
  .item {
    display: inline-flex;
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>
