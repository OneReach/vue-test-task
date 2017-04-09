<template>
    <ui-checkbox v-model="task.complete" :label="task.name" @change="onChange" />
</template>

<script>
    export default {
        props: ['task', 'taskId'],
        methods: {
            onChange () {
                this.$emit('changed', this.taskId, this.task);
            }
        }
    }
</script>
