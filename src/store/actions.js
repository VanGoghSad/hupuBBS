import Vue from 'vue'

export default {
  /**
   * 分页查询某一类的帖子
   * @param {*} param0 
   * @param {sort, pageSize, pageIndex} 分类 页号 每页数量 
   */
  getPosts ({ commit }, {sort, pageSize, pageIndex}) {
    return Vue.http.post('/api/posts', {sort: sort, pageSize: pageSize, pageIndex: pageIndex}).then(response => {
      commit('SET_POSTS', {posts: response.data, sort: sort})
    })
  },
  /**
   * 查询每日热贴
   * @param {pageSize, pageIndex} 页号 数量
   */
  getDayilyHot({commit}, {pageSize = 10, pageIndex}) {
    return Vue.http.post('api/hot', {pageSize: pageSize, pageIndex: pageIndex}).then(
      response => {
        commit('SET_HOT', response.data)
      }
    )

  }
}