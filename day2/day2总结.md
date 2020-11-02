## 关于 class 操作（复习）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    .one {
        width: 100px;
        border: 1px solid red;
    }
    .two {
        height: 100px;
    }
    .pink {
        background-color:pink;
    }
    </style>
</head>

<body>
    <button>变粉</button>
    <div class="one two pink1"></div>
    <script>
    var oBtn = document.querySelector('button');
    var oDiv = document.querySelector('div');

    oBtn.onclick = function() {
        // 会直接覆盖之前的 class
        // oDiv.className = 'pink';
        // oDiv.className = 'one two pink'; // 不太灵活

        // 会越来越多，存在重复 pink class
        // oDiv.className = oDiv.className + ' pink';

        /* if(oDiv.className.includes('pink')) {
            // 进来说明之前已经包含了 pink
        } else {
            // 走到这里才是不包含
            oDiv.className = oDiv.className + ' pink';
        } */

        /* if(!oDiv.className.includes('pink')) {
            // 走到这里才是不包含
            oDiv.className = oDiv.className + ' pink';
        } */

        // 如果说之前的 class 中含有 pink字符串，就出现 Bug 了，加不上了
        /* if(!oDiv.className.includes('pink')) {
            // 走到这里才是不包含
            oDiv.className = oDiv.className + ' pink';
        } */

        // 'one two pink1' => ['one', 'two', 'pink1']
        /* if(!oDiv.className.split(' ').includes('pink')) {
            // 走到这里才是不包含
            oDiv.className = oDiv.className + ' pink';
        } */

        // add 是JS 内置的，好处是如果说之前存在 pink，就不会重复添加
        // oDiv.classList.add('pink');
        // oDiv.classList.remove('pink1');
        // 如果说之前有 pink，就删掉 pink，如果说没有 pink，就添加 pink
        oDiv.classList.toggle('pink');
    };
    </script>
</body>

</html>
```

## 排他操作的注意点

```javascript
var btns = document.getElementsByTagName('button');

for (var i = 0; i < btns.length; i++) {
    // 给每一个按钮都要绑，用的是 btns[i]，而不是 btn
    btns[i].onclick = function() {
        // (1) 先干掉所有的
        for (var k = 0; k < btns.length; k++) {
            btns[k].style.backgroundColor = '';
        }
        // (2) 再操作自己的
        // 这里务必用 this
        this.style.backgroundColor = 'pink';
        // 这里面的代码什么时候执行的？点击的时候执行的，点击的时候 for 循环已经走完了
        // i 已经变成了 5，其实 btns 根本就没有第 5 个索引
        // btns[i].style.backgroundColor = 'pink';
    }
}
```

## 表格隔行变色的两种写法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        table {
            width: 800px;
            margin: 100px auto;
            text-align: center;
            border-collapse: collapse;
            font-size: 14px;
        }

        thead tr {
            height: 30px;
            background-color: skyblue;
        }

        tbody tr {
            height: 30px;
        }

        tbody td {
            border-bottom: 1px solid #d7d7d7;
            font-size: 12px;
            color: blue;
        }

        .bg {
            background-color: pink;
        }
    </style>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>代码</th>
                <th>名称</th>
                <th>最新公布净值</th>
                <th>累计净值</th>
                <th>前单位净值</th>
                <th>净值增长率</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
            <tr>
                <td>003526</td>
                <td>农银金穗3个月定期开放债券</td>
                <td>1.075</td>
                <td>1.079</td>
                <td>1.074</td>
                <td>+0.047%</td>
            </tr>
        </tbody>
    </table>
    <script>
        // 1.获取元素 获取的是 tbody 里面所有的行
        // var trs = document.querySelector('tbody').querySelectorAll('tr');
        var trs = document.querySelectorAll('tbody tr');
        // 2. 利用循环绑定注册事件
        /* for (var i = 0; i < trs.length; i++) {
            // 3. 鼠标经过事件 onmouseover
            trs[i].onmouseover = function () {
                // console.log(11);
                this.className = 'bg';
                // this.style.background = 'red';
            }
            // 4. 鼠标离开事件 onmouseout
            trs[i].onmouseout = function () {
                this.className = '';
                // this.style.background = '';
            }
        } */

        for (var i = 0; i < trs.length; i++) {
            trs[i].onmouseover = function () {
                // 1. 干掉所有的
                for (var k = 0; k < trs.length; k++) {
                    trs[k].style.background = '';
                }
                // 2. 操作自己的
                this.style.background = 'pink';
            }
        }
    </script>
</body>

</html>
```

