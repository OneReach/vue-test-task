<template>
		<div class="todo">
				<h1 class="todo__title">Checklist</h1>
				<ui-tabs background-color="clear" :class="{bounce : isComplete}">
						<ui-tab title="Pending">
								<div class="todo__inner">
										<todo-list
												:tasks="tasksPending"
                        :tasksCompleted="tasksCompleted"
                        @complete="completeTask">
										</todo-list>
								</div>
								<div class="todo__wrap">
										<ui-textbox class="todo__input" placeholder="Add an item here" @keydown.enter.prevent="addTask" v-model="newTaskName"></ui-textbox>
										<ui-button class="btn" color="primary" :disabled="!isEmpty" @click="addTask">Add item</ui-button>
								</div>
						</ui-tab>
						<ui-tab title="Completed">
								<div class="todo__inner todo__inner--extended">
										<ul class="todo-list" v-if="tasksCompleted.length">
												<li class="todo-list__item complete"
														v-for="(task, index) in tasksCompleted"
														:key="task.id">
														<span>{{ index + 1}} .</span>
														<span class="todo-list__desc"> {{task.name}} </span>
												</li>
										</ul>
										<span v-else>You have not completed tasks, open your Jira, and may the force be with you.</span>
								</div>
						</ui-tab>
				</ui-tabs>

		</div>
</template>

<script>
		import todoList from './todoList'
		export default {
				components: { todoList },
				data () {
						return {
								isComplete: false,
								newTaskName : '',
								tasksPending : [],
								tasksCompleted : [
									  // сейчас наши выполненные таски берутся из localstorage

										// {name : 'create skeleton of todo', complete : true},
										// {name : 'add ability to add tasks', complete : true},
										// {name : 'clear task name after clicking "Add"', complete : true},
										// {name : 'put "Add" button in one line with input', complete : true},
										// {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
										// {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
										// {name : 'when task is complete cross it out', complete : true},
										// {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
										// {name : 'don\'t allow to add empty tasks', complete : true},
										// {name : 'persist tasks list in a local storage', complete : true},
										// {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    // {name : 'extract list item into a separate vue.js component', complete : true},
                    // {name : 'add animation on task completion', complete : true},
                ]
						}
				},

				methods : {
						addTask() {
								if(this.newTaskName.length > 0) {
										this.tasksPending.push({name: this.newTaskName, complete: false});
										let stringify = JSON.stringify(this.tasksPending);
										localStorage.setItem('tasksPending', stringify);
								}
								this.newTaskName = '';
						},
						completeTask() {
						    this.isComplete = !this.isComplete;
						    setTimeout(() => {
						    	  this.isComplete = false
						    }, 1000)
						},
						getTasks() {
						    this.tasksPending = JSON.parse(localStorage.getItem('tasksPending'));
						    this.tasksCompleted = JSON.parse(localStorage.getItem('tasksCompleted'));
						    if(this.tasksPending === null) {
						      this.tasksPending = []
						    }
						    if(this.tasksCompleted === null) {
						      this.tasksCompleted = []
						    }
						}
				},
				computed : {
						isEmpty() {
								return this.newTaskName;
						}
				},
				created() {
				    this.getTasks();
				}
		};

</script>

<style scoped lang="scss">
		@import '../assets/scss/buttons';
    @import '../assets/scss/todo-list';
		.todo {
				margin: auto;
				background: #fff;
				padding: 16px 16px 0;
				width: 400px;
				height: 460px;
				border-radius: 5px;
				box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
				&__title {
						margin: 0 0 16px;
						font-size: 18px;
				}
				&__inner {
            overflow: hidden;
            height: 260px;
            overflow-y: scroll;
            &--extended {
                height: 320px;
            }
        }
				&__wrap {
						margin-top: 32px;
						display: flex;
						justify-content: space-between;
						align-items: center;
				}
		}
</style>
