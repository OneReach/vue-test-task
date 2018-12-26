<template>
    <li :class="{complete : task.complete}">
                <label>
                    <input type="checkbox" :checked="task.complete" :value="task.name" @change="$emit('complete', task)" />
                    {{task.name}}
                </label>
      </li>
</template>


<script>
import { UiCheckbox} from 'keen-ui';
export default {
  name: 'task-item',
  props: ['task'],
  components: {
    UiCheckbox
  }
}
</script>
<style scoped lang="scss">
    .complete {
      text-decoration: line-through;
    }
</style>