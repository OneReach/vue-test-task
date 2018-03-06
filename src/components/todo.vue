<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs>
            <ui-tab title="pending">
                <ul class="tasks" v-if="tasks.length">
                    <template v-for="task in tasks">
                        <list-item :task="task"></list-item>
                    </template>
                </ul>
                <span v-else>
                    No pending tasks
                </span>
            </ui-tab>
            <ui-tab title="complete">
                <ul class="tasks" v-if="tasks.length">
                    <template v-for="task in tasks">
                        <list-item :task="task" :show="true"></list-item>
                    </template>
                </ul>
                <span v-else>
                    No completed tasks
                </span>
            </ui-tab>
        </ui-tabs>

        <div class="flex-row">
            <ui-textbox placeholder="e.g. 'read vue.js guide'"
                        v-model="newTaskName"
                        @keydown-enter="hitting()"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import listItem from './list-item';

    export default {
        data() {
            return {
                newTaskName: '',
                test: false,
                tasks: [
                    {name: 'create skeleton of todo', complete: true},
                    {name: 'add ability to add tasks', complete: true},
                    {name: 'clear task name after clicking "Add"', complete: true},
                    {name: 'put "Add" button in one line with input', complete: true},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true},
                    {name: 'replace <input> with <ui-checkbox> in tasks list', complete: true},
                    {name: 'when task is complete cross it out', complete: true},
                    {
                        name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
                        complete: true
                    },
                    {name: 'don\'t allow to add empty tasks', complete: true},
                    {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true},
                    {name: 'extract list item into a separate vue.js component', complete: true},
                    {name: 'persist tasks list in a local storage', complete: true},
                    {name: 'add animation on task completion', complete: false},
                ],
            }
        },

        mounted() {
            localStorage.setItem('tasks', this.tasks);
            // this.tasks = localStorage.getItem('tasks');
        },

        methods: {
            addTask() {
                if (this.newTaskName) {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.newTaskName = '';
                }
                // localStorage.setItem('tasks', this.tasks);
            },
            hitting() {
                let availableCodes = 'Enter';
                if (-1 === availableCodes.indexOf(event.key)) {
                    event.preventDefault();
                } else {
                    this.addTask();
                }
            }
        },
        components: {
            'list-item': listItem
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        min-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .tasks {
            padding: 0;
            list-style: none;
            overflow-y: auto;
            max-height: 200px;
        }
        .flex-row {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            width: 100%;
        }
        .complete {
            text-decoration: line-through;
        }
    }
</style>
