export default {
  SET_POSTS: (state, {posts, sort}) => {
    let m = new Map(state.hupu)
    m.set(sort, posts)
    state.hupu = [...m]
  },
  SET_CURRENTSORT: (state, currentSort) => {
    state.currentSort = currentSort
  },
  SET_HOT: (state, {hot, mySort}) => {
    if (mySort === '') {
      mySort = 'all'
    }
    let m = new Map(state.hot)
    m.set(mySort, hot)
    state.hot = [...m]
  },
  INCREASE_CURRENTHOTPAGE: (state) => {
    state.currentHotPage++
  },
  DECREASE_CURRENTHOTPAGE: (state) => {
    state.currentHotPage--
  },
  RESET_CURRENTHOTPAGE: (state) => {
    state.currentHotPage = 1
  },
  SET_CURRENTPOST: (state, currentPost) => {
    state.currentPost = currentPost
  },
  SET_CURRENTDETAIL: (state, currentDetail) => {
    state.currentDetail = currentDetail
  }
}
