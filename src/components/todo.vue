<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>

        <TasksList :pending-list="pendingList" :completed-list="completedList" @updatedingTrigger="updateList"></TasksList>

        <div class="input">
            <ui-textbox placeholder="Add an item here" @keydown-enter="addTask" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add item</ui-button>
        </div>
    </div>
</template>

<script>
import TasksList from './tasks-list.component'

export default {

    components: {
        TasksList
    },

    data () {
        return {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            newTaskName : ''
            // defaultTasks : [
            //     {name : 'create skeleton of todo', complete : true},
            //     {name : 'add ability to add tasks', complete : true},
            //     {name : 'clear task name after clicking "Add"', complete : true},
            //     {name : 'put "Add" button in one line with input', complete : true},
            //     {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
            //     {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
            //     {name : 'when task is complete cross it out', complete : true},
            //     {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
            //     {name : 'don\'t allow to add empty tasks', complete : true},
            //     {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
            //     {name : 'extract list item into a separate vue.js component', complete : true},
            //     {name : 'persist tasks list in a local storage', complete : true},
            //     {name : 'add animation on task completion', complete : false},
            // ]
        }
    },

    methods : {
        addTask () {
            this.newTaskName.length ? this.tasks.push({name : this.newTaskName, complete : false}) : false;
            this.updateList();
            this.newTaskName = '';
        },

        updateList (item) {
            localStorage.setItem('tasks', JSON.stringify(this.tasks) );
            // console.log(item, 'from parrent');
        }
    },

    computed: {
        pendingList () {
            return this.tasks.filter(item => !item.complete);
        },
        completedList () {
            return this.tasks.filter(item => item.complete);
        }
    },

    mounted () {
        // console.log(this.tasks);
    }
};

</script>

<style scoped lang="scss">

.todo {
    width: 400px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

    .title {
        margin-top: 0;
    }

    .input{
        display: flex;
        justify-content: space-between;
    }
}

</style>

<!-- overwrite keen-ui style -->
<style scoped lang="scss" scoped>

.ui-button--type-primary.ui-button--color-primary {
    border-radius: 18px;
    text-transform: capitalize;
}

</style>
