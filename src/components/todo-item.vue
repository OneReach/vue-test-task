<template>
    
        <ui-checkbox :label="task.name" :class="task.complete?'task_complete':'task'" v-model="task.complete" /></ui-checkbox>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        props:['task'],
    };
</script>

<style scoped lang="scss">
    .task{
        &_complete{
            text-decoration: line-through;
        }
    }
</style>
