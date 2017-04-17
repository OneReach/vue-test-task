<template>
    <transition name="tasks-item-fade">
        <li :class="['tasks-item', {complete: task.complete}]">
            <label>
                <ui-checkbox v-model="task.complete" >
                    {{task.name}}
                </ui-checkbox>
            </label>
        </li>
    </transition>
</template>

<script>
    export default {
        props: ["task"]
    };
</script>

<style lang="scss">
    .tasks-item {
        &.complete {
            text-decoration: line-through;
        }
    }

    .tasks-item-fade-enter-active {
        transition: all .3s ease;
    }
    .tasks-item-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .tasks-item-fade-enter, .tasks-item-fade-leave-to
        /* .tasks-item-fade-leave-active for <2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }
</style>
