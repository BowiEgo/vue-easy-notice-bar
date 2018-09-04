## VueEasyNoticeBar 使用简单的Vue通告栏组件

### 使用指南
#### 全局安装
``` javascript
import NoticeBar from 'vue-easy-notice-bar'

Vue.use(NoticeBar);
```
#### 单文件引入
``` javascript
import NoticeBar from 'vue-easy-notice-bar'

export default {
  components: {
    NoticeBar
  }
}
```

### 代码演示

#### 基础用法

```html
<notice-bar
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  :bg-color="'#fff'"
  :color="'#03a9f4'"
  left-icon="http://o9kkuebr4.bkt.clouddn.com/notice-color.png"
/>
```

#### 垂直滚动模式

默认模式为水平滚动，支持垂直滚动vertical
```html
<notice-bar
  text="重启，可以解决电脑百分之七十的问题。"
  vertical/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 通告栏文字 | `String | Array` | `''` |
| vertical | 滚动方向是否为垂直 | `Boolean` | `false` |
| left-icon | 左侧图标图片 URL | `String` | - |
| color | 文本颜色 | `String` | `#fff` |
| bg-color | 滚动条背景 | `String` | `#03a9f4` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 点击事件回调 | - |