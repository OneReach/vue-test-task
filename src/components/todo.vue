<template>
    <div class="todo">
        <h1 class="todo__title">Checklist</h1>
        <ui-tabs backgroundColor="clear" indicatorColor="white">
          <!-- Pending -->
          <ui-tab title="Pending">
            <transition-group tag="ul" name="list" class="todo__tasks">
              <todo-item
                v-for="(task, index) in tasks"
                v-if="!task.complete"
                v-bind:key="index"
                v-bind:name="task.name"
                v-bind:complete="task.complete"
                v-on:toggle="task.complete = !task.complete"
                :class="{complete : task.complete}"
              ></todo-item>
            </transition-group>
          </ui-tab>
          <!-- Completed -->
          <ui-tab title="Completed">
            <transition-group tag="ul" name="list" class="todo__tasks">
                <todo-item
                  v-for="(task, index) in tasks"
                  v-if="task.complete"
                  v-bind:key="index"
                  v-bind:name="task.name"
                  v-bind:complete="task.complete"
                  v-on:toggle="task.complete = !task.complete"
                  :class="{complete : task.complete}"
                ></todo-item>
            </transition-group>
          </ui-tab>
        </ui-tabs>

        <div class="todo__add">
            <ui-textbox
              placeholder="Add an item here"
              v-model="newTaskName"
              @keydown-enter="addTask">
            </ui-textbox>
            <ui-button
              color="primary"
              @click="addTask">
              Add item
            </ui-button>
        </div>
    </div>
</template>

<script>
    import todoItem from './todoItem.vue'

    const STORAGE_KEY = 'vue-test-task'
    const taskStorage = {
      fetch () {
        var tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return tasks;
      },
      save (tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      }
    }

    export default {
        components: {
          todoItem,
        },
        data () {
          return {
            newTaskName : '',
            tasks : taskStorage.fetch()
            // [
            //     {name : 'create skeleton of todo', complete : true},
            //     {name : 'add ability to add tasks', complete : true},
            //     {name : 'clear task name after clicking "Add"', complete : true},
            //     {name : 'put "Add" button in one line with input', complete : true},
            //     {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
            //     {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
            //     {name : 'when task is complete cross it out', complete : true},
            //     {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
            //     {name : 'don\'t allow to add empty tasks', complete : true},
            //     {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
            //     {name : 'extract list item into a separate vue.js component', complete : true},
            //     {name : 'persist tasks list in a local storage', complete : true},
            //     {name : 'add animation on task completion', complete : false},
            // ]
          }
        },
        watch: {
          tasks: {
            handler (tasks) {
              taskStorage.save(tasks);
            }
          }
        },
        computed: {
            completedTasks () {
              return this.tasks.filter(task => task.complete)
            },

            pendingTasks () {
              return this.tasks.filter(task => !task.complete)
            }
        },
        methods: {
            addTask () {
                if (this.newTaskName !== '') {
                  this.tasks.push({name : this.newTaskName, complete : false});

                  this.newTaskName = ''
                }
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
        width: 400px;
        height: 450px;

        &__title {
          margin-top: 0;
          font-size: 25px;
          font-weight: 400;
        }

        &__tasks {
          list-style: none;
          padding: 0;
          height: 200px;
          overflow-y: scroll;
        }

        &__add {
          display: flex;
          justify-content: space-between;
        }
    }

    .complete {
      text-decoration: line-through;
    }

    // list transitions
    .list {
      &-enter-active,
      &-leave-active {
        transition: 500ms cubic-bezier(.87,-.41,.19,1.44);
      }
      &-enter,
      &-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }

      &-enter {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
</style>
