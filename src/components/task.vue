<template>
    <li :class="{'complete': item.complete}" class="task" >
        <ui-checkbox type="checkbox" v-model="item.complete">{{item.name}}</ui-checkbox>
    </li>
</template>

<script>
    export default {
        name : 'task',
        props : ['item'],
    }
</script>

<style scoped lang="scss">
    .task {
        display:block;
        max-height:40px;
        transition:transform .5s, opacity .5s, max-height 1.2s;
        transition-delay:.2s;
        transform:translate(0%);
        overflow:hidden;
        &.complete {
            color:grey;
            text-decoration:line-through;
        }
    }
</style>