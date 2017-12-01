<template>
  <li :class="{ complete: task.complete }">
      <label>
        <ui-checkbox
          v-if="!task.complete"
          v-model="task.complete"
          :label="task.name"
          @change="$emit('change')"
        />
        <span :style="{ marginLeft: '28px' }" v-else>{{ task.name }}</span>
      </label>
  </li>
</template>

<script>
  export default {
    props: ['task']
  }
</script>

<style scoped lang="scss">
  .complete {
    text-decoration: line-through;
  }
  
  .tasks-leave-active.complete {
    text-decoration: none;
  }
</style>