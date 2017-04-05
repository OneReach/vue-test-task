<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs v-if="tasks.length" class="tasks-tabs" backgroundColor="clear" textColorActive="white">
            <ui-tab title="Pending">
                <ul v-if="pendingTasks.length" class="tasks">
                    <tasks-item v-for="task in pendingTasks" :task="task" :key="task.id"></tasks-item>
                </ul>
                <div v-else="" class="msg-no-pending-tasks">
                    <h3> Congratulations! </h3>
                    <p> All the tasks are completed. </p>
                </div>
            </ui-tab>
            <ui-tab title="Completed">
                <ul v-if="completedTasks.length" class="tasks">
                    <tasks-item v-for="task in completedTasks" :task="task" :key="task.id"></tasks-item>
                </ul>
                <div v-else="" class="msg-no-completed-tasks">
                    <h3> Start doing smth! </h3>
                    <p> There is no completed tasks yet. </p>
                </div>
            </ui-tab>
        </ui-tabs>
        <div v-else="" class="msg-no-any-task">
            <h3> Hey! </h3>
            <p> There is no one task yet... </p>
            <p> Add some in the input field below. </p>
        </div>
        <div>
            <form class="form-add-new-item" @submit.prevent="addTask" novalidate>
                <ui-textbox
                    class="inp-add-new-item"
                    placeholder="e.g. 'read vue.js guide'"
                    required
                    :invalid="newTaskNameTouched && newTaskName.length === 0"
                    @touch="newTaskNameTouched = true"
                    error="The task name should't be empty..."
                    v-model="newTaskName" >
                </ui-textbox>
                <ui-button
                    class="btn-rounded btn-add-new-item"
                    color="primary"
                    buttonType="submit"
                    icon="add"
                >
                    Add
                </ui-button>
            </form>
        </div>
    </div>
</template>

<script>
    import tasksItem from "./tasksItem.vue"

    export default {
        data () {
            return {
                newTaskName: '',
                newTaskNameTouched: false,
                tasks: [
                    {name: 'create skeleton of todo', complete: true, id: 1},
                    {name: 'add ability to add tasks', complete: true, id: 2},
                    {name: 'clear task name after clicking "Add"', complete: true, id: 3},
                    {name: 'put "Add" button in one line with input', complete: true, id: 4},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true, id: 5},
                    {name: 'replace <input> with <ui-checkbox> in tasks list', complete: true, id: 6},
                    {name: 'when task is complete cross it out', complete: true, id: 7},
                    {name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true, id: 8},
                    {name: 'don\'t allow to add empty tasks', complete: true, id: 9},
                    {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true, id: 10},
                    {name: 'extract list item into a separate vue.js component', complete: true, id: 11},
                    {name: 'persist tasks list in a local storage', complete: false, id: 12},
                    {name: 'add animation on task completion', complete: false, id: 13},
                ]
            }
        },
        methods : {
            addTask () {
                if(!this.newTaskName) {
                    this.newTaskNameTouched = true;
                    return false;
                }
                //item ids are crucial for discriminating separate items and helps to avoid bugs
                this.tasks.push({name: this.newTaskName, complete: false, id: Math.random()});
                this.newTaskName = '';
                this.newTaskNameTouched = false;
            },

        },
        computed: {
            pendingTasks: function () {
                return this.tasks.filter( task => !task.complete )
            },
            completedTasks: function () {
                return this.tasks.filter( task => task.complete )
            }
        },
        components: {
            tasksItem
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        max-height: 100%;
        min-height: 350px;
        display: flex;
        flex-direction: column;

        .title {
            margin-top: 0;
        }

        .tasks-tabs {

            .tasks {
                list-style: none;
                padding: 0;
                margin: 0 auto;
                min-height: 5em;
                max-height: calc(100vh - 235px);
                overflow-y: auto;
            }
        }

        .form-add-new-item {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .inp-add-new-item {
                flex-grow: 1;
            }

            .btn-add-new-item {
                margin: 0 5px;
            }
        }
    }
</style>

<style lang="scss">
    // Definition of customized styles for ui-tabs. WARNING! Needs not to be in "scoped" styles
    .tasks-tabs {
        .ui-tab-header-item {
            height: 2rem;
            border-radius: 100em;

            &.is-active {
                background-color: #A7ACB0;
                color: white;

                &:hover,
                &:focus {
                    background-color: #a1a6aa;
                    color: white;
                }
            }
        }

        .ui-tabs__body,
        .ui-tabs__header + .ui-tabs__body.ui-tabs__body {
            border: none;
        }

        .ui-tabs__active-tab-indicator.ui-tabs__active-tab-indicator {
            display: none;
        }
    }
</style>
