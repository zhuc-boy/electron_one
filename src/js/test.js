const { ipcRenderer } = require('electron')

ipcRenderer.on("getinputtwo", (event, data) => {
    document.getElementById("huoqu").innerHTML = `获取来自测试页的数据：${data}`
})