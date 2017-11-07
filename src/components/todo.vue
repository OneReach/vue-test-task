<template>
    <div class="todo">
        <div class="todo__header">
            <h1 class="todo__title">Checklist</h1>
        </div>
        <div class="todo__body">
            <ui-tabs type="text">
                <ui-tab title="Pending">
                    <ul class="todo__list">
                        <li class="todo__list-item" v-for="task in tasks" :class="{complete : task.complete}">
                            <ui-checkbox :value="task.complete" v-if="!task.complete">{{task.name}}</ui-checkbox>
                        </li>
                    </ul>
                </ui-tab>
                <ui-tab title="Complete">
                    <ul class="todo__list">
                        <li class="todo__list-item" v-for="task in tasks" :class="{complete : task.complete}">
                            <ui-checkbox :value="task.complete" v-if="task.complete">{{task.name}}</ui-checkbox>
                        </li>
                    </ul>
                </ui-tab>
            </ui-tabs>
        </div>
        <div class="todo__footer">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-on:keydown-enter="addTask"  v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import UiCheckbox from "../../node_modules/keen-ui/src/UiCheckbox";
    export default {
        components: {UiCheckbox},
        data () {
            return {
                newTaskName : '',
                tasks: this.$store.state.tasks
            }
        },
        methods : {
            addTask () {
                if (this.newTaskName !== '') {
                    this.tasks.push({
                        name : this.newTaskName, complete : false
                    });
                    this.newTaskName = '';
                }
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
        &__title {
            margin-top: 0;
        }
        &__list {
            padding: 0;
            width: 500px;
            height: 250px;
            list-style: none;
            overflow-y: scroll;
        }
        &__footer {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
