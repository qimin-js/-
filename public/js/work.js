let path = require('path');
let { Composite, Body, Events } = require('matter-js');
let { engine, world } = require(path.join(path.public, 'js', 'engine.js'));
let { square } = require(path.join(path.public, 'js', 'square.js'));
let { Ticker } = require('pixi.js');
let { ground } = require(path.join(path.public, 'js', 'ground.js'));
let { addSqrite, randomPosX } = require(path.join(path.fun, 'random.js'))
let adjustmentMove = require(path.join(path.work, 'adjustmentMove.js'))
let spliceId = require(path.join(path.work, 'spliceId.js'))
let notAllowLeftFun = require(path.join(path.work, 'notAllowLeft.js'))
// const util = require('util')

let collisionData = new Set();
let sqriteId = new Set()
let activeSqrite = square(randomPosX(), 0)
console.log(activeSqrite);
Composite.add(world, [activeSqrite]);
let frames = new Ticker();
let reg;
let id;
let end;
let notAllowRight = false;
let notAllowLeft = false;
let clearSquare = [];//保存子模块
for (let i = 1; i < 17; i++) {
    clearSquare.push([])
}
frames.add(function () {
    if (end == true) {
        activeSqrite = addSqrite(randomPosX(), 0);
        Composite.add(engine.world, [activeSqrite]);
        end = false;
        collision()
    }
    for (let params of engine.world.bodies) {
        for (let pp of params.parts) {
            if (params.isStatic == true) {
                for (let i = 1; i < 17; i++) {
                    if (pp.position.y < 830 - (i - 1) * 50 && pp.position.y > 820 - (i - 1) * 50) {//第一行
                        if (clearSquare[i - 1].hasObj({ fa: params, chil: pp }) == true || pp.label == 'Body') continue;//避免重复添加
                        //hasObj只对对象的id对比，将对象展开数据太过庞大。
                        clearSquare[i - 1].push({ fa: params, chil: pp })
                    }
                }
            }
            notAllowLeft = notAllowLeftFun(activeSqrite, pp);//防止左移到别人身体里

        }
    }
    // if (notAllowLeft == true) console.log(notAllowLeft);

    for (let i = 1; i < 17; i++) {
        let topY = 828 - (i - 1) * 50;
        // console.log(clearSquare[i - 1].length);
        if (clearSquare[i - 1].length >= 10) {//删除行
            for (let params of clearSquare[i - 1]) {
                let index = params.fa.parts.indexOf(params.chil)//删除身体的子模块
                params.fa.parts.splice(index, 1)
                if (params.fa.parts.length == 1) {//没有子模块，删除整体
                    Composite.remove(world, params.fa)
                }
            }
            clearSquare = [];
            for (let i = 1; i < 17; i++) {
                clearSquare.push([])
            }
            for (let params of engine.world.bodies) {
                if (params.isStatic == true && params.id >= 17) {//避免墙下降
                    console.log(params.id);
                    for (let pp of params.parts) {
                        if (pp.position.y > topY || pp.label == 'Body') continue;
                        Body.translate(pp, { x: 0, y: 50 })
                    }
                }
            }
        }
    }
})
frames.start()

document.querySelector('body').onkeydown = function (e) {
    // console.log(activeSqrite);
    if (e.keyCode == 37 && notAllowLeft == false) require(path.join(path.work, 'moveLeft.js'))(activeSqrite);//左移
    if (e.keyCode == 39 && notAllowRight == false) require(path.join(path.work, 'moveRight.js'))(activeSqrite);//右移
    if (e.keyCode == 40) require(path.join(path.work, 'rotateRight.js'))(activeSqrite, collision);//下,顺时针
    if (e.keyCode == 38) require(path.join(path.work, 'rotateLeft.js'))(activeSqrite, collision);//上，逆时针
    if (e.keyCode == 32) engine.world.gravity.y = 5;//加速
    if (e.keyCode == 13) frames.stop()
}
let collision = function () {
    reg = spliceId(activeSqrite);
    // console.log(id);
    Events.on(engine, 'collisionActive', function (e) {//碰撞事件
        for (let params of e.pairs) {
            if (params.id.search(reg) != -1) {
                let absY = Math.abs(params.bodyA.position.y - params.bodyB.position.y);
                let absX = Math.abs(params.bodyA.position.x - params.bodyB.position.x);
                Body.setAngle(activeSqrite, activeSqrite.degree)//旋转微调
                adjustmentMove(activeSqrite)//位置微调
                // console.log(params.bodyA.id, params.bodyB.id, absY, absX, absY >= 50, absX >= 10);
                if (absY >= 50 || absX >= 10) continue//只允许上下边碰撞
                console.log('通过', params.bodyA.id, params.bodyB.id, absY, absX);
                engine.world.gravity.y = 1;//减速
                activeSqrite.isStatic = true;//静止
                Events.off(engine, 'collisionActive')//关闭事件，等待frames重新开启
                Body.setAngle(activeSqrite, activeSqrite.degree)//旋转微调
                adjustmentMove(activeSqrite)//位置微调
                end = true;//传递信息
                break;
            }
        }
    })
}
collision()