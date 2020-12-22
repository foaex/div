window.addEventListener('load', function() {
    //获取元素，
    var arr_r = document.querySelector('.arrow-right');
    var arr_l = document.querySelector('.arrow-left');
    var foucs = document.querySelector('.foucs');
    var ul = foucs.querySelector('ul');


    console.log(ul.offsetLeft);
    var foucsWidth = foucs.offsetWidth;
    // console.log(foucsWidth);
    //鼠标经过,显示箭头，离开则隐藏箭头
    foucs.addEventListener('mouseenter', function() {
        arr_r.style.display = 'block';
        arr_l.style.display = 'block';
        clearInterval(timer);
        timer = null;

    });
    foucs.addEventListener('mouseleave', function() {
        arr_r.style.display = 'none';
        arr_l.style.display = 'none';
        timer = setInterval(function() {
            arr_r.click();
        }, 1500);

    });
    //动态生成小圆点
    var ol = document.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.append(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * foucsWidth);
        });
    }

    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击箭头，让盒子滚动
    var num = 0;
    var circle = 0;
    var flag = true;
    arr_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * foucsWidth, function() {
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
    arr_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * foucsWidth + 'px';
            }
            num--;
            animate(ul, -num * foucsWidth, function() {
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
    var timer = setInterval(function() {
        arr_r.click();
    }, 1500);



})