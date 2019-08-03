<template>
    <div class="task" v-bind:class="{complete: task.complete}">
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
    .task {
        display: flex;
        align-items: center;
    }

    .ui-checkbox {
        max-width: calc(100% - 60px);
        
        span {
            display: inline;
            background-image: linear-gradient(to bottom, transparent 20%, currentColor 21%);
            background-repeat: no-repeat;
            background-size: 0% 2px;
            background-position: 0 0.5em;
            transition: background-size 0.3s ease-in-out 0.2s;

            .complete & {
                background-size: 100% 2px;
            }
        }
    }

    .ui-button {
        min-width: 50px;
        margin-left: auto;
    }
</style>