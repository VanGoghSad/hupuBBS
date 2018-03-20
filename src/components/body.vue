<template>
  <div class="my_body">
    <div class="sep20"/>
    <div class="all_content">
      <my-body-main />
      <my-body-right/>
    </div>
    <div class="sep20"/>
  </div>
</template>

<script>
import BodyMain from './body-main.vue'
import BodyRight from './body-right.vue'

export default {
  name: 'Body',
  components: {
    'my-body-main': BodyMain,
    'my-body-right': BodyRight
  }
}
</script>

<style lang="stylus">
  @import "../style/common"
  .my_body
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
