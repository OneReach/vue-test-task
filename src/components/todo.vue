<template>
    <div id="todo" class="small-container todo">
        <h1 class="title">Checklist</h1>

            <ui-tabs fullwidth>

                <ui-tab title="Pending">
                    <div v-if="notCompletedTasks.length">
                        <tasks-list :tasks="notCompletedTasks" :changeTask="changeTask"/>
                        <add-input @add:task="addTask"/>
                    </div>
                    <div v-else>
                        <p>All was done</p>
                    </div>
                </ui-tab>

                <ui-tab title="Complete">
                    <div v-if="completedTasks.length">
                        <tasks-list v-bind:tasks="completedTasks"  :changeTask="changeTask"/>
                    </div>
                    <div v-else>
                        <p>Sorry, nothings to show</p>
                    </div>
                </ui-tab>

            </ui-tabs>


    </div>
</template>

<script>
    import addInput from './addInput.vue';
    import tasksList from './tasksList.vue';

    export default {
        name: 'todo',
        data () {
            return {
                tasks : [
                    {name : 'create skeleton of todo', complete : true, checked:true, id : 0},
                    {name : 'add ability to add tasks', complete : true, checked:true, id : 1 },
                    {name : 'clear task name after clicking "Add"', complete : false, checked:false, id : 2},
                    {name : 'put "Add" button in one line with input', complete : false, checked:false, id : 3},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false, checked:false, id : 4},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false, checked:false, id : 5},
                    {name : 'when task is complete cross it out', complete : false , checked:false, id : 6},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false , checked:false, id : 7},
                    {name : 'don\'t allow to add empty tasks', complete : false, checked:false, id : 8},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false, checked:false, id : 9},
                    {name : 'extract list item into a separate vue.js component', complete : false, checked:false, id : 10},
                    {name : 'persist tasks list in a local storage', complete : false, checked:false, id : 11},
                    {name : 'add animation on task completion', complete : false, checked:false, id : 12},
                ]
            }
        },
        computed: {
            completedTasks: function () {
                return this.tasks.filter((el) => el.complete);
            },
            notCompletedTasks: function () {
                return this.tasks.filter((el) => !el.complete);
            }
        },

        mounted() {
            if (localStorage.getItem('tasks')) {
                try {
                    this.tasks = JSON.parse(localStorage.getItem('tasks'));
                } catch(e) {
                    localStorage.removeItem('tasks');
                }
            }

        },

        methods : {
            addTask (newTask) {
                let newId = this.tasks[this.tasks.length-1].id + 1;
                this.tasks.push({name : newTask.name, complete : false,checked: false, id: newId});
            },
            saveTasks() {
                const parsed = JSON.stringify(this.tasks);
                localStorage.setItem('tasks', parsed);
            },

            changeTask(id) {
                this.tasks = this.tasks.map(task =>
                    task.id === id ? {...task, checked: !task.checked} : task
                );
                setTimeout(() => {
                    this.tasks = this.tasks.map(task =>
                        task.id === id ? {...task, complete: !task.complete} : task
                    )
                },300);
            }
        },

        watch: {
            tasks: {
                handler() {
                    this.saveTasks();
                },
                deep: true
            }
        },


        components: {
            addInput,
            tasksList,
        },

    }
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        max-width: 500px;
        width: 100%;
        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
        }

    }
</style>