<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs class="tasks">
            <ui-tab title="Pending">
                <todo_task v-for="(task,key) in tasks" v-show="!task.complete" v-bind:task="task"
                           v-bind:$key="key"></todo_task>
            </ui-tab>
            <ui-tab title="Completed">
                <todo_task v-for="(task,key) in tasks" v-show="task.complete" v-bind:task="task"
                           v-bind:$key="key"></todo_task>
            </ui-tab>

        </ui-tabs>
        <div class="submit-wrap">
            <ui-textbox @keydown-enter="addTask()" placeholder="e.g. 'read vue.js guide'"
                        v-model="newTaskName"></ui-textbox>
            <ui-button :color="newTaskName.length > 0 ? 'primary' : 'default'" @click="addTask">Add</ui-button>
        </div>
    </div>
</template>

<script>

    import todo_task from './todo_task.vue';
    import EventBus from './bus';
    export default {
        data () {
            return {
                selected_tab: 'Pending',
                newTaskName: '',
                tasks: this.localStorageHas('tasks') ? JSON.parse(this.localStorageHas('tasks')) : [
                    {name: 'create skeleton of todo', complete: true},
                    {name: 'add ability to add tasks', complete: true},
                    {name: 'clear task name after clicking "Add"', complete: true},
                    {name: 'put "Add" button in one line with input', complete: true},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true},
                    {name: 'replace <input> with <ui-checkbox> in tasks list', complete: true},
                    {name: 'when task is complete cross it out', complete: true},
                    {name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true},
                    {name: 'don\'t allow to add empty tasks', complete: true},
                    {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true},
                    {name: 'extract list item into a separate vue.js component', complete: true},
                    {name: 'persist tasks list in a local storage', complete: true},
                    {name: 'add animation on task completion', complete: true},
                ]
            }
        },
        created(){
            EventBus.$on('updateLocalStorage', item_name => this.updateLocalStorage(item_name));

        },
        methods: {
            updateLocalStorage(item_name){
                if (localStorage) {
                    localStorage.setItem(item_name, JSON.stringify(this[item_name]));
                }
            },
            localStorageHas($item){
                let item;
                if (localStorage) {
                    item = localStorage.getItem($item);
                }
                if (item == null || !item) {
                    return false
                } else {
                    return item;
                }
            },
            addTask () {
                if (this.newTaskName.length) {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.clearNewTaskName();
                    this.updateLocalStorage('tasks');

                }
            },
            clearNewTaskName(){
                this.newTaskName = ''
            }
        },
        components: {
            todo_task
        },
    };
</script>

<style scoped lang="scss">
    .todo
    {
        width: 100%;
        max-width: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

    .title
    {
        margin-top: 0;
    }

    .tasks
    {
        list-style: none;
        padding: 0;
        overflow-y: auto;
    }

    .submit-wrap
    {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .ui-checkbox
    {
        align-items: center;
    }

    .ui-textbox
    {
        flex: 1;
        margin-bottom: 0;
        margin-right: 2em;

    }

    }
</style>
