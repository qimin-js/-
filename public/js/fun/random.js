let path = require('path')
let { Composite, Body } = require('matter-js');
let sqrites = []
let s = require(path.join(path.public, 'js', 'square.js'))
for (let params in s) {
    sqrites.push(s[params])
}
// console.log(sqrites);
module.exports = function (x, y) {
    let sqriteRandom = Math.ceil(Math.random() * 4);
    let sqriteActive = sqrites[sqriteRandom - 1](x, y)
    return sqriteActive
}