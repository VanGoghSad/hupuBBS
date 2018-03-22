import Vue from 'vue'
import Router from 'vue-router'
import MyIndex from '@/components/index'
import Post from '@/components/post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MyIndex,
    },
    {
      path: '/post/:no',
      name: 'post',
      component: Post,
      props: true
    }
  ]
})
