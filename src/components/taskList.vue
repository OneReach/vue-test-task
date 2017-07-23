<template>
            <ul class="tasks">
                <li v-for="(task, index) in tasks" :class="{complete : task.complete}">
                    <!-- here is a bug - https://github.com/JosephusPaye/Keen-UI/issues/263, so it will not work as epected -->
                    <ui-checkbox type="checkbox" v-model="task.complete">
                        <div v-bind:class="{crossed:task.complete}">{{task.name}}</div>
                    </ui-checkbox>
                </li>
            </ul>
</template>

<script>
    export default {
        props:['tasks'],
        data () {
            return {
            }
        }
    }
</script>

<style scoped lang="scss">
    .crossed{
        text-decoration: line-through;
    }

    .tasks {
        list-style: none;
        padding: 0;
    }

</style>
