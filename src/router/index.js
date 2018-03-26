import Vue from 'vue'
import Router from 'vue-router'
import MyIndex from '@/components/index'
import Post from '@/components/post'
import PostMain from '@/components/post-main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MyIndex,
    },
    {
      path: '/post',
      component: Post,
      props: true,
      children: [
        {
          path: '',
          component: PostMain
        }
      ]
    }
  ]
})
