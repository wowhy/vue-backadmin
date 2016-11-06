import Vue from 'vue'
import ElementUI from 'element-ui'
import Resource from 'vue-resource'
import App from 'components/App'

import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'

Vue.use(ElementUI)
Vue.use(Resource)

let app = new Vue({
  store,
  router,
  ...App
})

sync(store, router)

export {
  app,
  router,
  store
}
