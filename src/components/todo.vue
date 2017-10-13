<template>
    <div class="todo">
        <div class="modal">
            <ui-alert @dismiss="showAlert = true" type="success" v-show="showAlert">
                Good!!!
            </ui-alert>
        </div>
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" id="tabs--modify" backgroundColor="clear">
            <ui-tab title="Pending">
                <div class="todo__checklist">
                    <transition-group tag="ul" class="tasks" name="fade" mode="out-in">
                        <li 
                            v-for="(task, key) in tasks" 
                            :key="key" 
                            :class="{complete : task.complete}" 
                            class="tasks__item" 
                            >
                                <label class="tasks__label">
                                    <div class="tasks__checkbox-wrap">
                                        <ui-checkbox :value="task.complete" @change="deleteTask(key)"></ui-checkbox>
                                    </div>
                                    <span class="tasks__desc">{{task.name}}</span>
                                </label>
                        </li>
                    </transition-group>
                </div>
            </ui-tab>
            <ui-tab title="Complete">
                <div v-if="completeTask.length > 0">
                    <ol class="tasks complete-tasks">
                        <li
                            v-for="(task, key) in completeTask" 
                            :key="key" 
                            class="tasks__item" 
                            >
                                <label class="tasks__label">
                                    <span class="tasks__desc">{{task.name}}</span>
                                </label>
                        </li>
                    </ol>
                </div>
                <p v-else>You dont have complete task :(</p>
            </ui-tab>
        </ui-tabs>
        
        
        <div class="input-wrap">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" class="input-wrap__textfield" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add" class="input-wrap__submit-btn">Add</ui-button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : this.$store.state.tasks,
                completeTask: this.$store.state.completeTask,
                showAlert: false
            }
        },
       

        methods : {
            addTask () {
                if( this.newTaskName !== '' ) {
                    this.$store.commit('addTask', {name : this.newTaskName, complete : false})
                    this.newTaskName = '';
                    console.log(this.completeTask);
                }
            },
            deleteTask(key) {
                this.tasks[key].complete = !this.tasks[key].complete;
                this.showAlert = true;
                if( this.tasks[key].complete ) {
                    setTimeout( () => {
                        this.$store.commit('completeTask', key);
                        this.$store.commit('deleteTask', key);
                        this.showAlert = false;
                    }, 1500)
                }
            }       
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding:80px 20px 20px 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        width: 600px;
        position: relative;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
        }
        .complete-tasks {
            list-style: decimal;
            padding-left: 10px;
            
            .tasks__label {
                display: inline;
            }
        }
    }
    .todo__checklist {
        height: 400px;
        overflow-y: scroll; 
    }
    .tasks__item {
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .tasks__label {
        display: flex;
    }

    .complete {
        pointer-events: none;
        opacity: 0.2;
    }

    .complete .tasks__desc {
        text-decoration: line-through;
        pointer-events: none;
    }

    .tasks__checkbox-wrap {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .input-wrap {
        display: flex;
    }
    .input-wrap__textfield {
        flex: 1 0;
        margin: 0 25px 0 0;
    }
    .input-wrap__submit-btn {
        border-radius: 35px;
        padding: 0 25px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
    }
</style>
