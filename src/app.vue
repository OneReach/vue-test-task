<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name : 'app'
    }
</script>

<style lang="scss">
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        background: #eee;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        display: flex;
    }

    // keen ui reset
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    // styles overriden
    .ui-tabs {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &__body {
        flex-grow: 1;
        border: none !important;
      }

      &--text-color-active-primary .ui-tab-header-item.is-active {
        color: #fff !important;
        background-color: rgba(0, 0, 0, 0.30);
        border-radius: 30px;
      }

      &--indicator-color-primary .ui-tabs__active-tab-indicator {
        display: none;
      }
    }

    .ui-tab-header-item {
      border-radius: 40px;
      text-transform: none !important;
      height: 36px !important;
      padding: 0 15px !important;

      & + & {
        margin-left: 15px;
      }
    }

    .ui-button {
      text-transform: none !important;
    }

    .ui-checkbox {
      margin-bottom: 0 !important;

      &__checkmark {
        margin-right: 12px;
      }

      &.is-checked &__checkmark::after {
        border-color: #111 !important;
      }

      &__checkmark::before {
        border: 2px solid rgba(0, 0, 0, 0.10) !important;
      }

      &--color-primary.is-checked &__checkmark::before {
        background-color: transparent !important;
      }
    }

    .ui-textbox__input {
      width: 240px !important;
      border-bottom: none !important;
    }

    .ui-ripple-ink,
    .ui-button--type-primary.ui-button--color-primary {
      border-radius: 40px !important;
    }
</style>
