/* eslint-disable */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.toast = factory();
}(this, function () {
  'use strict';

  var Util = {};
  /**
   * 合并两个对象，其中以a的属性为基础，用b的属性来覆盖a
   * 然后返回一个新的对象
   */
  Util.mergeOjbects = function(a, b) {
    var c = {};
    for (var key in a) {
      c[key] = a[key];
    }

    for (var key in b) {
      c[key] = b[key];
    }

    return c;
  };

  /**
   * 一个兼容的事件处理程序注册方法
   * @param {Object} element [DOM | BOM 对象]
   * @param {String} type    [事件类型]
   * @param {Function} handler [处理函数]
   */
  Util.addEventHandler = function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent){
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  };

  Util.removeEventHandler = function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent){
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  };

  Util.normalizeUserOption = function(option) {
    var userOption = option || {};
    if (typeof option === 'string') {
      userOption = {
        text: option
      };
    }
    return userOption;
  };

  // remove an DOM element
  Util.remove = function(element) {
    // Polyfill
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }

    element.parentNode.removeChild(element);
  };

  Util.createElement = function(htmlStr) {
    var div = document.createElement('div');
    div.innerHTML = htmlStr;
    return div.childNodes;
  };


  var GLOBAL_TOAST_ID = 'global-toast-container';
  var GLOBAL_ERROR_STACK_ID = 'global-error-stack-container';

  var defaultOption = {
    animation: true,
    duration: 2000,

    // 只有 toast.alert 或者 toast.confirm 有标题
    title: '',
    text: '',
    autoHide: true,
    onClose: null,

    // 下面两个是只有confirm对话框才支持的回调函数
    // 它们与 callback 选项是互斥的关系
    // 即，在试用 toast.confirm() 方法时，不必传入 callback 属性
    onCancel: null,
    onConfirm: null
  };

  var flagTimeout = null;


  // 模板1，长方形，没有icon，目的是显示大段文本，带有遮罩层、一个“确定”按钮。alert 所用
  var templateHTML_alert = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg">' +
      '<div class="toast-header">{{title}}</div>' +
      '<div class="body">{{text}}</div>' +
      '<div class="footer"><a data-role="close" href="javascript: void(0);">确定</a></div>' +
    '</div>';

  // 模板2，长方形，没有icon，目的是显示大段文本以进行确认，带有遮罩层、两个按钮。confirm 所用
  var templateHTML_confirm = '<div class="toast-mask"></div>' +
    '<div class="toast-content toast-msg">' +
      '<div class="toast-header">{{title}}</div>' +
      '<div class="body">{{text}}</div>' +
      '<div class="footer">' +
        '<a data-role="cancel" href="javascript: void(0);">取消</a>' +
        '<a data-role="confirm" href="javascript: void(0);">确定</a>' +
      '</div>' +
    '</div>';

  // 模板3，小长方形，没有icon，目的是显示小段文本，无遮罩层，无按钮，全局永远只有一个，会自动消失。toast 所用
  var templateHTML_toast = '<div class="toast-content toast">' +
      '<div class="body">{{text}}</div>' +
    '</div>';

  // 模板4，中等尺寸的长方形。所有的 error-box 在屏幕的右侧形成一个 error stack.
  var template_error_box = '<div class="error-box">' +
      '<div class="banner"><i class="fa fa-times-circle"></i> 出错了...</div>' +
      '<div class="body">{{text}}</div>' +
    '</div>';


  // 一个非常简易的模板引擎
  function compileTemplate(tpl, data) {
    var re = /{{([^}}]+)?}}/g;
    var match;
    while(match = re.exec(tpl)) {
      tpl = tpl.replace(match[0], data[match[1]]);
    }
    return tpl;
  }


  /**
   * 创建、初始化以及缓存 DOM 对象
   */
  var body = document.body;

  var _toast = (function() {
    var $toast = document.getElementById(GLOBAL_TOAST_ID) || document.createElement('div');

    $toast.id = GLOBAL_TOAST_ID;
    $toast.className = 'toast-container';
    $toast.style = 'display: none';
    body.appendChild($toast);

    var self = {};

    self.element = $toast;
    self.html = function(htmlStr) {
      $toast.innerHTML = htmlStr;
      return self;
    },
    self.hide = function() {
      $toast.style = 'display: none';
      return self;
    },
    self.show = function() {
      $toast.style = 'display: block';
      return self;     
    },
    self.fadeOut = function() {
      $toast.setAttribute('data-animation', 'fade-out');
      return self;
    }

    return self;
  })();

  /**
   * @param {Object} [preOpt] [Toast 对象的每个内置方法都内置一个 proOpt]
   * @param {String} [type] [type 可以为 'toast' | 'alert' | 'confirm' 之一]
   */
  function addContentToToastDiv(preOpt, userOpt, templateType) {
    templateType = templateType || 'toast';

    var opt = Util.mergeOjbects(preOpt, userOpt);

    var option = Util.mergeOjbects(defaultOption, opt);

    // 在加入新的Toast之前先清除之前的setTimeout
    if (flagTimeout) {
        clearTimeout(flagTimeout);
        flagTimeout = null;
    }

    Util.addEventHandler(_toast.element, 'click', function(e) {
      var target = (e && e.target) || window.event.srcElement;
      var role = target.getAttribute('data-role');

      if (!role) return;
      _toast.hide();
      
      switch(role) {
        case 'close':
          if (typeof option.onClose === 'function') {
            option.onClose();
            option.onClose = null;
          }
          break;
        case 'cancel':
          if (typeof option.onCancel === 'function') {
            option.onCancel();
            option.onCancel = null;
          }
          break;
        case 'confirm':
          if (typeof option.onConfirm === 'function') {
            option.onConfirm();
            option.onConfirm = null;
          }
        break;
        default: ;
      }
    });

    var TemplateEnum = {
      toast: templateHTML_toast,
      alert: templateHTML_alert,
      confirm: templateHTML_confirm
    };

    var compiled = compileTemplate(TemplateEnum[templateType], option);
    _toast.html(compiled).show();

    if (templateType === 'toast') {
      flagTimeout = setTimeout(function() {
        _toast.hide();
      }, option.duration);
    }
  }

  /**
   * @param [String] {text} 向错误栈中推送错误
   */
  function addError(text) {
    var $errorStack = document.getElementById(GLOBAL_ERROR_STACK_ID);

    if (!$errorStack) {
      $errorStack = document.createElement('div');
      $errorStack.className = 'toast-error-stack';
      $errorStack.id = GLOBAL_ERROR_STACK_ID;
      body.appendChild($errorStack);
    }

    var $errorBox = Util.createElement(compileTemplate(template_error_box, {text: text}));
    $errorStack.appendChild($errorBox[0]);
    // $errorBox[0] 现在将会变成 undefined
    var length = $errorStack.childNodes.length;
    var nowItBecomes = $errorStack.childNodes[length -1];
    setTimeout(function() {
      Util.remove(nowItBecomes);
    }, 5000);
  }


  /**
   * 最终 export 的对象
   * @type {Object}
   */
  var Toast = function(option) {
    var userOption = Util.normalizeUserOption(option);
    delete userOption.title;
    addContentToToastDiv({}, userOption);
  };

  Toast.alert = function(option) {
    var userOption = Util.normalizeUserOption(option);

    var presetOption = {
      title: '',
      text: '',
      autoHide: false,
      animation: false
    };

    addContentToToastDiv(presetOption, userOption, 'alert');
  };

  Toast.confirm = function(option) {
    var userOption = Util.normalizeUserOption(option);

    var presetOption = {
      title: '',
      text: '',
      autoHide: false,
      animation: false
    };

    addContentToToastDiv(presetOption, userOption, 'confirm');
  };


  Toast.error = function(errMsg) {
    addError(errMsg);
  }

  return Toast;
}));
