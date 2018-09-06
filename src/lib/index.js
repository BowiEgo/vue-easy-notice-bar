import NoticeBar from './NoticeBar.vue'
import NoticeBarVertical from './NoticeBarVertical.vue'
import '../assets/less/style.less'

NoticeBar.install = function(Vue) {
  Vue.component(NoticeBar.name, NoticeBar)
}

NoticeBarVertical.install = function(Vue) {
  Vue.component(NoticeBarVertical.name, NoticeBarVertical)
}

export {
  NoticeBar,
  NoticeBarVertical
}
