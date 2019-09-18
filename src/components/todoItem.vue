<template>
  <div class="todo">
    <div v-for="task in todoItem" :key="task.id">
      <h3>{{task.name}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  computed: {
    todoItem() {
      return this.$store.getters.todoItem(this.id)
    }
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      this.$store.commit('loadTasks', JSON.parse(localStorage.getItem('tasks')));
    }
  }
};
</script>

<style scoped lang="scss">

</style>