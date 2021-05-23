let { Composite, Body, Events, Bounds } = require('matter-js');
module.exports = function (activeSqrite) {
    for (let params of activeSqrite.parts) {
        console.log(params.position.x);
        if (params.position.x <= 76 && params.position.x >= 74) {//判断有方块在边缘。
            // console.log(activeSqrite);
            return;//在边缘不移动
        }
    }
    Body.translate(activeSqrite, { x: -50.3, y: 0 })
    activeSqrite.move.x -= 50.3
}