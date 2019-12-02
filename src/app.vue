<template>
    <div id="app">
        <header class="header">
            <div class="container">
                <router-link to="/" >
                    <ui-button color="green" class="header__btn">Result</ui-button>
                </router-link>
                <router-link to="/initial" class="header__link">
                    <ui-button color="primary" class="header__btn">Task</ui-button>
                </router-link>
            </div>
        </header>
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
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 100%;
    }
    //global reset
    a {
        text-decoration: none
    }
    button {
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }
    ul, ol {
        list-style: none
    }

    .header {
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        &__btn {
            cursor: pointer;
        }
    }
   
</style>
