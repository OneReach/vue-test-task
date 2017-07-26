<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs backgroundColor="clear" fullwidth>
            <ui-tab title="pending">
                <ul class="tasks">
                    <li v-for="task in tasks" :class="{complete : task.complete}" v-if="!task.complete">
                        <label>
                            <ui-checkbox v-model="task.complete" :label="task.name"></ui-checkbox>
                        </label>
                    </li>
                </ul>
            </ui-tab>

            <ui-tab title="complete">
                <ul class="tasks">
                    <li v-for="task in tasks" :class="{complete : task.complete}" v-if="task.complete">
                        <label>
                            <ui-checkbox v-model="task.complete" :label="task.name"></ui-checkbox>
                        </label>
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="add-task">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
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
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        methods : {
            addTask () {
                if (this.newTaskName.length) {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.newTaskName = '';
                }
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
        width: 800px; // without fixed width ui-tabs component has styles bugs

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            .complete {
                text-decoration: line-through;
            }
        }

        .add-task {
            display: flex;
            align-items: flex-end;
            .ui-textbox {
                flex: 1;
                margin-bottom: 0;
                margin-right: 10px;
            }
        }
    }
</style>
