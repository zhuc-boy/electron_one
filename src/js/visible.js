const { remote } = require('electron')
const { BrowserWindow } = remote
const { ipcRenderer } = require('electron')


window.onload = function () {
    document.addEventListener("visibilitychange", function () {
        console.log(document.visibilityState);
    });
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
            // transparent: true,
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                nodeIntegration: true,
            }
        })
        win.show()
        win.loadFile("./src/page/test.html")
        win.webContents.openDevTools()
    })
    ipcRenderer.on("getinput", (event, data) => {
        document.getElementById("huoqu").innerHTML = `获取来自测试页的数据：${data}`
    })
}
