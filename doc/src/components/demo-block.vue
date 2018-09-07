<template>
  <div
    class="demo-block"
    :class="[{ 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <slot name="source"></slot>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <slot name="highlight"></slot>
    </div>
  </div>
</template>

<script type="text/babel">

import { NoticeBar, NoticeBarVertical } from 'vue-easy-notice-bar'

export default {
  name: 'app',
  components: {
    NoticeBar,
    NoticeBarVertical
  },
  data() {
    return {
      text: [],
      hovering: false
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