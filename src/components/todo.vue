<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ul class="tasks">
            <li v-bind:key="task.id" v-for="task in tasks">
                <task v-bind:task="task" v-on:deleteTask="deleteTask"></task>
            </li>
        </ul>
        <div class="add-task">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @keydown.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import task from './task.vue';

    export default {
        components: {
            'task': task
        },
        data () {
            return {
                newTaskName : '',
                tasks : [
                    {id: 0, name : 'create skeleton of todo', complete : true},
                    {id: 1, name : 'add ability to add tasks', complete : true},
                    {id: 2, name : 'clear task name after clicking "Add"', complete : true},
                    {id: 3, name : 'put "Add" button in one line with input', complete : true},
                    {id: 4, name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {id: 5, name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {id: 6, name : 'when task is complete cross it out', complete : true},
                    {id: 7, name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {id: 8, name : 'don\'t allow to add empty tasks', complete : true},
                    {id: 9, name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {id: 10, name : 'extract list item into a separate vue.js component', complete : true},
                    {id: 11, name : 'persist tasks list in a local storage', complete : false},
                    {id: 12, name : 'add animation on task completion', complete : false},
                ]
            }
        },

        methods : {
            addTask () {
                if (this.newTaskName !== '') {
                    this.tasks.push({id: this.tasks.length, name : this.newTaskName, complete : false});
                    this.newTaskName = '';

                    // scroll tasks list to the bottom
                    const tasksHTMLElement = this.$el.querySelector('ul');
                    setTimeout(() => tasksHTMLElement.scrollTo(0, tasksHTMLElement.scrollHeight), 0);
                }
            },

            deleteTask (id) {
                this.tasks = this.tasks.filter(task => task.id !== id);
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        width: 600px;
        max-width: 100%;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
            line-height: 1;
        }

        .tasks {
            display: block;
            overflow-y: scroll;
            min-height: 200px;
            max-height: calc(100vh - 2 * 20px - 2.25rem - 2rem - 2 * 0.67 * 2rem - 2 * 50px);
            list-style: none;
            padding: 0;
        }

        // Add todo form
        .add-task {
            display: flex;
            align-items: center;
        }

        .ui-textbox {
            flex-grow: 1;
            margin-right: 10px;
            margin-bottom: 0;
        }

        .ui-button {
            border-radius: 32px;
        }
    }
</style>
