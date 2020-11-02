window.addEventListener('load', function () {
    // 01_鼠标经过大盒子的时候显示隐藏左右箭头
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    // 一张图片的宽度
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });

    // 02_根据大图的数量动态生成小圆圈
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
});