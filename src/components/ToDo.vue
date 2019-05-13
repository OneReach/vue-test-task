<template>
    <div class="todo" :style="cssVariables">
        <h1 class="todo__title">Checklist</h1>

        <ui-tabs
            background-color="default"
            indicator-color="primary"
            text-color-active="primary"
            text-color="black"
            type="text"
            ref="controlTabs"
            :class="taskCompletionStatus"
        >
            <ui-tab
                title="Pending"
                id="pending"
            >
                <tasks-list
                    :tasks="pendingTasks"
                    @set-task-state="setTasksState($event)"
                    @remove="removeTaskFromLocalStorage($event)"
                    ref="tasksList"
                />
            </ui-tab>

            <ui-tab
                title="Completed"
                id="completed"
            >
                <tasks-list
                    :tasks="completedTasks"
                    @set-task-state="setTasksState($event)"
                    @remove="removeTaskFromLocalStorage($event)"
                />
            </ui-tab>
        </ui-tabs>

        <div class="add-task">
            <ui-textbox
                v-model="newTaskName"
                class="add-task__input"
                placeholder="e.g. 'read vue.js guide'"
                ref="inputText"
            >
            </ui-textbox>
            <ui-button
                class="add-task__btn"
                color="primary"
                icon="add"
                Add
                sobmit
                @click="addTask"
            >
            </ui-button>
        </div>

        <MovingElement
            :styles-params="movingElementStyles"
            :animation-duration="animationDuration"
        >
            {{ movingElementText }}
        </MovingElement>
    </div>
</template>

<script>
    const LOCAL_STORAGE_KEY = 'todoTasks'
    const ANIMATION_DURATION = 500

    import TasksList from './TasksList.vue'
    import MovingElement from './MovingElement.vue'

    export default {
        name: 'ToDo',
        components: {
            TasksList,
            MovingElement
        },
        data () {
            return {
                movingElementStyles: { x: 0, y: 0, opacity: 0 },
                animationDuration: ANIMATION_DURATION,
                newTaskName: '',
                tasks: [],
                taskCompletionStatus: ''
            }
        },
        computed: {
            cssVariables() {
                return {
                    '--task-opacity': this.movingElementStyles.opacity ? 0 : 1,
                }
            },
            completedTasks() {
              return this.tasks.filter(
                  task => task.complete
              )
            },
            pendingTasks() {
                return this.tasks.filter(
                    task => !task.complete
                )
            },
            movingElementText() {
                return this.tasks.length && this.tasks[this.tasks.length -1].name
            }
        },
        methods : {
            addTask () {
                if (!this.newTaskName) return
                this.tasks.push(
                    this.createNewTask()
                );
                this.setMovingElParams()
                this.viewAfterAddingTask()

            },
            createNewTask() {
                return {
                    id: `f${(+new Date).toString(16)}`,
                    name : this.newTaskName,
                    complete : false
                }
            },
            setMovingElParams() {
                this.$nextTick(()=> {
                    this.setFinalParamsForMovingEl()

                    setTimeout(() => {
                        this.setInitialParamsForMovingEl()
                    }, this.animationDuration)
                })
            },
            setInitialParamsForMovingEl() {
                const {x, y} = this.$refs.inputText.$el.getBoundingClientRect()
                this.movingElementStyles = {x, y, opacity: 0}
            },
            setFinalParamsForMovingEl() {
                const {x, y} = this.$refs.tasksList.$el.lastChild.getBoundingClientRect()
                this.movingElementStyles = {x, y, opacity: 1}
            },
            viewAfterAddingTask() {
                this.newTaskName = ''
                this.$refs.controlTabs.setActiveTab('pending')
                this.setTasksToLocalStorage()
                this.scrollToEnd()
            },
            setTasksState(currentTaskState) {
                this.taskCompletionStatus = currentTaskState
                    ? 'completed'
                    : 'pending'
                setTimeout(()=> {
                    this.taskCompletionStatus = ''
                }, 300)
                this.setTasksToLocalStorage()
            },
            setTasksToLocalStorage() {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.tasks || []))
            },
            getTasksFromLocalStorage() {
                const json = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
                this.tasks = JSON.parse(json)
            },
            removeTaskFromLocalStorage(taskId) {
                this.tasks = this.tasks.filter(
                    task => task.id !== taskId
                )
                this.setTasksToLocalStorage()
            },
            scrollToEnd() {
                const container = this.$el.querySelector('.ui-tabs__body')
                container.scrollTop = container.scrollHeight
            },
        },
        created () {
            this.getTasksFromLocalStorage()
            const listener = document.addEventListener('keydown', e => {
                if (e.keyCode === 13) {
                    this.addTask()
                }
            })
            this.$once("hook:beforeDestroy", () => {
                document.removeEventListener("keydown", listener)
            })
        },
        mounted () {
            this.setInitialParamsForMovingEl()
        }
    };
</script>

<style lang="scss">
    .todo {
        max-width: 800px;
        width: 100%;
        margin: 10px auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        &__title {
            margin-top: 0;
        }
    }

    .add-task {
        display: flex;
        justify-content: space-between;

        &__input {
            z-index: 9;
        }
    }

   .ui-tabs__body {
        height: 65vh;
        overflow-y: auto;
    }

   .tasks-list__task:last-child {
       opacity: var(--task-opacity);
   }

   .ui-tab-header-item__text {
       transform: scale(1);
       transition: tarnsform .3s;
   }

   .pending li[aria-controls*="pending"] .ui-tab-header-item__text,
   .completed li[aria-controls*="completed"] .ui-tab-header-item__text {
      transform: scale(1.2);
      transition: tarnsform .3s;
   }
</style>
