import { app, store } from './app'

store.commit('authed', true)

app.$mount('#app')
