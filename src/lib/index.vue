<template>
  <div class="notice-bar"
    :style="compStyle"
    @click="handleClick"
    ref="noticeBar">
    <div class="left-icon">
      <div class="left-icon__custom" v-if="leftIcon !== ''">
        <img :src="leftIcon">
      </div>
      <i class="iconfont icon-laba" :style="{ color: color }"></i>
    </div>
    <div
      class="text-container text-swiper"
      ref="textContainer">
      <div
        class="text-wrapper"
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
        :style="textDuplicateStyle"
        v-if="vertical">
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
  </div>
</template>

<script>
  export default {
    name: 'NoticeBar',
    data() {
      return {
        idx: 0,
        durationT: 0
      }
    },
    props: {
      height: {
        default: '31'
      },
      text: '',
      bgColor: {
        type: String,
        default: '#03a9f4'
      },
      bgImg: String,
      color: {
        type: String,
        default: '#fff'
      },
      textGap: {         //  横向滚动文本分段间隔
        type: String,
        default: '14px'
      },
      leftIcon: {
        type: String,
        default: ''
      },
      special: {
        type: Boolean,
        default: false
      },
      interval: {  // 垂直滚动间隔时间，单位ms
        type: Number,
        default: 3000
      },
      speed: {  // 水平滚动速度，单位px/s
        type: Number
      },
      duration: {
        type: Number,
        default: 3
      },
      vertical: Boolean
    },
    computed: {
      textList() {
        if (typeof this.text === 'string') {
          return [this.text]
        } else if (Array.isArray(this.text)) {
          return this.text
        } else {
          console.error('property text‘s type should be string or array')
          return ['']
        }
      },
      cpuDurationT: {
        get: function() {
          if(!!this.speed) {
            let scrollW = document.body.clientWidth
            return scrollW / this.speed
          } else {
            return durationT
          }
        },
        set: function(val) {
          return this.cpuDurationT
        }
      },
      cpuTransition() {
        return !this.vertical ? `transform ${this.cpuDurationT}s linear` : `transform ${this.duration}s cubic-bezier(.17,.67,.41,1.03)`
      },
      textItemStyle() {
        return !this.vertical ? {display: 'inline-block', transition: 'none', color: this.color, paddingRight: this.textGap} : {width: '100%', height: `${this.height}px`, color: this.color, transition: this.cpuTransition}
      },
      textDuplicateStyle() {
        return !this.vertical ? {top: '0'} : {top: `${this.height}px`}
      },
      compStyle() {
        return {
          height: `${this.height}px`,
          backgroundColor: this.bgColor,
          lineHeight: `${this.height}px`,
          backgroundImage: this.special ? `url(${this.bgImg})` : 'none'
        }
      }
    },
    watch: {
      // text: {
      //   handler: function(val) {
      //     this.$nextTick(() => {
      //       if (val.length > 0 && val[0] !== '') {
      //         this.init().then(() => {
      //           this.$nextTick(() => {
      //             this.loop()
      //           })
      //         })
      //       }
      //     })
      //   },
      //   deep: true
      // }
    },
    beforeDestroy() {
      clearInterval(this.scrollInterval)
    },
    mounted() {
      this.init().then(() => {
        this.$nextTick(() => {
          this.loop()
        })
      })
    },
    methods: {
      init() {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            let textWrapper = this.$refs.textWrapper
            this.itemArr = textWrapper.getElementsByClassName('text')
            if (this.vertical) {
              this.itemDul = this.$refs.textDuplicate.querySelector('.text')
            }
            this.scrollH = window.getComputedStyle(document.querySelector('.text'), null).height.replace('px', '')
            if (!this.vertical) {
              this.wrapperWid = 0
              this.containerWid = window.getComputedStyle(this.$refs.textContainer, null).width.replace('px', '')
              for (let i = 0; i < this.itemArr.length; i++) {
                this.wrapperWid += Math.ceil(window.getComputedStyle(this.itemArr[i], null).width.replace('px', ''))
              }
              textWrapper.style.width = this.wrapperWid + 'px'
              textWrapper.style.height = '100%'
              textWrapper.style.marginLeft = '100%'
              this.$refs.textDuplicate.style.left = this.containerWid + 'px'
            }
            resolve()
          })
        })
      },
      scrollVert(step) {
        return new Promise((resolve, reject) => {
          for (let i = 0; i < this.itemArr.length; i++) {
            this.setTransform(this.itemArr[i], 0, this.scrollH * (-step), 0)
          }
          setTimeout(() => {
            resolve(true)
          }, this.interval)
        })
      },
      scrollHori(wid) {
        this.setTransition(this.$refs.textWrapper)
        this.setTransform(this.$refs.textWrapper, wid, 0, 0, this.cpuDurationT * 1000 - 300).then(() => {
          this.initTransiton(this.$refs.textWrapper)
          this.initTransform(this.$refs.textWrapper)
        })
      },
      loop() {
        if (!this.vertical) {
          this.cpuDurationT = this.wrapperWid / 40
          this.scrollHori(-this.wrapperWid - this.containerWid)
          this.scrollInterval = setInterval(() => {
            this.scrollHori(-this.wrapperWid - this.containerWid)
          }, this.cpuDurationT * 1000)
        } else {
          this.scrollInterval = setInterval(() => {
            this.idx ++
            if (this.idx !== this.text.length) {
              this.scrollVert(this.idx)
            } else {
              this.setTransform(this.itemDul, 0, -this.scrollH, 0)
              this.scrollVert(this.idx).then(() => {
                this.initScroll()
                setTimeout(() => {
                  this.setTransition(this.itemDul)
                  for (let i = 0; i < this.itemArr.length; i++) {
                    this.setTransition(this.itemArr[i])
                  }
                  this.scrollVert(1)
                }, 30)
              })
            }
          }, this.interval)
        }
      },
      initScroll() {
        this.idx = 1
        if (this.itemDul) {
          this.initTransiton(this.itemDul)
          this.initTransform(this.itemDul)
        }
        for (let i = 0; i < this.itemArr.length; i++) {
          this.initTransiton(this.itemArr[i])
        }
        this.scrollVert(0)
      },
      initTransiton(dom) {
        dom.style.transition = 'none'
      },
      initTransform(dom) {
        dom.style.transform = `none`
      },
      setTransition(dom) {
        dom.style.transition = this.cpuTransition
      },
      setTransform(dom, x, y, z, lag) {
        return new Promise((resolve, reject) => {
          dom && (dom.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`)
          setTimeout(() => {
            resolve(true)
          }, lag)
        })
      },
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../assets/css/iconfont.css';

* {
  box-sizing: border-box;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paddingLR {
  padding-left: 5%;
  padding-right: 5%;
}

.notice-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #d04519;
  background-size: cover;
  overflow: hidden;
  .paddingLR;
  .icon-laba {
    color: #fffbbc;
    font-size: 19px;
  }
  .text-container {
    position: relative;
    margin-left: 5px;
    width: 90%;
    color: #fffbbc;
    height: 100%;
    overflow: hidden;
  }
  .text-duplicate {
    width: 81%;
    position: absolute;
  }
  .text {
    // width: 100%;
    // transition: transform 1s cubic-bezier(.17,.67,.52,.97);
    display: flex;
    align-items: center;
    span {
      .ellipsis;
    }
  }
}

.left-icon__custom {
  width: 16px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }
}
</style>
