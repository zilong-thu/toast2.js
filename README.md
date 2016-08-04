# Toast.js

## Description

This is a toast tool written in JavaScript and CSS without any other dependencies.

## Usage

### React + Bable

首先，引入这个模块：

```
import toast from 'toast';
```

然后，如果要显示一个 alert，可以这样写：

```
// 方式1:
toast.alert('This is an alert.');

// 方式2:
toast.alert({
  title: '提示',  // title 是可选的
  text: 'This is an alert.',
  onClose: function() {
    ...
  }
})
```

confirm 对话框：

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

