import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, res) {
      state.user = res
    }
  },
  actions: {},
  modules: {}
})