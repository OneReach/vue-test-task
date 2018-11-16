<template>
    <transition-group name="animation" @after-leave="afterLeave" tag="ul" class="tasks">
        <li v-for="task in tasks" :key="task.name" v-bind:class="{task_completed : task.complete}">
            <ui-checkbox v-model="task.complete">{{task.name}}</ui-checkbox>
        </li>
    </transition-group>
</template>

<script>
    export default {
        name    : 'task-list',
        props   : ['tasks'],
        methods : {
            afterLeave : function (el) {
                this.$parent.$emit('scaleAnimation');
            }
        }
    };
</script>

<style scoped lang="scss">

    .tasks {
        list-style: none;
        padding: 0;
        overflow-y: auto;
        max-width: 100%;
        width: 500px;
        height: 300px;
        .task {
            &_completed {
                text-decoration: line-through;
            }
        }
    }

    .animation {

        &-leave-active {
            transition: all .5s;
        }
        &-leave-to {
            text-decoration: line-through;
            opacity: 0;
        }
        &-leave-to.tasks__complete {
            text-decoration: none;
        }
    }
</style>
