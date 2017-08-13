<template>
    <transition name="tasks-item-fade">
        <li>
            <label>
                <ui-checkbox type="checkbox" @input="updateValue" :value="task.complete">
                    {{task.name}}
                </ui-checkbox>
            </label>
        </li>
    </transition>
</template>

<script>
    export default {
      props: ['task'],
      methods: {
        updateValue: function (value) {
          this.$emit('input', value);
        },
      },
    };
</script>

<style scoped lang="scss">
    .ui-tab-header-item {
        border-radius: 20px;
        background-color: #eeeeee;
    }
    .tasks-item-fade-enter-active {
        transition: all .4s ease;
    }
    .tasks-item-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .tasks-item-fade-enter, .tasks-item-fade-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }
</style>
