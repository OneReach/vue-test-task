<template>
    <div class="todo__container">
        <div class="todo__header">
            <h1 class="todo__title">Checklist</h1>
            <ui-icon-button has-dropdown color="black" icon="more_vert" :size="size" type="secondary">
                <div class="todo__dropdown" slot="dropdown">
                    <p><b>The checklist</b></p>
                    <p class="todo__dropdown-text">The task manager is here to help you to conquer your goal! Good luck!</p>
                </div>
            </ui-icon-button>
        </div>
        <div class="tabs">
            <ui-button @click="changeTab(1)"
                       v-bind:class="{ 'tabs--active': isPendingTasks, 'tabs__btn': true }"
                       :color="{'primary': isPendingTasks}"
            >Pending
            </ui-button>
            <ui-button @click="changeTab(2)"
                       v-bind:class="{ 'tabs--active': !isPendingTasks, 'tabs__btn': true }"
                       :color="{'primary': !isPendingTasks}"
            >Completed
            </ui-button>
        </div>
        <div class="tasks__wrapper">
            <ul class="tasks" v-if="isPendingTasks">
                <li class="task" v-for="(task, index) in tasks" v-if="!task.complete">
                    <label>
                        <ui-checkbox v-model="task.complete">
                            <span>{{task.name}}</span>
                        </ui-checkbox>
                    </label>
                </li>
            </ul>
            <ul class="tasks" v-if="!isPendingTasks">
                <li class="task" v-for="(task, index) in tasks" v-if="task.complete">
                    <label>
                        <ui-checkbox v-model="task.complete">
                            <span v-bind:class="{ 'task--completed': task.complete }">{{task.name}}</span>
                        </ui-checkbox>
                    </label>
                </li>
            </ul>
        </div>

        <div class="toolbar">
            <ui-textbox placeholder="Add an item here" v-model="newTaskName" class="toolbar__input"></ui-textbox>
            <ui-button @click="addTask" color="primary" class="toolbar__btn">Add item</ui-button>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                newTaskName: '',
                isPendingTasks: true,
                tasks: []
            }
        },

        methods: {
            addTask() {
                if (this.newTaskName) {
                    this.tasks.push({name: this.newTaskName, complete: false})
                    this.newTaskName = '';
                }
            },
            changeTab(num) {
                if (num === 1) {
                    this.isPendingTasks = true;
                } else {
                    this.isPendingTasks = false;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    $active-color: #a7adb1;
    $text-color: #353535;
    $items-size: 14px;

    %space-between {
        display: flex;
        justify-content: space-between;
    }

    @mixin button($scale) {
        border-radius: 50px;
        transform: scale($scale);
        cursor: pointer;
    }

    .todo {
        &__container {
            width: 300px;
            padding: 20px;
            align-self: center;
            background-color: #fff;
            color: $text-color;
        }
        &__header {
            @extend %space-between;
        }
        &__title {
            font-size: $items-size * 2;
            line-height: 0;
        }
        &__dropdown {
            padding: 10px;
            &-text {
                width: 200px;
            }
        }
    }

    .tabs {
        &__btn {
            @include button(0.9);
            color: #d5d5d8;
        }
        &--active {
            background-color: $active-color;
        }
    }

    .tasks {
        padding-left: 15px;
        list-style: none;
        &__wrapper {
            min-height: 130px;
        }
    }

    .task {
        &--completed {
            text-decoration: line-through;
        }
    }

    .toolbar {
        @extend %space-between;
        &__input {
            width: 58%;
            font-size: $items-size;
        }
        &__btn {
            @include button(0.9);
        }
    }

    .ui-checkbox__checkmark {
        transform: scale(0.8);
    }
</style>
