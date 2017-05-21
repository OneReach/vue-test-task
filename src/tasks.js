/**
 * Created by Михаил on 17.05.2017.
 */
var firstTodos = [
        {name: 'create skeleton of todo', complete: true},
        {name: 'add ability to add tasks', complete: true},
        {name: 'clear task name after clicking "Add"', complete: false},
        {name: 'put "Add" button in one line with input', complete: false},
        {name: 'add new task by hitting Enter instead of clicking "Add"', complete: false},
        {name: 'replace <input> with <ui-checkbox> in tasks list', complete: false},
        {name: 'when task is complete cross it out', complete: false},
        {
            name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
            complete: false
        },
        {name: 'don\'t allow to add empty tasks', complete: false},
        {name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: false},
        {name: 'extract list item into a separate vue.js component', complete: false},
        {name: 'persist tasks list in a local storage', complete: false},
        {name: 'add animation on task completion', complete: false}];

var STORAGE_KEY = 'todos-vuejs-2.0';
var todoStorage = {
    fetch: function () {
        var tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (tasks.length === 0 )
        {
            tasks = firstTodos;
        }
        tasks.forEach(function (task, index) {
            task.id = index;
            console.log(index);
        })
        todoStorage.uid = tasks.length;
        return tasks
    },
    save: function (tasks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
};
 export default todoStorage
