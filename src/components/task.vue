<template>
    <li :class="{checked : task.checked,complete: task.complete}"  class="task" v-bind:key="task.id">
        <label class="task__label">
            <ui-checkbox @change="taskChecked(task.id)" :value="task.checked" class="task__checkbox"/>
            {{task.name}}
        </label>
    </li>
</template>

<script>
    export default {
        props: {
            task: Object,
        },
        methods : {
            taskChecked (id) {
                this.$emit('change:task', id );
            }
        },

    };
</script>

<style scoped lang="scss">
    .task {
        list-style: none;
        padding: 0;
        max-height: 400px;
        overflow: scroll;
        &__label {
            display: flex;
            margin-bottom: 10px;
            opacity: 1;
        }
        &__checkbox {
            margin-right: 20px;
            margin-bottom: 0;
        }
        .checked &__label {
            text-decoration: line-through;
            transition: opacity .3s;
            opacity: 0;
        }

        .complete &__label {
            transition: opacity .3s;
            opacity: 0;
        }

        .checked.complete &__label {
            opacity: 1;
            text-decoration: none;
            transition: opacity .3s;
        }

    }



</style>