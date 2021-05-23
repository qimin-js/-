let { Body } = require('matter-js');
let rad90 = Math.PI / 2;
Body.rotateDirection = function (el, direction) {
    if (direction == 'left') {
        Body.rotate(el, -rad90)
        el.degree -= rad90
    }
    if (direction == 'right') {
        Body.rotate(el, rad90)
        el.degree += rad90;
    }
}