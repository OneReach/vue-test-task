<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <div class="list">
            <ui-tabs type="text">
                <ui-tab title="pending">
                    <ul class="tasks">
                        <li v-for="(task, index) in pendingTasks" :class="{complete : task.complete}">
                            <todo-item :task="task" :taskId="index" v-on:changed="updateTask"></todo-item>
                        </li>
                    </ul>
                </ui-tab>
                <ui-tab title="complete">
                    <ul class="tasks">
                        <li v-for="(task, index) in completeTasks" :class="{complete : task.complete}">
                            <todo-item :task="task" :taskId="index" v-on:changed="updateTask"></todo-item>
                        </li>
                    </ul>
                </ui-tab>
            </ui-tabs>
        </div>
        <div class="form">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './todo-item';
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : true},
                    {name : 'put "Add" button in one line with input', complete : true},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {name : 'when task is complete cross it out', complete : true},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {name : 'don\'t allow to add empty tasks', complete : true},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        computed: {
            pendingTasks: function () {
                return this.tasks.filter(function (task) {
                    return !task.complete;
                });
            },
            completeTasks: function () {
                return this.tasks.filter(function (task) {
                    return task.complete;
                });
            }
        },

        components : {
            'todo-item': TodoItem
        },

        methods : {
            addTask () {
                if (this.newTaskName.trim() !== '') {
                    this.tasks.push({name : this.newTaskName, complete : false});
                    this.newTaskName = '';
                }
            },

            updateTask (taskId, task) {
                this.tasks[taskId] = task;
            }
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
        max-width: 600px;
        width: 100%;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            max-height: 75vh;
            overflow: auto;

            .complete {
                text-decoration: line-through;
            }
        }

        .form {
            display: flex;

            .ui-textbox {
                width: 100%;
                padding-right: 10px;
            }
        }
    }
</style>
