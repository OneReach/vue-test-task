<template>
	<li class="tasks--item">

		<transition name="bounce">
    	<label class="tasks--item__label">
      	<ui-checkbox class="tasks--item__checkbox" v-model="task.complete"/>
      	<span class="tasks--item__name">{{task.name}}</span>
    	</label>
    </transition>

  </li>
</template>

<script>
	export default {
		props: ['task']
	};
</script>

<style scoped lang="scss">
	.tasks--item {

		&__label {
			display: flex;
		}

    &__checkbox {
      margin-right: 10px;

      &.is-checked + span {
      	text-decoration: line-through;
    	}
    }

    .bounce {
    	transition: .5s all ease;
    }

    .bounce-enter-active {
  		animation: bounce-in .5s;
		}
		.bounce-leave-active {
  		animation: bounce-out .5s;
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

		@keyframes bounce-out {
  		0% {
    		transform: scale(1);
  		}

  		50% {
    		transform: scale(1.5);
  		}

  		100% {
    		transform: scale(0);
 			 }
		}
  }
</style>