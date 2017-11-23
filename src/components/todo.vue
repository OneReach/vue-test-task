<template>
    <div class="todo">
        <h1 class="todo__title">Checklist</h1>
        <ui-tabs fullWidth class="todo__content">
            <ui-tab v-for="tabName in tabs"  
                    :title="tabName">
                <div v-bar class="scroll-content">
                    <transition-group tag="ul" name="todo__tasks" class="todo__tasks">
                        <task v-for="(task, index) in tasks" 
                            v-show="(!task.complete && tabName === 'Pending') || (task.complete && tabName === 'Completed')"
                            :tasks="tasks"
                            :storageId="storageId"
                            :task="task"
                            :key="index"
                        ></task>
                    </transition-group>
                </div>
            </ui-tab>
        </ui-tabs>
        <div class="todo__controls">
            <ui-textbox 
                class="controls__task-input"
                placeholder="Add an item here" 
                v-model="newTaskName" 
                @keydown.enter="addTask"
            ></ui-textbox>
            <ui-button
                class="controls__task-submit"
                color="primary" 
                @click="addTask" 
                icon="add"
            >Add</ui-button>
        </div>
    </div>
</template>

<script>
    import task from './task.vue';

    const storageId = 'vue-test-task-yrbn';

    export default {
        components : { task },
        data () {
            return {
                newTaskName : '',
                storageId: storageId,
                tasks : localStorage.getItem(storageId)
                            ? JSON.parse(localStorage.getItem(storageId)) 
                            : [
                                {name : 'create skeleton of todo', complete : true},
                                {name : 'add ability to add tasks', complete : true},
                                {name : 'clear task name after clicking "Add"', complete : true},
                                {name : 'put "Add" button in one line with input', complete : true},
                                {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                                {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                                {name : 'when task is complete cross it out', complete : true},
                                {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                                {name : 'don\'t allow to add empty tasks', complete : true},
                                {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                                {name : 'extract list item into a separate vue.js component', complete : false},
                                {name : 'persist tasks list in a local storage', complete : false},
                                {name : 'add animation on task completion', complete : true},
                            ],
                tabs : [ "Pending", "Completed" ]
            }
        },

        watch: {
            tasks: {
                handler(tasks) {
                    localStorage.setItem(this.storageId, JSON.stringify(tasks));
                }
            }
        },

        methods : {
            addTask () {
                if(this.newTaskName.length) {
                    this.tasks.push({
                        name : this.newTaskName, 
                        complete : false
                    })
                    this.newTaskName = ''
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;
        max-width: 550px;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        &__title {
            margin-top: 0;
        }

        &__content {
            flex-grow: 1;
        }

        &__tasks {
            list-style: none;
            padding: 0;
            margin-top: 0;

            &-enter-active {
                animation: bounce-out 1s reverse;
            }

            &-leave-active {
                animation: bounce-out 1s;
            }

            @keyframes bounce-out {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: translateY(50%) scale(1.5);
                }
                100% {
                    transform:  translateY(-500%) scale(0);
                }
            }
        }

        &__controls {
            display: flex;
            justify-content: space-between;
        }

        .controls {
            &__task-input {
                flex-grow: 1;
                margin-right: 1rem;
            }

            &__task-submit {
                border-radius: 20px;
            }
        }

        .scroll-content {
            width: calc(100% + 10px);
            height: 300px;
            margin-right: -10px;
        }
    }
</style>
