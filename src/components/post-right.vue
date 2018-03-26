<template>
  <div id="Rightbar">
    <div class="box">
      <div class="cell action_container">
        <span class="fade">{{ post.sort + '热帖' }}</span>
        <i class="el-icon-refresh" @click="refreshHot()"></i>
      </div>
      <cell v-for="post in hotPosts" :key="post.no" :post="post"/>
    </div>
  </div>
</template>

<script>
import Cell from './cell.vue'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'post-right',
  components: { 
    'cell': Cell
  },
  props: {
    post: Object
  },
  computed: mapState({
    hotPosts: function(state) {
      let map = new Map(state.hot)
      return map.get(this.post.sort)
    },
    currentHotPage: state => {
      return state.currentHotPage
    }
  }),
  created () {
    this.getHot({
      pageIndex: 1,
      mySort: this.post.sort
    })
  },
  methods: {
    ...mapActions(['getHot']),
    ...mapMutations(['SET_HOT', 'INCREASE_CURRENTHOTPAGE']),
    // 换一批
    refreshHot () {
      this.INCREASE_CURRENTHOTPAGE()
      this.getHot({
        pageIndex: this.currentHotPage,
        mySort: 'pubg'
      })
    }
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  #Rightbar
    width 270px
    min-width 270px
    margin-right 20px
    align-self flex-start
    .box
      background-color #fff
      .action_container
        display flex
        align-items center
        justify-content space-between
        i
          font-size 22px
          margin-right 5px
          color #ccc
          cursor pointer
          &:hover
            animation rotating 1s linear infinite
</style>
