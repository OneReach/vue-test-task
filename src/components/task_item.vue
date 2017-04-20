<template>
    <div class="taskitem">
      <!--item markup start here-->
      <transition name="fade">
      <div class = "flex-base-between" v-if="!startDeleteAnim" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseLeave">
        <div class = "flex-base-left">
           <label class = "flex-item">
             <div><ui-checkbox v-model="task.completed" class = "flex-item" @change="onCheckedChanged"/></div>
             <div v-if="!task.completed" class = "flex-item" v-bind:id="index" v-bind:style="{ textDecoration : 'none'}" >{{currtask.name}}</div>
             <div v-if="task.completed" class = "flex-item" v-bind:id="index" v-bind:style="{ textDecoration : 'line-through'}">{{currtask.name}}</div>
           </label>
        </div>
        <!--button for delete task-->
        <div v-bind:id="fadeOverAnim"><ui-button color="" class = "flex-item" @click="startRemove" icon="clear" v-bind:style="{ opacity: '0.2' }"></ui-button></div>
      </div>
      </transition>
    </div>
</template>

<script>
    export default {
        data () {
          return {
            task: {name : '', completed : false}, //internal task variable just for animations
            //variables for animations (and init them)
            fadeOverAnim : 'invisible',
            startDeleteAnim : false
          }
        },

        mounted () {
          //init internal task variables from external task object
          this.task.completed = this.currtask.complete;
        },

        methods: {
          onMouseOver(){
            this.fadeOverAnim = "fadein";//just changing anim of cross button (use CSS and v-bind:id)
          },
          onMouseLeave(){
            this.fadeOverAnim = "invisible";//just changing anim of cross button (use CSS and v-bind:id)
          },

          startRemove(){
            //delay for removing component from external list and play animation (use vue transition)
            setTimeout(this.remove.bind(null, this.index), 500);
            this.startDeleteAnim = true;
          },
          remove(index){
            this.tasks.splice(index, 1); //removing impl from external list by index
            this.startDeleteAnim = false; //A BUG: wrong work delete process without this assignment
          },

          onCheckedChanged(){
            setTimeout(this.parentChangeState, 400); //delay for task checking process (just for comfort)
          },
          parentChangeState(){
            this.currtask.complete = this.task.completed; //task checking impl
          }
        },

        //task external reference
        props: ['tasks', 'currtask', 'index']
    }
</script>

<style>
    .flex-base-left {
     display: flex;
     flex-direction: row;
     justify-content: flex-start;
     margin: 0px 10px 0px 0px;
    }

    .flex-base-between {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     margin: 0px 0px 0px 0px;
    }

    .flex-item {
     display: flex;
     margin: 0px 5px 0px 8px;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }

    #fadein{
        animation: 3s ease 0s normal forwards 1 fadein;
    }

    #invisible{
      opacity: 0.0;
    }

    @keyframes fadein{
        0% { opacity:0; }
        10% { opacity:0; }
        25% { opacity:0.9; }
        100% { opacity:1; }
    }
</style>
