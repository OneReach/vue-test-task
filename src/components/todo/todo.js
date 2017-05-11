import tasks from './tasks/tasks.vue';
export default {

    components: {
        'tasks': tasks
    },

    data() {
        return {
            storageName: 'tasksStorage',
            newTaskName: '',
            tasks: [
                {name: 'create skeleton of todo', complete: true},
                {name: 'add ability to add tasks', complete: true},
                {name: 'clear task name after clicking "Add"', complete: true},
                {name: 'put "Add" button in one line with input', complete: true},
                {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true},
                {name: 'replace <input> with <ui-checkbox> in tasks list', complete: true},
                {name: 'when task is complete cross it out', complete: true},
                {name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',complete: true},
                {name: 'don\'t allow to add empty tasks', complete: true},
                {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true},
                {name: 'extract list item into a separate vue.js component', complete: true},
                {name: 'persist tasks list in a local storage', complete: true},
                {name: 'add animation on task completion', complete: true},
            ]
        }
    },

    computed: {
        completedTasks() {
            localStorage.setItem(this.storageName, JSON.stringify(this.tasks));
            return this.tasks.filter(task => task.complete === true)
        },
        pendingTasks() {
            localStorage.setItem(this.storageName, JSON.stringify(this.tasks));
            return this.tasks.filter(task => task.complete === false)
        }
    },

    created() {
        if (localStorage.getItem(this.storageName)) {
            this.tasks = [];
            this.tasks.push(...JSON.parse(localStorage.getItem(this.storageName)))
        }
    },

    methods: {
        addTask () {
            if (this.newTaskName) {
                this.tasks.push({name: this.newTaskName, complete: false});
                localStorage.setItem(this.storageName, JSON.stringify(this.tasks));
                this.newTaskName = '';
            }
        }
    }
};