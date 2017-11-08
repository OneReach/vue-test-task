/**
 * Created by Alex Shvets on 08.11.2017.
 */


/**
 * Сохранить таски в локальное хранилище
 *
 * @param tasks
 */
const saveTasks = function ( tasks ) {
	window.localStorage.setItem('tasks', JSON.stringify(tasks))
};

/**
 * Получаем таски, которые ранее были уже сохранены
 */
const getTasks = function (  ) {
	try {
		if (window.localStorage['tasks']) {
			const tmp = JSON.parse(window.localStorage['tasks'])
			state.tasks = tmp
		}
	} catch (e) {
		state.tasks = []
		console.error(e)
	}
};

const state = {
	tasks: [
		{ id: 0, name: 'create skeleton of todo', complete: true },
		{ id: 1, name: 'add ability to add tasks', complete: true },
		{ id: 2, name: 'clear task name after clicking "Add"', complete: true },
		{ id: 3, name: 'put "Add" button in one line with input', complete: true },
		{ id: 4, name: 'add new task by hitting Enter instead of clicking "Add"', complete: true },
		{ id: 5, name: 'replace <input> with <ui-checkbox> in tasks list', complete: true },
		{ id: 6, name: 'when task is complete cross it out', complete: true },
		{
			id: 7,
			name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
			complete: true
		},
		{ id: 8, name: 'don\'t allow to add empty tasks', complete: true },
		{ id: 9, name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true },
		{ id: 10, name: 'extract list item into a separate vue.js component', complete: true },
		{ id: 11, name: 'persist tasks list in a local storage', complete: true },
		{ id: 12, name: 'add animation on task completion', complete: false },
	]
};

getTasks();

const getters = {
	/**
	 * Выбираем таски в процессе
	 *
	 * @param state
	 * @returns {Array}
	 */
	pendingTasks( state ) {
		return state.tasks.filter( i => !i.complete )
	},
	/**
	 * Выбираем уже завершенные таски
	 *
	 * @param state
	 * @returns {Array.<T>}
	 */
	completedTasks( state ) {
		return state.tasks.filter( i => i.complete )
	}
};

const mutations = {
	/**
	 * Обновить статус таска
	 *
	 * @param state
	 * @param id {number} - ИД таска
	 * @param complete {boolean} - новое состояние таска (завершен/не завершен)
	 */
	updateTaskStatus( state, { id, complete } ) {
		const task = state.tasks.find( i => i.id === id )
		if ( task ) {
			task.complete = complete
		} else {
			console.error('Can\'t find task record')
		}
		saveTasks(state.tasks)
	},
	/**
	 * Добавить таск в хранилище
	 *
	 * @param state
	 * @param name {string} - текст таска
	 * @param complete {boolean} - состояние таска (завершен/не завершен)
	 */
	addTask(state, {name, complete}) {
		state.tasks.push({
			id: Date.now(),
			name,
			complete
		})
		saveTasks(state.tasks)
	}
};

const actions = {};


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
