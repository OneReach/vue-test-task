const MOCK = {
  tasks: [
      { name: 'create skeleton of todo', complete: true },
      { name: 'add ability to add tasks', complete: true },
      { name: 'clear task name after clicking "Add"', complete: true },
      { name: 'put "Add" button in one line with input', complete: true },
      { name: 'add new task by hitting Enter instead of clicking "Add"', complete: true },
      { name: 'replace <input> with <ui-checkbox> in tasks list', complete: true },
      { name: 'when task is complete cross it out', complete: true },
      { name: 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete: true },
      { name: 'don\'t allow to add empty tasks', complete: true },
      { name: 'make list of tasks scrollable, if there\'re are a lot of tasks', complete: true },
      { name: 'extract list item into a separate vue.js component', complete: true },
      { name: 'persist tasks list in a local storage', complete: true },
      { name: 'add animation on task completion', complete: true }
  ]
}

export const createTasksMixin = (storageInterface) => ({
  data () {
    return storageInterface.fetch() || storageInterface.sync(MOCK);
  },
  
  watch: {
    tasks () {
      this.sync()
    }
  },
  
  methods: {
    add (name) {
      this.tasks.push({ name, complete: false })
    },
    
    sync () {
      storageInterface.sync({ tasks: this.tasks });
    }
  }
});