<template>
    <transition-group name="list" tag="li" class="tasks">
        <li v-bind:key="task" v-for="task in completedTasks" :class="{complete : task.complete}">
            <label>
                <ui-checkbox type="checkbox" v-model="task.complete" />
                    {{task.name}}
            </label>
        </li>
    </transition-group>
</template>
<script>
export default {
  name: 'completed',
  props: ['completedTasks']
}
</script>
<style scoped lang="scss">
.ui-checkbox {
  display: inline-flex;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.complete {
  text-decoration: line-through;
  }
</style>
