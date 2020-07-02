
// const path = require("path")
let historyPath = []
// 存放文件路径记录
function showDialog() {
    const { remote } = require("electron")
    const dialog = remote.dialog
    const app = remote.app
    dialog.showOpenDialog({
        title: "要打开的文件夹",
        properties: ["openDirectory"]
        //  "multiSelections", "showHiddenFiles"
    }).then(res => {
        historyPath.push(res.filePaths[0])
        document.title = res.filePaths[0]
        renderDom()
        filelist(res)
    })
}
function renderDom() {
    // 重新渲染fileBox元素
    document.querySelector(".fileBox").removeEventListener("click", fileBoxAtion)
    document.querySelector(".fileBox").parentNode.removeChild(document.querySelector(".fileBox"))
    let fileBox = document.createElement("div")
    fileBox.className = "fileBox"
    document.body.appendChild(fileBox)
    document.querySelector(".fileBox").addEventListener("click", fileBoxAtion, true)
}
function fileBoxAtion(e) {
    let path = document.title + "/" + e.target.innerHTML
    switch (e.target.className) {
        case "foldertype":
            renderDom()
            filelist({ filePaths: [path] })
            document.title = path
            historyPath.push(path)
            break;
        case "filetype":
            filedetail(path)
            break;
    }
    // 点击的文件的绝对路径
}
const fs = require("fs")
function filelist(params) {
    const {
        canceled,
        filePaths
    } = params
    if (filePaths.length === 0) {
        return
    } else {
        fs.readdir(filePaths[0], (err, files) => {
            if (err) {
                console.warn(err)
            } else {
                files.forEach((filename, index) => {
                    if (filename === ".DS_Store") return
                    fs.stat(`${filePaths[0]}/${filename}`, (err, stats) => {
                        if (err) {
                            console.warn(err)
                        } else {
                            let _t = stats.isFile() === true ? 1 : stats.isDirectory() === true ? 2 : 0
                            renderFile(filename, index, _t)
                        }
                    })
                })
            }
        })
    }
}
const { shell } = require("electron")
function filedetail(filepath) {
    shell.openPath(filepath)
    // fs.readFile(filepath, (err, data) => {
    //     if (err) {
    //         console.warn(err)
    //     } else {
    //         console.log(data)
    //     }
    // })
}

function renderFile(filename, index, _type) {
    let tempEle = document.createDocumentFragment()
    // 文本
    // let txtDom = document.createElement("div")
    // txtDom.innerHTML = filename
    // txtDom.className = "filename"
    // txtDom.style.order = 1
    // tempEle.appendChild(txtDom)
    // 图片
    let imgDom = document.createElement("div")
    imgDom.className = _type === 1 ? "filetype" : _type === 2 ? "foldertype" : ""
    // imgDom.style.order = 0
    imgDom.innerHTML = filename
    tempEle.appendChild(imgDom)

    let ele = document.createElement("div")
    ele.className = "fileEle"
    ele.style.animationDelay = index / 2 + "s"
    ele.appendChild(tempEle)
    document.querySelector(".fileBox").appendChild(ele)
}
function backFile() {
    if (historyPath.length <= 1) return
    let path = historyPath[historyPath.length - 2]
    historyPath.pop()
    document.title = path
    renderDom()
    filelist({ filePaths: [path] })
}
// let myNotification = new Notification('标题', {
//     body: '通知正文内容'
// })

// myNotification.onclick = () => {
//     console.log('通知被点击')
// }
window.onload = function () {
    document.querySelector(".fileBox").addEventListener("click", fileBoxAtion, false)
}
const { ipcRenderer } = require('electron')
const contextMenuBtn = document.getElementById('context-menu')

contextMenuBtn.addEventListener('click', () => {
    ipcRenderer.send('show-context-menu')
})