<template>
  <div>
    <my-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header.vue'
import MyIndex from './components/index.vue'
import Post from './components/post.vue'

export default {
  name: 'App',
  components: {
    'my-header': Header,
    'my-index': MyIndex
  }
}
</script>

<style>

</style>
