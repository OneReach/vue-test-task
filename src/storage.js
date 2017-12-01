const KEY = 'VUE_TEST_TASK'

export default {
  fetch () {
    const data = localStorage.getItem(KEY)
    return data ? JSON.parse(data) : null
  },
  
  sync (data) {
    localStorage.setItem(KEY, JSON.stringify(data))
    return data
  }
}