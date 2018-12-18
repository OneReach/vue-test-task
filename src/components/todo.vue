<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" 
                 backgroundColor="clear" 
                 indicatorColor="white"
                 textColorActive = "primary">
            <ui-tab title="Pending">
                <ul class="tasks"  >
                   
                    <todo-item 
                        v-for="(task, index) in actualTasks" 
                        v-bind:task="task"
                        v-bind:key="task.name"
                     
                    />
                </ul>
            </ui-tab>
            <ui-tab title="Completed" >
               <ul class="tasks">
                    <todo-item 
                        v-for="task in completedTasks" 
                        v-bind:task="task" 
                        v-bind:key="task.name"
                        
                    />
               </ul>
            </ui-tab>
       
        </ui-tabs>
 
        <form class="new-task">
            <label for="new-item">Add new task</label>
            <ui-textbox placeholder="e.g. 'read vue.js guide'" 
                        v-model="newTaskName"
                        id ="new-item"
                        ></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add item</ui-button>
        </form>
    </div>
</template>

<script>
import TodoItem from './todoItem.vue';

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
        computed : {
            completedTasks() {
                return this.tasks.filter((task) => task.complete);
            },
            actualTasks() {
                
                return this.tasks.filter((task) => !task.complete);
            }
        },
        created () {
            if (localStorage.getItem('tasks')) {
              
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
            } else {
                this.saveTasks();
                this.tasks = JSON.parse(localStorage.getItem('tasks'));

            }
        },
        watch: {
            tasks: {
                handler: function (){
                    this.saveTasks();
                },
                deep: true  
            }   
        },
        methods : {
            addTask () {
                let taskName = this.newTaskName.trim();
                if (taskName) {
                    this.tasks.push({name : taskName, complete : false});
                } 
                this.saveTasks();
                this.newTaskName = "";
            },
            saveTasks() {
              const parsed = JSON.stringify(this.tasks);
              localStorage.setItem('tasks', parsed);
            }
        },
        components: {
            todoItem: TodoItem
        }
}
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        width: 50%;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            text-decoration: none;
            .complete {
                text-decoration: line-through;
            }
        }
        .new-task {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            label {
                width: 100%;
            }

        }
        .ui-tab {
            height: 200px;
            overflow: auto;
        }
    }
    
</style>
