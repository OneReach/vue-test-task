<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" backgroundColor="white">
            <ui-tab title="Pending">
                <list :tasks="uncompletedTasks" @complete="complete" />
            </ui-tab>
            <ui-tab title="Completed">
                <list :tasks="completedTasks" @complete="complete" />
            </ui-tab>
        </ui-tabs>
        <div>
            <form @submit.prevent="addTask" :class="{newTask : true}">
                <ui-textbox placeholder="Add an item here'" v-model="newTaskName"></ui-textbox>
                <ui-button type="submit" color="primary">Add item</ui-button>
            </form>
        </div>
    </div>
</template>

<script>
import list from './list.vue';
import { UiTabs, UiTab } from 'keen-ui';

    export default {
        mounted () {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
        },
        data () {
            return {
                newTaskName : '',
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : false},
                    {name : 'put "Add" button in one line with input', complete : false},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {name : 'when task is complete cross it out', complete : false},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {name : 'don\'t allow to add empty tasks', complete : false},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },
        components: {
            list,
            UiTabs,
            UiTab
        },
        methods : {
            addTask () {
                if (this.newTaskName !=''){
                    this.tasks.push({name : this.newTaskName, complete : false});
                    this.newTaskName = '';
                }
            },
            complete(task) {
              task.complete = !task.complete;
            }
        },
        computed : {
            completedTasks(){
                return this.tasks.filter(task => task.complete) 
            },
            uncompletedTasks(){
                return this.tasks.filter(task => !task.complete)
            }
        },
        watch : {
            tasks: {
                handler(){
                    localStorage.setItem('tasks', JSON.stringify(this.tasks))
                },
                deep: true
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
        width: 40%;
        overflow: scroll;
        font-weight: lighter;
        text-transform: none;
        .title {
            margin-top: 0;
            font-weight: lighter;
        }
        .newTask{
            display: flex;
            .ui-textbox{
                    flex-grow: 1;
                }
                button{
                background-color: #2196f3;
                display: inline;
                color: white;
                border-radius: 10px;
                margin-left: 10px;
                padding: 0 1em;
                }
                
        }
        .ui-tabs__body{
            border: none;
        }
        .ui-tabs__header-items li{
            margin-right: 10px;
        }
        .ui-tab-header-item{
            border-radius: 20px;
        }
        .ui-tabs__header-items .ui-tab-header-item.is-active{
            color: white;
            background-color: #00000059;
            border: none;
        }
        .ui-tabs__active-tab-indicator{
            height: 0;
        }
        
    }
</style>