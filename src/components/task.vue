<template>
    <div class="task">
        <ui-checkbox v-model="task.complete"><span>{{task.name}}</span></ui-checkbox>
        <ui-button type="secondary" size="small" color="default" @click="$emit('deleteTask', task.id)" icon="delete"></ui-button>
    </div>
</template>

<script>
    export default {
        props: ['task']
    };
</script>

<style scoped lang="scss">
    $delete-button-width: 50px;

    .task {
        display: flex;
        align-items: center;
    }

    .ui-checkbox {
        max-width: calc(100% - #{$delete-button-width} - 10px);
    }

    .ui-button {
        min-width: $delete-button-width;
        margin-left: auto;
    }
</style>