<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="dist/toast.css">
  <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="./index.css">
  <link rel="icon" href="./favicon.png">
</head>
<body>
  <header>
    <div class="jumbotron">
      <div class="container">
        <h1>
          <img class="logo" src="./favicon.png" />
          {{title}}
        </h1>
      </div>
    </div>
  </header>
  <div class="container">
    <p>
      <i class="fa fa-user" aria-hidden="true"></i> <a href="https://github.com/zilong-thu/" target="_blank">zilong-thu</a>
    </p>
    <p>
      <i class="fa fa-tag" aria-hidden="true"></i> 
      当前版本：<span class="label label-primary">{{app.version}}</span>
    </p>
    <p>最近更新于 {{moment().format('YYYY-MM-DD HH:mm:ss')}}</p>

    {% include "./body.html" %}
  <div>
</body>
</html>

<script type="text/javascript" src="dist/toast.js"></script>

<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>

{% include "./ga.html" %}

<script type="text/javascript">
  $('button[name]').click(function(event) {
    switch($(this).attr('name')) {
      case 'alert':
        toast.alert('Hello World.');
        break;
      case 'alert-title':
        toast.alert({
          title: '提示',
          text: '这是一个带有标题的警告框。'
        });
      break;

      case 'toast':
        toast('this is a toast.');
        break;

      case 'toast-long':
        toast('this is a toast with long long long long long long long long long text......');
        break;

      case 'toast-success':
        toast.success('操作成功');
        break;

      case 'toast-loading':
        toast.loading();
        break;

      case 'confirm':
        toast.confirm({
          title: '提示',
          text: '请问你真的要退出吗？',
          onConfirm: function() {
            console.log('你点击了“确定”按钮');
          },
          onCancel: function() {
            console.log('你点击了“取消”按钮');
          }
        });
        break;

      case 'confirm-btn-text': {
        toast.confirm({
          title: '提示',
          text: '确定要进行修改吗？修改后，新的价格方案会立即生效。',
          sureBtnText: '确定修改',
          cancelBtnText: '取消',
          onConfirm: function() {
            console.log('你点击了“确定”按钮');
          },
          onCancel: function() {
            console.log('你点击了“取消”按钮');
          }
        });
        break;
      }

      case 'alert-success':
        toast.alert({
          title: '操作成功',
          text: '您可以在“我的”页面看到刚才的订单。',
          type: 'success',
          onClose: function() {
            console.log('success dialog is closed.');
          }
        });
        break;

      case 'alert-error':
        toast.alert({
          title: '操作失败',
          type: 'error',
          onClose: function() {
            console.log('error dialog is closed.');
          }
        });
        break;

      case 'message':
        toast.message({
          text: '实现一个具有消息提示、成功提示、错误提示等功能的插件...',
          autoHide: false
        });
        break;
      case 'message-danger':
        toast.danger({
          text: 'It seems something is wrong...',
          autoHide: false
        });
        break;

      case 'message-info':
        toast.info({
          text: 'It seems something is wrong... And this is a message box with a very long text.......And lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnñg non-breaking word.',
          autoHide: false
        });
        break;

      case 'message-success': {
        toast.message({
          text: '请求成功！数据已经处理完毕。',
          type: 'success',
          autoHide: false
        });
        break;
      }

      case 'message-without-closebtn':
        toast.message({
          text: 'This example shows a message box without close button. And this is a message box with a very long text.......',
          autoHide: true,
          showCloseBtn: false
        });
        break;

      case 'message-autohide':
        toast.danger({
          text: 'This example shows a message box without close button. And this is a message box with a very long text........ And lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnñg non-breaking word.',
          autoHide: true
        });
        break;

      case 'confirm-and-toast':
        toast.confirm({
          text: '点击确定吧~~',
          onConfirm: function() {
            toast('谢谢！');
          }
        });
        break;
      case 'alert-and-toast':
        toast.alert({
          text: '点击确定吧~~',
          onClose: function() {
            toast('谢谢！');
          }
        });
        break;
      default: ;
    }
  });
</script>

