<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <taskview></taskview>
        <div class="ui-button-group">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" v-on:keydown.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add" >Add</ui-button>
        </div>
    </div>
</template>

<script>
    import taskview from './tasks.vue'
    import tasks  from '../tasks'
    import todoStorage  from '../tasks'
    export default {
        data () {
            return {
                newTaskName : '',
                tasks : todoStorage.fetch()
            }
        },
        components: {taskview},
        methods: {
            addTask () {
                if (this.newTaskName.trim() !== '') {
                    this.tasks.push({name: this.newTaskName, complete: false,id:this.tasks.length});
                    this.newTaskName = '';
                }
            }
        },
        watch: {
            todos: {
                handler: function (tasks) {
                    todoStorage.save(tasks);
                },
                deep: true
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
        list-style: none;
        padding: 0;
        height: 350px;
    }
    .scroll {
        height: 300px;
        overflow-y: scroll;
    }

    .line {
        text-decoration: line-through;
    }
    .bounce-enter-active {
        animation: bounce-in .7s;
    }
    .bounce-leave-active {
        animation: bounce-in .7s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }

    }

</style>
