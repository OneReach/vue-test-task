<template>
	<transition-group @after-enter="afterEnter" @after-leave="afterLeave" class="tasks" name="tasks__flip" tag="ul">
		<slot></slot>
	</transition-group>
</template>

<script>
	export default {
		methods: {
			afterEnter: function(el) {
				let tasks = this.$el;
				tasks.scrollTop = tasks.scrollHeight;
			},

			afterLeave: function(el) {
				this.$parent.$emit("animateTabs");
			}
		}
	};
</script>

<style lang="scss">
	.tasks {
		$translateXTask: -45px;
		$translateYTask: 300px;
		
		&__flip {
			&-enter-active {
				transition: all .2s linear;
				transform: translateX(0);
				transform: translateY(0);
				position: absolute;
			}

			&-enter {
				transform: translateX($translateXTask) translateY($translateYTask);
			}

			&-enter-active .ui-checkbox {
				position: absolute;
				clip: rect(0px, auto, auto, 20px);
			}

			&-leave-active {
				transition: all .5s;
			}

			&-leave-to {
				text-decoration: line-through;
				opacity: 0;
			}

			&-leave-to.tasks__complete {
				text-decoration: none;
			}
		}
	}
</style>