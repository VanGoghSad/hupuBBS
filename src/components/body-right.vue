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
import { setTimeout } from 'timers';
export default {
  name: 'body-right',
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
      return state.hot
    },
    currentHotPage: state => {
      return state.currentHotPage
    },
    isRefreshing() {
      return this.refreshing
    }
  }),
  created () {
    this.getDayilyHot({
      pageIndex: 1,
    })
  },
  methods: {
    ...mapActions(['getDayilyHot']),
    ...mapMutations(['SET_HOT', 'INCREASE_CURRENTHOTPAGE']),
    //换一批
    refreshHot() {
      this.INCREASE_CURRENTHOTPAGE()
      this.getDayilyHot({
        pageIndex: this.currentHotPage
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
