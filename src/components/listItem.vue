<template>
    <li v-for="task in tasks" :class="{complete : task.complete}">
        <label>
            <ui-checkbox color="primary" v-model="task.complete" >
            {{task.name}}
            </ui-checkbox>
        </label>
    </li>
</template>

<script>
    export default {
        
    }
</script>