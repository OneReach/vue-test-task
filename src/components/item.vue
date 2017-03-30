<template>
  <ui-checkbox v-model="itemtodo.complete" v-bind:label="itemtodo.name"></ui-checkbox><!-- replace <input> with <ui-checkbox> in tasks list -->
</template>
<script>
  export default {
    props: ['itemtodo']
  }
</script>
<style>
</style>
