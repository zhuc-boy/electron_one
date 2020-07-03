const { ipcRenderer, remote } = require('electron')

ipcRenderer.on("zjcj", (event, data) => {
    console.log(data)
    document.getElementById("huoqu").innerHTML = `获取来自测试页的数据：${data}`
})
window.onload = function () {
    const { BrowserWindow } = remote
    console.log(BrowserWindow.getFocusedWindow().id)
}
