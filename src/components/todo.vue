<template>
    <div class="todo">
        <div class="header">
            <h1 class="title">Checklist</h1>
            <ul class="filter">
                <li v-for="filter in filters">
                    <ui-button :color="activeFilter === filter ? 'primary' : 'default'" @click="filterTasks(filter)">
                        {{filter}}
                    </ui-button>
                </li>
            </ul>
        </div>
        <ul class="tasks">
            <li v-for="task in filteredTasks" :class="{complete : isTaskComplete(task.status)}">
                <ui-checkbox @change="changeTaskStatus(task)" :value="isTaskComplete(task.status)" :label="task.name"/>
            </li>
        </ul>
        <div class="taskAdder">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    /**
    * In fact, we have four different statuses of a task:
    * 1. PENDING: the task is shown as pending;
    * 2. ABOUT_COMPLETE: the task is almost on the way to be complete,
    *    but need to be shown for a little time in a list of pending tasks;
    * 3. COMPLETE: the task is shown as complete;
    * 4. ABOUT_PENDING: the task is almost on the way to be pending again,
    *    but need to be shown for a little time in a list of complete tasks;
    * In this case, we can use binary representation of status, as
    * PENDING = b00, ABOUT_PENDING = b01, ABOUT_COMPLETE = b10, COMPLETE = b11
    * and use bitmask to make transitions via XOR between statuses:
    * 1. PENDING  ==(XOR b10)=> ABOUT_COMPLETE ==(XOR b01)=> COMPLETE
    * 2. COMPLETE ==(XOR b10)=> ABOUT_PENDING  ==(XOR b01)=> PENDING
    * This logic is used in 'changeTaskStatus' method.
    */
    const [PENDING, ABOUT_PENDING, ABOUT_COMPLETE, COMPLETE] = [0, 1, 2, 3];

    const [FIRST_TRANSITION_MASK, LAST_TRANSITION_MASK] = [2, 1];

    const [FILTER_ALL, FILTER_PENDING, FILTER_COMPLETE] = ['all', 'pending', 'complete'];

    export default {
        data () {
            return {
                filters : [FILTER_ALL, FILTER_PENDING, FILTER_COMPLETE],
                activeFilter: FILTER_ALL,
                newTaskName : '',
                tasks : [
                    {name : 'create skeleton of todo', status : COMPLETE},
                    {name : 'add ability to add tasks', status : COMPLETE},
                    {name : 'clear task name after clicking "Add"', status : PENDING},
                    {name : 'put "Add" button in one line with input', status : PENDING},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', status : PENDING},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', status : PENDING},
                    {name : 'when task is complete cross it out', status : PENDING},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', status : PENDING},
                    {name : 'don\'t allow to add empty tasks', status : PENDING},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', status : PENDING},
                    {name : 'extract list item into a separate vue.js component', status : PENDING},
                    {name : 'persist tasks list in a local storage', status : PENDING},
                    {name : 'add animation on task completion', status : PENDING},
                ]
            }
        },

        methods : {
            addTask () {
                this.tasks.push({
                  name : this.newTaskName,
                  status : this.activeFilter === FILTER_COMPLETE ? COMPLETE : PENDING
                });
                this.newTaskName = '';
            },
            filterTasks (filter) {
                this.activeFilter = filter;
            },
            isTaskComplete (status) {
                return status === ABOUT_COMPLETE || status === COMPLETE;
            },
            changeTaskStatus (task) {
                task.status ^= FIRST_TRANSITION_MASK;
                setTimeout(() => task.status ^= LAST_TRANSITION_MASK, 500);
            }
        },

        computed : {
            filteredTasks() {
                switch (this.activeFilter) {
                    case FILTER_ALL:
                        return this.tasks;
                    case FILTER_PENDING:
                        return this.tasks.filter(({status}) => status === ABOUT_COMPLETE || status === PENDING);
                    case FILTER_COMPLETE:
                        return this.tasks.filter(({status}) => status === ABOUT_PENDING || status === COMPLETE);
                    default:
                        return this.tasks;
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

        .header {
            display: flex;
            justify-content: space-between;
        }

        .title {
            margin-top: 0;
        }

        .filter {
            margin-top: 0;
            display: flex;
            list-style-type: none;

            li {
                margin: 0 10px;
            }
        }

        .tasks {
            list-style: none;
            padding: 0;

            .complete {
                text-decoration: line-through;
            }
        }

        .taskAdder {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
