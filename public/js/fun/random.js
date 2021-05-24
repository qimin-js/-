let path = require('path')
let { Composite, Body } = require('matter-js');
let sqrites = []
let s = require(path.join(path.public, 'js', 'square.js'))
for (let params in s) {
    sqrites.push(s[params])
}
// console.log(sqrites);
module.exports.addSqrite = function (x, y) {
    let sqriteRandom = Math.ceil(Math.random() * 7);
    let sqriteActive = sqrites[sqriteRandom - 1](x, y)
    return sqriteActive
}
module.exports.randomPosX = function () {
    let ran = Math.ceil(Math.random() * 7);
    let x = 125 + (ran - 1) * 50
    return x
}