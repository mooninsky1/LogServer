var express = require('express');
var conf = require('./config.js');
var app = express();
var  fs = require('fs');
var  urlencode = require('urlencode');
var  log_process = require('./process.js');

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));

app.listen(conf.GM_SERVER_PORT.app_port);
app.get('/log', function(req, res) {
    let log=urlencode.decode(req.url);
    log_process.log_process(log);
    res.send("{code:1}");
    });

console.log("localhost:"+conf.GM_SERVER_PORT.app_port);