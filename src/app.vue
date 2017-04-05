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
    // keen ui reset
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }



    // Global styles
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        background: #eee;
    }

    .btn-rounded.btn-rounded {      /* Specified class-name 2 times to give it more priority */
        border-radius: 100em;
    }



    // App styles
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        display: flex;
    }
</style>
