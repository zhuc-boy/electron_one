const {
    app,
    BrowserWindow
} = require("electron")

function createWindow() {
    // console.log(BrowserWindow.getFocusedWindow().id)
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
    const {
        Notification
    } = require("electron")
    if (Notification.isSupported() === true) {
        let notice = new Notification({
            title: "title",
            subtitle: "subtitle",
            body: "body",
            replyPlaceholder: "replyPlaceholder",
            closeButtonText: "closeButtonText",
            hasReply: true,
            replyPlaceholder: "replyPlaceholder"
        })
        notice.show()
        notice.on("reply", (event, reply) => {
            console.log(reply)
            win.setProgressBar(0.7)
        })
    }
    win.setProgressBar(0)
}
app.commandLine.appendSwitch('enable-experimental-web-platform-features', true)
// const { globalShortcut } = require("electron")
app.whenReady().then(() => {
    createWindow()
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
    // globalShortcut.register('CommandOrControl+X', () => {
    //     console.log('CommandOrControl+X is pressed')
    // })

})
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
const {
    ipcMain
} = require('electron')
ipcMain.on("input", (event, data) => {
    console.log(data)
    event.reply("getinputtwo", data)
    // document.getElementById("huoqu").innerText = data
})
const {
    Menu,
    MenuItem
} = require("electron")
// const dockMenu = Menu.buildFromTemplate([
//     {
//         label: 'New Window',
//         click() { console.log('New Window') }
//     }, {
//         label: 'New Window with Settings',
//         submenu: [
//             { label: 'Basic' },
//             { label: 'Pro' }
//         ]
//     },
//     { label: 'New Command...' }
// ])
const menu = new Menu()

menu.append(new MenuItem({
    label: 'Print',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
    click: () => {
        console.log('time to print stuff')
    }
}))
app.on('browser-window-created', function (event, win) {
    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })
})
app.on('browser-window-created', (event, win) => {
    win.webContents.on('context-menu', (e, params) => {
        menu.popup(win, params.x, params.y)
    })
})
ipcMain.on('show-context-menu', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})
ipcMain.on("yibu", (event, arg) => {
    event.sender.send("asyncMsg", "已获得异步消息")
})
ipcMain.on("tongbu", (event, arg) => {
    console.log("同步信息：")
    console.log(arg)
    event.returnValue = "已获得同步消息"
})
let RenderIdARR = []
// item={
//     id:Number,
//     des:String
// }
ipcMain.on("createRender", (e, arg) => {
    RenderIdARR.push({
        id: arg.id,
        des: arg.des
    })
    if (RenderIdARR[0].id) {
        let Br = BrowserWindow.fromId(RenderIdARR[0].id)
        Br.webContents.send("activeId", RenderIdARR)
    }
    // console.log("create render progress")
    // console.log(RenderIdARR)
})
ipcMain.on("DR", (e, arg) => {
    RenderIdARR.map((d, i) => {
        if (arg.id === d.id) {
            RenderIdARR.splice(i, 1)
        }
    })
    // console.log("destory render progress")
    // console.log(RenderIdARR)
})
// app.dock.setMenu(dockMenu)
// console.log(app.getAppPath())
// console.log(RenderIdARR)
// require("/electron-webbt-dialog")(mainWindow);
const path = require("path")
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'fukaiitapp.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
    openAtLogin: true,
    path: updateExe,
    args: [
        '--processStart', `"${exeName}"`,
        '--process-start-args', `"--hidden"`
    ]
})