## 获取任意一个盒子到 body 的距离

```javascript
var oSon = document.querySelector('.son');

function getPosition(ele) {
    var obj = {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
    // 判断传过来的 ele 有没有【有定位的父级】
    while (ele.offsetParent) {
        obj.left += ele.offsetParent.offsetLeft;
        obj.top += ele.offsetParent.offsetTop;
        // 每次走完之后，把有定位的父级变成当前元素 ele
        ele = ele.offsetParent;
    }
    return obj;
}

var res = getPosition(oSon);

/* function getPosition(ele) {
    var obj = {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
    // 判断传过来的 ele 有没有【有定位的父级】
    while (ele = ele.offsetParent) {
        obj.left += ele.offsetLeft;
        obj.top += ele.offsetTop;
    }
    return obj;
}
var res = getPosition(oSon);
console.log(res); */
```

## offset 和 style 差异

```javascript
var box = document.querySelector('.box');
// 设置的时候用 style
// 获取的时候用 offset 系列的
box.style.width = box.offsetWidth + 100 + 'px';
```

## 拖拽

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        div {
            /* 定位一定要有 */
            position: absolute;
            top: 200px;
            left: 200px;
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
</head>

<body>
    fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf fdsf 
    <div></div>
    <script>
        var oDiv = document.querySelector('div');
        // 按下
        oDiv.onmousedown = function (e) {
            // 获取鼠标到盒子的距离：鼠标和窗口的距离（e.pageX） - 盒子到窗口的距离（oDiv.offsetLeft）
            var disX = e.pageX - this.offsetLeft;
            var disY = e.pageY - this.offsetTop;

            // 这里不要绑定到 oDiv 上，防止移动过快，离开 div 了，就触发不了了
            document.onmousemove = function (e) {
                // 用鼠标到窗口的距离（e.pageX） - 鼠标到盒子的距离（disX）
                // 得到的一个结果就应该是当前盒子的 left 或 top
                var x = e.pageX - disX;
                var y = e.pageY - disY;

                // console.log(x);
                if (x < 20) {
                    x = 0;
                    
                } else if(x > window.innerWidth - oDiv.offsetWidth - 20) { // 说明从右边超出去了
                    // 窗口的宽度 - 盒子的宽度
                    x = window.innerWidth - oDiv.offsetWidth;
                }

                if (y < 20) {
                    y = 0;
                } else if(y > window.innerHeight - oDiv.offsetHeight - 20) {
                    y = window.innerHeight - oDiv.offsetHeight;
                }

                oDiv.style.left = x + 'px';
                oDiv.style.top = y + 'px';
            };

            document.onmouseup = function () {
                // 干掉移动的事件，不然跑了
                /* document.onmousemove = null;
                document.onmouseup = null; // 建议加 */
                document.onmousemove = document.onmouseup = null;
            };

            // 按下的时候阻止默认行为
            e.preventDefault();
        };
    </script>
</body>

</html>
```

## 放大镜

遮罩的当前移动距离 / 遮罩的最大移动距离 = 大图片的当前移动距离 / 大图片的最大移动距离

## 立即执行函数

```javascript
// 两种写法
;(function(a, b) {})(1, 2);
;(function(a, b) {}(1, 2));
```

作用：能一定程度避免命名冲突

```javascript
;(function flexible(window, document) {
   // 传递 window 和 document，目的是提高代码查找效率、方便压缩混淆，例如可以把 window 压缩成 w
}(window, document));
```

```javascript
// 了解一下这种写法
var Drag = (function () {
    return {
        init: function () {
            console.log('hello world');
        }
    };
})();
Drag.init();
```