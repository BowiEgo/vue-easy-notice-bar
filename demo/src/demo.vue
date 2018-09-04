<template>
  <div class="demo">
    <notice-bar
      :text="text"
      :bg-color="'#fff'"
      :color="'#03a9f4'"
      left-icon="http://o9kkuebr4.bkt.clouddn.com/notice-color.png"/>
  </div>
</template>

<script>
import NoticeBar from '../../dist/vue-easy-notice-bar'
// import NoticeBar from '../../src/lib/index'

export default {
  name: 'Demo',
  components: {
    NoticeBar
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
    setTimeout(() => {
      this.text = '1212121212121212'
    }, 2000)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

