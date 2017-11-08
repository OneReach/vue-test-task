<template>
	<li>
		<ui-checkbox v-model="val">
			<span class="task-text" :class="{complete: val}">
				<slot></slot>
			</span>
		</ui-checkbox>
	</li>
</template>

<script>

	import _ from 'lodash'

	export default {
		props: {
			value: Boolean
		},
		data() {
			return {
				val: this.value
			}
		},
		watch: {
			/**
			 * Смотрим изменение флага локальной переменной
			 * и запускаем функцию изменения состояния
			 *
			 * @param v {boolean} - значение флага
			 */
			val( v ) {
				this.changeState(v)
			},
			/**
			 * Обновляем локальное состояние, если родитель изменил значение
			 * переменной
			 */
			value( v ) {
				this.val = v
			}
		},
		methods: {
			/**
			 * Изменить состояние записи в хранилище.
			 *
			 * _.debounce для случая, если захочется много клацать
			 * Выбрал такой способ. Первоначальный выбор пал на transition-group,
			 * но из-за сторого режима хранилища этот способ отпал
			 *
			 * @param val {boolean} - флаг состояния чекбокса
			 */
			changeState: _.debounce(function ( val ) {
				this.$emit( 'input', val )
			}, 500)
		},
		computed: {},
		components: {}
	}
</script>

<style scoped="" lang="scss">

	.task-text {
		&.complete {
			text-decoration: line-through;
		}
	}

</style>
