<template>
  <div class="todo">
    <h1 class="todo__title">Checklist</h1>
    <ui-textbox :disabled="tasks.length < 1" @input="filter = 'search'" placeholder="Search..." v-model="searchTask"></ui-textbox>
    <div class="todo__top">
      <ui-button @click.prevent="filter = 'pending'" type="primary">Pending ({{tasksPending}})</ui-button>
      <ui-button @click.prevent="filter = 'completed'" type="primary" color="green">Completed ({{tasksCompleted}})</ui-button>
    </div>
    <ul ref="todoTask" class="todo__tasks">
      <transition-group name="list" enter-active-class="animated slideInUp" leave-active-class="animated slideOutRight">
        <li v-for="(task, index) in filterTasks" :key="task.id" class="todo__list" :class="{todo__complete : task.complete}">
          <div class="todo__center">
            <ui-checkbox type="checkbox" v-model="task.complete"></ui-checkbox>
            <router-link :filterTasks="filterTasks" class="todo__link" :to="`/task/${task.id}`">{{task.name}}</router-link>
          </div>
          <ui-fab @click="removeTask(index)" class="todo__checkbox" size="small" icon="clear"></ui-fab>
        </li>
      </transition-group>
    </ul>
    <form class="todo__bottom" novalidate @submit.prevent="addTask">
      <ui-textbox class="todo__field" :invalid="error" required error="This field is required" floating-label label="Type new task" v-model="newTaskName"></ui-textbox>
      <ui-button color="primary" icon="add">Add</ui-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: "",
      tasks: [],
      error: false,
      filter: 'pending',
      searchTask: '',
      filters: {
        pending: tasks => {
          return tasks.filter(task => {
             return !task.complete
          })
        },
        completed: tasks => {
          return tasks.filter(task => {
             return task.complete
          })
        },
        search: tasks => {
          return tasks.filter(task => {
            return task.name.match(this.searchTask);
          })
        }
      }
    };
  },
  computed: {
    filterTasks() {
      return this.filters[this.filter](this.tasks);
    },
    tasksPending() {
      return this.filters.pending(this.tasks).length
    },
    tasksCompleted() {
      return this.filters.completed(this.tasks).length
    }
  },
  methods: {
    addTask() {
      if (this.newTaskName === '') {
        this.error = true
      } else {
        this.tasks.push({
          name: this.newTaskName,
          id: Math.random(),
          complete: false
        });
        this.error = false;
        this.newTaskName = '';
        if (this.$refs.todoTask.clientHeight >= 400) {
          this.$refs.todoTask.classList.add('scroll-active')
        }
      }
    },
    removeTask(index) {
      this.$delete(this.tasks, index);
      if (this.$refs.todoTask.clientHeight <= 400) {
        this.$refs.todoTask.classList.remove('scroll-active')
      }
    }
  },
  watch: {
    tasks: {
      handler() {
         localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    this.$nextTick(() => {
      if (this.$refs.todoTask.clientHeight >= 400) {
        this.$refs.todoTask.classList.add('scroll-active')
      } else {
        this.$refs.todoTask.classList.remove('scroll-active')
      }
    });
    this.$store.commit('loadTasks', this.tasks)
  }
};
</script>

<style lang="scss">

.todo {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
  width: 30%;
  word-wrap: break-word;
  word-break: break-all;

  &__link {
    text-decoration: none;
    color: #000000;
    margin-left: 20px;
  }

  &__title {
    margin-top: 0;
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__tasks {
    list-style: none;
    padding: 0;
    overflow: hidden;
    margin-bottom: 0;
    max-height: 400px;
  }

  &__complete {
    text-decoration: line-through;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px 10px 0;
  }

  &__center {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    margin-left: 20px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__field {
    width: 60%;
  }
}

.scroll-active {
  overflow-y: scroll
}

@media screen and(max-width: 768px) {
  .todo {
    width: 50%;
    &__bottom {
      display: block;
    }
    &__field {
      width: 100%;
    }
  }
}

@media screen and(max-width: 576px) {
  .todo {
    width: 80%;
  }
}
</style>