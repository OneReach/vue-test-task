<template>
    <ul class="tasks">
        <transition-group name="list-complete">
            <li v-for="task in list" v-if="task.complete === complete" :key="task" :class="{ 'complete':task.complete }" class="list-complete-item">
                <ui-checkbox v-model="task.complete" @click.native="updateTask(task)">{{ task.name }}</ui-checkbox>
            </li>
        </transition-group>
    </ul>
</template>

<script>
    export default {
        props : ['list', 'complete'],
        methods : {
            updateTask (item) {
                let task = JSON.parse(localStorage[item.id]);
                task.complete = item.complete;
                localStorage[item.id] = JSON.stringify(task);
            }
        },
    }
</script>

<style scoped lang="scss">
    .tasks {
        .complete {
            color: #bababa;
            text-decoration: line-through;
        }
        .list-complete-item {
            transition: all .6s;
        }
        .list-complete-enter {
            opacity: 0;
            transform: translateY(100px);
        }
        .list-complete-leave-to {
            opacity: 0;
            transform: scale(0);
        }
        .list-complete-leave-active {
            position: absolute;
        }
    }
</style>