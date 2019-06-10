<template>
        <ul class="tasks">
            <task v-for="task in tasks"  :task="task" @change:task="changeTask"/>
        </ul>
</template>

<script>
    import task from './task.vue';

    export default {
        props: {
            tasks: Array,
            changeTask: Function,
        },
        methods : {
            taskChecked (id) {
                this.$emit('change:task', id );
            }
        },
        components: {
            task,
        },
    };
</script>

<style scoped lang="scss">
    .tasks {
        list-style: none;
        padding: 0;
        max-height: 500px;
        overflow: scroll;
    }
</style>
