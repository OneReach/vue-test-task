<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>

        <ui-tabs backgroundColor="clear"
                 textColorActive="white"
        >
            <ui-tab title="Pending">
                <ul class="tasks">
                    <transition-group :name="transitionType"
                                      v-on:before-leave="beforeLeave"
                                      v-on:after-leave="afterLeave"
                    >
                        <li v-bind:key="task.id"
                            v-for="task in pendingTasks"
                            v-bind:class="{complete: task.complete}"
                        >
                            <task v-bind:task="task"
                                  v-on:deleteTask="deleteTask"
                            ></task>
                        </li>
                    </transition-group>
                </ul>
            </ui-tab>

            <ui-tab title="Completed" selected>
                <ul class="tasks">
                    <transition-group :name="transitionType"
                                      v-on:before-leave="beforeLeave"
                                      v-on:after-leave="afterLeave"
                    >
                        <li v-bind:key="task.id"
                            v-for="task in completedTasks"
                            v-bind:class="{complete: task.complete}"
                        >
                            <task v-bind:task="task"
                                  v-on:deleteTask="deleteTask"
                            ></task>
                        </li>
                    </transition-group>
                </ul>
            </ui-tab>
        </ui-tabs>

        <div class="add-task">
            <ui-textbox placeholder="e.g. 'read vue.js guide'"
                        v-model="newTaskName"
                        @keydown.enter="addTask"
            ></ui-textbox>

            <ui-button color="primary"
                       @click="addTask"
            >Add item</ui-button>
        </div>
    </div>
</template>

<script>
    import localStorage from '../services/localStorage.service';
    import mockData from '../mockData';
    import task from './task.vue';

    const STORAGE_KEY = 'todos';
    const TASKS_LIST_HTML_ELEMENT = '.tasks';

    export default {
        components: {
            'task': task
        },

        data () {
            return {
                newTaskName : '',
                uniqueIDCreator: 0,

                transitionType: 'strikethrough',

                tasks : []
            }
        },

        created () {
            this.tasks = localStorage.has(STORAGE_KEY) ? localStorage.get(STORAGE_KEY) : mockData;
            this.uniqueIDCreator = this.tasks.length;
        },

        methods : {
            addTask () {
                if (this.newTaskName !== '') {
                    this.tasks.push({id: this.uniqueIDCreator++, name : this.newTaskName, complete : false});
                    this.newTaskName = '';

                    // scroll tasks list to the bottom when adding a new task
                    const tasksHTMLElement = this.$el.querySelector(TASKS_LIST_HTML_ELEMENT);
                    setTimeout(() => tasksHTMLElement.scrollTo(0, tasksHTMLElement.scrollHeight), 0);
                }
            },

            deleteTask (id) {
                this.transitionType = 'fade';
                this.tasks = this.tasks.filter(task => task.id !== id);
            },

            beforeLeave (el) {
                // simulate the check before the task is really marked as completed to match the demo gif layout
                if (this.transitionType === 'strikethrough') el.querySelector('.ui-checkbox').classList.add('is-checked');
            },

            afterLeave (el) {
                this.transitionType = 'strikethrough';
            }
        },

        computed: {
            pendingTasks: function () {
                return this.tasks.filter(task => !task.complete);
            },
            completedTasks: function () {
                return this.tasks.filter(task => task.complete);
            }
        },
         
        watch : {
            tasks: {
                handler: function (newValue) {
                    localStorage.set(STORAGE_KEY, newValue);
                },
                deep: true
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        width: 600px;
        max-width: 100%;
        margin: auto;
        background: #fff;
        padding: 40px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
            line-height: 1;
        }

        .tasks {
            display: block;
            overflow-y: scroll;
            min-height: 200px;
            max-height: calc(100vh - 2 * 40px - 2.25rem - 2rem - 2 * 0.67 * 2rem - 2 * 50px);
            list-style: none;
            padding: 0;
        }

        // Add todo form
        .add-task {
            display: flex;
            align-items: center;
        }

        .ui-textbox {
            flex-grow: 1;
            margin-right: 10px;
            margin-bottom: 0;
        }

        .ui-button {
            border-radius: 32px;
        }

        // Transitions

        .strikethrough-leave-active,
        .fade-leave-active {
            transition: all 0.5s;
        }

        .strikethrough-leave-to.complete {
            transition-duration: 0s;
        }

        .fade-leave-to {
            opacity: 0;
        }
    }
</style>

<style lang="scss">
    // Since the transition is performed by TodoComponent, I've decided to place transition styles for children here too
    .ui-checkbox span {
        background-image: linear-gradient(to bottom, transparent 20%, currentColor 21%);
        background-repeat: no-repeat;
        background-size: 0% 2px;
        background-position: 0 0.5em;
        transition: background-size 0.4s ease-in-out;

        .strikethrough-leave-active:not(.complete) & {
            background-size: 100% 2px;
        }
    }
</style>
