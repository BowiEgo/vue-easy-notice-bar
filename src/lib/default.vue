<template>
  <div class="notice-bar"
    v-if="show"
    :style="style"
    @click="handleClick"
    ref="noticeBar">
    <div class="left-icon">
      <div class="left-icon__custom"
        v-if="leftIcon !== ''">
        <img :src="leftIcon">
      </div>
      <i class="iconfont icon-laba"
        v-else
        :style="{ color: color }">
      </i>
    </div>
    <div
      class="text-container text-swiper"
      ref="textContainer">
      <div
        class="text-wrapper"
        :style="textWrapStyle"
        ref="textWrapper">
        <div
          class="text"
          :style="textItemStyle"
          v-for="(item, index) in textList"
          :key="index">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="right-icon" v-if="mode !== ''">
      <i
        class="iconfont icon-right"
        v-if="mode === 'right'"
        :style="{ color: color, fontSize: '20px' }">
      </i>
      <i
        class="iconfont icon-close"
        v-if="mode === 'close'"
        :style="{ color: color, fontSize: '20px' }"
        @click="handleClose">
      </i>
    </div>
  </div>
</template>

<script>
import Base from './base'
import { getElWid } from './utils'
 
export default {
  name: 'NoticeBar',

  mixins: [ Base ],

  data() {
    return {
      wrapWid: 0
    }
  },

  props: {
    textGap: {  //  横向滚动文本分段间隔
      type: String,
      default: '14px'
    },
    interval: {  // 垂直滚动间隔时间，单位ms
      type: Number,
      default: 3000
    },
    speed: {  // 水平滚动速度，单位px/s
      type: Number,
      default: 50
    },
    duration: {
      type: Number
    }
  },

  computed: {
    cpuDuration: {
      get: function() {
        if(!this.duration) {
          return this.wrapperWid / this.speed
        } else {
          return this.duration
        }
      },
      set: function(val) {
        return this.cpuDuration
      }
    },
    cpuTransition() {
      return `transform ${this.cpuDuration}s linear`
    },
    textWrapStyle() {
      return {
        marginLeft: this.outview ? '100%' : '5px',
      }
    },
    textItemStyle() {
      return {
        color: this.color,
        paddingRight: this.textGap
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.scrollInterval)
  },

  methods: {
    init() {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.wrapperWid = this.getWrapWid()
          resolve()
        })
      })
    },
    getWrapWid() {
      const { textWrapper, textContainer } = this.$refs
      let wrapperWid = 0

      this.itemArr = textWrapper.getElementsByClassName('text')
      this.containerWid = getElWid(textContainer)
      for (let i = 0; i < this.itemArr.length; i++) {
        let itemW = Math.ceil(getElWid(this.itemArr[i]))
        wrapperWid += itemW
      }
      return wrapperWid
    },
    scroll(wid) {
      const Wrap = this.$refs.textWrapper
      this.setTransition(Wrap)
      this.setTransform(
        Wrap,
        wid,
        0,
        0,
        this.cpuDuration * 1000 - 300)
        .then(() => {
          this.initTransiton(Wrap)
          this.initTransform(Wrap)
        }
      )
    },
    loop() {
      const wW = this.wrapperWid
      const cW = this.containerWid
      this.cpuDuration = wW / 40
      this.scroll(- wW - cW)
      this.scrollInterval = setInterval(() => {
        this.scroll(- wW - cW)
      }, this.cpuDuration * 1000)
    }
  }
}
</script>
