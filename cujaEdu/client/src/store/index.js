import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    profile: {

    }
  },
  mutations: {
    setUser: function(state, payload){
        console.log('Store: ', payload)
        state.profile = payload
    },
    clearUser: function(state){
      state.profile = {}
    }
  },
  getters: {
    user: state => state.user
  }
})

export default store
