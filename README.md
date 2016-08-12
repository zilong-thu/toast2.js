# Toast.js

## Description

This is a toast tool written in JavaScript and CSS without any other dependencies.

## 说明

本组件的设计，参考了诸多类似功能的插件、组件的设计思路。在此列出，不一而足。

+ [http://eve.uedmei.com/doc](http://eve.uedmei.com/doc)
+ [https://weui.io/](https://weui.io/#/)
+ [animate.css](http://daneden.github.io/animate.css/)

## 引用方式

### React + Bable

首先，引入这个模块：

```
import toast from 'toast';
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
