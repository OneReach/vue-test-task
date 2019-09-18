import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   tasks: []
  },
  mutations: {
    loadTasks(state, data) {
      state.tasks = data
    }
  },
  getters: {
    todoItem: state => id => {
      return state.tasks.filter(task => {
          return task.id == id
      })
    }
  }
})