<template>
    <div>
        <ul class="todo-list" v-if="tasks.length">
            <li class="todo-list__item"
                v-for="(task, index) in tasks"
                :class="{complete : task.complete}"
                :key="task.index"
                @click="completeTask(index)">
                <ui-checkbox v-model="task.complete" />
                <span class="todo-list__desc"> {{task.name}} </span>
            </li>
        </ul>
        <span v-else>You have not pending tasks, hero. Its enough work for today.</span>
    </div>
</template>

<script>
	export default {
      data () {
          return {}
      },
      props: {
          tasks: {
              type: Array
          },
          tasksCompleted: {
          	  type: Array
          }
      },
      methods : {
          completeTask(index) {
              this.tasks.map(el => {
                  if(el.complete === true) {
                      setTimeout(() => {
                          this.tasks.splice(index, 1);
                          let stringify = JSON.stringify(this.tasks);
                          localStorage.setItem('tasksPending', stringify);
                      }, 1000);
                      this.tasksCompleted.push({name: el.name, complete: true});
                      let stringify = JSON.stringify(this.tasksCompleted);
                      localStorage.setItem('tasksCompleted', stringify);
	                  this.$emit('complete', this.task);
                  }
              });
          },
      },
	};

</script>

<style scoped lang="scss">
    @import '../assets/scss/buttons';
    @import '../assets/scss/todo-list';
</style>
