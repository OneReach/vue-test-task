<template>
    <li>
        <label>
            <ui-checkbox 
                type="checkbox" 
                color="primary"
                @change="writeStorage"
                v-model="task.complete"
                :class="{complete : task.complete}"
            >{{task.name}}</ui-checkbox>
        </label>
    </li>
</template>

<script>
    export default {
        props: [ 'tasks', 'task', 'storageId' ],
        data () {
            return {}
        },
        methods: {
            writeStorage() {
                localStorage.setItem(this.storageId, JSON.stringify(this.tasks));
            }
        }
    };
</script>

<style scoped lang="scss">
    .complete {
        text-decoration: line-through;
    }
</style>