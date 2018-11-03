<template>
    <transition name="fade">
        <li :class="{complete : this.task.complete} ">
            <ui-checkbox type="checkbox" v-model="task.complete" @change="changeHandler">
                <span>{{this.task.name}}</span>
            </ui-checkbox>
        </li>
    </transition>        
</template> 

<script>
export default {
    props: ['task', 'tasks'],
    
    methods: {
        changeHandler () {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
        }
    }
}
</script>

<style scoped lang="scss">
    li.complete span {
        text-decoration: line-through;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    
    .fade-enter, .fade-leave-to {
        opacity: 0;
        color: green;
    }
</style>


