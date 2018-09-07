### 基本用法

<notice-bar
    :text="[
      '重启，可以解决电脑百分之七十的问题。',
      '重装系统，可以解决百分之八十的问题。',
      '换个电脑，可以解决百分之九十的问题。',
      '解决掉提出bug的人,可以解决百分之一百的问题。'
    ]"
    :bg-color="'#03a9f4'"
    :color="'#fff'"/>

```shell
import { NoticeBar } from 'vue-easy-notice-bar'

Vue.use(NoticeBar)
```

```html
<notice-bar
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  :bg-color="'#fff'"
  :color="'#03a9f4'"/>
```

### 垂直滚动
<notice-bar-vertical
    :text="[
      '重启，可以解决电脑百分之七十的问题。',
      '重装系统，可以解决百分之八十的问题。',
      '换个电脑，可以解决百分之九十的问题。',
      '解决掉提出bug的人,可以解决百分之一百的问题。'
    ]"
    bg-color="#e91e63"
    color="#fff"/>

```shell
import { NoticeBarVertical } from 'vue-easy-notice-bar'

Vue.use(NoticeBarVertical)
```
```html
<notice-bar-vertical
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  :bg-color="'#e91e63'"
  :color="'#fff'"/>
```

### 3D垂直滚动
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
```html
<notice-bar-vertical
  :text="[
    '重启，可以解决电脑百分之七十的问题。',
    '重装系统，可以解决百分之八十的问题。',
    '换个电脑，可以解决百分之九十的问题。',
    '解决掉提出bug的人,可以解决百分之一百的问题。'
  ]"
  three-d
  :bg-color="'#ffdca9'"
  :color="'#b36f0c'"/>
```

### 通告栏模式
<notice-bar
    :text="'今天天气多云转晴'"
    mode="right"
    bg-color="#009688"
    :delay="0"
    :outview="true"
    color="#fff"/>
```html
<notice-bar
  :text="'今天天气多云转晴'"
  mode="right"
  bg-color="#009688"
  :delay="0"
  :outview="true"
  color="#fff"/>
```
<notice-bar
    :text="'今天天气多云转晴'"
    mode="close"
    bg-color="#ffdca9"
    color="#b36f0c"/>
```html
<notice-bar
  :text="'今天天气多云转晴'"
  mode="close"
  bg-color="#ffdca9"
  color="#b36f0c"/>
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| text | 通告栏文字 | `String || Array` | `''` |
| vertical | 滚动方向是否为垂直 | `Boolean` | `false` |
| bg-img | 背景图片 URL | `String` | `-` |
| left-icon | 左侧图标图片 URL | `String` | `-` |
| color | 文本颜色 | `String` | `#fff` |
| bg-color | 滚动条背景 | `String` | `#03a9f4` |
| speed | 滚动速度(px/s) | `Number` | `50` |
| duration | 滚动时间(ms) | `Number` | `-` |
| delay | 动画延迟时间(ms) | `Number` | `1000` |
| outview | 是否从视野外开始滚动 | `Boolean` | `false` |
| scrollable | 是否禁止动画 | `Boolean` | `true` |
| mode | 通告栏模式，可选值:right、close | `String` | `-` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| click | 点击事件回调 | `-` |