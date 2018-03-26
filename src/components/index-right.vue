<template>
  <div id="Rightbar">
    <div class="box">
      <div class="cell action_container">
        <span class="fade">步行街热帖</span>
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
  name: 'index-right',
  components: {
    'cell': Cell
  },
  data () {
    return {
      refreshing: false
    }
  },
  computed: mapState({
    hotPosts: state => {
      let map = new Map(state.hot)
      return map.get('all')
    },
    currentHotPage: state => {
      return state.currentHotPage
    }
  }),
  created () {
    this.getHotAll({
      pageIndex: 1
    })
  },
  methods: {
    ...mapActions(['getHotAll']),
    ...mapMutations(['SET_HOT', 'INCREASE_CURRENTHOTPAGE']),
    // 换一批
    refreshHot () {
      this.INCREASE_CURRENTHOTPAGE()
      this.getHotAll({
        pageIndex: this.currentHotPage,
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
