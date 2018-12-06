<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <div>
            <ui-button>Pending</ui-button>
            <ui-button type="secondary" @click="removeChecked">Completed</ui-button>
        </div>

        <ul class="tasks">
            <li v-for="task in tasks" :class="{complete : task.complete}">
                <label>
                    <ui-checkbox color="primary" v-model="task.complete" >
                    {{task.name}}
                    </ui-checkbox>
                </label>
            </li>
        </ul>
        <form class="new-task">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add item</ui-button>
        </form>
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

        methods : {
            addTask () {
                this.newTaskName.length > 0 && this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = "";
            },
            removeChecked(){
                let newList = this.tasks.filter((item) => !item.complete);  
                return this.tasks = newList;
            }
        }
        
    };
</script>

<style scoped lang="scss">
    
        $brand-primary-color: #434343;
    %btn {
        color: #c1c2c5;
        border-radius: 30px;
        text-transform: none;
    }
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        color: #5e6366;
        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            max-height: 200px;
            overflow: auto;
            .complete {
                text-decoration: line-through;
            }
        }
        .new-task {
            display: flex;
            justify-content: space-between;
        }
        .ui-button {
            @extend %btn;
        }
    }
</style>
