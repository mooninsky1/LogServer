var express = require('express');
var conf = require('./config.js');
var app = express();
var  fs = require('fs');
var  urlencode = require('urlencode');
var  log_process = require('./process.js');
var db = require('./db.js');
var multer = require('multer');//Multer是一个用于处理multipart / form-data的node.js中间件，主要用于上传文件。它构建在busboy基础上以提高效率。点击 这里 阅读更多关于multer包。

//这3行代码很关键，要不然post上来的数据取不到body
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

//会打开目录html下的index.html 静态,
app.use(express.static(__dirname + '/html'));


app.get('/', function(req, res) {
    let log=urlencode.decode(req.url);
    });

    //处理日志
app.get('/log', function(req, res) {
    let log=urlencode.decode(req.url);
    log_process.log_process(log);
    res.send("{code:1}");
    });
app.get('/Images/echarts.js', function (req, res) {
    var num = req.params.num;
    res.download(__dirname + "/Images/echarts.js");
});
app.get('/Images/*', function (req, res) {
    var num = req.params.num;
    res.download(__dirname + req.path);
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

app.get('/action', function (req, res) {
    /*res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile('./app.js','utf-8',function(err,data){
        if(err)
        {
            console.error(err);
            throw err ;
        }
        else{
            return  res.end(data);
        }
       
    });
    return;
    */
    if(req.query.opt == "getnotice")
    {
        //res.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('./Images/notice.txt','utf-8',function(err,data){
            if(err)
            {
                console.error(err);
                throw err ;
            }
            else{
                return  res.end(data);
            }
           
        });
        return;
       // res.end("getnotice");
    }
    else if (req.query.opt == "getlist") {
        var sql = "SELECT * from server";
        //console.log(sql);
        db.querySql(sql, "", function (err, result) {//查询所有users表的数据
            if (err) {
                console.log("db err");
            }
            else {
                //console.log(result);
                var list=[];
                var def = 0;
                result.recordset.forEach(element => {
                    if(element.open > 0){
                        list.push({stat:element.stat, name:element.name, id:element.id,tips:element.tips });
                        if(element.flag>=1){
                            def = element.id;
                        }
                    }
                    
                });
                //for (var i = 0; i < result.recordsets.length; i++) {
                 //   list.push({stat:result.recordsets[i].stat, name:result.recordsets[i]., id: 1 });
               // }
                var serverlist={list:list, default:def};
               // console.log(JSON.stringify(serverlist));
                res.end(JSON.stringify(serverlist));
                return;

            }
        });
        //fs.readFile('./Images/server.txt', 'utf-8', function (err, data) {
         //   if (err) {
        //        throw err;
        //    }
        //    res.end(data);
        //});
        return;
    }
    else if (req.query.opt == "geturl") {
        var sql = "SELECT * from url";
        db.querySql(sql, "", function (err, result) {//查询所有users表的数据
            if (err) {
                console.log("db err");
            }
            else {
                //console.log(result);
                var list=[];
                result.recordset.forEach(element => {
                        list.push({url:element.url});
                });
                var urllist={list:list};
               // console.log(JSON.stringify(serverlist));
                res.end(JSON.stringify(urllist));
                return;
            }
        });
    }
    else if (req.query.opt == "getVersionInfo") {
        var sql = "SELECT * from updateflag";
        db.querySql(sql, "", function (err, result) {//查询所有users表的数据
            if (err) {
                console.log("db err");
            }
            else {
                var flag;
                var version;
                result.recordset.forEach(element => {
                    flag = element.flag;
                    version = element.version;
                });
                var sql1 = "SELECT * from mac";
                db.querySql(sql1, "", function (err, result) {//查询所有users表的数据
                    if (err) {
                        console.log("db err");
                    }
                    else {
                        var listMac=[];
                        result.recordset.forEach(element => {
                            listMac.push(element.mac);
                        });
                        var sql2 = "SELECT * from url";
                        db.querySql(sql2, "", function (err, result) {//查询所有users表的数据
                            if (err) {
                                console.log("db err");
                            }
                            else {
                                //console.log(result);
                                var listUrl=[];
                                result.recordset.forEach(element => {
                                    listUrl.push(element.url);
                                });
                                var urllist={url:listUrl,devices:listMac,status:flag,version:version};
                               // console.log(JSON.stringify(serverlist));
                                res.end(JSON.stringify(urllist));
                                return;
                            }
                        });
                    }
                });
            }
        });
    }
});
app.post('/notice', function(req,res){
    console.log('notice post')
    console.log(req.body);
    res.writeHead(200,{'Content-Type':'text/html'})
    var data= { title: req.body.title, content:req.body.context };
    data = JSON.stringify(data);
    fs.writeFile('./Images/notice.txt',data,function(err){
        if(err)
        {
            res.end("commit fail");
        }
        else{
            res.end("commit ok");
        }
    });
})
var params = {
    "id":5,
    "name":"白眉鹰王"
}
//写入json文件选项
function writeJson(params){
    //现将json文件读出来
    fs.readFile('./mock/person.json',function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();//将二进制的数据转换为字符串
        person = JSON.parse(person);//将字符串转换为json对象
        person.data.push(params);//将传来的对象push进数组对象中
        person.total = person.data.length;//定义一下总条数，为以后的分页打基础
        console.log(person.data);
        var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./mock/person.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}
//writeJson(params)//执行一下;




app.listen(conf.GM_SERVER_PORT.app_port);
console.log("localhost:"+conf.GM_SERVER_PORT.app_port);