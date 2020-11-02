window.addEventListener('load', function () {
    // 01_鼠标经过大盒子的时候显示隐藏左右箭头
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
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
        // 把小li插入到ol 里面
        ol.appendChild(li);
    }
    // 默认第一个高亮
    ol.children[0].className = 'current';
});