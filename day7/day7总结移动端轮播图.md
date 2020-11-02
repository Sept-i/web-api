## 获取计算后的样式

```javascript
// 获取的是最终的计算后的样式
var oLi = document.querySelector('li');
var styles = getComputedStyle(oLi);
console.log(styles['background-color']);
```

## 隔行变色

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
```

```javascript
var oUl = document.querySelector('ul');
for (var i = 0; i < oUl.children.length; i++) {
    oUl.children[i].style.backgroundColor = i % 2 ? 'red' : 'green';
}

// 需求：移动到 li 的时候变成 pink 色，离开的时候恢复默认的颜色
var oldColor = '';
for (var i = 0; i < oUl.children.length; i++) {
    oUl.children[i].onmouseover = function() {
        // over 的时候记一下，目的是离开的时候有个“家”
        oldColor = this.style.backgroundColor;
        this.style.backgroundColor = 'pink';
    };
    oUl.children[i].onmouseout = function() {
        this.style.backgroundColor = oldColor;
    };
}
```

## 获取移动端事件对象和手指信息

```javascript
div.addEventListener('touchstart', function(e) {
    e.targetTouches[0]; // 就可以得到正在触摸dom元素的第一个手指的相关信息比如 手指的坐标等等
});
```

## 用 PC 端的思路实现移动端的拖拽

```javascript
var disX = 0;
var disY = 0;
var div = document.querySelector('div');
div.addEventListener('touchstart', function(e) {
    // 记录手指到盒子的距离：手指到屏幕的距离 - 盒子到屏幕的距离
    disX = e.targetTouches[0].pageX - this.offsetLeft;
    disY = e.targetTouches[0].pageY - this.offsetTop;
});
div.addEventListener('touchmove', function(e) {
    // 手指到屏幕的距离 - 手指到盒子的距离
    this.style.left = e.targetTouches[0].pageX - disX + 'px';
    this.style.top = e.targetTouches[0].pageY - disY + 'px';
});
```

## 移动端轮播图

1. 让 ul 自动动起来

```javascript
var focus = document.querySelector('.focus');
var ul = focus.children[0];
// 获得focus 的宽度
var w = focus.offsetWidth;
var index = 0; // 牢牢把握住这个 index，后面所有的变化都是对这个 index 的操作
var timer = setInterval(function () {
    index++;
    var translatex = -index * w;
    ul.style.transition = '.3s';
    ul.style.transform = 'translateX(' + translatex + 'px)';
    // ul.style.transform = `translateX(${translatex}px)`;
}, 2000);
```

2. index 边界条件的判断

```javascript
ul.addEventListener('transitionend', function() {
    // 无缝滚动
    if (index == 3) {
        index = 0;
        // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
        ul.style.transition = 'none';
        // 利用最新的索引号乘以宽度 去滚动图片
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // 1. 瞬间拉到相同的图片那一张
        // 2. 缓缓运动到下一张
    } else if (index < 0) {
        index = 2;
        ul.style.transition = 'none';
        // 利用最新的索引号乘以宽度 去滚动图片
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }
});
```

3. 小圆点跟随变化

```javascript
// 把ol里面li带有current类名的选出来去掉类名 remove
ol.querySelector('.current').classList.remove('current');
// 让当前索引号 的小li 加上 current   add
ol.children[index].classList.add('current');
```

关于 transitionend，聚焦当前窗口的时候触发！

```html
<button>点击</button>
<div></div>
<script>
    var oDiv = document.querySelector('div');
    var oBtn = document.querySelector('button');
    oBtn.onclick = function () {
        oDiv.style.transition = '5s';
        oDiv.style.transform = 'translateX(1000px)';
    };
    oDiv.addEventListener('transitionend', function() {
        document.title = 'hello world';
    });
</script>
```

4. 拖动 ul 让其运动

ul.style.transform = 原来的位置（原来的 transformX）+ 移动的距离

```javascript
var startX = 0;
ul.addEventListener('touchstart', function(e) {
    // 记录一下按下手指坐标
    startX = e.targetTouches[0].pageX
});

ul.addEventListener('touchmove', function(e) {
    // 算一下移动的距离
    var moveX = e.targetTouches[0].pageX - startX
    // 原理的 transform 就是 -index * 一张图片的宽度
    ul.style.transform = -index * 一张图片的宽度 + moveX;
});
```

5. touchend 的时候让 ul 跑到对应的位置（是显示下一张/上一张/原地不动）

6. touchend 的时候让 ul 自动运动

7. 优化：只有进行 touchmove 才需要触发 touchend 里面的代码


