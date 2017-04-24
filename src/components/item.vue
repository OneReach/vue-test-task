<template>
  <div class='item'>
    <ui-checkbox class="item-checkbox"
      v-model="checked"
      :disabled="checked"
      :checked="checked"
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
  import storage from 'storage';

  export default {
    name: 'item',
    props: ['task'],

    data () {
      return {
        checked: this.task.complete
      };
    },

    watch: {
      checked (val) {
        setTimeout(function(a) {
          this.task.complete = val;
          this.$emit('change', this.task);
        }.bind(this), 400);
      }
    },

    methods: {
      _changeTask (val) {
        this.checked = val;

        setTimeout(function() {
          this.checked = !val;
        }.bind(this), 400);
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

      .checked {
        opacity: 0;
      }
  }
</style>
