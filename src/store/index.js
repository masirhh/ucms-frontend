import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    auth: true
  },
  mutations: {
    setUser(state, res) {
      state.user = res
    },
    setAuth(state) {
      state.auth = false
    }
  },
  actions: {},
  modules: {}
})