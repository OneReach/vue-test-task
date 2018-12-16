<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs type="text">
      <ui-tab title="Pending">
        <ul class="tasks">
          <li v-for="(task, ind_1) in tasks" :key="ind_1 + 'A'">
            <todoItem :task="task" @editTask="editTask" v-show="!task.complete" :class="{'complete': task.complete}"/>
          </li>
        </ul>
      </ui-tab>
      <ui-tab title="Completed">
        <ul class="tasks">
          <li v-for="(task, ind_2) in tasks" :key="ind_2 + 'B'">
            <todoItem :task="task" @editTask="editTask" v-show="task.complete" :class="{'complete': task.complete}"/>
          </li>
        </ul>
      </ui-tab>
    </ui-tabs>
    <div class="add-tasks">
      <ui-textbox placeholder="add an item here" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
      <div>
        <ui-button color="primary" @click="addTask">Add item</ui-button>
        <ui-button @click="clearAll">Clear all</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./todoItem.vue";
const STORAGE_KEY = "todos-vuejs";

export default {
  name: "todo",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTaskName: '',
      tasks: []
    };
  },
  created() {
    this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },
  methods: {
    addTask() {
      if (this.newTaskName.trim().length) {
        this.tasks.push({ name: this.newTaskName, complete: false });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
      }
      this.newTaskName = '';
    },
    editTask() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    },
    clearAll() {
      this.tasks = [];
      localStorage.clear();
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
  width: 500px;
  height: 600px;
  overflow: hidden;

  .title {
    margin-top: 0;
    color: #00000061;
  }

  .tasks {
    list-style: none;
    padding: 0;
    height: 370px;
    overflow-y: auto;
    /* ie 10+  hidden scroll*/
    -ms-overflow-style: none;
    /* chrome, safari */
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .add-tasks {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }

  .complete {
    text-decoration: line-through;
  }
}
</style>
