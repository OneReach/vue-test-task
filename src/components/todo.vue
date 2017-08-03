<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>

         <ui-tabs type="text">
            <ui-tab title="Pending">
                <tasks-list :tasks="tasks" :completed="false"/>
            </ui-tab>
            <ui-tab title="Completed">
                <tasks-list :tasks="tasks" :completed="true"/>
            </ui-tab>
        </ui-tabs>

        <div class="todo__form">
            <form @submit="addTask">
                <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
                <ui-button button-type="submit" color="primary" icon="add">Add</ui-button>
            </form>
        </div>
    </div>
</template>

<script>
    import tasksList from './tasks-list';

    function saveTaskToStorage(task) {
        const tasksFromStorage = getTasksFromStorage();
        tasksFromStorage.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
    }

	function getTasksFromStorage() {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	}

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
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'persist tasks list in a local storage', complete : true},
                    {name : 'add animation on task completion', complete : true},
                    {name : 'check the test task', complete: false}
                ]
            }
        },

        methods : {
            addTask () {
                const isFilled = this.newTaskName.trim().length > 0;

                if ( isFilled ) {
                    const task = { name: this.newTaskName, complete: false };

                    this.tasks.push(task);
                    saveTaskToStorage(task);

                    this.newTaskName = '';
                }
            }
        },

        created() {
            const tasksFromStorage = getTasksFromStorage();
            this.tasks = this.tasks.concat(tasksFromStorage);
        },

        components: {
            'tasks-list': tasksList
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        width: 600px;
        height: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .todo__form form {
            display: flex;

            .ui-textbox {
                width: 100%;
                margin-bottom: 0;
                padding-right: 15px;
            }
        }
    }
</style>

<style lang="scss">
    .todo .ui-tabs__body {
        height: 388px;
        overflow: auto;
        padding-bottom: 0;
        padding-top: 0;
    }
</style>
