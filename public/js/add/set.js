const util = require('util')
module.exports = function (obj) {//判断对象全等。
    let str = JSON.stringify(util.inspect(obj, { depth: null }));//解决循环应用
    let ret = false;
    for (let params of this.values()) {
        if (str == JSON.stringify(util.inspect(params, { depth: null }))) ret = true
    }
    return ret
}