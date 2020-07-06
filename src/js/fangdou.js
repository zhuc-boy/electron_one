var throttle = function (func, delay) {
    var timer = null;
    var startTime = Date.now();
    return function () {
        var curTime = Date.now();
        var remaining = delay - (curTime - startTime)
        var context = this
        var args = arguments;
        clearTimeout(timer)
        if (remaining <= 0) {
            func.apply(context, args)
            startTime = Date.now()
        } else {
            timer = setTimeout(func, remaining)
        }
    }
}

document.getElementById("submit").addEventListener("click", () => {
    let files = document.getElementById("files").files[0]
    let formData = new FormData()
    formData.append("img", files)
    fetch("./pic", {
        body: formData,
        method: 'POST'
    }).then(res => {
        console.log(res)
    })
})

var express = require('express');
var router = express.Router();
var fs = require("fs")
var formidable = require("formidable")

/* GET home page. */
router.post('/', function (req, res, next) {
    let formchuli = formidable.IncomingForm()
    formchuli.parse(req, function (err, fields, files) {
        if (err) {
            next("上传失败")
        }
        console.log(files.img.name)
        let type = files.img.type.split("/")[1]
        fs.createReadStream(files.img.path).pipe(fs.createWriteStream("./store" + new Date().getTime() + "." + type))
        next()
    });
});
router.get('/', function (req, res, next) {
    console.log(req)
});
module.exports = router;