## 全选/反选的两种写法

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .wrap {
            width: 300px;
            margin: 100px auto 0;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #c0c0c0;
            width: 300px;
        }

        th,
        td {
            border: 1px solid #d0d0d0;
            color: #404060;
            padding: 10px;
        }

        th {
            background-color: #09c;
            font: bold 16px "微软雅黑";
            color: #fff;
        }

        td {
            font: 14px "微软雅黑";
        }

        tbody tr {
            background-color: #f0f0f0;
        }

        tbody tr:hover {
            cursor: pointer;
            background-color: #fafafa;
        }

        /* input:checked{
            
        } */
    </style>

</head>

<body>
    <div class="wrap">
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" id="j_cbAll" />
                    </th>
                    <th>商品</th>
                    <th>价钱</th>
                </tr>
            </thead>
            <tbody id="j_tb">
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPhone8</td>
                    <td>8000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPad Pro</td>
                    <td>5000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>iPad Air</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>Apple Watch</td>
                    <td>2000</td>
                </tr>

            </tbody>
        </table>
    </div>
    <script>
        // 1. 全选和取消全选做法：  让下面所有复选框的checked属性（选中状态） 跟随 全选按钮即可
        // 获取元素
        var j_cbAll = document.getElementById('j_cbAll'); // 全选按钮
        // var j_tbs = document.getElementById('j_tb').getElementsByTagName('input'); // 下面所有的复选框
        var j_tbs = document.querySelectorAll('#j_tb input'); // 下面所有的复选框

        // 找 #j_tb 里面所有选中的 input 框
        /* var aChecked = document.querySelectorAll('#j_tb input:checked'); // 下面所有的复选框
        console.log(j_tbs.length);
        console.log(aChecked.length); */
        // 根据全选控制单选
        j_cbAll.onclick = function () {
            // this.checked 它可以得到当前复选框的选中状态如果是true 就是选中，如果是false 就是未选中
            // 到底是 true 还是 false，要根据全选的状态来判断
            // console.log(this.checked);
            for (var i = 0; i < j_tbs.length; i++) {
                j_tbs[i].checked = this.checked;
            }
        }

        // 根据单选控制全选
        // 2. 下面复选框需要全部选中， 上面全选才能选中做法： 给下面所有复选框绑定点击事件，每次点击，都要循环查看下面所有的复选框是否有没选中的，如果有一个没选中的， 上面全选就不选中。
        /* for (var i = 0; i < j_tbs.length; i++) {
            j_tbs[i].onclick = function () {
                var flag = true;
                // 每次点击下面的复选框都要循环检查者4个小按钮是否全被选中
                for (var i = 0; i < j_tbs.length; i++) {
                    // 如果说点击单选按钮
                    // 进行循环的时候，我发下竟然有一个没选中，全选的状态就可以确定，全选就可以取消了
                    // j_tbs[i].checked // 如果说这一堆是 true，说明选中
                    // !j_tbs[i].checked // 加了取反之后，如果说这一堆还是 true，说明没选中
                    if (!j_tbs[i].checked) {
                        flag = false;
                        break; // 退出for循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
                    }
                }
                // j_cbAll 是全选按钮
                j_cbAll.checked = flag;
            }
        } */

        for (var i = 0; i < j_tbs.length; i++) {
            // 给每一个单选按钮绑定点击事件
            j_tbs[i].onclick = function () {
                // 如果所有【选中单选的数量】 等于 【所有单选的数量】，说明全选可以激活了
                // 这个代码要写在点击事件的里面，每次点击都要重新获取所有选中的长度
                /* var aChecked = document.querySelectorAll('#j_tb input:checked'); // 下面所有的复选框
                
                if(aChecked.length === j_tbs.length) {
                    j_cbAll.checked = true;
                } else {
                    // 否则全选的状态应该取消
                    j_cbAll.checked = false;
                } */
                j_cbAll.checked = document.querySelectorAll('#j_tb input:checked').length === j_tbs.length;
            }
        }
    </script>
