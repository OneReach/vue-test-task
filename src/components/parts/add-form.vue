<template>
	<form class="todo-form" @submit.prevent="addTask">
		<div class="todo-form--row">
			<ui-textbox class="todo-form--input" placeholder="Add an item here" v-model="task"
						:invalid="error"></ui-textbox>
			<ui-button class="todo-form--btn" color="primary" buttonType="submit">Add item</ui-button>
		</div>
		<div class="todo-form--row">
			<ui-alert @dismiss="error = false" type="warning" v-show="error">
				Ay caramba! Do you really want to add empty task?
			</ui-alert>
		</div>
	</form>
</template>

<script>
	export default {
		props: {
			completedTab: Boolean, // узнаем какой таб сейчас активен
		},
		data() {
			return {
				task: '',
				error: false
			}
		},
		watch: {
			/**
			 * При переключении табов убираем показ сообщения об ошибке
			 *
			 */
			completedTab( ) {
				this.error = false;
			}
		},
		methods: {
			/**
			 * Добавить таск
			 *
			 * Добавляет таск в хранилище. В ту секцию (в процессе/завершенные), которая сейчас активна
			 *
			 */
			addTask() {
				this.error = false;
				if ( this.task ) {
					this.$store.commit( 'tasks/addTask', { name: this.task, complete: this.completedTab } )
					this.task = '';
				} else {
					this.error = true;
				}
			}
		},
		computed: {},
		components: {}
	}
</script>

<style scoped="" lang="scss">

	.todo-form {

		&--row {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&--row + &--row {
			margin-top: 15px;
		}

		&--input {
			flex: 1 1 auto;
			margin-bottom: 0;
		}

		&--input + &--btn {
			margin-left: 15px;
		}

		&--btn {
			text-transform: none;
			border-radius: 25px;
		}
	}


</style>
