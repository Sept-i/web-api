## 1. 鼠标经过大盒子的时候显示隐藏左右箭头

```javascript
// 1. 获取元素
var arrow_l = document.querySelector('.arrow-l');
var arrow_r = document.querySelector('.arrow-r');
var focus = document.querySelector('.focus');
// 2. 鼠标经过focus 就显示隐藏左右按钮
focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
});
focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
});
```

## 2. 根据大图的数量动态生成小圆圈

```javascript
var ul = focus.querySelector('ul');
var ol = focus.querySelector('.circle');
for (var i = 0; i < ul.children.length; i++) {
    // 创建一个小li 
    var li = document.createElement('li');
    // 把小li插入到ol 里面
    ol.appendChild(li);
}
// 默认第一个高亮
ol.children[0].className = 'current';
```

## 3. 点击小圆圈做了两件事情

### 3.1 干掉其他，高亮自己

```javascript
var ul = focus.querySelector('ul');
var ol = focus.querySelector('.circle');
for (var i = 0; i < ul.children.length; i++) {
    // 创建一个小li 
    var li = document.createElement('li');
    // 把小li插入到ol 里面
    ol.appendChild(li);

    li.addEventListener('click', function () {
        // 干掉所有人 把所有的小li 清除 current 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下我自己  当前的小li 设置current 类名
        this.className = 'current';
    });
}
// 默认第一个高亮
ol.children[0].className = 'current';
```

### 3.2 移动 ul 到对应的位置

```javascript
var ul = focus.querySelector('ul');
var ol = focus.querySelector('.circle');
for (var i = 0; i < ul.children.length; i++) {
    // 创建一个小li 
    var li = document.createElement('li');
    // 加索引号
    // li.setAttribute('index', i);
    li.index = i; // 是对象就可以通过点去加属性和方法
    // 把小li插入到ol 里面
    ol.appendChild(li);
    li.addEventListener('click', function () {
        // 干掉所有人 把所有的小li 清除 current 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下我自己  当前的小li 设置current 类名
        this.className = 'current';
        // 运动的代码
        // var idx = this.getAttribute('index');
        animate(ul, -this.index * focusWidth);
    });
}
// 默认第一个高亮
ol.children[0].className = 'current';
```

## 4. 点击右箭箭头做了两件事情

### 4.1 让 ul 运动到对应的位置

```javascript
var first = ul.children[0].cloneNode(true);
ul.appendChild(first);
// 点击右箭箭头让 ul 跟着移动
var num = 0;
arrow_r.addEventListener('click', function () {
    /* if (num == ul.children.length - 1) {
        // 瞬间把 ul 怼到最左侧
        ul.style.left = 0;
        // 把 num 置为 0，目的是为了显示第 2 张图片
        num = 0;
    }
    num++; */

    num++;
    if (num == ul.children.length) {
        // 瞬间把 ul 怼到最左侧
        ul.style.left = 0;
        // 把 num 置为 1，目的是为了显示第 2 张图片
        num = 1;
    }
    animate(ul, -num * focusWidth);
});
```

### 4.2 让小圆点跟随变化

```javascript
var circle = 0; // 控制小圆点
arrow_r.addEventListener('click', function () {
    // ...

    circle++;
    if (circle == ol.children.length) {
        circle = 0;
    }
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = 'current';
});
```

**注意点击小圆点的时候不要忘了把当前索引同步给 circle 和 num**

## 5. 点击左侧箭头做完全相反的操作

## 6. 自动运动

```javascript
var timer = setInterval(function() {
    //手动调用点击事件
    arrow_r.click();
}, 2000);
```

## 7. 节流阀

```javascript
var flag = true; // #1
arrow_r.addEventListener('click', function () {
    if (flag) { // #2
        flag = false; // #3 一进来就关了
        
        animate(ul, -num * focusWidth, function() {
            flag = true; // #4 运动完毕之后再打开
        });
    }
});
```

```javascript
// 第二种写法
var flag = true; // #1
arrow_r.addEventListener('click', function () {
    if (!flag) return false; // #2
    flag = false; // #3 一进来就关了
    
    animate(ul, -num * focusWidth, function() {
        flag = true; // #4 运动完毕之后再打开
    });
});
```