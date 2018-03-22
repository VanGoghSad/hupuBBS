<template>
  <div class="my_index">
    <div class="sep20"/>
    <div class="all_content">
      <my-index-main />
      <my-index-right/>
    </div>
    <div class="sep20"/>
  </div>
</template>

<script>
import IndexMain from './index-main.vue'
import IndexRight from './index-right.vue'

export default {
  name: 'Body',
  components: {
    'my-index-main': IndexMain,
    'my-index-right': IndexRight
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  .my_index
    text-align center
    background-color #e2e2e2
    background-image url(../assets/img/shadow_light.png)
    background-repeat repeat-x
    .all_content
      min-width 600px
      max-width 1100px
      margin 0 auto
      display flex
      justify-content flex-end
</style>
