<template>
    <div class="todo">
        <h1 class="todo__title">Checklist</h1>
        <ui-tabs>

            <ui-tab title="pending">
                <tasks :tasksList="pendingTasks"></tasks>
            </ui-tab>

            <ui-tab title="complete">
                <tasks :tasksList="completedTasks"></tasks>
            </ui-tab>

            <div class="new-task">
                <ui-textbox
                        class="new-task__name"
                        @keydown.enter="addTask"
                        placeholder="e.g. 'read vue.js guide'"
                        v-model="newTaskName">
                </ui-textbox>

                <ui-button class="new-task__add" color="primary" @click="addTask" icon="add">Add</ui-button>
            </div>

        </ui-tabs>
    </div>
</template>
<script src="./todo.js"></script>
<style src="./todo.scss" scoped lang="scss"></style>
