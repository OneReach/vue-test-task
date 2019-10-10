<template>
  <li>
    <ui-checkbox v-model="task.complete" @change="saveStatus" color="clear">{{ task.name }}</ui-checkbox>
  </li>
</template>

<script>
  export default {
    name: 'todoItem',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    methods: {
      saveStatus() {
        this.$emit('savedStatus', {
          name: this.task.name,
          complete: this.task.complete
        })
      }
    }
  }
</script>

<style lang="scss">
  .tasks {
    .complete {
      text-decoration: line-through;
    }

    // keen ui reset
    .ui-checkbox__checkmark::after {
      border-bottom-color: #333 !important;
      border-right-color: #333 !important;
    }
  }
</style>
