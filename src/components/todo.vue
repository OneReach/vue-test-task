<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullWidth="true">
            <ui-tab title="Pending" class="tab-item">
                <ul class="tasks">
                    <todo-item v-for="(task, index) in tasks" 
                        v-if="!task.complete"
                        :task="task"
                        :index="index"
                        v-on:change-task-status="updateTaskList($event)"></todo-item>   
                </ul>
            </ui-tab>
            <ui-tab title="Completed" class="tab-item">
                <ul class="tasks">
                    <todo-item v-for="(task, index) in tasks" 
                        v-if="task.complete"
                        :task="task"
                        :index="index"
                        v-on:change-task-status="updateTaskList($event)"></todo-item>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="actions">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" 
                v-model="newTaskName" 
                @keydown-enter="addTask" 
                class="input-box"></ui-textbox>
            <ui-button color="primary" 
                @click="addTask" 
                icon="add"
                class="btn">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './todo-item.vue';

    export default {
        data () {
            return {
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : true},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {name : 'when task is complete cross it out', complete : true},
                    {name : 'don\'t allow to add empty tasks', complete : true},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'persist tasks list in a local storage', complete : true},
                    {name : 'put "Add" button in one line with input', complete : true},
                    {name : 'add animation on task completion', complete : false}
                ],
                newTaskName : '',
                validationTaskFieldStatus: false
            };
        },

        components : { 
            TodoItem
        },

        methods : {
            addTask () {
                this.validaionTaskField();

                if (this.validationTaskFieldStatus) {
                    this.tasks.push({name : this.newTaskName, complete : false});
                    this.newTaskName = '';
                }
            },

            validaionTaskField () {
                if (this.newTaskName.trim().length > 0) {
                    this.validationTaskFieldStatus = true;
                } else {
                    this.validationTaskFieldStatus = false;
                }
            },

            updateTaskList ($event) {
                let complete = $event[0],
                    index = $event[1];

                this.tasks[index].complete = complete;
            },

            saveToLocalStorage () {
                localStorage.tasks = JSON.stringify(this.tasks);
            }
        },

        created () {
            this.saveToLocalStorage();
        },

        updated () {
            this.saveToLocalStorage();
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        width: 450px;     
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
        }

        .complete {
            text-decoration: line-through;
        }

        .tab-item {
            height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .actions {
            display: flex;
            justify-content: space-between;

            .input-box {
                width: 70%;
            }
        }
    }
</style>
