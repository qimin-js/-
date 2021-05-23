let { Composite, Body } = require('matter-js');
module.exports = function (activeSqrite) {
    for (let params of activeSqrite.parts) {
        // console.log(params.position.x);
        if (params.position.x < 528 && params.position.x > 526)
            return;
    }
    // console.log('结束');
    Body.translate(activeSqrite, { x: 50.3, y: 0 })
    activeSqrite.move.x += 50.3
}