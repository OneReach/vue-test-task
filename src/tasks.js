import {TASK_LIST} from './constants';

const TASKS = [{'name' : 'create skeleton of todo', 'complete' : true}, {
    'name'     : 'add ability to add tasks',
    'complete' : true
}, {
    'name'     : 'clear task name after clicking "Add"',
    'complete' : true
}, {
    'name'     : 'put "Add" button in one line with input',
    'complete' : true
}, {
    'name'     : 'add new task by hitting Enter instead of clicking "Add"',
    'complete' : true
}, {
    'name'     : 'replace <input> with <ui-checkbox> in tasks list',
    'complete' : false
}, {
    'name'     : 'when task is complete cross it out',
    'complete' : false
}, {
    'name'     : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
    'complete' : false
}, {
    'name'     : 'don\'t allow to add empty tasks',
    'complete' : false
}, {
    'name'     : 'make list of tasks scrollable, if there\'re are a lot of tasks',
    'complete' : false
}, {
    'name'     : 'extract list item into a separate vue.js component',
    'complete' : false
}, {'name' : 'persist tasks list in a local storage', 'complete' : false}, {
    'name'     : 'add animation on task completion',
    'complete' : false
}];

let taskFromLocalStorage = JSON.parse(localStorage.getItem(TASK_LIST));
if (!taskFromLocalStorage) {
    localStorage.setItem(TASK_LIST, JSON.stringify(TASKS));
}
export let exportedTasks = taskFromLocalStorage ? taskFromLocalStorage : TASKS;
