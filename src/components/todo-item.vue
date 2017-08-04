<template>
	<transition name="bounce" v-on:after-leave="changeTaskStatus(complete, index)">
		<li :class="{complete : complete}"
			v-if="show">
	        <ui-checkbox v-model="complete"  
	            @change="hideTask()">{{task.name}}</ui-checkbox>
	    </li>
	</transition>
</template>

<script>
	export default {
		props : ['task', 'index'],

		data () {
			return {
				show : true,
				complete : this.task.complete
			}
		}, 

		methods : {
			changeTaskStatus (complete, index) {
				this.$emit('change-task-status', [complete, index]);
			},

			hideTask () {
				this.show = false;
			}
		}
	};
</script>

<style scoped lang="scss">
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }	
</style>
