<template>
    <li>
        <!--Анимация кривая надо нормально будет доделать-->
        <transition name="slide-fade">
            <ui-checkbox v-model="task.complete" :class="{complete : task.complete}"
                         v-if="show ? task.complete : !task.complete">{{task.name}}
            </ui-checkbox>
        </transition>
    </li>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
                required: true
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>