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

        // Keen UI overrides
        .ui-button {
            flex-shrink: 0;
            border-radius: 25px;
            text-transform: none;
        }
        .ui-tabs__header {
            background: inherit;
        }
        .ui-tabs__body {
            border: 0;
        }
        .ui-tab-header-item {
            text-transform: none;
            border-radius: 25px;

            &.is-active {
                background: rgba(0, 0, 0, 0.54);
                color: #fff;
            }
        }
        .ui-tabs__active-tab-indicator {
            display: none;
        }
        .ui-textbox {
            width: 100%;
            padding-right: 10px;
        }
    }

    // Keen UI reset
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }
</style>
