<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs fullwidth="true" type="text">
            <ui-tab class="tabHeight addScroll" title="pending">


                <ul class="tasks">
                    <!--<list-of-tasks></list-of-tasks>-->
                    <transition-group name="list" tag="li">
                        <li v-for="task in tasks" :key="task" v-if="task.complete ? false : true"
                            :class="{complete : task.complete}">
                            <ui-checkbox v-model="task.complete" :label="task.name"/>
                        </li>
                    </transition-group>
                </ul>


            </ui-tab>
            <ui-tab class="tabHeight addScroll" title="complete">
                <ul class="tasks">
                    <transition-group name="list-complete" tag="li">
                        <li v-for="task in tasks" v-if="task.complete ? true : false" :key='task'
                            :class="{complete : task.complete}">
                            <ui-checkbox v-model="task.complete" :label="task.name" @input="checkboxClicked()"/>
                        </li>
                    </transition-group>

                </ul>

            </ui-tab>
        </ui-tabs>
        <div class="input_row">
            <ui-textbox class='width_input' placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"
                        @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add" :disabled="(newTaskName=='')? true : false">Add
            </ui-button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                LOCAL_STORAGE_KEY: 'OneRich',
                newTaskName: '',
                tasks: [
                    {name: 'create skeleton of todo', complete: true},
                    {name: 'add ability to add tasks', complete: true},
                    {name: 'clear task name after clicking "Add"', complete: false},
                    {name: 'put "Add" button in one line with input', complete: false},
                    {name: 'add new task by hitting Enter instead of clicking "Add"', complete: false},
                    {name: 'replace <input> with <ui-checkbox> in tasks list', complete: false},
                    {name: 'when task is complete cross it out', complete: false},
                    {
                        name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
                        complete: false
                    },
                    {name: 'don\'t allow to add empty tasks', complete: false},
                    {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: false},
                    {name: 'extract list item into a separate vue.js component', complete: false},
                    {name: 'persist tasks list in a local storage', complete: false},
                    {name: 'add animation on task completion', complete: false},
                ]
            }
        },

        methods: {
            addTask () {
                this.tasks.push({name: this.newTaskName, complete: false});
                this.newTaskName = "";
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tasks));
                console.log( JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)));
            },
            load() {if (localStorage.getItem(this.LOCAL_STORAGE_KEY)){
                    this.tasks=JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
                    console.log(localStorage.getItem(this.LOCAL_STORAGE_KEY))
                }
            },
            checkboxClicked(){
                localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tasks));
                console.log("localstor");
                console.log(this.tasks);
            }
        },
        beforeMount(){ this.load()}
    };
</script>

<style scoped lang="scss">
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */
    {
        opacity: 0;
        transform: translate(20px);
    }
    .list-complete-enter-active, .list-complete-leave-active {
        transition: all 1s;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translate(-20px);
    }

    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        width: 60%;
        height: 800px;

    .addScroll {
        overflow-y: auto;
    }

    .tabHeight {
        height: 500px;
    }

    .title {
        margin-top: 0;
    }

    .tasks {
        list-style: none;
        padding: 0;
    }

    .complete {
        text-decoration: line-through;
    }

    .input_row {

    .width_input {
        width: 91%;
        display: inline-flex;
    }

    }
    }
</style>
