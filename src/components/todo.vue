<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs
            fullwidth = true
            textColorActive = "clear"

        >
            <ui-tab title="Pending" class="tab-list__item">
                <ul class="tasks">
                    <li v-for="task in pendingList" :class="{complete : task.complete}" >
                        <label >
                            <ui-checkbox
                                v-model="task.complete"
                                boxPosition="left"
                            >
                                {{task.name}}
                            </ui-checkbox>
                        </label>
                    </li>
                </ul>
            </ui-tab>
            <ui-tab title="Complete" class="tab-list__item">
                <ul class="tasks">
                    <li v-for="task in completedList" :class="{complete : task.complete}">
                        <label class="task-label crossed">
                            <ui-checkbox
                                class="task__checkbox"
                                v-model="task.complete"
                            >
                                {{task.name}}
                            </ui-checkbox>
                        </label>
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>

        <form novalidate class="controlls" @submit.prevent="validateBeforeSubmit">
            <div class="interactive">
                <ui-textbox
                    class="interactive__input"
                    placeholder="Add an item here"
                    v-model="newTaskName"
                    v-validate="'required'"
                    @click.enter="addTask"
                ></ui-textbox>
                <ui-button class="interactive__button" color="primary" @click.enter="addTask" >Add item</ui-button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data () {

            return {
                newTaskName: '',
                tasks: [
                    {name: 'create skeleton of todo', complete: false},
                    {name: 'add ability to add tasks', complete: false},
                    {name: 'clear task name after clicking "Add"', complete: false},
                    {name: 'put "Add" button in one line with input', complete: false},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: false},
                    {name: 'replace <input> with <ui-checkbox> in tasks list', complete: false},
                    {name: 'when task is complete cross it out', complete: false},
                    {
                        name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
                        complete: false
                    },
                    {name: 'don\'t allow to add empty tasks', complete: false},
                    {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: false},
                    {name: 'extract list item into a separate vue.js component', complete: false},
                    {name: 'persist tasks list in a local storage', complete: false},
                    {name: 'add animation on task completion', complete: false},
                ]
            }
        },

        methods: {
            addTask () {
                if(this.newTaskName != '') {
                    this.tasks.push(
                        {
                            name: this.newTaskName,
                            complete: false
                        }
                    );
                }
                this.newTaskName = "";
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then(
                    success => {
                    this.addTask();
            },
                error => {
                    return;
                }
            );
            }
        },
        computed: {
            pendingList() {
                return this.tasks.filter(task => {
                        return !task.complete;
            })
            },
            completedList() {
                return this.tasks.filter(task => {
                        return task.complete;
            })
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

    .title {
        margin-top: 0;
    }

    .tasks {
        list-style: none;
        padding: 0;
        max-height: 380px;
        overflow-y: auto;
    &::-webkit-scrollbar {
         width: 4px;
     }
    &::-webkit-scrollbar-track {
         -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
     }
    &::-webkit-scrollbar-thumb {
         background-color: darkgrey;
         outline: 1px solid slategrey;
     }

    }

    .interactive {
        display: flex;
        align-items: center;
        justify-content: space-between;

    &__button {
         border-radius: 20px;
         text-transform: none;
         width:125px;
         margin-left: 10px;
     }
    &__input{
         width: 100%;
     }

    }


    }
</style>
