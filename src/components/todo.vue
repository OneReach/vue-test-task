<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <div class="list">
            <ui-tabs type="text">
                <ui-tab title="pending">
                    <ul class="tasks">
                        <todo-item v-for="task in pendingTasks" :task="task" :key="task.id"></todo-item>
                    </ul>
                </ui-tab>
                <ui-tab title="complete">
                    <ul class="tasks">
                        <todo-item v-for="task in completeTasks" :task="task" :key="task.id"></todo-item>
                    </ul>
                </ui-tab>
            </ui-tabs>
        </div>
        <div class="form">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './todo-item';
    import uuidV4 from 'uuid/v4';

    export default {
        data () {
            return {
                newTaskName : '',
                tasks: this._getTasks()
            }
        },

        computed : {
            pendingTasks: function () {
                return this.tasks.filter(task => !task.complete);
            },
            completeTasks: function () {
                return this.tasks.filter(task => task.complete);
            }
        },

        components : {
            'todo-item': TodoItem
        },

        methods : {
            addTask () {
                if (this.newTaskName.trim() !== '') {
                    this.tasks.push({id : uuidV4(), name : this.newTaskName, complete : false});
                    this.newTaskName = '';
                }
            },

            _getTasks () {
                try {
                    return JSON.parse(localStorage.getItem('tasks'));
                } catch (error) {
                    return [];
                }
            }
        },
        watch : {
            tasks : {
                handler : function (value) {
                    localStorage.setItem('tasks', JSON.stringify(value));
                },
                deep : true
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
        max-width: 600px;
        width: 100%;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            max-height: 75vh;
            overflow: auto;
        }

        .form {
            display: flex;

            .ui-textbox {
                width: 100%;
                padding-right: 10px;
            }
        }
        .complete {
            text-decoration: line-through;
        }
    }
</style>
