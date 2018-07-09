import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	routers : 'department',
	userId: null,					//用户ID
	departmentId: 1001,				//部门ID

};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})