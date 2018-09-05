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
      <div
        class="text-duplicate"
        ref="textDuplicate"
        :style="textDuplicateStyle">
        <div
          class="text"
          :style="{
            height: `${height}px`,
            color: color,
            lineHeight: `${height}px`,
            transition: cpuTransition
          }">
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
      itemDul: null
    }
  },

  props: {
    interval: {  // 垂直滚动间隔时间，单位ms
      type: Number,
      default: 3000
    },
    duration: {  // 垂直滚动动画时间，单位ms
      type: Number,
      default: 1000
    }
  },

  computed: {
    cpuTransition() {
      return `transform ${this.duration / 1000}s cubic-bezier(.17,.67,.41,1.03)`
    },
    textDuplicateStyle() {
      return { top: `${this.height}px` }
    },
    textWrapStyle() {
      return {
        display: 'block'
      }
    },
    textItemStyle() {
      return {
        width: '100%',
        height: `${this.height}px`,
        color: this.color,
        transition: this.cpuTransition
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
        const itemArr = this.itemArr
        for (let i = 0; i < itemArr.length; i++) {
          this.setTransform(itemArr[i], 0, this.scrollH * (-step), 0)
        }
        setTimeout(() => {
          resolve(true)
        }, this.interval)
      })
    },
    loop() {
      this.scroll(1)
      this.idx ++
      this.scrollInterval = setInterval(() => {
        this.idx ++
        const { itemDul, itemArr, textList, idx, scrollH } = this

        if (this.idx !== textList.length) {
          this.scroll(idx)
        } else {
          this.setTransform(itemDul, 0, -scrollH, 0)
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
    }
  }
}
</script>
