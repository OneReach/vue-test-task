<!--Main Render-->
<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ul class="tasks">
      <!--Tabs component-->
      <ui-tabs background-color="primary" raised fullwidth indicator-color="white" text-color-active="white" text-color="white" type="text">
        <ui-tab title="Pending" class="scroll">
          <li v-for="(task, index) in tasks" :class="{complete : task.complete}" v-if="!task.complete">
            <task-item v-bind:tasks="tasks" v-bind:currtask="task" v-bind:index="index"></task-item> <!--vue component-->
          </li>
        </ui-tab>

        <ui-tab title="Complete" class="scroll">
          <li v-for="(task, index) in tasks" :class="{complete : task.complete}" v-if="task.complete">
            <task-item  v-bind:tasks="tasks" v-bind:currtask="task" v-bind:index="index"></task-item> <!--vue component-->
          </li>
        </ui-tab>
      </ui-tabs>
    </ul>
    <!--input lines and buttons-->
    <div class = "flex-inline-btw">
      <div style="width: 80%"><ui-textbox placeholder="Enter to send" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox></div>
      <div><ui-button class="flex-item" color="primary" @click="addTask" icon="add">Add</ui-button></div>
      <div><ui-button color="primary" @click="defaultTask" icon="refresh">Default</ui-button></div>
    </div>
  </div>
</template>

<!--Scripts-->
<script>
import taskItem from './task_item.vue' //import task component
export default {
  data () {
    return {
      newTaskName : '',
      tasks : [ {name : '', complete : false} ]
    }
  },

  watch: {
    tasks: {
      handler: function (newVal, oldVal) {
        this.saveObject("tasks",newVal); //save tasks to local storage
      },
      deep: true
    }
  },

  mounted () {
    this.tasks=this.loadObject("tasks"); //on load page we load task objects to memory
  },

  methods : {
    addTask () {
      if (!this.newTaskName) return;
      this.tasks.push({name : this.newTaskName, complete : false});
      this.newTaskName='';
    },
    defaultTask () {
      this.tasks=[
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
                    {name : 'I hope everything is right!', complete : false}
                 ];
    },
    loadObject(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    saveObject(key, object)
    {
        localStorage.setItem(key, JSON.stringify(object));
    }
  },

  components: {
    taskItem //task component
  }
};
</script>

<!--Styles-->
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
        }
    }

   .flex-inline-btw {
    display: flex;
    justify-content: space-between;
   }

   .flex-item {
    display: flex;
    justify-content: flex-start;
    margin: 0px 5px 0px 8px;
   }

    div.scroll {
    width: 500px;
    height: 200px;
    overflow: auto;
    }
</style>
