export default {
  SET_POSTS: (state, {posts, sort}) => {
    let m = new Map(state.hupu)
    m.set(sort, posts)
    state.hupu = [...m]
  },
  SET_CURRENTSORT: (state, currentSort) => {
    state.currentSort = currentSort
  },
  SET_HOT: (state, hot) => {
    state.hot = hot
  },
  INCREASE_CURRENTHOTPAGE: (state) => {
    state.currentHotPage++
  },
  DECREASE_CURRENTHOTPAGE: (state) => {
    state.currentHotPage--
  },
  RESET_CURRENTHOTPAGE: (state) => {
    state.currentHotPage = 1
  }
}
