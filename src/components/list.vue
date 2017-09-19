<template>
  <list-animation>
    <li v-for="task in tasks" :key="task.id" :class="{tasks__complete : task.complete}">
      <ui-checkbox v-model="task.complete">{{task.name}}</ui-checkbox>
    </li>
  </list-animation>
</template>

<script>
  import listAnimation from "./list-animation";

  export default {
    components: {
      listAnimation
    },

    props: ["tasks"]
  };
</script>

<style lang="scss">
  .tasks {
    list-style: none;
    padding: 0;
    overflow-y: auto;
    max-width: 100%;
    width: 600px;
    height: 350px;

    &__complete {
      text-decoration: line-through;
    }
  }
</style>