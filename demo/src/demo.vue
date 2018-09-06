<template>
  <div class="demo">
    <notice-bar
      :text="text"
      :bg-color="'#fff'"
      :color="'#03a9f4'"/>
    <notice-bar
      :text="text"
      :bg-color="'#fff'"
      :speed="50"
      :left-icon="'http://o9kkuebr4.bkt.clouddn.com/notice.png'"
      :color="'#03a9f4'"/>
    <notice-bar
      :text="text"
      height="40"
      bg-color="#03a9f4"
      :delay="1000"
      color="#fff"/>
    <notice-bar
      :text="text"
      mode="right"
      bg-color="#ff9800"
      :speed="80"
      :delay="0"
      :outview="true"
      color="#fff"/>
    <notice-bar
      :text="text"
      mode="close"
      :scrollable="false"
      bg-color="#ffdca9"
      color="#b36f0c"/>
    <notice-bar-vertical
      :text="text"
      bg-color="#ffdca9"
      color="#b36f0c"/>
    <notice-bar-vertical
      :text="text"
      three-d
      bg-color="#ffdca9"
      :delay="3000"
      :duration="500"
      :interval="3000"
      color="#b36f0c"/>
  </div>
</template>

<script>
// import NoticeBar from 'vue-easy-notice-bar'
// import { NoticeBar, NoticeBarVertical } from '../../dist/vue-easy-notice-bar'
import { NoticeBar, NoticeBarVertical } from '../../src/lib/index'

export default {
  name: 'Demo',
  components: {
    NoticeBar,
    NoticeBarVertical
  },
  data() {
    return {
      text: []
    }
  },
  created() {
    this.text = [
      '重启，可以解决电脑百分之七十的问题。',
      '重装系统，可以解决百分之八十的问题。',
      '换个电脑，可以解决百分之九十的问题。',
      '解决掉提出bug的人,可以解决百分之一百的问题。'
    ]
    // setTimeout(() => {
    //   this.text = '1212121212121212'
    // }, 10000)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

