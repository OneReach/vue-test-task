<template>
    <transition name="cross">
        <li  :class="{complete : task.complete}">
            <label>
                <ui-checkbox color="primary" v-model="task.complete" >
                {{task.name}}
                </ui-checkbox>
            </label>
        </li>
    </transition>
</template>

<script>

    export default {
       
        props: {
            task: Object     
            }
    
    }
</script>

<style>

.cross-leave-active {
  animation: crossing 2s;
}

@keyframes crossing {
  0% {
    text-decoration: none;
  }
  
  100% {
    text-decoration: line-through;
  
  }
}
     
</style>