## 删除留言的几种写法

**第一种写法，每次点击的时候，选择所有元素，重新绑定事件，缺点是存在浪费，性能低**

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>

        * {

            margin: 0;
            padding: 0;
        }

        body {
            padding: 100px;
        }

        textarea {
            width: 200px;
            height: 100px;
            border: 1px solid pink;
            outline: none;
            resize: none;
        }

        ul {
            margin-top: 50px;
        }

        li {
            width: 300px;
            padding: 5px;
            background-color: rgb(245, 209, 243);
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }

        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul></ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                // return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value + '<a href="javascript:;">删除</a>';

                // ul.appendChild(li);
                ul.insertBefore(li, ul.children[0]);
                // (3) 删除元素 删除的是当前链接的li  它的父亲
                var as = document.querySelectorAll('a');
                for (var i = 0; i < as.length; i++) {
                    as[i].onclick = function() {
                        // this
                        ul.removeChild(this.parentNode);
                    };
                }
            }
        };
    </script>
</body>

</html>
```

**第二种写法，每次点击的时候，选择第一个删除按钮绑定点击事件**

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>

        * {

            margin: 0;
            padding: 0;
        }

        body {
            padding: 100px;
        }

        textarea {
            width: 200px;
            height: 100px;
            border: 1px solid pink;
            outline: none;
            resize: none;
        }

        ul {
            margin-top: 50px;
        }

        li {
            width: 300px;
            padding: 5px;
            background-color: rgb(245, 209, 243);
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }

        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul></ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                // return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value + '<a href="javascript:;">删除</a>';

                // ul.appendChild(li);
                ul.insertBefore(li, ul.children[0]);
                // (3) 删除元素 删除的是当前链接的li  它的父亲
                // 其实来说，每次绑定事件，只需要给第一个元素绑定就好了，因为前面的都已经注册过事件了
                var oA = document.querySelector('a');
                oA.onclick = function() {
                    // this
                    ul.removeChild(this.parentNode);
                };
            }
        };
    </script>
</body>

</html>
```

**写法 3，在创建 a 标签的时候提前就绑定好点击事件**

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>

        * {

            margin: 0;
            padding: 0;
        }

        body {
            padding: 100px;
        }

        textarea {
            width: 200px;
            height: 100px;
            border: 1px solid pink;
            outline: none;
            resize: none;
        }

        ul {
            margin-top: 50px;
        }

        li {
            width: 300px;
            padding: 5px;
            background-color: rgb(245, 209, 243);
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }

        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul></ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                // return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value;

                // 创建一个 a 标签
                var oA = document.createElement('a');
                oA.innerHTML = '删除';
                oA.href = 'javascript:;';
                // 直接在创建 a 的时候就提前绑定好点击事件
                oA.onclick = function() {
                    ul.removeChild(this.parentNode);
                };

                // 把这个 a 标签添加到 li 的内容的最前面
                li.appendChild(oA);

                // ul.appendChild(li);
                ul.insertBefore(li, ul.children[0]);
            }
        };
    </script>
</body>

</html>
```

写法 4，事件委托，完美！

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>

        * {

            margin: 0;
            padding: 0;
        }

        body {
            padding: 100px;
        }

        textarea {
            width: 200px;
            height: 100px;
            border: 1px solid pink;
            outline: none;
            resize: none;
        }

        ul {
            margin-top: 50px;
        }

        li {
            width: 300px;
            padding: 5px;
            background-color: rgb(245, 209, 243);
            color: red;
            font-size: 14px;
            margin: 15px 0;
        }

        li a {
            float: right;
        }
    </style>
</head>

<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul>
        <li>默认留言<a href="javascript:;">删除</a></li>
    </ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                // return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value + '<a href="javascript:;">删除</a>';

                ul.insertBefore(li, ul.children[0]);
            }
        };

        ul.onclick = function(e) {
            if (e.target.tagName === 'A') {
                e.target.parentNode.remove();
            }
        };
    </script>
</body>

</html>
```

## createElement 和 innerHTML

==最不推荐的方式==

``` javascript
var d1 = +new Date();

var str = '';
for (var i = 0; i < 1000; i++) {
    // 这里之所以慢，慢在每次都要去 document.body 里面重新获取！
    document.body.innerHTML +=
        '<div style="width:100px; height:2px; border:1px solid blue;"></div>';
}
var d2 = +new Date(); // 1000ms
console.log(d2 - d1);
```

解决方法 1，在外面准备一个空的字符串，每次循环的时候进行拼接，最后统一添加

``` javascript
var d1 = +new Date();
var str = '';
for (var i = 0; i < 1000; i++) {
    str += '<div style="width:100px; height:2px; border:1px solid blue;"></div>';
}
// str 已经拼接好了 1000 个div，最后我在统一怼到 body 里面
document.body.innerHTML = str;
var d2 = +new Date(); // 2ms
console.log(d2 - d1);
```

解决方法 2，外面建立一个空数组，每次循环的时候往数组里面添加元素，最后把数组转成字符串再给 body

``` javascript
var d1 = +new Date();
var arr = [];
for (var i = 0; i < 1000; i++) {
    arr.push(
        '<div style="width:100px; height:2px; border:1px solid blue;"></div>'
    );
}
document.body.innerHTML = arr.join('');
var d2 = +new Date();
console.log(d2 - d1); // 2ms
```

解决方法 3，通过 createElement，更灵活（可以直接给创建出来的 div 添加样式，绑定事件，...）

``` javascript
var d1 = +new Date();
for (var i = 0; i < 1000; i++) {
    var div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '2px';
    div.style.border = '1px solid blue';
    document.body.appendChild(div);
}
var d2 = +new Date(); // 8ms
console.log(d2 - d1);
```

