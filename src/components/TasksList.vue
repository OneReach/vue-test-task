<template>
    <ul class="tasks-list">
        <li
            v-for="task in tasks"
            :key="task.id"
            :class="taskClasses(task)"
        >
            <ui-checkbox
                v-model="task.complete"
                class="tasks-list__input"
                color="primary"
                @change="setTaskState(task.complete)"
            >
                {{task.name}}
            </ui-checkbox>
            <span
                class="tasks-list__del"
                @click="removeTask(task.id)"
            >
                delete
            </span>
        </li>
    </ul>

</template>

<script>
    export default {
        name : 'tasksList',
        props: {
            tasks: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            taskClasses({ complete }) {
                return  ['tasks-list__task', {'tasks-list__task--complete' : complete}]
            },
            removeTask(taskId) {
                this.$emit('remove', taskId)
            },
            setTaskState(currentTaskState) {
                this.$emit('set-task-state', currentTaskState)
            }
        }
    };
</script>

<style lang="scss">
    .tasks-list {
        list-style: none;
        padding: 0;

        &__del {
            display: none;
            cursor: pointer;
            color: #ff253e;
            position: absolute;
            top: 3px;
            right: 0;
        }

        &__task {
            position: relative;
            padding-right: 60px;

            &:hover {
                .tasks-list__del {
                    display: inline;
                }
            }
        }

        &__task {
            &--complete {
                .tasks-list__input {
                    text-decoration: line-through;
                }
            }
        }
    }
</style>
