// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import {Icon} from 'element-ui'
import 'nprogress/nprogress.css'

import './style/index.styl'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Icon)

Vue.http.interceptors.push((request, next) => {
  NProgress.start()
  next(() => {
    NProgress.done()
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
