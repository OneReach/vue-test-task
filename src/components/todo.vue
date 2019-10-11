<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs>
      <ui-tab
        v-for="tab in tabs"
        :key="tab.title"
        :title="tab.title"
        :selected="tab.title === 'Pending'"
        :class="activeTab"
        @deselect="switchTab(tab.title)"
      >
        <ul class="tasks">
          <transition-group name="fade">
            <todoItem
              v-for="task in tasksFiltered"
              :task="task"
              :key="task.id"
              :class="{complete : task.complete}"
              @savedStatus="saveToStorage"
            />
          </transition-group>
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
  import todoItem from './todoItem'

  export default {
    name: 'todo',
    components: {
      todoItem
    },
    data () {
      return {
        id: 0,
        newTaskName: '',
        activeTab: 'Pending',
        tabs: [
          {title: 'Pending'},
          {title: 'Completed'}
        ],
        tasks: [
          {id: 0, name: 'create skeleton of todo', complete: true},
          {id: 1, name: 'add ability to add tasks', complete: true},
          {id: 2, name: 'clear task name after clicking "Add"', complete: true},
          {id: 3, name: 'put "Add" button in one line with input', complete: true},
          {id: 4, name: 'add new task by hitting Enter instead of clicking "Add"', complete: true},
          {id: 5, name: 'replace <input> with <ui-checkbox> in tasks list', complete: true},
          {id: 6, name: 'when task is complete cross it out', complete: true},
          {id: 7, name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true},
          {id: 8, name: 'don\'t allow to add empty tasks', complete: true},
          {id: 9, name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true},
          {id: 10, name: 'extract list item into a separate vue.js component', complete: true},
          {id: 11, name: 'persist tasks list in a local storage', complete: true},
          {id: 12, name: 'add animation on task completion', complete: false},
          {id: 13, name: 'check me please :)', complete: false}
        ]
      }
    },
    mounted () {
      if (localStorage.getItem('tasks')) {
        try {
          this.tasks = JSON.parse(localStorage.getItem('tasks'))
        } catch (e) {
          localStorage.removeItem('tasks')
        }
      }

      this.id = this.tasks.length
    },
    methods: {
      addTask () {
        if (!this.newTaskName.trim()) return

        this.tasks.push({
          id: this.id,
          name: this.newTaskName.trim(),
          complete: false
        })
        this.saveToStorage()
        this.newTaskName = ''
        this.id++
      },
      switchTab (tab) {
        this.activeTab = tab === 'Pending'
          ? 'Completed'
          : 'Pending'
      },
      saveToStorage () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
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
    box-shadow: 3px 3px 15px rgba(0,0,0,.3);

    .title {
      margin-top: 0;
    }

    .tasks {
      margin: 0;
      padding: 15px 0 10px;
      list-style: none;
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
  
  // Tasks transitions
  .Pending :not(.complete).fade-leave-active,
  .Completed .complete.fade-leave-active {
    position: absolute;
    opacity: 0;
    transition: opacity .25s .1s, transform .25s .1s;
  }

  .Pending :not(.complete).fade-leave-active {
    text-decoration: line-through;
    transform: scale(0.75);
    
    // This block is not working (can't figure out why)
    .ui-checkbox__checkmark::after {
      opacity: 1 !important;
      border-bottom-color: #333 !important;
      border-right-color: #333 !important;
    }
  }

  .Completed .complete.fade-leave-active {
    text-decoration: none;
    transform: scale(1.05);

    // But this block works fine
    .ui-checkbox__checkmark::after {
      border-bottom-color: #fff !important;
      border-right-color: #fff !important;
    }
  }

  .fade-move {
    transition: transform .25s .2s;
  }
</style>
