<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullWidth="true" backgroundColor="clear">
            <ui-tab title="Pending">
                <ul class="tasks">
                    <item v-for="task in tasks" v-if="!task.complete" v-model="task.complete" :task="task"></item>
                </ul>
            </ui-tab>

            <ui-tab title="Complete">
                <ul class="tasks">
                    <item v-for="task in tasks" v-if="task.complete" v-model="task.complete" :task="task" :class="{ completed: task.complete }"></item>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div>
            <ui-textbox
                @keydown.enter="addTask"
                placeholder="Add item here"
                v-model="newTaskName"
                :invalid="!newTaskName.length"
                error="Please, enter the task description"
            ></ui-textbox>
            <ui-button class="btn-round" color="primary" @click="addTask" icon="add">Add Item</ui-button>
        </div>
    </div>
</template>

<script>
    import Item from './item.vue';

    export default {
        data () {
            return {
                newTaskName : '',
                tasks : []
            }
        },
        methods : {
            addTask () {
              if (this.newTaskName) {
                this.tasks.push({name : this.newTaskName, complete : false});
                this.saveTasksToLocalStorage(this.tasks);
                this.newTaskName = '';
              }
            },
            saveTasksToLocalStorage() {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            },
            getTasksfromLocalStorage() {
              let tasks = localStorage.getItem('tasks') || [];
              return JSON.parse(tasks);
            }
        },
        components: {
          Item
        },
        beforeMount() {
          localStorage.setItem('tasks', JSON.stringify([
              {id : 1, name : 'create skeleton of todo', complete : true},
              {id : 2, name : 'add ability to add tasks', complete : true},
              {id : 3, name : 'clear task name after clicking "Add"', complete : true},
              {id : 4, name : 'put "Add" button in one line with input', complete : false},
              {id : 5, name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
              {id : 6, name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
              {id : 7, name : 'when task is complete cross it out', complete : true},
              {id : 8, name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
              {id : 9, name : 'don\'t allow to add empty tasks', complete : true},
              {id : 10, name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
              {id : 11, name : 'extract list item into a separate vue.js component', complete : true},
              {id : 12, name : 'persist tasks list in a local storage', complete : true},
              {id : 13, name : 'add animation on task completion', complete : true},
          ]));
        },
        created() {
            return this.tasks = this.getTasksfromLocalStorage();
        }

    };
</script>

<style scoped lang="scss">
    .completed {
        text-decoration: line-through;
    }
    .ui-tabs__active-tab-indicator.ui-tabs__active-tab-indicator {
        display: none;
    }
    .btn-round {
        border-radius: 20px;
    }
    .tasks {
        height: 150px;
        overflow-y: auto;
    }
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

        .tasks {
            list-style: none;
            padding: 0;
        }
    }
</style>
