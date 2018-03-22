<template>
  <div id="Rightbar">
    <div class="box">
      <div class="cell action_container">
        <span class="fade">步行街热帖</span>
        <i class="el-icon-refresh" @click="refreshHot()"></i>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'post-right',
  components: {
  },
  created () {
  },
  methods: {
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
