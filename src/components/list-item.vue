<template>
    <li :class="{complete : this.task.complete}">
        <ui-checkbox type="checkbox" v-model="task.complete" @change="changeHandler">
            <span>{{this.task.name}}</span>
        </ui-checkbox>
    </li>
</template> 

<script>
export default {
    props: ['task', 'tasks'],
    
    methods: {
        changeHandler () {
            console.log('Changed');
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
        }
    }
}
</script>

<style scoped lang="scss">
    li.complete span {
        text-decoration: line-through;
    }
</style>


