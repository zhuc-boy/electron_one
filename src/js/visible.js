const { remote, ipcRenderer } = require('electron')
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
        win.webContents.on("did-finish-load", () => {
            document.getElementById("xinjiemian").style.display = "none"
            ipcRenderer.send("createRender", { id: win.id })
        })
        win.loadFile("./src/page/ceshi.html")
        win.show()
        win.webContents.openDevTools()
        win.on("close", () => {
            ipcRenderer.send("destroyRender", { id: win.id })
            document.getElementById("xinjiemian").style.display = "block"
        })
        // win.webContents.on("did-finish-load")
    })
    document.getElementById("xinjiemian2").addEventListener("click", () => {
        let win = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                // 关闭可以在渲染环境中禁止require和module
            }
        })
        win.webContents.on("did-finish-load", () => {
            document.getElementById("xinjiemian2").style.display = "none"
            ipcRenderer.send("createRender", { id: win.id })
        })
        win.show()
        // win.loadURL("https://www.szsyxh.org.cn/front/yxjj-wx/?code=011Ot4HK0Aq43c2ZQ5JK00S1HK0Ot4Hi&state=STATE#/livemeeting?id=303")
        win.loadFile("./src/page/test.html")
        win.webContents.openDevTools()
        win.on("close", () => {
            ipcRenderer.send("destroyRender", { id: win.id })
            document.getElementById("xinjiemian2").style.display = "block"
        })
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
        win.webContents.on("did-finish-load", () => {
            document.getElementById("xinjiemian3").style.display = "none"
            ipcRenderer.send("createRender", { id: win.id })
        })
        win.loadFile("./src/page/tool.html")
        win.show()
        win.on("close", () => {
            ipcRenderer.send("destroyRender", { id: win.id })
            document.getElementById("xinjiemian3").style.display = "block"
        })
        win.webContents.openDevTools()
    })
    document.getElementById("xinjiemian4").addEventListener("click", () => {
        let win = new BrowserWindow({
            width: 400,
            height: 400,
            // transparent: true,
            // titleBarStyle: 'hiddenInset',
            webPreferences: {
                nodeIntegration: true,
            }
        })
        win.loadFile("./src/page/msg.html")
        win.show()
        win.webContents.on("did-finish-load", () => {
            document.getElementById("xinjiemian4").style.display = "none"
            ipcRenderer.send("createRender", { id: win.id })
        })
        win.on("close", () => {
            ipcRenderer.send("destroyRender", { id: win.id })
            document.getElementById("xinjiemian4").style.display = "block"
        })
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

