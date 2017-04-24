<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" fullwidth="true">
            <ui-tab title="pending">
                <ul class="tasks" >
                    <li v-for="task in tasks" :class="{complete : task.complete}" v-if="task.complete == false && task.name!=''">
                        <transition name="fade">
                            <ui-checkbox type="checkbox" v-model="task.complete" :label="task.name"/>
                        </transition>
                    </li>
                </ul>
            </ui-tab>
            <ui-tab title="complete">
                <ul class="tasks" >
                    <li v-for="task in tasks" :class="{complete : task.complete}" v-if="task.complete && task.name!=''">
                        <transition name="fade">
                            <ui-checkbox type="checkbox" v-model="task.complete" :label="task.name"/>
                        </transition>
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>
        <form class="input">
            <ui-textbox class='text_submit' name="submit" placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" type="text"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </form>
    </div>
</template>

<script>
    import list from './list.vue';

    localStorage.setItem('tasks', JSON.stringify(list.tasks));
    export default {
        data () {
            return {
                newTaskName : '',
                tasks: JSON.parse(localStorage.getItem('tasks'))
            }
        },

        methods : {
            addTask () {
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = '';
            }
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
            height:400px;
            overflow: auto;
            list-style: none;
            padding: 0;
            .complete  {
                text-decoration:line-through;
            }

            li label .animate {
                animation:bounce .4s;
            }
        }
        .input {
            display: flex;
            justify-content: space-around;
            .text_submit {
                width: 80%;
            }
        }
    }
</style>