</body>

</html>
```

## 关于属性操作

**固有属性找“点”，无论是获取还是设置**

```javascript
oImg.src // 获取
oImg.src = 'test.jpg'; // 设置
```

**自定义属性的操作**

获取

```javascript
// 属性名
oDiv.getAttribute('age');
```

设置

```javascript
// 属性名、属性值
div.setAttribute('myname', 'ifer');
```

删除

```javascript
// 属性名
div.removeAttribute('aaa');
```

**H5 新增**

```html
<div data-index="666"></div>
<script>
oDiv.getAttribute('data-index'); // '666'
oDiv.dataset.index; // '666'
</script>
```

## 节点操作

- nodeName

- nodeValue

- nodeType，1 代表元素节点，2 代表属性节点，3 就代表文本节点

```javascript
var oDiv = document.querySelector('div');
console.log(oDiv.nodeName); // 'DIV'，注意是大写的
console.log(oDiv.nodeType); // 节点类型，1
console.log(oDiv.nodeValue); // null
```

## 节点关系

- ==**parentNode**==，找亲父亲，掌握

- childNodes，找子节点（包括元素和文本，了解）

- ==**children**==，找子**元素**节点

- `oDiv.firstChild`，找 div 里面的第一个节点（元素或文本节点，了解）

- `oDiv.firstElementChild`，找 div 里面的第一个元素节点（IE9 及以上才支持，了解）

- ==**oDiv.children[0]**==，找 div 里面第一个元素节点，务必掌握

- ==**oDiv.children[oDiv.children.length-1**]==，找 div 里面最后一个元素节点，务必掌握

- `oDiv.nextSibling`，找 div 的下一个兄弟（元素或文本）

- `oDiv.nextElementSibling`，找 div 的下一个元素节点

## 创建和添加节点

```javascript
// Step1: 创建节点
var oLi = document.createElement('li');
// Step2: 添加节点
// 把创建好的 oLi 添加到 oUl 内容的最后
oUl.appendChild(oLi);
```

- 注意点 1，本质上来说和平常通过 document.querySelector('li') 选择到的没有本质区别

```html
<ul>
    <li>hello world</li>
</ul>
<script>
// 选择元素
var oUl = document.querySelector('ul');
// 创建元素
var oLi = document.createElement('li');
// 现在通过代码的方式创建的 oLi，本质上来说和平常通过 document.querySelector('li') 选择到的没有本质区别
oLi.innerHTML = '我是新创建的'; // 给新创建的li添加内容
oLi.onclick = function() { // 给新创建的 li 绑定事件
    console.log('hello world');
};
// 父亲.appendChild(元素)
oUl.appendChild(oLi);
</script>
```

- 注意点 2，appendChild/insertBefore 实际上来说是一个“剪切”的操作

```html
<ul>
    <li>hello world</li>
    <li id="ngls">尼古拉斯</li>
    <li>testabc</li>
</ul>
<script>
// 选择元素
var oUl = document.querySelector('ul');
// 选择页面上已经存在的元素，也可以进行添加
var oLi = document.querySelector('#ngls');
// 父亲.appendChild(元素)
// appendChild 实际上来说是一个“剪切”的操作
oUl.appendChild(oLi);
</script>
```

- insertBefore

```html
<ul>
    <li>hello world</li>
    <li id="ngls">尼古拉斯</li>
    <li>testabc</li>
</ul>
<script>
// 选择元素
var oUl = document.querySelector('ul');
/* // 选择页面上已经存在的元素，也可以进行添加
var oLi = document.querySelector('#ngls');
// 父亲.insertBefore(元素，添加到谁前面)
oUl.insertBefore(oLi, oUl.children[0]); */

var oLi = document.createElement('li');
oLi.innerHTML = '怼一点内容';
// 父亲.insertBefore(元素，添加到谁前面)
oUl.insertBefore(oLi, oUl.children[0]);
</script>
```