<template>
    <ul class="tasks">
        <transition-group name="task-complete">
            <li v-for="task in tasksList"
                :class="['tasks__item task-complete-item', { 'tasks__item--complete':task.complete }]"
                :key="task">
                <ui-checkbox v-model="task.complete">
                    {{task.name}}
                </ui-checkbox>
            </li>
        </transition-group>
    </ul>
</template>

<script src="./tasks.js"></script>
<style src="./tasks.scss" scoped lang="scss"></style>