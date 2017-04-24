<template>
    <div class="todo">
        <h2 class="title">Checklist</h2>
        <ui-tabs type="text" fullwidth>

          <ui-tab title="Pending">
            <ul class="tasks"
              :class="{ 'oversize': filtered(tasks, false).length > maxSize }">
                <li v-for="task in filtered(tasks, false)" v-if="!task.complete">
                    <Item :task="task" @change="updateTask" />
                </li>
            </ul>
          </ui-tab>

          <ui-tab title="Complete">
            <ul class="tasks"
              :class="{ 'oversize': filtered(tasks, true).length > maxSize }">
                <li v-for="task in filtered(tasks, true)" v-if="task.complete">
                  <Item :task="task" @change="updateTask" />
                </li>
            </ul>
          </ui-tab>

        </ui-tabs>
        <div>
            <ui-textbox class="ui-textbox"
              placeholder="e.g. 'read vue.js guide'"
              v-model="newTaskName"
              :invalid="emptyTask"
              :autofocus="true"
              error="This field is empty..."
              @input="checkTask"
              @keydown-enter="addTask">
            </ui-textbox>

            <ui-button class='ui-button'
              color="primary"
              :disabled="emptyTask"
              @click="addTask"
              icon="add">
            Add
          </ui-button>
        </div>
    </div>
</template>

<script>
    import Item from './item';
    import storage from 'storage';
    import R from 'ramda';
    import { to_json, from_json } from '../utils.js';

    export default {
        data () {
            return {
                newTaskName : '',
                lastTask: {},
                emptyTask: true,
                maxSize: 8,
                overSize: false,
                tasks : [
                    {id: 0, name : 'create skeleton of todo', complete : true},
                    {id: 1, name : 'add ability to add tasks', complete : true},
                    {id: 2, name : 'clear task name after clicking "Add"', complete : true},
                    {id: 3, name : 'put "Add" button in one line with input', complete : true},
                    {id: 4, name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {id: 5, name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {id: 6, name : 'when task is complete cross it out', complete : true},
                    {id: 7, name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {id: 8, name : 'don\'t allow to add empty tasks', complete : true},
                    {id: 9, name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {id: 10, name : 'extract list item into a separate vue.js component', complete : true},
                    {id: 11, name : 'persist tasks list in a local this.db', complete : false},
                    {id: 12, name : 'add animation on task completion', complete : false}
                ]
            }
        },

        mounted : function () {
          R.forEachObjIndexed( (value, key) => {
            storage.set(value.id, to_json(value));
          }, this.tasks);
        },

        watch: {
          lastTask: function(val) {
            return from_json(val);
          },
          tasks: function(val) {
            let last = this.tasks.length - 1;
            storage.set(last, to_json(val[last]));
          }
        },

        methods : {
            _u (e) {
              console.log(e);
            },
            addTask () {
              if (!this.checkTask()) {
                this.tasks.push({
                  id: this.tasks.length,
                  name : this.newTaskName,
                  complete : false
                });

                return this.clearTask();
              } else {
                return false;
              }
            },
            checkTask () {
              return this.emptyTask = this.isEmpty()
            },
            clearTask () {
              return this.newTaskName = '';
            },
            updateTask (val) {
              return this.lastTask = to_json(val);
            },
            filtered (tasks, bool) {
              return R.filter( value => value.complete === bool, tasks);
            },
            isEmpty () {
              return this.newTaskName == '';
            }
        },

        components: { Item }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        width: 700px;
        min-height: 390px;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

          .tasks {
              list-style: none;
              height: 270px;
              max-height: 270px;
              padding: 0;
          }

          .oversize {
            overflow-y: scroll;
          }

        .ui-textbox {
          display: inline-block;
          width: 81%;
          margin-right: 4.5%;
        }

        .ui-button {
          display: inline-block;
        }
    }
</style>
