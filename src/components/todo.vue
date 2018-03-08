
<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
         <ui-tabs>
                <ui-tab title="Pending">
                    <div class="tasks">
                        <transition-group name='fadeOut' tag="div">
                            <todo-item  v-for="(task,index) in tasks" @click.native="saveTasks" v-if="!task.complete" :key="index" :task="task"></todo-item>
                        </transition-group>
                    </div>
                </ui-tab>
                <ui-tab title="Complete">
                    <div class="tasks">
                        <transition-group name='fadeOut' tag="div">
                                <todo-item  v-for="(task,index) in tasks" @click.native="saveTasks" v-if="task.complete" :key="index" :task="task"></todo-item>
                        </transition-group>
                    </div>
                </ui-tab>
            </ui-tabs>
        <div class="new-task__form" @keyup.enter="addTask">   
            <ui-textbox class="new-task__form__field" placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
            <ui-button class="new-task__form__btn" color="primary"  @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import todoItem from './todo-item.vue';
    const todos = JSON.parse(window.localStorage.getItem('todos'))||[];
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : todos
            }
        },

        methods : {
            addTask () {
                if (this.newTaskName==='')return;
                this.tasks.push({name : this.newTaskName, complete : false});
                this.saveTasks();
                this.newTaskName='';
            },
            saveTasks(){
                window.localStorage.setItem('todos',JSON.stringify(this.tasks));
            }
        },
        components:{
            todoItem
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
            overflow-y: auto; 
            max-height: 300px;
        }
        .new-task__form{
            display: flex;
            &__field{
                flex-grow: 1;
            }
        }
    }
    //          Animations 
    .fadeOut-enter-active , .fadeOut-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .fadeOut-enter, .fadeOut-leave-to{
        transform: translateY(-10px);
        opacity: 0; 
    }
    
</style>
