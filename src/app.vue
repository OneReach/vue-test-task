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

    @import "src/assets/scss/base";

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
</style>
