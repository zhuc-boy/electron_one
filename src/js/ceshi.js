const { ipcRenderer } = require('electron')
document.getElementById("name").addEventListener("click", () => {
    let NU = Math.random(10)
    ipcRenderer.sendTo(1, "getinput", NU)
    ipcRenderer.send("getinputtwo", NU)
    ipcRenderer.send("input", NU)
})
// ipcRenderer.on("getinput", (event, data) => {
//     document.getElementById("huoqu").innerHTML = `获取来自测试页的数据：${data}`
// })