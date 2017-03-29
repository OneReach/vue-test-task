<template>
  <li class="todo__item">
    <ui-checkbox
      :value="isComplete"
      :label="name"
      @change="toggleComplete"
      />
  </li>
</template>

<!-- <label>
  <input
    type="checkbox"
    v-model="complete"
    class="ui-checkbox__input"
    checked="true"
    />
    <div class="ui-checkbox__checkmark">
      <div class="ui-checkbox__focus-ring"></div>
    </div>
  {{ name }}
</label> -->
<!-- <ui-checkbox
  v-model="task.complete"
  :label="task.name"
  /> -->

<script>
export default {
  props: ['name', 'complete'],
  data() {
    return {
      isComplete: this.complete
    }
  },
  methods: {
    toggleComplete: function () {
      this.isComplete = !this.isComplete
      console.log(this.isComplete);
    }
  }
}
</script>

<style lang="css">
  .todo__item {
    display: inline-flex;
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>
