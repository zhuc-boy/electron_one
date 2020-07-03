let msgBtn = document.getElementById("sendmsg")
const { remote, ipcRenderer } = require("electron")
msgBtn.addEventListener("click", () => {
    const { BrowserWindow } = remote
    console.log(BrowserWindow.getFocusedWindow().id)
    const reply = ipcRenderer.sendSync("tongbu", "同步消息")
    console.log(reply)
    ipcRenderer.send("yibu", "异步消息")
    // ipcRenderer.sendTo(3, "zjcj", "来自信息页的信息")
    // console.log(BrowserWindow.getAllWindows())
})
ipcRenderer.on("asyncMsg", (e, arg) => {
    console.log(arg)
})
ipcRenderer.on("zhudong", (e, ar) => {
    console.log(ar)
})
