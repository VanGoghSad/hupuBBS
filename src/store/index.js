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
      {label: '步行街', value: 'bxj', selected: false},
      {label: '影视', value: 'ent', selected: false},
      {label: 'IT数码', value: 'digital', selected: false},
      {label: '车友交流', value: 'cars', selected: false},
      {label: 'PUBG', value: 'pubg', selected: true},
      {label: 'lol', value: 'lol', selected: false}
    ]
  },
  mutations,
  actions
})
export default store
