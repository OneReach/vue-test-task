<template>
	<div class="todo">
		<h1 class="todo__title">Checklist</h1>
		<div class="todo__wr-lists">
			<ui-tabs type="text">
				<ui-tab title="Pending">
					<span v-if="!tasksPending.length">Pending list is empty</span>
					<list :tasks="tasksPending"  @animateTabs="animateTabs"></list>
				</ui-tab>

				<ui-tab title="Completed">
					<span v-if="!tasksCompleted.length">Completed list is empty</span>
					<list :tasks="tasksCompleted"  @animateTabs="animateTabs"></list>
				</ui-tab>
			</ui-tabs>
			<div class="controls">
				<ui-textbox class="controls__textbox" placeholder="Add an item here" v-model.trim="newTaskName" @keydown-enter="addTask"></ui-textbox>
				<ui-button color="primary controls__button" @click="addTask" icon="add">Add</ui-button>
			</div>
		</div>
	</div>
</template>

<script>
	import list from "./list";
	import { tasksListExport as tasksList } from "../tasks";
	import { TASKS_LIST } from "../constants";

	export default {
		data() {
			return {
				newTaskName: "",
				tasks: tasksList
			};
		},

		components: {
			list
		},

		methods: {
			addTask() {
				if (this.newTaskName) {
					this.tasks.push({
						name: this.newTaskName,
						complete: false,
						id: new Date().getTime()
					});
					this.newTaskName = "";

					let tabTextPeding = this.$el.querySelector(
						'.ui-tab-header-item:first-child:not([aria-selected="true"]) .ui-tab-header-item__text' //bad practice
					);
					this.animateScale(tabTextPeding, 250);
				}
			},

			animateTabs() {
				let tabText = this.$el.querySelector(
					'.ui-tab-header-item:not([aria-selected="true"]) .ui-tab-header-item__text' //bad practice
				);
				this.animateScale(tabText, 250);
			},

			animateScale(elem, direction) {
				if (!elem) return;

				let directionSecond = direction / 1000;
				elem.style.transition = `all ${directionSecond}s`;
				elem.style.transform = "scale(1.2)";
				setTimeout(() => {
					elem.style.transform = "";
				}, direction);
			}
		},

		computed: {
			tasksCompleted: function() {
				return this.tasks.filter(el => el.complete);
			},

			tasksPending: function() {
				return this.tasks.filter(el => !el.complete);
			}
		},

		watch: {
			tasks: {
				handler: function(newTasks) {
					localStorage.setItem(TASKS_LIST, JSON.stringify(newTasks));
				},
				deep: true
			}
		}
	};
</script>

<style scoped lang="scss">
	.todo {
		margin: auto;
		background: #fff;
		padding: 20px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

		&__title {
			margin-top: 0;
		}
		
		&__wr-lists { // for animation add an item
			position: relative;
			overflow: hidden;
		}
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		&__textbox {
			width: calc(100% - 100px);
			margin-bottom: 0;
		}
		&__button {
			border-radius: 20px;
		}
	}
</style>
