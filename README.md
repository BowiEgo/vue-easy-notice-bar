## VueEasyNoticeBar 使用简单的Vue通告栏组件
<a href="https://www.npmjs.com/package/vue-easy-notice-bar"><img src="https://img.shields.io/npm/v/vue-easy-notice-bar.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-easy-notice-bar"><img src="https://img.shields.io/npm/l/vue-easy-notice-bar.svg" alt="License"></a>
<a href="https://www.npmjs.com/package/vue-easy-notice-bar"><img src="https://img.shields.io/npm/dm/vue-easy-notice-bar.svg" alt="Downloads"></a>

### 使用指南

#### 安装

##### NPM
``` javascript
npm i vue-easy-notice-bar -S 
``` 
##### YARN
``` javascript
yarn add vue-easy-notice-bar
``` 

#### 全局插件
``` javascript
import { NoticeBar } from 'vue-easy-notice-bar'

Vue.use(NoticeBar);
```
#### 单文件引入
``` javascript
import NoticeBar from 'vue-easy-notice-bar'

export default {
  ...
  components: {
    NoticeBar
  }
  ...
}
```

### 代码演示

#### 基础用法

```html
<notice-bar
  :text="'今天天气多云转晴'"
  :bg-color="'#fff'"
  :color="'#03a9f4'"
  left-icon="http://o9kkuebr4.bkt.clouddn.com/notice-color.png"
/>
```

#### 垂直滚动模式

默认模式为水平滚动，组件NoticeBarVertical为垂直方向滚动，此组件text属性必须为数组。

``` javascript
import { NoticeBarVertical } from 'vue-easy-notice-bar'

export default {
  ...
  components: {
    NoticeBarVertical
  }
  ...
}
```
```html
<notice-bar-vertical
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  bg-color="#ffdca9"
  color="#b36f0c"/>
```
NoticeBarVertical还支持3D视觉滚动
```html
<notice-bar-vertical
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  three-d
  bg-color="#ffdca9"
  color="#b36f0c"/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 通告栏文字 | `String || Array` | `''` |
| vertical | 滚动方向是否为垂直 | `Boolean` | `false` |
| bg-img | 背景图片 URL | `String` | - |
| left-icon | 左侧图标图片 URL | `String` | - |
| color | 文本颜色 | `String` | `#fff` |
| bg-color | 滚动条背景 | `String` | `#03a9f4` |
| speed | 滚动速度(px/s) | `Number` | `50` |
| duration | 滚动时间(ms)，NoticeBarVertical下最大值为interval | `Number` | `-` |
| delay | 动画延迟时间(ms) | `Number` | `1000` |
| outview | 是否从视野外开始滚动 | `Boolean` | `false` |
| scrollable | 是否禁止动画 | `Boolean` | `true` |
| mode | 通告栏模式，可选值:right、close | `String` | `-` |
| interval | 垂直滚动的动画间隔(ms)，仅NoticeBarVertical支持 | `Number` | `3000` |
| three-d | 垂直滚动3d视觉模式，仅NoticeBarVertical支持 | `Boolean` | `false` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 点击事件回调 | - |

### TODO

- [x] 添加默认icon
- [ ] 自定义icon
- [x] 可显示右箭头
- [x] 添加关闭功能和按钮
- [x] 禁用滚动属性
- [x] 分离水平滚动和垂直滚动组件，提取mixin
- [x] 3D垂直翻转
- [ ] 手势滑动
- [ ] 鼠标悬停滚动暂停