解决方法 4：当数据量很大的时候，用文档碎片可以发挥作用，尤其在低版本的 IE 下

``` javascript
var d1 = +new Date();
// 准备好一个“篮子”，“文档碎片”
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    // 每次把东西装到篮子里面
    var div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '2px';
    div.style.border = '1px solid blue';
    // 每次往“篮子”里面装
    frag.appendChild(div);
}
// 最后把篮子里面装好的统一添加
document.body.appendChild(frag);
var d2 = +new Date(); // 8ms
console.log(d2 - d1);
```

统计时间的另一种方式

``` javascript
console.time('耗时：');
// 准备好一个“篮子”，“文档碎片”
var frag = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
    // 每次把东西装到篮子里面
    var div = document.createElement('div');
    /* div.style.width = '100px';
      div.style.height = '2px';
      div.style.border = '1px solid blue'; */
    div.style.cssText = 'width: 100px; height: 2px; border: 1px solid blue;';
    frag.appendChild(div);
}
// 最后把篮子里面装好的统一添加
document.body.appendChild(frag);
console.timeEnd('耗时：');
```

## 绑定事件

传统形式：给同一元素绑定相同的事件，执行不同的事件处理程序，后面的会覆盖前面的

``` javascript
oBtn.onclick = function() {};
oBtn.onclick = function() {
    // 事件处理程序
    this.onclick = null;
};
```

事件监听：给同一元素绑定相同的事件，**执行不同的事件处理程序**，两者都会生效

``` javascript
// 下面这种情况只会执行一次，因为是相同的事件处理程序
function fn() {
    alert(22);
}
console.log(fn === fn); // true
btns[1].addEventListener('click', fn);
btns[1].addEventListener('click', fn);
```

``` javascript
// 事件解绑：记得把事件处理程序提取出去
function fn() {
    alert(22);
}
btns[1].addEventListener('click', fn);
btns[1].removeEventListener('click', fn);
```

* 了解兼容性处理的套路

``` javascript
// 判断对象下面是否存在某属性，存在就用此属性，否则用其他方式或者不做操作
// 给谁绑定事件、绑定什么事件、事件处理程序
function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, fn);
    } else {
        ele['on' + type] = fn;
    }
}

var oBtn = document.querySelector('button');
addEvent(oBtn, 'click', function() {
    console.log(1);
});
addEvent(oBtn, 'click', function() {
    console.log(2);
});
```

## 事件流的三个阶段

事件捕获、目标阶段、事件冒泡

``` javascript
// true 代表捕获，默认是 false 代表冒泡
oDiv.addEventListener('click', fn, true);
```

## 事件对象下属性和方法

* e.target 和 this，e.target 谁出发就是谁（点击谁就是谁），this 就是谁绑定就是谁（绑定事件的那个元素）

* e.preventDefault()，阻止默认行为

``` javascript
var oA = document.querySelector('a');
oA.onclick = function(e) {
    // 可以阻止 a 标签的默认跳转行为
    // e.preventDefault();
    return false; // return 后面不要再写其他代码了，写了也不会执行
};
```

``` javascript
var oA = document.querySelector('a');
oA.addEventListener('click', function(e) {
    // 如果说是通过事件监听的形式绑定的，阻止默认行为必须通过 e.preventDefault()，return false 就没有用了
    e.preventDefault();
});
```

* 阻止冒泡，e.stopPropagation(); 

## 事件委托

是什么：把平常给每一个子元素绑定的事件，统一绑定到父级上

原理：冒泡

好处：性能高、对新增的元素同样具有事件绑定效果

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
</head>

<body>
    <button>增加</button>
    <ul>
        <li>知否知否，点我应有弹框在手！</li>
        <li>知否知否，点我应有弹框在手！</li>
    </ul>
    <script>
        /* var oUl = document.querySelector('ul');
        var aLi = document.querySelectorAll('ul li');
        var oBtn = document.querySelector('button');
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].onclick = function () {
                console.log(111);
            };
        }

        // 点击按钮每次往 ul 里面增加 li
        // 后续增加的 li 不具备事件效果了
        oBtn.onclick = function() {
            var oLi = document.createElement('li');
            oLi.innerHTML = Math.random();
            oUl.appendChild(oLi);
        }; */

        // 解决方案1
        /* var oUl = document.querySelector('ul');
          var oBtn = document.querySelector('button');
          function bindEv() {
              var aLi = document.querySelectorAll('ul li');
              for (var i = 0; i < aLi.length; i++) {
                  aLi[i].onclick = function () {
                      console.log(111);
                  };
              }
          }
          bindEv();

          // 点击按钮每次往 ul 里面增加 li
          // 后续增加的 li 不具备事件效果了
          oBtn.onclick = function () {
              var oLi = document.createElement('li');
              oLi.innerHTML = Math.random();
              oUl.appendChild(oLi);

              bindEv();
          }; */
        var oUl = document.querySelector('ul');
        var oBtn = document.querySelector('button');

        // 解决方案2：用事件委托统一绑定到父亲上
        oUl.onclick = function(e) {
            // console.log(e.target.tagName) // 标签名
            // 目的是点击 li 的时候才希望触发，如果不做判断，点击 ul 的时候也会触发
            // 防止点击 ul 的时候也触发
            if (e.target.tagName === 'LI') {
                console.log(111);
            }
        };
        oBtn.onclick = function() {
            var oLi = document.createElement('li');
            oLi.innerHTML = Math.random();
            oUl.appendChild(oLi);
        };
    </script>
</body>

</html>
```
