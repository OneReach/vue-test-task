<template>
    <transition name="fade">
        <div class="task" :class="{complete : task.complete}">
            <ui-checkbox color="primary" v-model="taskComplete"><span class="text">{{ task.name }}</span></ui-checkbox>
        </div>
    </transition>


</template>

<script>
    import EventBus from './bus';
    export default {
        props: {
            task: this.task,
            $key: this.$key
        },
        data () {
            return {}
        },
        methods: {},
        computed: {
            taskComplete: {
                get: function () {
                    return this.task.complete
                },
                set: function (newValue) {
                    this.task.complete = newValue;
//                    this.$emit('updateLocalStorage','tasks');
                    EventBus.$emit('updateLocalStorage','tasks');
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .complete .text {
        text-decoration: line-through;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to{
        opacity: 0
    }

</style>
