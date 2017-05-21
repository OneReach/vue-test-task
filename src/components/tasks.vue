<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <ul class="tasks">
            <ui-tabs class="tasks">
                <ui-tab title="pending" :class="{scroll:tobedoneItems.length > 10}">
                    <transition-group name="list" :duration="400">
                    <li v-for="task in tobedoneItems" :key="task.id">
                            <label :key="task.id" class="ui-button-group">
                                <ui-checkbox v-model="task.complete" :key="task.id"/>
                                {{task.name}}
                            </label>
                    </li>
                    </transition-group>
                </ui-tab>
                <transition name="compl" :duration="200">
                <ui-tab title="completed"  :class="{scroll:completedItems.length > 10}">
                    <li v-for="task in completedItems">
                        <label class="ui-button-group">
                            <ui-checkbox v-model="task.complete"/>
                            {{task.name}}
                        </label>
                    </li>
                </ui-tab>
                </transition>
            </ui-tabs>
    </ul>
</template>
<script>
import todoStorage  from '../tasks'
export default  {
        data () {
            return {
                newTaskName: '',
                show: true,
                tasks:todoStorage.fetch()
            }
            },

        methods: {
            addTask () {
                if (this.newTaskName.trim() !== '') {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.newTaskName = '';
                }
            },
//            toggleTask(task) {
//                this.tasks.forEach(function(elem, index) {
//                    if (elem.name === task.name && task.complete==false)
//                    {task.complete = !elem.complete;}
//                });
//            }
        },
        computed: {
            completedItems: function () {
                return this.tasks.filter(function (task) {
                    return task.complete === true
                });
            },
            tobedoneItems: function () {
                return this.tasks.filter(function (task) {
                    return task.complete !== true
                });
            }
        }
}


</script>
<style scoped lang="scss">
    .tasks {
        list-style: none;
        padding: 0;
        height: 350px;
    }
    .scroll {
        height: 300px;
        overflow-y: scroll;
    }
    .list-item {
        text-decoration:none;
    }
    .list-leave-active {
        text-decoration: line-through;
    }
    .compl-leave-active {
        font-size: 1.4em;
    }
    /*.buttons {*/
        /*border-radius:50px;*/
        /*background-color: green;*/
    /*}*/
</style>
