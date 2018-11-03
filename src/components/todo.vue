<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        
        <ui-tabs fullwidth>
            <ui-tab id="pending-tab" title="Pending">
                <ul class="tasks">
                    <list-item v-for="task in tasks" :task="task" :tasks="tasks" v-show="!task.complete" />
                </ul>
            </ui-tab>

            <ui-tab id="complete-tab" title="Complete">
                <ul class="tasks">
                    <list-item v-for="task in tasks" :task="task" :tasks="tasks" v-show="task.complete" />
                </ul>
            </ui-tab>
        </ui-tabs>
        
        <div class="form-wrap">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" ></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import ListItem from './list-item.vue'

    export default {
        data () {
            return {
                newTaskName : '',
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : false},
                    {name : 'put "Add" button in one line with input', complete : false},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {name : 'when task is complete cross it out', complete : false},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {name : 'don\'t allow to add empty tasks', complete : false},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        components : {
            ListItem
        },

        methods : {
            addTask () {
                if (this.newTaskName !== '') {
                    this.tasks.push({name : this.newTaskName, complete : false});
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
                    this.newTaskName = '';
                }
            }
        },

        created () {
            window.STORAGE_KEY = 'todo-storage';

            if (localStorage.getItem(STORAGE_KEY) !== null) {
                this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))
            }
        },

        mounted () {
            window.addEventListener('keyup', event => {
                if (event.keyCode === 13) {
                    this.addTask();
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: 100px auto auto;
        width: 500px;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .tasks {
            height: 300px;
            padding: 0;
            overflow-y: auto;
            list-style: none;
        }

        .form-wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
</style>
