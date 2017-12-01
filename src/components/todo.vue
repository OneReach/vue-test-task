<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs class="">
          <ui-tab v-for="tab in tabs" :title="tab.label">
            <transition-group tag="ul" class="tasks" name="tasks">
              <task
                v-for="task in tasks"
                v-show="tab.complete === task.complete"
                :key="task.name"
                :task="task"
                class="task"
                @change="handleCheck"
              ></task>
            </transition-group>
          </ui-tab>
        </ui-tabs>
        <form class="control-bar" @submit.prevent="addTask">
            <ui-textbox placeholder="Add an item here'" required v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" class="circle-button">Add item</ui-button>
        </form>
    </div>
</template>

<script>
  import task from './task'
  import { createTasksMixin } from '../tasksService'
  import storage from '../storage'

  export default {
    components: { task },
    mixins: [createTasksMixin(storage)],
    data () {
        return {
            newTaskName: '',
            tabs: [{
              label: 'Pending',
              complete: false
            }, {
              label: 'Completed',
              complete: true
            }]
        }
    },
    
    methods: {
      addTask () {
        this.add(this.newTaskName)
        this.newTaskName = ''
      },
      
      handleCheck () {
        this.sync()
      }
    }
  };
</script>

<style lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        min-width: 690px;

        .title {
            margin-top: 0;
        }
        
        .circle-button {
          border-radius: 18px;
        }

        .tasks {
            list-style: none;
            padding: 0;
            max-height: 300px;
            overflow-y: auto;
            overflow-x: auto;

            .task {
              position: relative;
              z-index: 100;
            }

            &-enter-active, &-leave-active {
              transition: all .5s;
            }
            
            &-enter {
              transform: translateY(100px) translateX(-30px);
            }
            
            &-leave {
              height: 21px;
            }
            
            &-leave-to {
              height: 0;
              transform: scaleY(0);
            }
        }
        
        .control-bar {
          display: flex;
          justify-content: space-between;
        }

        .ui-tabs__header {
          background-color: #fff !important;
          .ui-tabs__active-tab-indicator {
            display: none;
          }
          
          .ui-tabs__header-items {
            display: flex;
            justify-content: flex-start;

            .ui-tab-header-item {
              border-radius: 20px !important;
              color: rgba(0, 0, 0, 0.54) !important;
              width: 150px;
              margin: 10px;
              
              &.is-active {
                background-color: #eeeeee !important;
              }
            }
          }
        }
    }
</style>
