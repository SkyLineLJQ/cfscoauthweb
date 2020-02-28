import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: '',
    refresh_token: '',
    userInfo: ''
  },
  mutations: {
    setAccessToken(state, data) {
      state.access_token = data
    },
    setRefreshToken(state, data) {
      state.refresh_token = data
    },
    setUserInfo(state, data){
      state.userInfo = data
    }
  },
  actions: {},
  getters: {
    access_token: state => {
      return state.access_token
    },
    refresh_token: state => {
      return state.refresh_token
    },
    userInfo: state =>{
      return state.userInfo
    }
  },
  modules: {}
})
