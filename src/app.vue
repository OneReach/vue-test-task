<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
body {
  background: #fcfafc;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
