export default {
    has: function (key) {
        return localStorage.hasOwnProperty(key);
    },
    get: function (key) {
        return JSON.parse(localStorage.getItem(key) || '[]');
    },
    set: function (key, todos) {
        localStorage.setItem(key, JSON.stringify(todos))
    }
}
