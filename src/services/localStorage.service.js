export default {
    has: function (key) {
        return localStorage.hasOwnProperty(key);
    },
    get: function (key) {
        let todos = JSON.parse(localStorage.getItem(key) || '[]')
        todos.forEach((todo, index) => todo.id = index);
        
        return todos;
    },
    set: function (key, todos) {
        localStorage.setItem(key, JSON.stringify(todos))
    }
}
