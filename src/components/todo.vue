<template>
	<div class="todo">
		<h1 class="title">Checklist</h1>
		<ui-tabs type="text" backgroundColor="clear" @tab-change="handleTabChange($event)" fullwidth="">
			<ui-tab class="todo__tab" title="Pending" id="pending">
				<tasks-list :data="pendingTasks" @changed="animate('completed')"></tasks-list>
			</ui-tab>
			<ui-tab class="todo__tab" title="Completed" id="completed">
				<tasks-list :data="completedTasks" @changed="animate('pending')"></tasks-list>
			</ui-tab>
		</ui-tabs>

		<task-form :completedTab="activeTab === 'completed'"></task-form>
	</div>
</template>

<script>

	import tasksList from './parts/list.vue'
	import taskForm from './parts/add-form.vue'

	export default {
		data() {
			return {
				activeTab: 'pending' // 'pending' || 'completed'
			}
		},
		methods: {
			/**
			 * Ловим событие переключения таба.
			 *
			 * Функция для бОльшей наглядности
			 *
			 * @param e {string} - ИД таба ('pending' || 'completed')
			 */
			handleTabChange( e ) {
				this.activeTab = e;
			},
			/**
			 * Мега-запуск анимации кнопки при смене статуса таска
			 *
			 * Можно было бы сделать свой компонент, но их пришлось бы делать много (все табы) и я
			 * обошелся теми инструментами, которые позволял UI-фреейм (т.е. никакими)
			 *
			 * @param tab {string} - ID таба
			 */
			animate(tab) {
				let buttons = [].slice.apply(document.getElementsByClassName('ui-tab-header-item'));
				let btn = buttons.find(i => i.getAttribute('aria-controls') === tab);
				btn.classList.add('pulse');

				setTimeout(() => {
					btn.classList.remove('pulse')
				}, 500)
			}
		},
		computed: {
			/**
			 * Таски в процессе
			 *
			 * @returns {array}
			 */
			pendingTasks() {
				return this.$store.getters[ 'tasks/pendingTasks' ]
			},
			/**
			 * Завершенные таски
			 *
			 * @returns {array}
			 */
			completedTasks() {
				return this.$store.getters[ 'tasks/completedTasks' ]
			},
		},
		components: {
			tasksList,
			taskForm
		}
	};
</script>

<style lang="scss">

	@import "src/assets/scss/animations";

	.todo {
		width: 500px;
		margin: auto;
		padding: 20px;
		border-radius: 5px;
		background: #fff;
		box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

		&__tab {
			min-height: 150px;
			max-height: 230px;
			overflow: auto;
		}

		.title {
			margin-top: 0;
		}

		.tasks {
			list-style: none;
			padding: 0;
		}

		.ui-tab-header-item {
			animation-duration: .5s;
			animation-fill-mode: both;
		}

		.pulse {
			animation-name: pulse;
		}
	}
</style>
