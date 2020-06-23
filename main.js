const { app, BrowserWindow } = require("electron")
const { ipcMain } = require('electron')
function createWindow() {
    let win = new BrowserWindow({
        width: 400,
        height: 600,
        // transparent: true,
        // titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true,
        }
    })
    win.show()
    win.loadFile("./src/page/index.html")
    win.webContents.openDevTools()

}
app.whenReady().then(() => {
    createWindow()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

ipcMain.on("input", (event, data) => {
    console.log(data)
    event.reply("getinput", data)
    // document.getElementById("huoqu").innerText = data
})