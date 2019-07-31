import LsService from '../../services/lsService';

const lsService = new LsService();

const state = {
  todos: [],
};

const mutations = {
  PUSH_TODO(state, todo) {
    state.todos = [...state.todos, todo];
    lsService.setItem('todos', state.todos);
  },
  CHECK_TODO(state, { id, isChecked }) {
    const todo = state.todos.find(el => el.id === id);
    todo.isChecked = isChecked;
    lsService.setItem('todos', state.todos);
  },
  DELETE_TODO(state, id) {
    state.todos = state.todos.filter(el => el.id !== id);
    lsService.setItem('todos', state.todos);
  },
  SET_TODOS(state, todos = []) {
    state.todos = todos;
  },
};

const actions = {
  addTodo({ commit }, todo) {
    commit('PUSH_TODO', todo);
  },
  deleteTodo({ commit }, id) {
    commit('DELETE_TODO', id);
  },
  checkTodo({ commit }, { id, isChecked }) {
    commit('CHECK_TODO', { id, isChecked });
  },
  filterTodos({ commit }, filter) {
    let todos;
    if (filter) {
      todos = state.todos.map((el) => {
        el.isVisible = el.isChecked;
        return el;
      });
    }
    if (!filter) {
      todos = state.todos.map((el) => {
        el.isVisible = !el.isChecked;
        return el;
      });
    }
    commit('SET_TODOS', todos);
  },
};

const getters = {
  todos: state => state.todos,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
