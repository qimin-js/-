let path = require('path');
let { Composite, MouseConstraint, Body, Bodies } = require('matter-js');
let { world, engine } = require(path.join(path.public, 'js', 'engine.js'));
// console.log(world);
let mouseConstraint = MouseConstraint.create(engine, {});
let config = {
    // friction: 1,//摩擦力
    // frictionStatic: 1,//静止摩擦力
    restitution: 0,//弹力
    isStatic: true,
    // mass: 1,
}

let groundDown = []
for (let i = 1; i < 12; i++) {
    groundDown.push(Bodies.rectangle(25 + (i - 1) * 50, 875, 50, 50))
}
let groundLeft = Bodies.rectangle(0, 450, 96, 900)
let groundRight = Bodies.rectangle(600, 450, 96, 900)
// console.log(groundDown.id, groundLeft.id, groundRight);
let allGround = groundDown.push(groundLeft)
allGround = groundDown.push(groundRight)
let ground = Body.create(Object.assign({ parts: groundDown }, config))
Composite.add(world, [ground, mouseConstraint])
module.exports.ground = ground;