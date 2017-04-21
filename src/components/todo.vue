<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullwidth>
          <ui-tab title="Pending">
            <ul class="tasks">
                <li v-for="task in filtered(tasks, false)" :class="{complete : task.complete}">
                    <label>
                        <ui-checkbox class='ui-checkbox' v-model="task.complete"></ui-checkbox>
                        <span :class="{crossed : task.complete}">{{task.name}}</span>
                    </label>
                </li>
            </ul>
          </ui-tab>
          <ui-tab title="Complete">
            <ul class="tasks">
                <li v-for="task in filtered(tasks, true)" :class="{complete : task.complete}">
                    <label>
                        <ui-checkbox class='ui-checkbox' v-model="task.complete"></ui-checkbox>
                        <span :class="{crossed : task.complete}">{{task.name}}</span>
                    </label>
                </li>
            </ul>
          </ui-tab>
        </ui-tabs>
        <div>
            <ui-textbox class="ui-textbox" placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" @input="checkTask" @keydown-enter="addTask"></ui-textbox>
            <ui-button class='ui-button' color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                newTaskName : '',
                emptyTask: true,
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
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        methods : {
            addTask () {
              if (!this.checkTask()) {
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = '';
              } else {
                return false;
              }
            },
            checkTask () {
              switch (this.isEmpty()) {
                case true:
                  return this.emptyTask = true;
                break;
                case false:
                  return this.emptyTask = false;
                break;
              }
            },
            isEmpty () {
              return this.newTaskName == '';
            },
            filtered (tasks, bool) {
              return tasks.filter( task => task.complete === bool)
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        width: 685px;
        min-height: 399px;
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

            .ui-checkbox {
              display: inline-block;
              vertical-align: top;
            }

            .crossed {
              text-decoration: line-through;
            }
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
