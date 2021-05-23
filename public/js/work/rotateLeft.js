let { Composite, Body, Events, Bounds } = require('matter-js');
let path = require('path')
let { engine, world } = require(path.join(path.public, 'js', 'engine.js'));

module.exports = function (activeSqrite, collision) {
    Events.off(engine, 'collisionActive')//关闭事件，等待frames重新开启
    Body.rotateDirection(activeSqrite, 'left');
    for (let params of activeSqrite.parts) {//左边缘
        if (params.position.x <= 26 && params.position.x >= 24) {//判断有方块在边缘。
            require(path.join(path.work, 'moveRight.js'))(activeSqrite)
        }
        if (params.position.x < 578 && params.position.x > 576) {//右边缘
            require(path.join(path.work, 'moveLeft.js'))(activeSqrite)
        }
        // console.log(params.position.x);
    }
    // console.log('结束');
    collision()
}