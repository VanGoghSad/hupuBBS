<template>
  <div class="post_body">
    <div class="sep20"/>
    <div class="all_content">
      <router-view/>
      <post-right :post="post"/>
    </div>
    <div class="sep20"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import PostMain from './post-main.vue'
import PostRight from './post-right.vue'
import store from '../store/index'

export default {
  name: 'Post',
  components: {
    'post-main': PostMain,
    'post-right': PostRight
  },
  computed: {
    ...mapState({
      post: state => {
        return state.currentPost
      },
      detail: state => {
        return state.currentDetail
      }
    }),
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch('getPost', to.params.no), store.dispatch('getDetail', to.params.no)]).then(() => {
      next()
    })
  },
}
</script>

<style lang="stylus">
  @import "../style/common"
  .post_body
    text-align center
    background-color #e2e2e2
    background-image url(../assets/img/shadow_light.png),url("//cdn.v2ex.com/assets/bgs/circuit.png")
    background-repeat repeat-x
    .all_content
      min-width 600px
      max-width 1100px
      margin 0 auto
      display flex
      justify-content flex-end
</style>
