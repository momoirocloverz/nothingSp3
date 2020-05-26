import Vue from "vue";
import Vuex from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

// 首先声明一个状态 state
const state = {
  count: 0,
  edit:null
}
// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
export default store
