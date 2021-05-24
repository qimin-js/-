module.exports = function (activeSqrite) {
    let id = ''
    for (let params of activeSqrite.parts) {//拼接id
        id = id + params.id + '|'
    }
    id = id + '-1'
    let reg = new RegExp(id)
    return reg
}