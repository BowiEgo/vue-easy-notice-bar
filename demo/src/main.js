import Vue from 'vue'
import Demo from './demo'
// import Noticebar from 'vue-easy-notice-bar'

// Vue.use(Noticebar)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(Demo)
}).$mount('#demo')
