/* window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // num = circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);

}) */


window.addEventListener('load', function () {
    //  获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth; //一张图片的宽度

    // 👍【01 鼠标经过大盒子的时候显示隐藏左右箭头】 
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });



    // 👍【02 根据大图的数量动态生成小圆圈】
    // 获取ul和ol
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol里去
        ol.appendChild(li);






        // 👍 【03点击小圆圈做两件事情】
        // 【03.1小圆圈排他思想  干掉他人 高亮自己】
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''; //干掉别人
            }
            this.className = 'current'; //高亮自己


            // 【03.2点击小圆圈，移动图片 当然移动的是 ul 】
            // ul 的移动距离=小圆圈的索引号 乘以 图片的宽度 注意是负值(向左边走是负)
            var index = this.getAttribute('index');
            // 用当前索引同步给 circle（小圆点） 和 num（图片）
            circle = index;
            num = index;

            animate(ul, -index * focusWidth); //引动画，点小圆点让图片移动
        })

    }
    // 默认第一个高亮
    ol.children[0].className = 'current';









    //👍 【04 点击右箭头做两件事】
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first); // 克隆第一个

    // 【04.1点击右箭头让ul跟随变化】
    var num = 0; //控制图片运动
    var circle = 0; //控制小圆点
    var flag = true; //#1 （节流阀部分）
    arrow_r.addEventListener('click', function () {
        if (flag) { //#2
            flag = false; //#3 一进来就关



            // 判断条件 如果num等于最后一张图片(索引号)，那就让ul立即回到最左侧
            if (num == ul.children.length - 1) {
                ul.style.left = 0; // 瞬间把ul搞到最左侧
                num = 0; //把num重置为0，目的是显示第二张图片
            }
            num++;
            // animate(ul, -num * focusWidth);(不要节流阀就打开这行代码，)
            animate(ul, -num * focusWidth, function () {
                flag = ture; //#4 运动完毕之后再打开节流阀
            })

            // 【04.2 让小圆点跟随变化】

            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的current类名
            ol.children[circle].className = 'current';

        }

    })





    // 👍【5点击左键箭头 做右键箭头相反的动作】

    // 【6自动播放】
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000)


    // 👍【7 】节流阀【放到点击右箭头事件处理程序里面】(快速点击鼠标图片不会跟着快 )
    var flag = true; //#1

    if (flag) { //#2
        flag = false; //#3 一进来就关

        animate(ul, -num * focusWidth, function () {
            flag = ture; //#4 运动完毕之后再打开
        })
    }




});