<template>
  <div id="Main">
    <div class="box">
      <div class="header">
        <div class="fr">
          <img :src="identicon" class="avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Identicon from 'identicon.js'

export default {
  name: 'post-main',
  components: {
  },
  data () {
    return {
    }
  },
  props: {
    post: Object
  },
  computed: {
    identicon () {
      let size = 72
      let data = new Identicon(this.post.avatar, size).toString()
      return 'data:image/png;base64,' + data
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  #Main
    width auto
    margin 0 20px 0 20px
    flex-grow 1
    .header
      padding 10px
      font-size 15px
      line-height 120%
      text-align left
      border-bottom 1px solid #e2e2e2
      .fr
        margin-left auto
</style>
