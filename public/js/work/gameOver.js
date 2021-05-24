module.exports = function (activeSqrite, frames) {
    if (activeSqrite.position.y <= 0) {
        frames.stop()
        let some = anime.timeline({});
        some.add({
            targets: '.canvasArea1',
            height: 900,
            duration: 1000,
        }).add({
            targets: '.introduction',
            scale: 1,
            rotate: 360,
            duration: 1000,
            begin: function () {
                document.querySelector('.tt').innerText = 'game over';
                document.querySelector('.start').innerText = '重新开始'
            },//动画开始
        })
    }
}