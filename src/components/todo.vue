<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs backgroundColor="clear" fullwidth>
            <ui-tab :title="'pending (' + tasks.filter(o => !o.complete).length + ')'">
                <ul class="tasks tasks--pending">
                    <todo-item v-for="task in tasks" v-if="!task.complete" :task="task" :onCheck="onTaskCheck"></todo-item>
                </ul>
            </ui-tab>

            <ui-tab :title="'complete (' + tasks.filter(o => o.complete).length + ')'">
                <ul class="tasks tasks--complete">
                    <todo-item v-for="task in tasks" v-if="task.complete" :task="task" :onCheck="onTaskCheck"></todo-item>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="add-task">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import todoItem from './todo-item.vue';

    const DEFAULT_TASKS = [
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
    ];

    export default {
        data () {
            if (!this.readTasks()) {
                this.writeTasks(DEFAULT_TASKS);
            }

            return {
                newTaskName : '',
                tasks: this.readTasks()
            }
        },

        methods : {
            addTask () {
                if (this.newTaskName.length) {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.writeTasks(this.tasks);
                    this.newTaskName = '';
                }
            },

            onTaskCheck () {
                this.writeTasks(this.tasks);
            },

            writeTasks (tasks) {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            },

            readTasks () {
                return JSON.parse(localStorage.getItem('tasks'));
            }
        },

        components : {
            'todo-item': todoItem
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        $item-height: 1.25rem + 0.5rem; // ui-checkbox height + item margin-bottom
        $visible-items: 10;

        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        width: 800px; // without fixed width ui-tabs component has styles bugs

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            overflow: auto;
            max-height: $item-height * $visible-items;

            .complete {
                text-decoration: line-through;
            }
        }

        .add-task {
            display: flex;
            align-items: flex-end;
            .ui-textbox {
                flex: 1;
                margin-bottom: 0;
                margin-right: 10px;
            }
        }

        .todo-item-animation {
            &-leave-active {
                 animation: todo-item-animation 0.5s;
                 @keyframes todo-item-animation {
                     0% {
                         height: $item-height;
                     }
                     100% {
                         transform: scale(0.8);
                         opacity: 0;
                         height: 0;
                     }
                 }
             }
        }
    }
</style>
