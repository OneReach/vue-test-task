<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs
      type="text"
      :fullwidth="true"
      backgroundColor="clear"
      indicatorColor= "white"
    >
      <ui-tab title="Pending" selected>
        <transition>
          <ListItem :tasks="pendingTasks" class="tasks" />
        </transition>
      </ui-tab>
      <ui-tab title="Completed">
        <ListItem :tasks="completedTasks" class="tasks" />
      </ui-tab>
    </ui-tabs>
    <div class="addTask">
      <ui-textbox
          placeholder="Add an item here"
          @keydown.enter="addTask"
          v-model="newTaskName"
      />
      <ui-button
          color="primary"
          @click="addTask"
          icon="add"
      >
        Add
      </ui-button>
    </div>
  </div>
</template>

<script>
  import ListItem from './ListItem';

  export default {
    components : {
      ListItem
    },

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
          {name : 'persist tasks list in a local storage', complete : false},
          {name : 'add animation on task completion', complete : false},
        ],

        task : {}
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

    methods : {
      addTask () {
        this.newTaskName.trim() && this.tasks.push({name : this.newTaskName, complete : false});
        this.newTaskName = "";

        this.filterTasks(this.selectedFilter);
      },

      filterTasks (value) {
        switch (value) {
          case "Pending":
            this.selectedFilter = "Pending";
            return this.filteredTasks = this.tasks.filter(task => task.complete === false);

          case "Completed":
            this.selectedFilter = "Completed";
            return this.filteredTasks = this.tasks.filter(task => task.complete === true);
        }
      },

      changeStatus() {
        this.filterTasks(this.selectedFilter)
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

    .title {
      margin-top: 0;
    }

    .tasks {
      display: flex;
      flex-direction: column;
      max-height: 500px;
      overflow: scroll;
      list-style: none;
      padding: 0;
    }

    .addTask {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
