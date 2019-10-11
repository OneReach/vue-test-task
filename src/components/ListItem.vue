<template>
  <transition-group name="animated" tag="ul">
    <li
      v-for="task in tasks"
      :key="task.name"
      :class="{complete : task.complete}"
      class="animated-task"
    >
      <ui-checkbox v-model="task.complete">
        {{task.name}}
      </ui-checkbox>
    </li>
  </transition-group>
</template>

<script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true,
      }
    },
    data () {
      return {
        
      }
    },
  };
</script>

<style scoped lang="scss">

  .animated-task {
    display: inline-block;
  }

  .animated-leave-active {
    transition: all 1s;
  }

  .animated-leave-to, .complete {
    text-decoration: line-through;
  }
</style>