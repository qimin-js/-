const util = require('util')
module.exports = function (obj) {//判断对象全等。
    let ret = false;
    for (let params of this) {
        if (obj.fa.id == params.fa.id && obj.chil.id == params.chil.id) ret = true
    }
    return ret
}