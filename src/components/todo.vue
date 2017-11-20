npm <template>
       <div class="todo">
            <h1 class="todo__title">Checklist</h1>
            <tasks :tasks="tasks" :tabsName="tabsName"></tasks>

            <div class="todo__add-field">
                <ui-textbox v-on:keydown.13="addTask" placeholder="add an item here" v-model="newTaskName"></ui-textbox>
                <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
            </div>

       </div>
</template>

<script>
    import tasks from './tasks';

    const STORAGE_KEY = 'tasks-vuejs-2.0';
    let todoStorage = {
        fetch: function () {
            let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return tasks;
        },
        save: function (tasks) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    };

    export default {
        components : { tasks },
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
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : true},
                ],
                tasks: todoStorage.fetch(),
                tabsName : [
                    {name: "Pending"},
                    {name: "Completed"},
                ]
            }
        },

        watch: {
            tasks: {
                handler: function (tasks) {
                    todoStorage.save(tasks);
                },
                deep: true
            }
        },

        methods : {
            addTask () {
                if(this.newTaskName === '') {
                    alert('new task must not empty');
                    return false;
                }
                this.tasks.push({
                    name : this.newTaskName,
                    complete : false
                });
                this.newTaskName = '';
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        background: #fff;
        padding: 40px 20px;
        width: 100%;
        max-width: 650px;
        height: 600px;
        margin: auto;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        &__title {
            margin-top: 0;
        }
        &__add-field {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            .ui-textbox {
                flex-basis: 100%;
            }
            .ui-button {
                border-radius: 25px;
            }
        }
    }
</style>
