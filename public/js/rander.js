let jk = jQuery.noConflict();
let { Engine, Render } = require('matter-js');
let path = require('path')
let { engine } = require(path.join(path.public, 'js', 'engine.js'))
let frames = require(path.join(path.public, 'js', 'work.js'))
let render;
document.querySelector('#start').onclick = function () {
    render = Render.create({
        engine: engine,
        element: document.querySelector('#canvasArea2'),
        enableSleeping: true,
        options: {
            width: 600,
            height: 900,
            wireframes: false,
            background: '#ffffff',
            showIds: true,
            showPositions: true,
            showAxes: true,
            // showBroadphase: true,
        }
    });
    let some = anime.timeline({});
    some.add({
        targets: '.introduction',
        scale: 0,
        rotate: 360,
        duration: 1000,
    }).add({
        targets: '.canvasArea1',
        height: 0,
        duration: 1000,
    })
    Render.run(render);
    Engine.run(engine);
    frames.start()
    document.querySelector('#start').onclick = null
}
