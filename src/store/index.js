import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hupu: [],
    hot: [],
    currentHotPage: 1,
    currentSort: 'pubg',
    currentPost: {},
    currentDetail: {},
    tabs: [
      {label: 'PUBG', value: 'pubg', selected: true},
      {label: '步行街', value: 'bxj', selected: false}
    ]
  },
  mutations,
  actions
})
export default store
