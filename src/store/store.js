/**
 * Created by Alex Shvets on 08.11.2017.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks'

Vue.use(Vuex);


export default new Vuex.Store({
	modules: {
		tasks
	},
	strict: true,
})