const { app, BrowserWindow } = require('electron');
const path = require('path');
let win;
let config = {
    width: 1500,
    height: 1000,
    // show: false,//窗口隐藏jk e
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    // frame: false,//无边框
    backgroundColor: '#009fcc',//软件加载的时候会使用这个背景颜色
    webPreferences: {
        nodeIntegration: true,//使前端也能使用node.js
        enableRemoteModule: true,
        contextIsolation: false,
        scrollBounce: true,
    },
}
function createWin (config, url) {
    win = new BrowserWindow(config);
    win.loadFile(url);
    win.show()
}
app.on("ready", function () {
    createWin(config, "/home/qimin/electron/matter/views/index.html")
})