let { Engine, Render } = require('matter-js');
let path = require('path')
let { engine } = require(path.join(path.public, 'js', 'engine.js'))
let render = Render.create({
    engine: engine,
    element: document.querySelector('#canvasArea2'),
    enableSleeping: true,
    options: {
        width: 606,
        height: 900,
        wireframes: false,
        background: '#ffffff',
        showIds: true,
        showPositions: true,
        showAxes: true,
        // showBroadphase: true,
    }
});
Render.run(render);
Engine.run(engine);