1. 让一个元素走一步

```javascript
// 在原来的基础上加上一个数值
oDiv.style.left = oDiv.offsetLeft + 5 + 'px';
```

2. 让一个元素持续走

```javascript
setInterval(function() {
    oDiv.style.left = oDiv.offsetLeft + 5 + 'px';
}, 30);
```

3. 到达目标停下来

```javascript
// 本质就是清除定时器
var timer = setInterval(function() {
    if (oDiv.offsetLeft >= 400) {
        clearInterval(timer);
    }
    oDiv.style.left = oDiv.offsetLeft + 5 + 'px';
}, 30);
```

4. 解决超出目标的 Bug

```javascript
var timer = setInterval(function() {
    if (oDiv.offsetLeft >= 400) {
        clearInterval(timer);
        // return // 解决方法1：这里加 return
    } else {
        // 解决方法2：把运动的代码放到 else 里面
        oDiv.style.left = oDiv.offsetLeft + 5 + 'px';
    }
}, 30);
```

5. 动画封装，让多个元素动起来

```javascript
// 1. 把“正常写”的代码从头包到脚
// 2. 把一些动态变化的数据通过函数传参的形式传递过去
function animate(ele, target) { // ele 运动的元素、target 运动的目标
    var timer = setInterval(function() {
        if (ele.offsetLeft >= target) {
            clearInterval(timer);
        } else {
            ele.style.left = ele.offsetLeft + 5 + 'px';
        }
    }, 30);
}

animate(oDiv, 400);
animate(oDiv2, 600);
```

6. 优化代码

每次调用函数都要重复开辟空间存储变量 timer；我并不明确知道这个 timer 定时器到底属于谁

```javascript
function animate(ele, target) {
    // ele => 元素对象 => 是对象就可以通过点去挂载属性或方法
    // 解决：把 timer 挂载到 ele 上
    ele.timer = setInterval(function() {
        if (ele.offsetLeft >= target) {
            clearInterval(ele.timer);
        } else {
            ele.style.left = ele.offsetLeft + 5 + 'px';
        }
    }, 30);
}
animate(oDiv, 400);
animate(oDiv2, 600);
```

7. 解决重复点击按钮运动元素的时候越来越快的 Bug

```javascript
function animate(ele, target) {
    // 解决：只需要在每次开始的时候清除定时器
    clearInterval(ele.timer);
    
    ele.timer = setInterval(function () {
        if (ele.offsetLeft >= target) {
            clearInterval(ele.timer);
        } else {
            ele.style.left = ele.offsetLeft + 5 + 'px';
        }
    }, 30);
}
```

8. 当步长(7)和总的距离(400)除不尽的时候，还是会超出目标

```javascript
function animate(ele, target) {
    clearInterval(ele.timer);

    ele.timer = setInterval(function () {
        if (ele.offsetLeft >= target) {
            clearInterval(ele.timer);
            // 解决：最后超出的一点，最后一步可以瞬间拉回目标
            ele.style.left = target + 'px';
        } else {
            ele.style.left = ele.offsetLeft + 7 + 'px';
        }
    }, 30);
}

animate(oDiv, 400);
```

9. 变成缓动（速度从快到慢）的动画形式

```javascript
function animate(ele, target) {
    clearInterval(ele.timer);

    ele.timer = setInterval(function () {
        // 这句话一定要写到定时器里面
        var step = (target - ele.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 无论是向上取整还是向下取整，就想办法把 step 变成绝对值 1，反正不要变成 0，因为 step 如果是 0 的话，在还没有到达目标点的情况下加 0 就没什么用
        // 0.9  => Math.ceil
        // -0.9 => Math.floor
        if (ele.offsetLeft == target) { // 注意这里是等号，因为最后的 step 是 1
            clearInterval(ele.timer);
        } else {
            console.log(ele.offsetLeft, step);
            // ele.offsetLeft => 394，step => 0.6

            // 394 + 0.6 => 394.6，offsetLeft 在获取 394.6 会忽略小数

            // 394 + 0.6 => 394.6，offsetLeft 在获取 394.6 会忽略小数

            // 394 + 0.6 ...

            ele.style.left = ele.offsetLeft + step + 'px';
        }
    }, 30);
}
```

10. 增加回调函数

```javascript
animate(oDiv1, 500);

animate(oDiv2, 500, function() {
    oDiv.style.background = 'red';
});
function animate(ele, target, callback) {
    clearInterval(ele.timer);

    ele.timer = setInterval(function () {
        // 这句话一定要写到定时器里面
        var step = (target - ele.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 无论是向上取整还是向下取整，就想办法把 step 变成绝对值 1，反正不要变成 0，因为 step 如果是 0 的话，在还没有到达目标点的情况下加 0 就没什么用
        // 0.9  => Math.ceil
        // -0.9 => Math.floor
        if (ele.offsetLeft == target) { // 注意这里是等号，因为最后的 step 是 1
            clearInterval(ele.timer);
            // 走到这里就结束了
            // if (callback) callback();
            callback && callback();
        } else {
            console.log(ele.offsetLeft, step);
            // ele.offsetLeft => 394，step => 0.6

            // 394 + 0.6 => 394.6，offsetLeft 在获取 394.6 会忽略小数

            // 394 + 0.6 => 394.6，offsetLeft 在获取 394.6 会忽略小数

            // 394 + 0.6 ...

            ele.style.left = ele.offsetLeft + step + 'px';
        }
    }, 30);
}
```