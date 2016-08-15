<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" type="text/css" href="src/toast.css">
  <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
</head>
<body>
  <div class="container">
    <div class="jumbotron">
      <h1>{{title}}</h1>
    </div>
    {% include "body.html" %}
  <div>
</body>
</html>

<script type="text/javascript" src="src/toast.js"></script>
<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript">
  $('button[name]').click(function(event) {
    switch($(this).attr('name')) {
      case 'alert':
        toast.alert('hello');
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
        })
        break;

      case 'success':
        toast.success('hello');
        break;

      case 'postError':
        toast.postError({
          text: 'hello',
          autoHide: false
        });
        break;
      default: ;
    }
  });
</script>
