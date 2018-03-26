<template>
  <div id="Main">
    <div class="box">
      <div class="post_header">
        <div class="fr">
          <img :src="identicon" class="avatar">
        </div>
        <router-link to="/">Hupu</router-link>
        <span class="chevron">&nbsp;›&nbsp;</span>
        <router-link to="">{{ post.sort }}</router-link>
        <h1>{{ post.title }}</h1>
        <small class="gray">
          {{ post.author + ' · ' + post.createDate + ' · ' + post.viewCount +' 次点击 ' }}
        </small>
      </div>
      <div id="post_content"/>
        <img src="" />      
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import Identicon from 'identicon.js'
import Vue from 'vue'

export default {
  name: 'post-main',
  components: {
  },
  data () {
    return {
    }
  },
  props: {
  },
  computed: {
    identicon () {
      let size = 72
      let data = new Identicon(this.post.avatar, size).toString()
      return 'data:image/png;base64,' + data
    },
    ...mapState({
      post: state => {
        return state.currentPost
      },
      detail: state => {
        return state.currentDetail
      }
    }),
    // imgArray() {
    //   let result = []
    //   let el = document.createElement('content')
    //   el.innerHTML = this.detail.content
    //   el.getElementsByTagName('img').forEach(img => {
    //     Vue.http.get(img.src).then(res => {
    //       result.push(res)
    //     })
    //   })
    //   console.log(el.getElementsByTagName('img'))
    //   debugger
    //   return el.getElementsByTagName('img')
    // }
  },
  created () {
    // console.log(this.detail)
  },
  mounted () {
    new Vue({
      template: '<div class="cell">' + this.detail.content + '</div>'
    }).$mount('#post_content')
  },
  methods: {
    ...mapActions(['getPost', 'getDetail'])
  }
}
</script>

<style lang="stylus">
  @import "../style/index"
  #Main
    width auto
    margin 0 20px 0 20px
    flex-grow 1
    .post_header
      display block
      padding 10px
      font-size 15px
      line-height 120%
      text-align left
      border-bottom 1px solid #e2e2e2
      .fr
        float right
</style>
