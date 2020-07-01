
// const path = require("path")
function showDialog() {
    const { remote } = require("electron")
    const dialog = remote.dialog
    const app = remote.app
    dialog.showOpenDialog({
        title: "要打开的文件夹",
        properties: ["openDirectory"]
        //  "multiSelections", "showHiddenFiles"
    }).then(res => {
        filelist(res)
        console.log(document.querySelector(".fileEle"))
        // document.querySelector(".fileEle").forEach(ele => {
        //     ele.remove()
        // })
    })
}

function filelist(params) {
    const {
        canceled,
        filePaths
    } = params
    if (filePaths.length === 0) {
        return
    } else {
        const fs = require("fs")
        fs.readdir(filePaths[0], (err, files) => {
            if (err) {
                console.warn(err)
            } else {
                files.forEach(filename => {
                    if (filename === ".DS_Store") return
                    fs.stat(`${filePaths[0]}/${filename}`, (err, stats) => {
                        filename = filename
                        if (err) {
                            console.warn(err)
                        } else {
                            window.requestAnimationFrame(renderFile)
                            // console.log(stats)
                            // console.log(`${filename}是${stats.isFile() === true ? "是文件" : stats.isDirectory() === true ? "是文件夹" : "未知"}`)
                        }
                    })
                    // console.log(filename)
                })
            }
        })
    }
}
let i = 50
function renderFile() {
    i = i - 1
    if (i === 0) {
        let ele = document.createElement("div")
        ele.className = "fileEle"
        ele.innerHTML = filename
        document.querySelector(".fileBox").appendChild(ele)
        i = 50
    } else {
        window.requestAnimationFrame(renderFile)
    }
    // if (arrlist.length === 0) return

    // setInterval(()=>{

    // })
}

let myNotification = new Notification('标题', {
    body: '通知正文内容'
})

myNotification.onclick = () => {
    console.log('通知被点击')
}