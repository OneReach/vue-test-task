<template lang="html">
  <ul class="tasks">
      <li v-for="task in tasks">
        <label @click='markTask' v-show="!task.complete" class="task-label">
            <ui-checkbox v-model="task.complete" class="task__checkbox">{{task.name}}</ui-checkbox>
        </label>
      </li>
  </ul>
</template>

<script>
  export default {
    props: [
      'isShow'
    ],
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
          {name : 'add animation on task completion', complete : true}
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
        this.newTaskName = '';
        let animateTab = document.querySelector('.ui-tab-header-item__text');
        if (animateTab.style.animation == 'bubbleTab 0.5s') {
          return;
        } else {
          animateTab.style.animation = 'bubbleTab 0.5s';
          setTimeout(() => {
            animateTab.style.animation = '';
          }, 500);
        }
      },
      markTask() {
        this.animationTab();
      },
      animationTab() {
        let animateTab = document.querySelector('[tabindex="-1"]').querySelector('.ui-tab-header-item__text');
        if (animateTab.style.animation == 'bubbleTab 0.5s') {
          return;
        } else {
          animateTab.style.animation = 'bubbleTab 0.5s';
          setTimeout(() => {
            animateTab.style.animation = '';
          }, 500);
        }
      }
    }
  }
</script>

<style lang="css">
</style>
