const compressing = require("compressing")
window.onload = function () {
    let dropDom = document.getElementById("dropplace")
    dropDom.addEventListener("dragover", e => {
        e.preventDefault()
    }, false)
    dropDom.addEventListener("drop", zipfile, false)
    function zipfile(e) {
        if (e.dataTransfer.files[0].type === "") {
            // 压缩文件夹
            compressing.zip.compressDir(e.dataTransfer.files[0].path, e.dataTransfer.files[0].path + '.zip')
                .then(() => {
                    console.log('ok');
                })
                .catch(err => {
                    console.log(err);
                });
            return
        } else {
            // 压缩文件
            compressing.zip.compressFile(e.dataTransfer.files[0].path, e.dataTransfer.files[0].path + '.zip')
                .then(() => {
                    console.log('ok');
                })
                .catch(err => {
                    console.log(err);
                });
            return
            // const rs = fs.createReadStream(e.dataTransfer.files[0].path)
            // const ws = fs.createWriteStream(`/Users/zhuc/Desktop/${e.dataTransfer.files[0].name}.gz`)
            // const gzip = zlib.createGzip()
            // rs.pipe(gzip).pipe(ws)
        }

    }
}