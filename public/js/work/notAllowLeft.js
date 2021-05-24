let path = require('path')
let spliceId = require(path.join(path.work, 'spliceId.js'))

let notAllowRight = false;
let notAllowLeft = false;
let notAllowSquare = { position: { x: 100, y: 0 } }
let notAllowActiveSquareChil = { position: { x: 0, y: 0 } }
let notAllowActiveSquare;

module.exports = function (activeSqrite, pp) {
    if (notAllowActiveSquareChil.position.x - notAllowSquare.position.x < 70.71 && notAllowActiveSquareChil.position.x - notAllowSquare.position.x > 0 && notAllowActiveSquare.isStatic == false && notAllowActiveSquareChil.position.y - notAllowSquare.position.y > -50) {
        return
    } else {
        notAllowLeft = false;
        // console.log('解放了');
    }
    for (let activeSqriteParams of activeSqrite.parts) {
        // console.log(activeSqriteParams.position.x - pp.position.x);
        reg = spliceId(activeSqrite);
        // console.log(activeSqriteParams.id, activeSqriteParams.id + '');
        let IdToStr = pp.id + ''
        if (activeSqriteParams.label == 'Body' || pp.id <= 17 || IdToStr.search(reg) != -1 || pp.label == 'Body') continue
        if (activeSqriteParams.position.x - pp.position.x < 70.71 && activeSqriteParams.position.x - pp.position.x > 0 && activeSqriteParams.position.y - pp.position.y > -50) {
            console.log('禁止', pp.id, activeSqriteParams.id, 'y距离', activeSqriteParams.position.y - pp.position.y);
            notAllowLeft = true;
            notAllowSquare = pp
            notAllowActiveSquareChil = activeSqriteParams;
            notAllowActiveSquare = activeSqrite;
        }
    }
    return notAllowLeft
}