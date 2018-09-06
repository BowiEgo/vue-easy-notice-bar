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
          :style="textItemStyle(index)"
          v-for="(item, index) in textList"
          :key="index">
          <span>{{ item }}</span>
        </div>
      </div>
      <div
        class="text-duplicate"
        ref="textDuplicate"
        :style="textDuplicateStyle">
        <div
          v-if="!threeD"
          class="text"
          :style="textItemStyle(textList.length)">
          <span>{{ textList[0] }}</span>
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
import { getElWid, getElHei } from './utils'
 
export default {
  name: 'NoticeBarVertical',

  mixins: [ Base ],

  data() {
    return {
      idx: 0,
      itemDul: null,
      setBottom: false,
      isFirstScroll: true
    }
  },

  props: {
    interval: {  // 垂直滚动间隔时间，单位ms
      type: Number,
      default: 3000
    },
    duration: {  // 垂直滚动动画时间，单位ms，最大不超过滚动间隔时间interval
      type: Number,
      default: 1000
    },
    threeD: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    textList() {
      if (!Array.isArray(this.text)) {
        console.error('property text‘s type should be array in NoticeBarVertical')
      } else {
        return this.text
      }
    },
    cpuDuration() {
      return this.duration <= this.interval
        ? this.duration : this.interval
    },
    cpuTransition() {
      if (this.threeD && this.setBottom) {
        return `none`
      }
      return `transform ${this.cpuDuration / 1000}s
        cubic-bezier(.17,.67,.41,1.03)`
    },
    textDuplicateStyle() {
      return { top: `${this.height}px` }
    },
    textWrapStyle() {
      return {
        display: 'block',
        // perspective: '500px',
        transformStyle: 'preserve-3d'
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.scrollInterval)
  },

  methods: {
    textItemStyle(index) {
      return {
        width: '100%',
        height: `${this.height}px`,
        color: this.color,
        transition: this.cpuTransition,
        transformOrigin: this.threeD ? '50% 50% -12px' : 'unset',
        transform: this.cpuRotate(index),
        position: !this.threeD ? 'relative' : 'absolute'
      }
    },
    cpuRotate(index) {
      if (!this.threeD) {
        return 'none'
      } else {
        if (index === this.textList.length - 1
          && this.idx === 0
          && !this.isFirstScroll){
          return !this.setBottom ?
            'rotate3d(1, 0, 0, 90deg)' : 'rotate3d(1, 0, 0, -90deg)'
        }
        if (index === this.idx - 1) {
          return !this.setBottom ?
            'rotate3d(1, 0, 0, 90deg)' : 'rotate3d(1, 0, 0, -90deg)'
        } else if (index === this.idx) {
          return 'rotate3d(1, 0, 0, 0)'
        } else {
          return 'rotate3d(1, 0, 0, -90deg)'
        }
      }
    },
    init() {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.wrapperWid = this.getWrapWid()
          this.itemDul = this.$refs.textDuplicate.querySelector('.text')
          this.scrollH = getElHei(document.querySelector('.text'))
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
    initScroll() {
      const { itemDul, itemArr } = this

      this.idx = 1
      if (itemDul) {
        this.initTransiton(itemDul)
        this.initTransform(itemDul)
      }
      for (let i = 0; i < itemArr.length; i++) {
        this.initTransiton(itemArr[i])
      }
      this.scroll(0)
    },
    scroll(step) {
      return new Promise((resolve, reject) => {
        const { itemArr, threeD, scrollH } = this
        for (let i = 0; i < itemArr.length; i++) {
          this.setTranslate(itemArr[i], 0, scrollH * (-step), 0)
        }
        setTimeout(() => {
          resolve()
        }, this.interval)
      })
    },
    loop() {
      if (this.threeD) {
        this.loop3D()
        return
      }
      this.scroll(1)
      this.idx ++
      this.scrollInterval = setInterval(() => {
        this.idx ++
        const { itemDul, itemArr, textList, idx, scrollH } = this

        if (this.idx !== textList.length) {
          this.scroll(idx)
        } else {
          !this.threeD && this.setTranslate(itemDul, 0, -scrollH, 0)
          this.scroll(idx).then(() => {
            this.initScroll()
            setTimeout(() => {
              this.setTransition(itemDul)
              for (let i = 0; i < itemArr.length; i++) {
                this.setTransition(itemArr[i])
              }
              this.scroll(1)
            }, 30)
          })
        }
      }, this.interval)
    },
    loop3D() {
      this.idx ++
      this.setBottom = false
      setTimeout(() => {
        this.setBottom = true
        this.isFirstScroll = false
      }, this.cpuDuration)
      this.scrollInterval = setInterval(() => {
        this.setBottom = false
        this.idx ++
        if (this.idx === this.textList.length) {
          this.idx = 0
        }
        setTimeout(() => {
          this.setBottom = true
        }, this.cpuDuration)
      }, this.interval)
    }
  }
}
</script>
