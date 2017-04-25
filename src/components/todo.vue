<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>

    <ui-tabs type="icon-and-text" 
             fullwidth background-color="primary" 
             indicator-color="primary"
             text-color-active="white"
             text-color="white">

      <ui-tab icon="drafts" title="Pending">
        <ul class="tasks">
          <item v-for="task in tasks" :task="task" v-if="!task.complete"></item>
        </ul>
      </ui-tab>

      <ui-tab icon="mail_outline" title="Complite">
        <ul class="tasks">
          <item v-for="task in tasks" :task="task" v-if="task.complete"></item>
        </ul>
      </ui-tab>

     </ui-tabs>

      <div class="submit-task">
        <ui-textbox class="submit-task__input" placeholder="Add task title" v-model="newTaskName" @keydown.enter="addTask"></ui-textbox>
        <ui-button class="submit-task__button" color="primary" @click="addTask" icon="add">Add</ui-button>
      </div>

    </div>
</template>

<script>
  import item from "./item.vue"

  export default {
    data () {
      let tasks = JSON.parse(window.localStorage.getItem('tasks'));
      if (!tasks) {
        tasks = [
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

        JSON.parse(window.localStorage.setItem('tasks', JSON.stringify(tasks)));
      }

      return {
        newTaskName : '',
        tasks
      }
    },

    methods : {
      addTask() {
        if (this.newTaskName.trim().length) {
          this.tasks.push({name : this.newTaskName, complete : false});
          this.newTaskName = '';
        }
      }
    },

    watch : {
      tasks: function(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
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
    width: 700px;
    padding: 20px;

    background: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

    .title {
      margin-top: 0;
    }

    .tasks {
      height: 350px;
      padding: 0;

      list-style: none;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .submit-task {
    display: flex;
    flex-direction: row;

    &__input {
      flex: 1;
    }

    &__button {
      margin-left: 50px;
    }
  }
</style>
