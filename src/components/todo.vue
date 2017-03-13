<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
            <ui-tabs>
                <ui-tab title="pending" class="tab pending">
                    <ul class="tasks">
                        <task v-for="task in tasks" v-bind:item="task" @click.native="updateTask(task);"></task>
                    </ul>
                </ui-tab>
                <ui-tab title="complete" class="tab complete">
                    <ul class="tasks">
                        <task v-for="task in tasks" v-bind:item="task" @click.native="updateTask(task);"></task>
                    </ul>
                </ui-tab>
            </ui-tabs>
        <div class="input-section">
            <ui-textbox placeholder="e.g. 'read vue.js guide'"  v-model="newTaskName" @keydown.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import task from 'components/task';
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : [
                    {id:'todo-0',name : 'create skeleton of todo', complete : true},
                    {id:'todo-1',name : 'add ability to add tasks', complete : true},
                    {id:'todo-2',name : 'clear task name after clicking "Add"', complete : false},
                    {id:'todo-3',name : 'put "Add" button in one line with input', complete : false},
                    {id:'todo-4',name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {id:'todo-5',name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {id:'todo-6',name : 'when task is complete cross it out', complete : false},
                    {id:'todo-7',name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {id:'todo-8',name : 'don\'t allow to add empty tasks', complete : false},
                    {id:'todo-9',name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {id:'todo-10',name : 'extract list item into a separate vue.js component', complete : false},
                    {id:'todo-11',name : 'persist tasks list in a local storage', complete : false},
                    {id:'todo-12',name : 'add animation on task completion', complete : false},
                ]
            }
        },
        created : function() {
            this.tasks.forEach(task => {
                let item = this.getFromStorage(task.id);
                if (!item) {
                    this.addToStorage(task);
                } else if(item && item.complete !== task.complete) {
                    task.complete = item.complete;
                }
            });
            Object.keys(localStorage).forEach(key => {
                if(key.match(/^todo-/) && ! (this.tasks.some(task => task.id === key) ) ){
                    let localItem = this.getFromStorage(key);
                    localItem.id = key;
                    this.tasks.push(localItem);
                }
            });
        },
        methods : {
            addToStorage(task){
                if(!localStorage.lastKey) localStorage.lastKey = 0;
                task.id = 'todo-' + (localStorage.lastKey++);
                localStorage[task.id] = JSON.stringify(task);
                return task;
            },
            getFromStorage(id){
                let item = localStorage[id];
                return item ? JSON.parse(localStorage[id]) : undefined;
            },
            addTask () {
                if(!this.newTaskName) return;
                let task = this.addToStorage({
                    name : this.newTaskName,
                    complete : false
                });
                this.tasks.push(task);
                this.newTaskName = '';
            },
            updateTask(task) {
                let item = this.getFromStorage(task.id);
                if(!item) return;
                item.complete = task.complete;
                localStorage[task.id] = JSON.stringify(item);
            }
        }, components : {
            task : task
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
            list-style: none;
            padding: 0;
        }
        .tab {
            max-height:420px;
            overflow-y:auto;
            overflow-x:hidden;
            &.pending {
                .task {
                    &.complete {
                        max-height:0px;
                        opacity: 0;
                        animation:slideAway 1s;
                        transform:translate(100%);
                    }
                }
            }
            &.complete {
                .task {
                    &:not(.complete){
                         max-height:0px;
                         opacity: 0;
                         animation:slideAway 1s;
                         transform:translate(100%);
                     }
                }
             }
         }
        .input-section {
            display:flex;
            align-items:flex-end;
            > div {
                &:first-of-type {
                    width:100%;
                }
                &:last-of-type {
                    margin:0 15px 0 0;
                }
            }
        }
    }
</style>
