## 简介

本组件使用 JavaScript 和 CSS 写成。目标有如下若干：

+ 实现一个具有消息提示、成功提示、错误提示等功能的插件
+ 使用时，不依赖任何其他模块（图标也都是纯CSS实现的~~）
+ 浏览器兼容性：IE >= 9 ，Android >= 4.3，ios >= 6，其他浏览器 last 3 version
+ 响应式设计


本组件的设计，参考了诸多类似功能的插件、组件的设计思路。在此列出，不一而足。

+ [https://weui.io/](https://weui.io/#/)，参考了部分基本的样式设计方案
+ [http://eve.uedmei.com/doc](http://eve.uedmei.com/doc)，参考了部分动画解决方案
+ [animate.css](http://daneden.github.io/animate.css/)，参考了部分动画的解决方案
+ [ICONO](http://saeedalipoor.github.io/icono/)，参考其中若干图标的纯CSS解决方案，替换掉最开始由 font-awesome 实现的图标

## Demo地址

[http://borninsummer.com/toast2.js/](http://borninsummer.com/toast2.js/)

## 使用方式

**自0.1.6版本及之后，不再依赖 font-awesome 字体了**

### 直接引用

```
<link rel="stylesheet" type="text/css" href="toast.css">
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

<button class="btn btn-primary" name="alert">toast.alert('hello')</button>

带有 title 的 alert：

<button class="btn btn-primary" name="alert-title">toast.alert('hello')</button>

### toast something

```
toast('this is a toast.');
```

任何时刻，toast 最多只能有一个。而且总是会自动消失。

<button class="btn btn-primary" name="toast">toast.toast('hello')</button>

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

<button class="btn btn-primary" name="confirm">toast.confirm('hello')</button>


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

<button class="btn btn-primary" name="success">toast.success('hello')</button>


### error 提示

```
toast.error({
  text: '操作失败！',
  onClose: function() {
    // 点击“确定”后的回调函数
    ...
  }
})
```

<button class="btn btn-primary" name="error">toast.error('操作失败！')</button>


### postError

```
toast.postError({
  title: '提示',
  text: 'server error...',
  autoHide: true,
  duration: 5000
})
```

<button class="btn btn-primary" name="postError">toast.postError('hello')</button>


### 组合使用

先调用 confirm 方法，在点击确定后，立即用 toast('text') 提示点击了“确定”按钮。

```
toast.confirm({
  text: '点击确定吧~~',
  onConfirm: function() {
    toast('谢谢！');
  }
});
```

<button class="btn btn-primary" name="confirm-and-toast">组合使用示例: confirm + toast</button>

<br />

---------------------------


