## 键盘事件的注意点

- onkeypress，不识别功能键，但区分大小写

- 如何判断用户按下了哪个键？通过 e.keyCode

## 两个加载事件

- `window.onload`，等页面所有的资源（图片、视频、音频...）加载完毕后触发

- `document.addEventListener('DOMContentLoaded', fn)`，等页面的 DOM 结构加载完毕后触发

- 举个例子：想获取一个图片的宽度（尺寸），要放 window.onload 里面，以为要等资源（图片）加载完毕才有尺寸

```html
<img src="test.png"/>
```

## 定时器

```javascript
// 1s 后只执行一次回调函数
// 起名的主要目的，是为了在清除的时候知道要清除谁
var timer = setTimeout(function() {
    // 代码...
}, 1000);
clearTimeout(timer);
```

```javascript
// 每隔 1s 执行一次回调函数
var timer = setInterval(function() {}, 1000);
// 这个清除的时候用的是 clearInterval
clearInterval(timer);
```

## 关于 this

==记住一句话：函数中的 this，谁调用就是谁==

```javascript
var o = {
    age: 18,
    sayHi: function() {
        // this => 函数的调用者，就是 o
        // 打印的是 o.age => 18
        console.log(this.age);
    }
}
o.sayHi();
```

```javascript
var age = 19; // window.age
var o = {
    age: 18,
    sayHi: function () {
        // this => window
        // window.age => 19
        console.log(this.age);
    }
}
var temp = o.sayHi;
temp(); // window.temp()
```

```javascript
var age = 19; // window.age
var o = {
    age: 18,
    sayHi: function () {
        // this => o
        // o.age => 18
        console.log(this.age);
    }
}
var temp = o.sayHi(); // o.sayHi() 调用之后的返回值是 undefined
temp(); // 报错
```

## 你能说一下什么是事件循环（Event Loop）？

- JS 的执行分为同步任务（同步代码）和异步任务（异步代码）

- 当碰到同步代码时直接在执行栈（先进后出的数据结构）中执行

- 当碰到异步任务并且时机符合时（当点击事件、定时器的时间到了、AJAX 发送了请求...），就把异步代码添加到任务队列（先进先出的数据结构）当中

- **当执行栈中的同步代码执行完毕后**，就去任务队列当中把异步代码添加到执行栈中执行

- 这种反复去任务队列当中轮询代码的机制就是事件循环（Event Loop）

```javascript
// 这里一定是 1s 后打印的 1 吗？
setTimeout(function() {
    console.log(1);
}, 1000);

// 这是后面的代码...
while(true) {}
```

