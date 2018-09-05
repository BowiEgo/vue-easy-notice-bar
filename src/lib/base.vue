<script>
  export default {
    name: 'Base',

    data() {
      return {
        show: true,
        scrollInterval: null,
        itemArr: null
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
      leftIcon: {
        type: String,
        default: ''
      },
      interval: {  // 垂直滚动间隔时间(ms)
        type: Number,
        default: 3000
      },
      delay: {  //  动画延迟时间(ms)
        type: Number,
        default: 1000
      },
      outview: {
        type: Boolean,
        default: false
      },
      scrollable: {  // 是否禁止动画
        type: Boolean,
        default: true
      },
      mode: {  // 通告栏模式：'right': 'close'
        type: String,
        default: ''
      }
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
      style() {
        return {
          height: `${this.height}px`,
          backgroundColor: this.bgColor,
          lineHeight: `${this.height}px`,
          backgroundImage: this.special ? `url(${this.bgImg})` : 'none'
        }
      }
    },

    watch: {
      text: {
        handler(val) {
          this.init().then(() => {
            if (this.scrollable) {
              setTimeout(() => {
                this.loop()
              }, this.delay)
            }
          })
        },
        immediate: true
      }
    },
    
    methods: {
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
      },
      handleClose() {
        this.show = false
      }
    }
  }
</script>
