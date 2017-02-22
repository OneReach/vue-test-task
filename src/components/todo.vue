<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <div class="content">
          <ui-tabs
            background-color="primary"
            fullwidth
            text-color-active="white"
            text-color="white"
          >
            <ui-tab title="Pending">
              <ul class="tasks">
                  <li v-for="task in tasks">
                      <label @click='markTask' v-show="!task.complete" class="task-label">
                          <ui-checkbox  v-model="task.complete" class="task__checkbox">{{task.name}}</ui-checkbox>
                      </label>
                  </li>
              </ul>
            </ui-tab>
            <ui-tab title="Complete">
              <ul class="tasks">
                  <li v-for="task in tasks">
                      <label @click='markTask' v-show="task.complete" class="task-label crossed">
                          <ui-checkbox v-model="task.complete" class="task__checkbox">{{task.name}}</ui-checkbox>
                      </label>
                  </li>
              </ul>
            </ui-tab>
          </ui-tabs>
        </div>
        <form novalidate class="controlls" @submit.prevent="validateBeforeSubmit">
            <ui-textbox
              class="controlls__input"
              placeholder="e.g. 'read vue.js guide'"
              v-model="newTaskName"
              v-validate="'required'"
            ></ui-textbox>
            <ui-button class="controlls__button" color="primary" icon="add">Add</ui-button>
        </form>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        newTaskName : '',
        tasks : [
          {name : 'create skeleton of todo', complete : true},
          {name : 'add ability to add tasks', complete : true},
          {name : 'clear task name after clicking "Add"', complete : true},
          {name : 'put "Add" button in one line with input', complete : true},
          {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
          {name : 'when task is complete cross it out', complete : true},
          {name : 'split tasks into "pending" and "complete" tabs with <ui-tabs>', complete : true },
          {name : 'don\'t allow to add empty tasks', complete : true},
          {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
          {name : 'extract list item into a separate vue.js component', complete : false},
          {name : 'persist tasks list in a local storage', complete : false},
          {name : 'add animation on task completion', complete : false}
        ]
      }
    },

    methods: {
      addTask () {
        this.tasks.push(
          {
            name: this.newTaskName,
            complete: false
          }
        );
        this.newTaskName = null;
      },
      validateBeforeSubmit() {
        this.$validator.validateAll().then(
          success => {
            this.addTask();
          },
          error => {
            return;
          }
        );
      },
      markTask() {

      }
    },
    // Normal way to filter lists (doen't work because of keen-ui or because i'm stupid)
    /*computed: {
      pendingList() {
        return this.tasks.filter(task => {
          return !task.complete;
        })
      },
      completedList() {
        return this.tasks.filter(task => {
          return task.complete;
        })
      }
    }*/
};
</script>

<style scoped lang="scss">
  .todo {
    margin: auto;
    width: 400px;
    height: 90%;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .title {
      margin-top: 0;
    }
    .content {
      flex-grow: 1;
    }
    .tasks {
      list-style: none;
      padding: 0;
      margin: 0;
      height: calc(100vh - 350px);
      min-height: 100px;
      overflow: auto;
    }
    .task-label {
      display: flex;
    }
    .task__checkbox {
      margin-right: 10px;
    }
    .controlls {
      display: flex;
      &__input {
        flex-grow: 1;
        margin-top: 4px;
      }
    }
    .crossed {
      text-decoration: line-through;
    }
    .complete {
      background: red;
    }
  }
  @media (max-width: 400px) {
    .todo {
      width: 90%;
    }
  }
</style>
