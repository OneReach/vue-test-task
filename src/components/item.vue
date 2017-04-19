<template>
    <li class="todo__task">
        <transition name="todo__item-fade" v-if="type === 'pending' && !task.complete">
            <label class="todo__label">
                    <ui-checkbox class="todo__check" v-model="task.complete">
                    </ui-checkbox>
                    <span class="todo__text" :class="{'todo__text--completed': task.complete}">
                        &nbsp;{{task.name}}&nbsp;
                    </span>
            </label>
        </transition>
        <transition name="todo__item-fade" v-if="type === 'completed' && task.complete">
            <label class="todo__label">
                    <ui-checkbox class="todo__check" v-model="task.complete">
                    </ui-checkbox>
                    <span class="todo__text" :class="{'todo__text--completed': task.complete}">
                        &nbsp;{{task.name}}&nbsp;
                    </span>
            </label>
        </transition>
    </li>
</template>

<script>
    export default {
        props: ["task", "type"]
    };
</script>

<style scoped lang="scss">
    .todo {
        &__label {
            flex: 0 0 auto;
            display: flex;
            flex-flow: row nowrap;
        }
        &__item-fade {
            &-enter-active {
                transition: all .3s ease;
            }
            &-leave-active {
                transition: all .3s ease;
            }
            &-fade-enter, &-leave-to {
                opacity: 0;
            }
        }
    }
</style>
