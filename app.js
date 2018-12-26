var express = require('express');
var app = express();
var  fs = require('fs');
var  urlencode = require('urlencode');

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));

app.listen(6000);
app.get('/log', function(req, res) {
    let abc=urlencode.decode(req.url);
    res.send("{code:1}");
    });
let a= "/log/?data=[[\"1058\",\"1\",\"1\",\"2\",\"1545821916000\"],\"21530671054853\",\"理查德弗舍\"]";
(function process(url){
    console.log(a);
    
})(a);
console.log("http://192.168.31.249:6000")