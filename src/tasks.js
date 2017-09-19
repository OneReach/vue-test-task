import { TASKS_LIST } from "./constants";

const tasksList = [
  {
    name: "create skeleton of todo",
    id: "324234",
    complete: true
  },
  {
    name: "add ability to add tasks",
    id: "45646",
    complete: true
  },
  {
    name: 'clear task name after clicking "Add"',
    id: "6783",
    complete: true
  },
  {
    name: 'put "Add" button in one line with input',
    id: "345",
    complete: true
  },
  {
    name: 'add new task by hitting Enter instead of clicking "Add"',
    id: "8678",
    complete: true
  },
  {
    name: "replace <input> with <ui-checkbox> in tasks list",
    id: "34534",
    complete: true
  },
  {
    name: "when task is complete cross it out",
    id: "890890",
    complete: true
  },
  {
    name:
      'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
    id: "34565",
    complete: true
  },
  {
    name: "don't allow to add empty tasks",
    id: "678678",
    complete: true
  },
  {
    name: "make list of tasks scrollable, if there're are a lot of tasks",
    id: "3567",
    complete: true
  },
  {
    name: "extract list item into a separate vue.js component",
    id: "45676",
    complete: true
  },
  {
    name: "persist tasks list in a local storage",
    id: "345638",
    complete: true
  },
  {
    name: "add animation on task completion",
    id: "65879345",
    complete: true
  }
];

let tasksListLocal = JSON.parse(localStorage.getItem(TASKS_LIST));

if (!tasksListLocal) {
  localStorage.setItem(TASKS_LIST, JSON.stringify(tasksList));
}

export let tasksListExport = tasksListLocal ? tasksListLocal : tasksList; // if there is no storage (incognito mode)
