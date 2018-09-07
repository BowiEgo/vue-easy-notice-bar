import Vue from 'vue'
import Demo from './demo'

Vue.config.productionTip = false

new Vue({
  el: '#demo',
  render: (h) => h(Demo)
})
