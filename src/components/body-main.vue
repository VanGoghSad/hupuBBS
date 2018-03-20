<template>
  <div id="Main">
    <div class="box">
      <div class="top">
        <a v-for="tab in tabs" :key="tab.value" href="javascript:void(0);" :class="[tab.selected ? 'tab_current' : 'tab']" @click="selectTab(tab)">{{ tab.label }}</a>
      </div>
      <cell detailed v-for="post in posts" :key="post.no" :post="post"/>
    </div>
  </div>
</template>

<script>
import Cell from './cell.vue'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name: 'Body-main',
  components: {
    'cell': Cell
  },
  data () {
    return {
    }
  },
  computed: mapState({
    posts: state => {
      let map = new Map(state.hupu)
      return map.get(state.currentSort)
    },
    tabs: state => {
      return state.tabs
    }
  }),
  created () {
    this.getPosts({
      sort: 'pubg',
      pageSize: 30,
      pageIndex: 1
    })
  },
  mounted () {
  },
  methods: {
    selectTab (selectedTab) {
      this.getPosts({
        sort: selectedTab.value,
        pageSize: 70,
        pageIndex: 1
      }).then(() => {
        this.SET_CURRENTSORT(selectedTab.value)
        this.tabs.forEach(tab => {
          tab.selected = selectedTab.label === tab.label
        })
      })
    },
    ...mapActions(['getPosts']),
    ...mapMutations(['SET_CURRENTSORT'])
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  #Main
    width auto
    margin 0 10px 0 20px
    flex-grow 1
    .top
      padding 10px
      font-size 14px
      line-height 150%
      text-align left
      background-color #fff
</style>
