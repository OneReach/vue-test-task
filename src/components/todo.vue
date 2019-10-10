<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs>
      <ui-tab
        :key="tab.title"
        :selected="tab.title === 'Pending'"
        :title="tab.title"
        v-for="tab in tabs"
        @deselect="switchTab(tab.title)"
      >
        <ul class="tasks">
          <li v-for="(task, index) in tasksFiltered" :key="index" :class="{complete : task.complete}">
            <ui-checkbox v-model="task.complete" color="clear">{{task.name}}</ui-checkbox>
          </li>
        </ul>
      </ui-tab>
    </ui-tabs>
    <div class="add-task-controls">
      <ui-textbox placeholder="Add an item here" v-model="newTaskName" @keydown.enter="addTask"></ui-textbox>
      <ui-button color="primary" @click="addTask">Add item</ui-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        newTaskName: '',
        activeTab: 'Pending',
        tabs: [
          {title: 'Pending'},
          {title: 'Completed'}
        ],
        tasks: [
          {name: 'create skeleton of todo', complete: true},
          {name: 'add ability to add tasks', complete: true},
          {name: 'clear task name after clicking "Add"', complete: true},
          {name: 'put "Add" button in one line with input', complete: true},
          {name: 'add new task by hitting Enter instead of clicking "Add"', complete: true},
          {name: 'replace <input> with <ui-checkbox> in tasks list', complete: true},
          {name: 'when task is complete cross it out', complete: true},
          {name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true},
          {name: 'don\'t allow to add empty tasks', complete: true},
          {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true},
          {name: 'extract list item into a separate vue.js component', complete: false},
          {name: 'persist tasks list in a local storage', complete: false},
          {name: 'add animation on task completion', complete: false},
          {name: 'check me please :)', complete: false}
        ]
      }
    },
    methods: {
      addTask () {
        if (!this.newTaskName.trim()) return

        this.tasks.push({name : this.newTaskName, complete : false})
        this.newTaskName = ''
      },
      switchTab (tab) {
        this.activeTab = tab === 'Pending'
          ? 'Completed'
          : 'Pending'
      }
    },

    computed: {
      tasksFiltered () {
        return this.activeTab === 'Pending'
          ? this.tasks.filter(task => !task.complete)
          : this.tasks.filter(task => task.complete)
      }
    }
  }
</script>

<style lang="scss">
  .todo {
    width: 400px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

    .title {
      margin-top: 0;
    }

    .tasks {
      margin: 0;
      padding: 15px 0 10px;
      list-style: none;

      .complete {
        text-decoration: line-through;
      }
    }

    .add-task-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    // keen ui reset
    .ui-tabs {
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        right: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
        height: 25px;
      }

      &::before {
        top: 55px;
        background-image: linear-gradient(to top, rgba(255,255,255,.1), #fff);
      }

      &::after {
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(255,255,255,.1), #fff);
      }

      &__header {
        margin-bottom: 20px;
        background-color: #fff !important;
      }

      &__body {
        overflow: auto;
        height: 250px;
        margin-bottom: 50px;
        border: none;
      }
    }
      

    .ui-tab-header-item {
      height: 2.25rem;
      color: #ddd;
      border-radius: 20px;
      transition: background-color .15s;

      + .ui-tab-header-item {
        margin-left: 20px;
      }

      &::after {
        display: none;
      }

      &.is-active {
        background-color: #aaa;

        .ui-tab-header-item__text {
          color: #fff;
        }
      }

      &__text {
        text-transform: none;
        color: #aaa;
        transition: color .15s;
      }
    }

    .ui-checkbox__checkmark::after {
      border-bottom-color: #333 !important;
      border-right-color: #333 !important;
    }

    .ui-textbox {
      margin-bottom: 0;

      &__input {
        border-bottom-width: 0 !important;
      }
    }

    .ui-button {
      text-transform: none;
      border-radius: 20px;
    }
  }
</style>
