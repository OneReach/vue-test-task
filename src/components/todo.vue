<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>

        <ui-tabs> <!-- split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs> -->
          <ui-tab title="Pending">
            <ul class="tasks">
              <li v-for="task in tasks" v-if="!task.complete"  :class="{complete : task.complete}">
                <item v-bind:itemtodo="task"></item> <!-- extract list item into a separate vue.js component -->
              </li>
            </ul>
          </ui-tab>
          <ui-tab title="Complete">
            <ul class="tasks">
              <li v-for="task in tasks" v-if="task.complete"  :class="{complete : task.complete}">
                <item v-bind:itemtodo="task"></item>
              </li>
            </ul>
          </ui-tab>
        </ui-tabs>

        <div class="footer">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" @keydown-enter="addTask" v-model="newTaskName"></ui-textbox> <!-- add new task by hitting Enter instead of clicking "Add" -->
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import item from './item';
    export default {
        data () {
            return {
                store_key: 'vue-test',
                store: '',
                newTaskName : '',
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : false},
                    {name : 'put "Add" button in one line with input', complete : false},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {name : 'when task is complete cross it out', complete : false},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {name : 'don\'t allow to add empty tasks', complete : false},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },

        methods : {
            addTask () {
              if(this.newTaskName != '') {
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = ''; // clear task name after clicking "Add"

                // local storage
                this.store = JSON.stringify(this.tasks);
                localStorage.setItem(this.store_key, this.store);
                console.log(JSON.parse(localStorage.getItem(this.store_key)));

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
        width: 60%;
        height: 500px;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            .complete {
              text-decoration: line-through; // when task is complete cross it out
            }
            /* make list of tasks scrollable, if there're are a lot of tasks */
            height: 230px;
            overflow-y: scroll;
        }

        /* put "Add" button in one line with input */
        .footer {
          display: flex;
          justify-content: space-between;
          .ui-textbox {
            width: 100%;
            margin-right: 15px;
          }

        }
    }

</style>
