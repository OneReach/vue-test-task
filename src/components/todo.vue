<template>
    <div class="todo">
        <h1 class="todo__title">Checklist</h1>
        <ui-tabs class="todo__tabs" type="text">
            <ui-tab title="Pending">
                <ul class="todo__tasks">
                    <item v-for="task in tasks" :type="'pending'" :task="task" :key="task.id"></item>
                </ul>
            </ui-tab>
            <ui-tab title="Completed">
                <ul class="todo__tasks">
                    <item v-for="task in tasks" :type="'completed'" :task="task" :key="task.id"></item>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="controls">
            <ui-textbox class="controls__input" placeholder="Add an item here"
                        v-model="newTaskName" v-on:keydown.13="addTask()"></ui-textbox>
            <ui-button class="controls__button" color="primary" @click="addTask">
                Add item
            </ui-button>
        </div>
    </div>
</template>

<script>
    import item from "./item.vue"

    export default {
        data () {
            let tasks = JSON.parse(window.localStorage.getItem('tasks'));
            if (!tasks) {
                tasks = [
                    {name: 'create skeleton of todo', complete: true, id: 1},
                    {name: 'add ability to add tasks', complete: true, id: 2},
                    {name: 'clear task name after clicking "Add"', complete: true, id: 3},
                    {name: 'put "Add" button in one line with input', complete: true, id: 4},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true, id: 5},
                    {name: 'replace <input> with <ui-checkbox> in tasks items.vue', complete: true, id: 6},
                    {name: 'when task is complete cross it out', complete: true, id: 7},
                    {
                        name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
                        complete: true,
                        id: 8
                    },
                    {name: 'don\'t allow to add empty tasks', complete: true, id: 9},
                    {name: 'make items.vue of tasks scrollable, if there\'re are a lot of tasks', complete: true,
                        id: 10},
                    {name: 'extract items.vue item into a separate vue.js component', complete: true, id: 11},
                    {name: 'persist tasks items.vue in a local storage', complete: true, id: 12},
                    {name: 'add animation on task completion', complete: true, id: 13},
                ];
                window.localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            return {
                newTaskName : '',
                tasks
            }
        },
        watch: {
            tasks: {
                handler: function(tasks) {
                    localStorage.setItem("tasks", JSON.stringify(tasks))
                },
                deep: true
            }
        },
        methods : {
            addTask () {
              if (this.newTaskName) {
                  this.tasks.push({name : this.newTaskName, complete : false});
                  this.newTaskName = '';
              }
            }
        },
        components: {
            item
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
        width: 600px;
        height: 650px;

        &__title {
            margin-top: 0;
        }

        &__tabs {
            height: calc(100% - 44px - 40px - 48px);
        }

        &__tasks {
            list-style: none;
            padding: 0;
            max-height: 422px;
            padding-right: 10px;
            overflow-y: scroll;
        }

        &__task {
            width: 100%;
            display: block;
        }

        &__label {
            flex: 0 0 auto;
            display: flex;
            flex-flow: row nowrap;
        }

        &__check {
            margin-right: 10px;
        }

        &__text {
            font-weight: 500;
            &--completed {
                text-decoration: line-through;
            }
        }
    }

    .controls {
        flex: 0 0 auto;
        display: flex;
        flex-flow: row nowrap;
        &__input {
            flex-grow: 1;
            flex-basis: 0;
        }
        &__button {
            margin-left: 20px;
        }
    }
</style>
