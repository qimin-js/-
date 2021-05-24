let { Composite, Body, Events } = require('matter-js');

module.exports = function (activeSqrite) {
    let endPos = { x: activeSqrite.beginPos.x + activeSqrite.move.x, y: activeSqrite.position.y };
    if (activeSqrite.name == 'square' || activeSqrite.name == 'l') {
        endPos.x -= 25
        Body.setPosition(activeSqrite, endPos)//位置微调
        activeSqrite.endPos = endPos;
    } else if (activeSqrite.name == 'flipL') {
        // console.log(endPos);
        endPos.x += 25
        Body.setPosition(activeSqrite, endPos)//位置微调
        activeSqrite.endPos = endPos;
    } else {
        Body.setPosition(activeSqrite, endPos)//位置微调
        activeSqrite.endPos = endPos
    }
}