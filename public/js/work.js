let path = require('path');
let { Composite, Body, Events, Bounds } = require('matter-js');
let { engine, world } = require(path.join(path.public, 'js', 'engine.js'));
let { triangle, square } = require(path.join(path.public, 'js', 'square.js'));
let { Ticker } = require('pixi.js');
let { ground } = require(path.join(path.public, 'js', 'ground.js'));
let addSqrite = require(path.join(path.fun, 'random.js'))

// engine.world.gravity.y = 0;//重力
let collisionData = new Set();
let sqriteId = new Set()
let activeSqrite = square(125, 0)
Composite.add(world, [activeSqrite]);
let frames = new Ticker();
let reg;
let id;
let end;
let clearSquare = new Set();//保存子模块
frames.add(function () {
    if (end == true) {
        activeSqrite = addSqrite(125, 0);
        Composite.add(engine.world, [activeSqrite]);
        end = false;
        collision()
    }
    // console.log(clearSquare.size);
    for (let params of engine.world.bodies) {
        if (params.isStatic == true) {
            for (let pp of params.parts) {
                if (pp.position.y < 828 && pp.position.y > 823) {//第一行
                    if (clearSquare.hasObj({ fa: params, chil: pp }) == true || pp.label == 'Body') continue;//避免重复添加
                    clearSquare.add({ fa: params, chil: pp })
                    console.log(clearSquare);
                    // let clearSquareStr = ''
                    // for (let p of clearSquare.values()) {
                    //     clearSquareStr += p.chil.id + '+'
                    // }
                    // console.log(clearSquareStr);
                }
            }
        }
    }
    if (clearSquare.size >= 10) {//删除行
        // console.log(clearSquare);
        for (let params of clearSquare.values()) {
            let index = params.fa.parts.indexOf(params.chil)//删除身体的子模块
            params.fa.parts.splice(index, 1)
            if (params.fa.parts.length == 1) {//没有子模块，删除整体
                Composite.remove(world, params.fa)
            }
        }
        clearSquare = new Set()
        // console.log(engine.world.bodies);
        for (let params of engine.world.bodies) {
            if (params.isStatic == true && params.id >= 12) {//避免墙下降
                Body.translate(params, { x: 0, y: 50 })
            }
        }
    }
})
frames.start()

document.querySelector('body').onkeydown = function (e) {
    // console.log(activeSqrite);
    if (e.keyCode == 37) require(path.join(path.work, 'moveLeft.js'))(activeSqrite);//左移
    if (e.keyCode == 39) require(path.join(path.work, 'moveRight.js'))(activeSqrite);//右移
    if (e.keyCode == 40) require(path.join(path.work, 'rotateRight.js'))(activeSqrite, collision);//下,顺时针
    if (e.keyCode == 38) require(path.join(path.work, 'rotateLeft.js'))(activeSqrite, collision);//上，逆时针
    if (e.keyCode == 32) engine.world.gravity.y = 3;//加速
    if (e.keyCode == 13) frames.stop()
}
let collision = function () {
    id = ''
    for (let params of activeSqrite.parts) {//拼接id
        id = id + params.id + '|'
    }
    id = id + '-1'
    if (sqriteId.has(id) == false) {
        sqriteId.add(id);
        reg = new RegExp(id)
    }
    // console.log(id);
    Events.on(engine, 'collisionActive', function (e) {//碰撞事件
        // for (let params of e.pairs) {
        //     if (collisionData.has(params.id) == true) continue;
        //     console.log(params.id);
        //     collisionData.add(params.id)
        // }
        // console.log(e);
        for (let params of e.pairs) {
            if (params.id.search(reg) != -1) {
                end = true;
                // console.log('结束了')
                // console.log(engine.world);
                Body.setAngle(activeSqrite, activeSqrite.degree)//旋转微调
                let endPos = { x: activeSqrite.beginPos.x + activeSqrite.move.x, y: activeSqrite.position.y };
                if (activeSqrite.name == 'square' || activeSqrite.name == 'l') {
                    endPos.x -= 25
                    Body.setPosition(activeSqrite, endPos)//位置微调
                    activeSqrite.endPos = endPos;
                } else if (activeSqrite.name == 'flipL') {
                    console.log(endPos);
                    endPos.x += 25
                    Body.setPosition(activeSqrite, endPos)//位置微调
                    activeSqrite.endPos = endPos;
                } else {
                    Body.setPosition(activeSqrite, endPos)//位置微调
                    activeSqrite.endPos = endPos
                }
                engine.world.gravity.y = 1;//减速
                activeSqrite.isStatic = true;//静止
                Events.off(engine, 'collisionActive')//关闭事件，等待frames重新开启
                break;
            }
        }
    })
}
collision()