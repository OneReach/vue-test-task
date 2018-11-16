<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs class="task-tabs" indicatorColor="none" fullwidth>
            <ui-tab class="task-tab" title="Pending" id="pendingTab" @scaleAnimation="scaleContinueTab">
                <task-list :tasks="getPendingTasks"></task-list>
            </ui-tab>
            <ui-tab class="task-tab" title="Complete" id="completeTab" @scaleAnimation="scalePendingTab">
                <task-list :tasks="getCompletedTasks"></task-list>
            </ui-tab>
        </ui-tabs>

        <div class="controls" @keyup.enter="addTask">
            <ui-textbox class="textBox" placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
            <ui-button class="button" color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
        <span class="warning" v-if="this.warning">Task already exists</span>
    </div>
</template>

<script>

    import TaskList from './task-list';
    import {TASK_LIST} from '../constants';
    import {exportedTasks} from '../tasks';

    export default {
        components : {TaskList},
        data () {
            return {
                warning     : false,
                newTaskName : '',
                tasks       : exportedTasks
            };
        },
        computed   : {
            getCompletedTasks : function () {
                return this.tasks.filter(el => el.complete);
            },
            getPendingTasks   : function () {
                return this.tasks.filter(el => !el.complete);
            }
        },
        watch      : {
            tasks : {
                handler : function (newTasks) {
                    localStorage.setItem(TASK_LIST, JSON.stringify(newTasks));
                },
                deep    : true
            }
        },
        methods    : {
            addTask () {
                this.warning = false;
                if (this.newTaskName.trim() === '') {
                    return;
                }
                if (this.tasks.filter(el => el.name === this.newTaskName).length > 0) {
                    this.warning = true;
                    return;
                }
                this.scalePendingTab();
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = '';
            },
            scalePendingTab () {
                this.animateScale(document.querySelector('[aria-controls="pendingTab"]'), 200);
            },
            scaleContinueTab () {
                this.animateScale(document.querySelector('[aria-controls="completeTab"]'), 200);
            },
            animateScale (elem, duration) {
                if (!elem) {
                    return;
                }
                elem.style.transition = `all ${duration / 1000}s`;
                elem.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    elem.style.transform = '';
                }, duration);
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

        .controls {
            display: flex;

            .textBox {
                padding: 0px 30px 0px 0px;
                display: inline-block;
                flex: 1 1 auto;
            }
            .button {
                display: inline-block;
                flex: 0 0 auto;
                border-radius: 25px;
            }
        }

        .warning {
            color: #FF0000;
        }

    }


</style>
