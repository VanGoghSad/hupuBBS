import Vue from 'vue'

export default {
  /**
   * 分页查询某一类的帖子
   * @param {*} param0
   * @param {sort, pageSize, pageIndex} 分类 页号 每页数量
   */
  getPosts ({ commit }, {sort, pageSize, pageIndex}) {
    return Vue.http.get('/api/posts', {params: {sort: sort, pageSize: pageSize, pageIndex: pageIndex}}).then(response => {
      commit('SET_POSTS', {posts: response.data, sort: sort})
    })
  },
  /**
   * 查询每日热贴
   * @param {pageSize, pageIndex} 页号 数量
   */
  getHot ({commit}, {pageSize = 10, pageIndex, mySort}) {
    return Vue.http.get('/api/hot/' + mySort, {params: {pageSize: pageSize, pageIndex: pageIndex}}).then(
      response => {
        commit('SET_HOT', {hot: response.data, mySort: mySort})
      })
  },

  getHotAll ({commit}, {pageSize = 10, pageIndex}) {
    return Vue.http.get('/api/hot', {params: {pageSize: pageSize, pageIndex: pageIndex}}).then(
      response => {
        commit('SET_HOT', {hot: response.data, mySort: 'all'})
      })
  },

  getPost({ commit }, no) {
    return Vue.http.get('/api/posts/' + no).then(response => {
      commit('SET_CURRENTPOST', response.data)
    })
  },
  getDetail({ commit }, no) {
    return Vue.http.get('/api/detail/' + no).then(response => {
      commit('SET_CURRENTDETAIL', response.data)
    })
  }
}
