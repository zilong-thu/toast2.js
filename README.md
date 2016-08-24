## 简介

本组件使用 JavaScript 和 CSS 写成。目标有如下若干：

+ 实现一个具有消息提示、成功提示、错误提示等功能的插件
+ 使用时，不依赖任何其他模块（目前还依赖于 font-awesome）
+ 浏览器兼容性：IE >= 9 ，Android >= 4.3，ios >= 6，其他浏览器 last 3 version
+ 响应式设计


本组件的设计，参考了诸多类似功能的插件、组件的设计思路。在此列出，不一而足。

+ [http://eve.uedmei.com/doc](http://eve.uedmei.com/doc)
+ [https://weui.io/](https://weui.io/#/)
+ [animate.css](http://daneden.github.io/animate.css/)


## 使用方式

目前是依赖 font-awesome 字体的。比较适合已经使用了 font-awesome 字体的项目。

### 直接引用

```
<link rel="stylesheet" type="text/css" href="toast.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
```

```
<script type="text/javascript" src="toast.js"></script>
```

toast.js 会将 toast 注册到 window 上面，成为全局变量。

### React + Bable

首先，引入这个模块：

```
import toast from 'toast';
```

然后，还需要引用一下CSS文件，如果使用了诸如 less、sass、stylus或者postcss 等编译工具，可以像这样引用（以less为例）：

```
@import "node_modules/toast2/dist/toast.css";
```

## 示例代码

### alert

如果要显示一个 alert，可以这样写：

```
// 方式1:
toast.alert('This is an alert.', () => {
  // do something after closing
});

// 方式2:
toast.alert({
  title: '提示',  // title 是可选的
  text: 'This is an alert.',
  onClose: function() {
    ...
  }
});
```

<button class="btn btn-success" name="alert">toast.alert('hello')</button>

### toast something

```
toast('this is a toast.');
```

任何时刻，toast 最多只能有一个。而且总是会自动消失。

<button class="btn btn-success" name="toast">toast.toast('hello')</button>

### confirm 对话框：

```
toast.confirm({
  title: '提示',  // title 是可选的
  text: '请问你真的要退出吗？',
  onConfirm: function() {
    // 点击“确定”后的回调函数
    ...
  },
  onCancel: function() {
    // 点击“取消”后的回调函数
    ...
  }
})
```

<button class="btn btn-success" name="confirm">toast.confirm('hello')</button>


### success 提示

```
toast.success({
  text: '操作成功！',
  onClose: function() {
    // 点击“确定”后的回调函数
    ...
  }
})
```

<button class="btn btn-success" name="success">toast.success('hello')</button>

### postError

```
toast.postError({
  title: '提示',
  text: 'server error...',
  autoHide: true,
  duration: 5000
})
```

<button class="btn btn-success" name="postError">toast.postError('hello')</button>


### 组合使用

先调用 confirm 方法，在点击确定后，立即用 toast('text') 提示点击了“确定”按钮。

```
```

<button class="btn btn-success" name="confirm-and-toast">组合使用示例: confirm + toast</button>


<button class="btn btn-success" name="alert-and-toast">组合使用示例: alert + toast</button>

<br />
<br />
<br />
