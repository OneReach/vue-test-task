<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullwidth>
            <ui-tab title="pending">
                <tasklist :list="tasks" :complete="false"></tasklist>
            </ui-tab>
            <ui-tab title="complete">
                <tasklist :list="tasks" :complete="true"></tasklist>
            </ui-tab>
        </ui-tabs>
        <div class="creation-panel">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" @keydown.13="addTask" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import tasklist from 'components/tasklist';
    export default {
        data () {
            return {
                lastTaskID : 0,
                newTaskName : '',
                tasks : [
                    {id : 0, name : 'create skeleton of todo', complete : true},
                    {id : 1, name : 'add ability to add tasks', complete : true},
                    {id : 2, name : 'clear task name after clicking "Add"', complete : true},
                    {id : 3, name : 'put "Add" button in one line with input', complete : true},
                    {id : 4, name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {id : 5, name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {id : 6, name : 'when task is complete cross it out', complete : true},
                    {id : 7, name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {id : 8, name : 'don\'t allow to add empty tasks', complete : true},
                    {id : 9, name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {id : 10, name : 'extract list item into a separate vue.js component', complete : true},
                    {id : 11, name : 'persist tasks list in a local storage', complete : true},
                    {id : 12, name : 'add animation on task completion', complete : true},
                    {id : 13, name : 'add animation on task completion', complete : true},
                ]
            }
        },
        created : function () {
            localStorage.clear();
            this.tasks.forEach(task => {
                localStorage[task.id] = JSON.stringify(task);
                if (this.lastTaskID < task.id) this.lastTaskID = task.id;
            });
        },
        methods : {
            addTask () {
                if (this.newTaskName) {
                    let task = {id : ++this.lastTaskID, name : this.newTaskName, complete : false};
                    localStorage[task.id] = JSON.stringify(task);
                    this.tasks.push(task);
                    this.newTaskName = '';
                }
            },
        },
        components : {
            tasklist : tasklist
        },
    };
</script>

<style scoped lang="scss">
    .todo {
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
            height: 335px;
            width: 600px;
            overflow: auto;
        }
        .creation-panel {
            display: flex;
            align-items: flex-end;
            > * {
                &:first-child {
                    margin: 0 25px 0 0;
                    width: calc(100% - 115px);
                }
                &:last-child {
                    width: 90px;
                }
            }
        }
    }
</style>
