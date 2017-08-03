<template>
    <ul class="tasks">
        <transition-group name="task">
            <li
                v-for="task, index in tasks"
                v-if="task.complete === completed"
                :class="{complete : task.complete}" :key="index"
                >
                <ui-checkbox v-model="task.complete">{{task.name}}</ui-checkbox>
            </li>
        </transition-group>
    </ul>
</template>

<script>
  export default {
    props: ['tasks', 'completed']
  }
</script>

<style scoped lang="scss">
    .tasks {
        padding: 0;
        list-style: none;
    }

    .ui-tabs__body {
        height: 325px;
        overflow: auto;
    }

    .complete {
        text-decoration: line-through;
    }

    .task-leave-active {
        text-decoration: line-through;
        transition: all .5s;
    }

    .task-leave-to {
        opacity: 0;
    }
</style>
