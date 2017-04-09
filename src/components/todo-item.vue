<template>
    <transition @leave="leave" @after-leave="afterLeave">
        <li :class="['todo-item', {complete : task.complete}]">
            <ui-checkbox v-model="task.complete" :label="task.name"></ui-checkbox>
        </li>
    </transition>
</template>

<script>
    export default {
        props: ['task'],
        methods: {
            leave: function (el, done) {
                let elClass = this.task.complete ? 'task-state-complete' : 'task-state-incomplete',
                    label = el.getElementsByTagName('label')[0],
                    labelClass = 'is-checked';

                el.classList.add(elClass);
                // imitates checked/unchecked checkbox
                if (this.task.complete) {
                    label.classList.add(labelClass);
                } else {
                    label.classList.remove(labelClass);
                }
                label.addEventListener('transitionend', function onAnimationEnd () {
                    done();
                    label.removeEventListener('transitionend', onAnimationEnd);
                });
            },
            afterLeave: function () {
                let inactiveTab = document.querySelector('.ui-tab-header-item:not(.is-active)');
                inactiveTab.classList.add('scale-in');

                inactiveTab.addEventListener('animationend', function onAnimationEnd () {
                    inactiveTab.classList.remove('scale-in');
                    inactiveTab.removeEventListener('animationend', onAnimationEnd);
                });
            }
        }
    }
</script>

<style lang="scss">
    .task-state-complete {
        text-decoration: line-through;
    }
    .todo .todo-item.task-state-incomplete {
        text-decoration: none;
    }

    @keyframes scaleIn {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    .scale-in {
        animation: scaleIn .5s;
    }
</style>
