<template>
  <div>
    <my-header/>
    <my-body/>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Body from './components/body.vue'

export default {
  name: 'App',
  components: {
    'my-header': Header,
    'my-body': Body
  }
}
</script>

<style>

</style>
