document.querySelector('#canvasArea1').onmousemove = function mousePosFun (e) {//提示鼠标坐标
    let animeSome = anime.timeline();
    animeSome.add({//移动时隐藏
        targets: '.posText',
        translateY: e.offsetY - document.getElementsByClassName('posText')[0].offsetTop,//动画移动变化的量
        translateX: e.offsetX + 10,
        duration: 300,//持续时间
        scale: 0,
        begin: function () {
            document.querySelector('.posText').innerText = `${e.offsetX}, ${e.offsetY}`
        }
    })
    animeSome.add({//放大原样
        targets: '.posText',
        duration: 100,
        scale: 1,
    })
}