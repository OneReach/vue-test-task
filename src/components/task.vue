<template>
    <li>
        <label :class="{complete : task.complete}" >
            <input class="task-checkbox" type="checkbox" v-model="task.complete" /> {{task.name}}
        </label>
    </li>
</template>
<script>
export default {
  name: 'task',
  props: {task:Object}
}
</script>
<style scoped lang="scss">
.complete 
{
    text-decoration:line-through;
}
</style>