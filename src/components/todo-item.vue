<template>
    <transition name="todo-item-animation">
        <li :class="{complete : task.complete}">
            <label>
                <ui-checkbox v-model="task.complete" :label="task.name" @input="change"></ui-checkbox>
            </label>
        </li>
    </transition>
</template>

<script>
    export default {
        props: ['task', 'onCheck'],
        methods: {
            change (bool) {
                this.onCheck(bool);
            }
        }
    }
</script>