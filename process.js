
//引入redis
var redis = require("redis");
var conf = require('./config.js');
//创建redis客户端
var db = redis.createClient(conf.GM_LOGSERVER_DB.port, conf.GM_LOGSERVER_DB.server);
//连接错误处理
db.on("error", function (error) {
    console.log(error);
});
db.auth(conf.GM_LOGSERVER_DB.password);
db.on('connect', function(){
    console.log('Redis连接成功.');
    var ret = db.select(0);
    var name = db.get("name");
   // setTimeout(() => {
        //process(a)
       // process(b)
       //justTest();
    //}, 0);
});
//redis验证 （如果redis没有开启验证，此配置可以不写）
//db.auth("123456");

var mapfun={"1057":online,"1058":leveup}

let a= "/log/?data=[[\"1058\",\"1\",\"1\",\"2\",\"1545821916000\"],\"21530671054853\",\"理查德弗舍\"]";
let b= "/log/?data=[[\"1057\",\"1\",\"1\",\"2\",\"1545963305000\"],\"5013\",\"0\",\"1545992105457\"]";

function process(urlnet){
    let url = urlnet.replace(/\"/g,'');
    let head_bein_indx = url.indexOf("[[");
    let head_end_indx = url.indexOf("]",head_bein_indx+1);
    let head = url.substring(head_bein_indx+2,head_end_indx);
  
    let body_end_indx = url.indexOf("]",head_end_indx+1);
    let body = url.substring(head_end_indx+2,body_end_indx);

    let headArry = head.split(",");
    if(headArry.length < 1){
        return -1;
    }
    var log_id = headArry[0];
    mapfun[log_id](head,body);
}

function online(head,body){
    console.log("online:"+head);
    let bodyArry = body.split(",");
    let zoneid = bodyArry[0];
    let online =bodyArry[1];
    let time = bodyArry[2];
    var json = {
        "count": online,
        "time": time
    };
    let ret = db.rpush("online"+zoneid,JSON.stringify(json));

}
function leveup(head,body){
    console.log("leveup:"+head);
}

function justTest(){
    var tem = db.lrange("online"+5013,0,-1,function (err, res) {
        if (err) {
            console.log("err:" + err);
        }
        else {
            if (res != "") {
                
                for(var i=0; i<res.length; i++){
                    let data = JSON.parse(res[i])
                    console.log(data["count"]);
                }
                
            }
        }
        });
}
module.exports.log_process = process;