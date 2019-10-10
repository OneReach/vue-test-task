<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
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
    display: flex;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
