const { remote, ipcRenderer } = require('electron')
const fs = require("fs")
const zlib = require("zlib")
const pump = require('pump');
const compressing = require("compressing")

const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
}

window.addEventListener("online", updateOnlineStatus)
window.addEventListener("offline", updateOnlineStatus)
// window.addEventListener("dragover", e => {
//     e.preventDefault()
// }, false)
function handleError(e) {
    console.log(e)
}
window.onload = function () {
    const { BrowserWindow } = remote
    document.getElementById("xinjiemian").addEventListener("click", () => {
        let win = new BrowserWindow({
            width: 400,
            height: 300,
            // transparent: true,
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                nodeIntegration: true,
            }
        })
        win.show()
        win.loadFile("./src/page/ceshi.html")
        win.webContents.openDevTools()
    })
    document.getElementById("xinjiemian2").addEventListener("click", () => {
        let win = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: false,
                // 关闭可以在渲染环境中禁止require和module
            }
        })
        win.show()
        win.loadURL("https://www.szsyxh.org.cn/front/yxjj-wx/?code=011Ot4HK0Aq43c2ZQ5JK00S1HK0Ot4Hi&state=STATE#/livemeeting?id=303")
        // win.loadFile("./src/page/test.html")
        win.webContents.openDevTools()
    })
    document.getElementById("xinjiemian3").addEventListener("click", () => {
        let win = new BrowserWindow({
            width: 400,
            height: 400,
            // transparent: true,
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                nodeIntegration: true,
            }
        })
        win.show()
        win.loadFile("./src/page/tool.html")
        win.webContents.openDevTools()
    })
    ipcRenderer.on("getinput", (event, data) => {
        document.getElementById("huoqu").innerHTML = `获取来自测试页的数据：${data}`
    })
    function getbrotherNode(name) {
        var b = document.getElementById(name).parentNode.children
        console.log(b)
    }

}

