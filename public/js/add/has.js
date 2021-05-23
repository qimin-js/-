const util = require('util')
module.exports = function (obj) {//判断对象全等。
    let ret = false;
    for (let params of this) {
        if (str == JSON.stringify(util.inspect(params, { depth: null }))) ret = true
    }
    return ret
}