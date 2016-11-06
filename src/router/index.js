import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: routes
})

export default router
