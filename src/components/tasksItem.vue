<template>
    <li :class="['tasks-item', {complete: task.complete}]">
        <label>
            <ui-checkbox v-model="task.complete" >
                {{task.name}}
            </ui-checkbox>
        </label>
    </li>
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
</style>
