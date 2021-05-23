let path = require('path');
let { Composite, MouseConstraint, Body, Bodies } = require('matter-js');
let { world, engine } = require(path.join(path.public, 'js', 'engine.js'));
console.log(world);
let mouseConstraint = MouseConstraint.create(engine, {});
let config = {
    // friction: 1,//摩擦力
    // frictionStatic: 1,//静止摩擦力
    restitution: 0,//弹力
    isStatic: true,
    // mass: 1,
}

let groundDown = Bodies.rectangle(303, 900, 606, 100)
let groundLeft = Bodies.rectangle(0, 450, 98, 900)
let groundRight = Bodies.rectangle(606, 450, 100, 900)
let ground = Body.create(Object.assign({ parts: [groundDown, groundLeft, groundRight] }, config))
Composite.add(world, [ground, mouseConstraint])
module.exports.ground = ground;