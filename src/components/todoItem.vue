<template>
    <li :class="{complete : task.complete}">
        <ui-checkbox v-model="task.complete">{{task.name}}</ui-checkbox>
    </li>
</template>

<script>
    export default {
        name: "todoItem",
        props: {
            task: {
                type: Object,
                required: true
            }
        }
    }
</script>
