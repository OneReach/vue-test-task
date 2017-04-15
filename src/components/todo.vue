<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullwidth=true>
            <ui-tab title="Pending">
                <div class="container">
                    <ul class="tasks">
                      <transition-group name="list" tag="task">
                        <task v-for="task in pendingTasks" :class="{complete : task.complete}" :task="task" v-bind:key="task">
                            </task>
                        </transition-group>
                        <div class="ui-textbox ui-textbox--icon-position-left">
                            <div class="ui-textbox__icon-wrapper">
                                <input class="task-checkbox" type="checkbox" v-model="newTask.complete"/>
                            </div>
                            <div class="ui-textbox__content">
                                <ui-textbox placeholder="write feedback" v-model="newTask.name" @keydown-enter="addTask"></ui-textbox>
                            </div>
                            <div class="ui-textbox__icon-wrapper">
                              <ui-button class="btn-rounded" color="primary" size="small" @click="addTask">Add</ui-button>
                            </div>
                        </div>
                    </ul>
                </div>
            </ui-tab>
            <ui-tab title="Comleted">
                <div class="container">
                    <ul class="tasks">
                        <transition-group name="list" tag="li">
                                   <task v-for="task in completedTasks" :class="{complete : task.complete}" :task="task" v-bind:key="task">
                            </task>
                        </transition-group>
                    </ul>
                </div>
            </ui-tab>
        </ui-tabs>
        <div>
        </div>
    </div>
</template>

<script>
import task from './task'
    export default {
        data() {
                return {
                    newTask: {name:"", complete:false},
                    defaultTasks: [{ name: 'create skeleton of todo', complete: true },
                        { name: 'add ability to add tasks', complete: true },
                        { name: 'clear task name after clicking "Add"', complete: true },
                        { name: 'put "Add" button in one line with input', complete: true },
                        { name: 'add new task by hitting Enter instead of clicking "Add"', complete: true },
                        { name: 'replace <input> with <ui-checkbox> in tasks list', complete: true },
                        { name: 'when task is complete cross it out', complete: true },
                        { name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true },
                        { name: 'don\'t allow to add empty tasks', complete: true },
                        { name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true },
                        { name: 'extract list item into a separate vue.js component', complete: true },
                        { name: 'persist tasks list in a local storage', complete: true },
                        { name: 'add animation on task completion', complete: true },
                        { name: 'check all tasks', complete: false }
                    ],
                    tasks:[]
                }
            },
            watch: {
                tasks: {
                    handler: function(tasks) {
                        localStorage.setItem("tasks", JSON.stringify(tasks))
                    },
                    deep:true
                }
            },
            methods: {
                addTask() {
                    if (this.newTask.name && this.newTask.name.trim()) {
                        this.tasks.push({ name: this.newTask.name, complete: this.newTask.complete });
                        this.newTask.name = "";
                        this.newTask.complete = false;
                    }
                },
                checkStorage() {
                  if (JSON.parse(localStorage.length)){
                    this.tasks = JSON.parse(localStorage.getItem("tasks"));
                  }
                  else {this.tasks = this.defaultTasks}
                }
            },
            created: function() {
                this.checkStorage();
            },
            computed: {
                pendingTasks() {
                    return this.tasks.filter(function(task) {
                        return !task.complete
                    })
                },
                completedTasks() {
                    return this.tasks.filter(function(task) {
                        return task.complete
                    })
                }
            },
            components: {
            task
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
        .title {
            margin-top: 0;
        }
        .tasks {
            list-style: none;
            padding: 0;
        }
        .container {
            width:500px;
            height:300px;
            overflow-y:auto;
            .btn-rounded {
                border-radius: 100px;
                margin-top: -20px;
            }
        }
        .list-item {
           display: inline-block;
           margin-right: 10px;
        }
        .list-enter-active, .list-leave-active {
           transition: all 2s;
        }
        .list-enter, .list-leave-to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
</style>
