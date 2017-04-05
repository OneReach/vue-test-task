<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ul class="tasks">
            <li v-for="task in tasks" :class="['task-item', {complete: task.complete}]">
                <label>
                    <ui-checkbox v-model="task.complete" >
                        {{task.name}}
                    </ui-checkbox>
                </label>
            </li>
        </ul>
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
    export default {
        data () {
            return {
                newTaskName: '',
                newTaskNameTouched: false,
                tasks: [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : true},
                    {name : 'put "Add" button in one line with input', complete : true},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {name : 'when task is complete cross it out', complete : true},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {name : 'don\'t allow to add empty tasks', complete : true},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        methods : {
            addTask () {
                if(!this.newTaskName) {
                    this.newTaskNameTouched = true;
                    return false;
                }
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = '';
                this.newTaskNameTouched = false;
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
        max-height: 100%;
        min-height: 260px;
        display: flex;
        flex-direction: column;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            min-height: 5em;
            max-height: 100%;
            overflow-y: auto;

            .task-item {
                &.complete {
                    text-decoration: line-through;
                }
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
