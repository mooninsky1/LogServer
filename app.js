var express = require('express');
var conf = require('./config.js');
var app = express();
var  fs = require('fs');
var  urlencode = require('urlencode');
var  log_process = require('./process.js');
var multer = require('multer');//Multer是一个用于处理multipart / form-data的node.js中间件，主要用于上传文件。它构建在busboy基础上以提高效率。点击 这里 阅读更多关于multer包。


//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));

app.listen(conf.GM_SERVER_PORT.app_port);
app.get('/', function(req, res) {
    let log=urlencode.decode(req.url);
    });
app.get('/log', function(req, res) {
    let log=urlencode.decode(req.url);
    log_process.log_process(log);
    res.send("{code:1}");
    });
app.get('/Images/echarts.js', function (req, res) {
    var num = req.params.num;
    res.download(__dirname + "/Images/echarts.js");
});
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

console.log("localhost:"+conf.GM_SERVER_PORT.app_port);