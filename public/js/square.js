const { worker } = require('cluster');
let { Bodies, Body, Composite } = require('matter-js');
let path = require('path');
let config = {
    friction: 0,//摩擦力
    frictionStatic: 0,//静止摩擦力
    restitution: 0,//弹力
    // isStatic: true,
    mass: 10,//重量
    density: 10,//密度
    frictionAir: 0.1,
}
let width = 49;
let height = 49
module.exports.triangle = function (x, y) {//三角
    let center = Bodies.rectangle(x, y, width, height, Object.assign(config, { render: { fillStyle: '#009fcc' } }));
    let left = Bodies.rectangle(x - 50, y, width, height, Object.assign(config, { render: { fillStyle: '#009fcc' } }));
    let right = Bodies.rectangle(x + 50, y, width, height, Object.assign(config, { render: { fillStyle: '#009fcc' } }));
    let up = Bodies.rectangle(x, y - 50, width, height, Object.assign(config, { render: { fillStyle: '#009fcc' } }));
    let all = Body.create(Object.assign({ parts: [center, left, up, right] }, config));//组合
    all.degree = 0;//旋转弧度，排除碰撞带来的旋转
    all.move = { x: 0, y: 0 };
    all.name = 'trangle';
    all.beginPos = { x: x, y: y };//开始坐标
    all.endPos = { x: 0, y: 0 };//结束坐标，排除碰撞带来的移动
    Body.setCentre(all, { x: 0, y: 12.5 }, true);//移动重心
    return all
}
module.exports.square = function (x, y) {//正方形
    let center = Bodies.rectangle(x, y, width, height, Object.assign(config, { render: { fillStyle: '#f39004' } }));
    let left = Bodies.rectangle(x - 50, y, width, height, Object.assign(config, { render: { fillStyle: '#f39004' } }));
    let up = Bodies.rectangle(x, y - 50, width, height, Object.assign(config, { render: { fillStyle: '#f39004' } }));
    let leftUp = Bodies.rectangle(x - 50, y - 50, width, height, Object.assign(config, { render: { fillStyle: '#f39004' } }))
    let all = Body.create(Object.assign({ parts: [center, left, up, leftUp] }, config))
    all.degree = 0;
    all.move = { x: 0, y: 0 }
    all.name = 'square';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}
module.exports.line = function (x, y) {//长条
    let center = Bodies.rectangle(x, y, width, height, { render: { fillStyle: '#777777' } });
    let left = Bodies.rectangle(x - 50, y, width, height, { render: { fillStyle: '#777777' } })
    let right = Bodies.rectangle(x + 50, y, width, height, { render: { fillStyle: '#777777' } });
    let right2 = Bodies.rectangle(x + 100, y, width, height, { render: { fillStyle: '#777777' } });
    let all = Body.create(Object.assign({ parts: [center, left, right, right2] }, config))
    Body.setCentre(all, { x: -25, y: 0 }, true)
    all.degree = 0;
    all.move = { x: 0, y: 0 };
    all.name = 'line';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}
module.exports.l = function (x, y) {//L
    let center = Bodies.rectangle(x, y, width, height, { render: { fillStyle: '#8b73d3' } });
    let left = Bodies.rectangle(x - 50, y, width, height, { render: { fillStyle: '#8b73d3' } })
    let up = Bodies.rectangle(x, y - 50, width, height, { render: { fillStyle: '#8b73d3' } });
    let up2 = Bodies.rectangle(x, y - 100, width, height, { render: { fillStyle: '#8b73d3' } });
    let all = Body.create(Object.assign({ parts: [center, left, up, up2] }, config))
    Body.setCentre(all, { x: -12.5, y: 12.5 }, true)
    all.degree = 0;
    all.move = { x: 0, y: 0 };
    all.name = 'l';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}
module.exports.filpL = function (x, y) {//反的L
    let center = Bodies.rectangle(x, y, width, height, { render: { fillStyle: '#d3738e' } });
    let right = Bodies.rectangle(x + 50, y, width, height, { render: { fillStyle: '#d3738e' } })
    let up = Bodies.rectangle(x, y - 50, width, height, { render: { fillStyle: '#d3738e' } });
    let up2 = Bodies.rectangle(x, y - 100, width, height, { render: { fillStyle: '#d3738e' } });
    let all = Body.create(Object.assign({ parts: [center, right, up, up2] }, config))
    Body.setCentre(all, { x: 12.5, y: 12.5 }, true)
    all.degree = 0;
    all.move = { x: 0, y: 0 };
    all.name = 'flipL';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}
module.exports.z = function (x, y) {//Z
    let center = Bodies.rectangle(x, y, width, height, { render: { fillStyle: '#73cd7a' } });
    let left = Bodies.rectangle(x - 50, y, width, height, { render: { fillStyle: '#73cd7a' } })
    let up = Bodies.rectangle(x, y - 50, width, height, { render: { fillStyle: '#73cd7a' } });
    let rightUp = Bodies.rectangle(x + 50, y - 50, width, height, { render: { fillStyle: '#73cd7a' } });
    let all = Body.create(Object.assign({ parts: [center, left, up, rightUp] }, config))
    Body.setCentre(all, { x: 0, y: 25 }, true)
    all.degree = 0;
    all.move = { x: 0, y: 0 }
    all.name = 'z';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}
module.exports.filpZ = function (x, y) {//反的Z
    let center = Bodies.rectangle(x, y, width, height, { render: { fillStyle: '#bfcd73' } });
    let right = Bodies.rectangle(x + 50, y, width, height, { render: { fillStyle: '#bfcd73' } })
    let up = Bodies.rectangle(x, y - 50, width, height, { render: { fillStyle: '#bfcd73' } });
    let leftUp = Bodies.rectangle(x - 50, y - 50, width, height, { render: { fillStyle: '#bfcd73' } });
    let all = Body.create(Object.assign({ parts: [center, right, up, leftUp] }, config))
    Body.setCentre(all, { x: 0, y: 25 }, true)
    all.degree = 0;
    all.move = { x: 0, y: 0 }
    all.name = 'filpZ';
    all.beginPos = { x: x, y: y };
    all.endPos = { x: 0, y: 0 }
    return all
}