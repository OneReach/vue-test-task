<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs
            :background-color="tabsBackgroundColor"
            :fullwidth="tabsFullwidth"
            :indicator-color="tabsIndicatorColor"
            :raised="tabsRaised"
            :text-color-active="tabsTextColorActive"
            :text-color="tabsTextColor"
            :type="tabsType"
            :disableRipple="tabsDisableRipple"
            :class="{activeTabPending: activeTab === 'Pending'}"
            @tab-change="changeActiveTab"
        >
            <ui-tab
                :key="tab.title"
                :selected="tab.title === 'Pending'"
                :title="tab.title"
                v-for="tab in tabs"
            >
                <template v-if="tab.title === 'Pending' && pendingTasks.length">
                    <transition-group name="list" tag="ul" class="tasks">
                        <todo-item v-for="task in pendingTasks" :key="tab.title + ' ' + task.name" :task="task"></todo-item>
                    </transition-group>
                </template>
                <template v-else-if="tab.title === 'Completed' && completedTasks.length">
                    <transition-group name="list" tag="ul" class="tasks">
                        <todo-item v-for="task in completedTasks" :key="tab.title + ' ' + task.name" :task="task"></todo-item>
                    </transition-group>
                </template>
                <template v-else>
                    <ui-alert :dismissible="false">This list is empty now.</ui-alert>
                </template>
            </ui-tab>
        </ui-tabs>
        <div class="add-task-wrap">
            <ui-textbox placeholder="Add an item here" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask">Add item</ui-button>
            <ui-modal ref="modal" title="Warning!">
                You should enter a task name!
            </ui-modal>
        </div>
    </div>
</template>

<script>
    import TodoItem from './todoItem';

    export default {
        data () {
            return {
                newTaskName : '',
                tasks : [
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
                ],
                tabsBackgroundColor: 'default',
                tabsFullwidth: false,
                tabsIndicatorColor: 'default',
                tabsRaised: false,
                tabsTextColorActive: 'default',
                tabsTextColor: 'default',
                tabsType: 'text',
                tabsDisableRipple: true,
                tabs: [
                    {
                        title: 'Pending'
                    },
                    {
                        title: 'Completed'
                    }
                ],
                activeTab: 'Pending'
            }
        },

        methods : {
            addTask () {
                if (!this.newTaskName) {
                    this.$refs.modal.open();
                } else {
                    this.tasks.push({name : this.newTaskName, complete : false});
                    this.newTaskName = '';
                    this.saveTasksInLocalStorage();
                }
            },
            changeActiveTab (event) {
                this.activeTab = event.title;
            },
            saveTasksInLocalStorage () {
                window.localStorage.setItem('tasksList', JSON.stringify(this.tasks));
            }
        },

        computed: {
            pendingTasks () {
                return this.tasks.filter(task => !task.complete);
            },
            completedTasks () {
                return this.tasks.filter(task => task.complete);
            }
        },

        created: function () {
            this.saveTasksInLocalStorage();
        },

        updated: function () {
            this.saveTasksInLocalStorage();
        },

        components: { TodoItem }
    };
</script>

<style lang="scss">
    .todo {
        width: 650px;
        height: 400px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .tasks {
            max-height: 140px;
            overflow-y: auto;
            list-style: none;
            padding: 0;
        }

        .add-task-wrap {
            display: flex;
            justify-content: space-between;

            .ui-textbox {
                flex-grow: 1;
                margin-right: 20px;
            }
        }

        .ui-close-button {
            cursor: pointer;
        }

        .ui-button {
            border-radius: 20px;
            text-transform: inherit;
            cursor: pointer;
        }

        div.ui-tabs {
            height: 250px;

            .ui-checkbox.is-checked.is-active {
                .ui-checkbox__checkmark:after {
                    opacity: 0;
                }

                .ui-checkbox__checkmark-background {
                    background-color: transparent;
                    border-color: rgba(0, 0, 0, 0.38);
                }
            }

            &.activeTabPending .ui-checkbox.is-active {
                text-decoration: line-through;

                .ui-checkbox__checkmark:after {
                    border-bottom: 0.125rem solid black;
                    border-right: 0.125rem solid black;
                    opacity: 1;
                }
            }

            &__header {
                background: none;

                .ui-tab-header-item {
                    margin-right: 30px;

                    &.is-active {
                        padding: 0;
                        margin-right: 0;

                        .ui-tab-header-item__text {
                            height: 32px;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #ccc9c9;
                            border-radius: 15px;
                        }
                    }

                    .ui-tab-header-item__text {
                        text-transform: initial;
                        font-weight: 400;
                        min-width: 6rem;
                    }
                }
            }

            &__body {
                height: 230px;
                border: none;
            }
        }

        .ui-alert__body {
            border-radius: 25px;
        }

        .list-enter-active, .list-leave-active {
            transition: opacity 0s linear 0.5s;
        }

        .list-enter-to, .list-leave-to {
            opacity: 0;
        }
    }
</style>
