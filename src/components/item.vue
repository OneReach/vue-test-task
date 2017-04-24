<template>
  <div class='item'>
    <ui-checkbox class="item-checkbox"
      v-model="checked"
      :disabled="checked"
      @change="_changeTask"
    >
    </ui-checkbox>
    <span class="item-message"
      :class="{ 'complete': checked }"
    >
      {{ task.name }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: ['task'],

    data () {
      return {
        checked: this.task.complete
      };
    },

    watch: {
      checked () {
        return this.task.complete = this.checked;
      }
    },

    methods: {
      _changeTask (val) {
        this.checked = val;
        this.$emit('change', this.task);
      }
    }
  }
</script>

<style scoped lang="scss">
  .item {
    display: block;

      .item-checkbox {
        display: inline-block;
        vertical-align: top;
      }

      .item-message {
        color: red;
      }

      .complete {
        text-decoration: line-through;
        color: grey;
      }
  }
</style>
