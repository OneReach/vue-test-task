<template>
    <li :class="{complete : task.complete}">
        <label>
            <ui-checkbox v-model="task.complete" :label="task.name"></ui-checkbox>
        </label>
    </li>
</template>

<script>
    export default {
        props: ['task']
    }
</script>