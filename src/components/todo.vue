<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs fullwidth="true" class="tabs">
            <ui-tab title="Pending">
                <ul class="tasks">
                    <transition-group name="completion">
                        <item v-for="task in pendingTasks" class="list-item"
                              v-bind:key="task"
                              v-on:changeStatus="changeStatus(task)"
                              v-bind:name="task.name"
                              v-bind:completed="task.complete">
                        </item>
                    </transition-group>
                </ul>
            </ui-tab>
            <ui-tab title="Completed">
                <ul class="tasks">
                    <transition-group name="completion">
                        <item v-for="task in completedTasks" class="list-item complete"
                              v-bind:key="task"
                              v-on:changeStatus="changeStatus(task)"
                              v-bind:name="task.name"
                              v-bind:completed="task.complete">
                        </item>
                    </transition-group>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="footer">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" v-on:keydown.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add" :disabled="!newTaskName">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import item from './item.vue';
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : []
            }
        },

        created: function () {
            this.getTasks();
        },

        methods : {
            addTask () {
                if (!!this.newTaskName) {
                    this.tasks.push({name : this.newTaskName, complete : false});
                    this.newTaskName = "";
                    this.saveToLocalStorage();
                }
            },
            changeStatus (task) {
                task.complete = !task.complete;
                this.saveToLocalStorage();
            },
            saveToLocalStorage () {
                if (localStorage) {
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            },
            getTasks () {
                if (localStorage) {
                    this.tasks = JSON.parse(localStorage.getItem('tasks')) ||
                        [
                            {name : 'create skeleton of todo', complete : true},
                            {name : 'add ability to add tasks', complete : true},
                            {name : 'clear task name after clicking "Add"', complete : true},
                            {name : 'put "Add" button in one line with input', complete : true},
                            {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                            {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                            {name : 'when task is complete cross it out', complete : true},
                            {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                            {name : 'don\'t allow to add empty tasks', complete : true},
                            {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                            {name : 'extract list item into a separate vue.js component', complete : true},
                            {name : 'persist tasks list in a local storage', complete : true},
                            {name : 'add animation on task completion', complete : true},
                            {name : 'say Hello', complete: false}
                        ];
                }
            }
        },

        components : {
            item
        },

        computed: {
            pendingTasks: function () {
                return this.tasks.filter(item => !item.complete);
            },
            completedTasks: function () {
                return this.tasks.filter(item => item.complete);
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
        width: 60%;
        height: 100%;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            overflow-x: hidden;
            overflow-y: auto;
            height: 50vh;
        }
        .complete {
            text-decoration: line-through;
        }
        .footer {
            display: flex;
            justify-content: space-around;
        }
        .tabs {
            height: 75%;
        }
        .completion-leave-active {
            @extend .complete;
            transition: 1s;
            opacity: 0.5;
        }
        .completion-leave-to {
            opacity: 0;
        }
        .list-item {
            display: block;
        }
    }
</style>
