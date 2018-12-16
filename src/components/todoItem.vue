<template>
  <transition name="fade">
    <ui-checkbox v-model="task.complete" :label="task.name" @change="editTask"></ui-checkbox>
  </transition>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    task: Object
  },
  methods: {
    editTask() {
      this.$emit("editTask");
    }
  }
};
</script>

<style scoped>
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter {
  transform: translateY(200px);
  opacity: 0;
}
</style>
