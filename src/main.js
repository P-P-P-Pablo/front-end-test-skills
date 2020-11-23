import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  makeServer  from "./server.js"

Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  makeServer()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
