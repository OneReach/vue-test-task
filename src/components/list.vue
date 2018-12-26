<template>
    <ul class="tasks">
            <list-item v-for="(task) in tasks" :task="task" @complete="$emit('complete', task)" />
    </ul>
</template>

<script>
import listItem from './listItem.vue';

export default {
  name: 'list',
  props: ['tasks'],
  components: {
  	listItem
  }

}
</script>


<style scoped lang="scss">
	.tasks {
            list-style: none;
            padding: 0;
            height: 240px;
            overflow: scroll;
        }
</style>