<template>
	<div>
		<ui-alert v-show="!data.length" :dismissible="false" remove-icon>
			You have no tasks in this section yet

		</ui-alert>
		<!--
			вообще сначала делал добавление перечеркивания через transition-group,
			но из-за строгого режима в хранилище от этого метода пришлось отказаться
		-->
		<ul class="tasks">
			<list-item v-for="i in data" :key="i.id"
					   :value="i.complete" @input="handleInput($event, i)">
				{{i.name}}
			</list-item>
		</ul>
	</div>

</template>

<script>

	import listItem from './list-item.vue'

	export default {
		props: {
			data: {
				type: Array, // данные для показа
				required: true
			},
		},
		data() {
			return {}
		},
		methods: {
			/**
			 * Ловим изменения в записи таска и записываем их в хранилище.
			 * При этом сообщаем о событии родителю, чтоб запустилась анимация на кнопках
			 *
			 * @param e {boolean} - значение флага таска
			 * @param record - сам таск
			 */
			handleInput(e, record) {
				this.$store.commit('tasks/updateTaskStatus', {
					id: record.id,
					complete: e
				});

				this.$emit('changed')
			}
		},
		computed: {},
		components: {
			listItem
		}
	}
</script>

