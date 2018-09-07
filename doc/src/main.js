import Vue from 'vue'
import Doc from './doc.md'
import { NoticeBar, NoticeBarVertical } from 'vue-easy-notice-bar'
import 'highlight.js/styles/atom-one-dark.css'
import './assets/styles/markdown.stylus'
import './assets/styles/doc.stylus'

Vue.use(NoticeBar)
Vue.use(NoticeBarVertical)

Vue.config.productionTip = false

new Vue({
  render: h => h(Doc)
}).$mount('#app')
