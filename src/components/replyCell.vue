<template>
  <div class="cell content">
    <img :src="identicon" class="avatar">
    <div class="info_container">
      <span>
        <strong>{{ reply.replier }}</strong>
        <span class="ago">{{ reply.replyTime + platform }}</span>
      </span>
      <div id="reply_content"/>
    </div>

  </div>
</template>

<script>
import Identicon from 'identicon.js'
import Vue from 'vue'
export default {
  name: 'ReplyCell',
  data () {
    return {
    }
  },
  computed: {
    identicon () {
      let data = new Identicon(this.reply.avatar, 48).toString()
      return 'data:image/png;base64,' + data
    },
    platform () {
      if (this.reply.content.includes('发自虎扑Android客户端')) {
        return ' via Android'
      } else if (this.reply.content.includes('发自虎扑iPhone客户端')) {
        return ' via iPhone'
      } else {
        return ''
      }
    }
  },
  filters: {
  },
  props: {
    post: Object,
    reply: Object
  },
  mounted () {
    new Vue({
      template: '<div class="reply_content">' + this.reply.content + '</div>'
    }).$mount('#reply_content')
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
    img
      align-self flex-start
    .info_container
      flex-grow 1
      margin-left 10px
      .reply_content
        font-size 14px
        line-height 1.6
        color #000
        word-break break-all
        word-wrap break-word
        margin-top 5px
        blockquote
        small
        br
          display none
        p
          padding 0
  
</style>
