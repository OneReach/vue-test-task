<template>
    <li :class="{complete : this.task.complete}">
        <ui-checkbox type="checkbox" v-model="task.complete">
            <span>{{this.task.name}}</span>
        </ui-checkbox>
    </li>
</template> 

<script>
export default {
    props: ['task']    
}
</script>

<style scoped lang="scss">
    li.complete span {
        text-decoration: line-through;
    }
</style>


