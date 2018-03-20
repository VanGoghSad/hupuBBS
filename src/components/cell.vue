<template>
  <div :class="['content', 'cell', detailed ? '' : 'simple']">
    <img :src="identicon" class="avatar" :class="[detailed ? '' : 'little_img']">
    <div class="info_container">
      <span :class="[detailed ? 'item_title' : 'little_title']">
        <a href="" >{{ post.title }}</a>
      </span>
      <div v-if="detailed" class="sep5"/>
      <span v-if="detailed" class="info">
        <strong>{{ post.author }}</strong>
         &nbsp;•&nbsp; {{ post.lastReplyTime }} &nbsp;•&nbsp; 最后回复来自
        <strong>{{ post.lastReplyer }}</strong>
      </span>
    </div>
    <div v-if="detailed" class="count_container">
      <a class="count">{{ post.replyCount }}</a>
    </div>
  </div>
</template>

<script>
import Identicon from 'identicon.js'
export default {
  name: 'Cell',
  data () {
    return {
    }
  },
  computed: {
    identicon() {
      let size = this.detailed ? 48 : 24
      let data = new Identicon(this.post.avatar, size).toString()
      return 'data:image/png;base64,' + data
    }
  },
  filters: {
  },
  props: {
    post: Object,
    detailed: Boolean
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  .content
    display flex
    align-items center
    justify-content space-between
    .info_container
      flex-grow 1
      margin-left 10px
      .info
        font-size 11px
        color #ccc
    .count_container
      width 70px
      text-align right
      .count
        line-height 12px
        font-weight bold
        color #fff
        background-color #aab0c6
        padding 2px 10px
        border-radius 12px
        text-decoration none
        word-break keep-all
        margin-right 5px

  .simple
    .little_img
      max-height 24px
      max-width 24px
    .little_title
      font-size 13px
      line-height 120%
      text-shadow 0 1px 0 #fff
</style>
