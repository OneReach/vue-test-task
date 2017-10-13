import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        tasks: [
            {name : 'create skeleton of todo', complete : false},
            {name : 'add ability to add tasks', complete : false},
            {name : 'clear task name after clicking "Add"', complete : false},
            {name : 'put "Add" button in one line with input', complete : false},
            {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
            {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
            {name : 'when task is complete cross it out', complete : false},
            {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
            {name : 'don\'t allow to add empty tasks', complete : false},
            {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
            {name : 'extract list item into a separate vue.js component', complete : false},
            {name : 'persist tasks list in a local storage', complete : false},
            {name : 'add animation on task completion', complete : false}
        ],
        completeTask: []
    },
    mutations: {
        addTask: (state, payload) => {
            state.tasks.push(payload);
        },
        deleteTask: (state, payload) => {
            state.tasks.splice(payload, 1)
        },
        completeTask: (state, payload) => {
            if( typeof payload === [] ) {
                state.completeTask = [];
            } else {
                state.completeTask.push(state.tasks[payload])
            }
        }
    }
})