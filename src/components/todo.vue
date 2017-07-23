<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>

        <ui-tabs type="text">
            <ui-tab title="Completed">
                 <TaskList :tasks="filterTasks(true)" />
            </ui-tab>

            <ui-tab title="Pending">
                <TaskList :tasks="filterTasks(false)" />
            </ui-tab>
        </ui-tabs>
        <div class="buttons_container">
            <ui-textbox v-on:keydown.enter="addTask" placeholder="Add task" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
        <ui-modal ref="modal1" title="Information">
            Please, enter name of task
        </ui-modal>
    </div>
</template>

<script>
    import TaskList from './taskList.vue';

    function setLocalstoregeItem(arr){
        try {
            localStorage.setItem('tasks', encodeURIComponent(JSON.stringify(arr)));
        } catch (e) {
            console.log(e);
        }
    }

    export default {
        components:{
            TaskList
        },
        data () {

            let tasks = [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : true},
                    {name : 'put "Add" button in one line with input', complete : true},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {name : 'when task is complete cross it out', complete : true},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {name : 'don\'t allow to add empty tasks', complete : true},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'persist tasks list in a local storage', complete : true},
                    {name : 'add animation on task completion', complete : false},
                ];

            if(localStorage.getItem('tasks')){
                tasks = JSON.parse(decodeURIComponent(localStorage.getItem('tasks')));
                localStorage.clear();
            }

            return {
                newTaskName : '',
                tasks
            }
        },
        methods : {
            addTask () {
                if(this.newTaskName == ""){
                    this.openModal("modal1");
                    return false;
                }

                this.tasks.push({name : this.newTaskName, complete : false});
                /* clear task after adding */
                this.newTaskName = "";
            },
            /* true ot false */
            filterTasks(status){
                /* we want to filter our tasks by their status and split them by that */
                return this.tasks.filter((task)=>task.complete === status );
            },
            openModal(ref) {
                this.$refs[ref].open();
            },
            handleClick(el){
                console.log(el)
            }
        },
        watch:{
            tasks:{
                handler:function(newTasks){
                setLocalstoregeItem(newTasks);
            },
                deep: true
            },
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
        min-width:700px;
        .title {
            margin-top: 0;
        }
        .buttons_container{
            display: flex;
            justify-content: space-between;
        }

    }
</style>
