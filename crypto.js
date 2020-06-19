//'use strict'
//crypto(kri:pto)意为加密
const cons = require('crypto');
//声明为const 表示该变量不可修改
//Hash算法
var hash = cons.createHash('md5')//'sha1', 'md5', 'sha256', 'sha512'等
hash.update("hello world")
console.log(hash.digest('hex'));

//Hmac算法，需要一个密钥
var hmac = cons.createHmac('sha1','secret-key');
hmac.update('hello world');
console.log(hmac.digest('hex'));
//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：
//加密  cipher意为暗号
function aesCrypto(data,key){
    //创建一个加了秘钥的暗号
   const cipher =  cons.createCipher('aes192',key);
   //将暗号转换成十六进制
   var aes = cipher.update(data,'utf-8','hex');
   aes+=cipher.final('hex');
   return aes;
}
//解密
function aesDecrypto(data,key){
    const dcipher = cons.createDecipher('aes192',key);
    var daes = dcipher.update(data,'hex','utf-8');
    daes+=dcipher.final('utf-8');
    return daes;
}
//var data = '这是一个秘密,需要加密';
//var key = 'passworld';
//var encrypted = aesCrypto(data, key);
//var decrypted = aesDecrypto(encrypted, key);
//console.log('加密后: ' + encrypted);
//console.log('解密后: ' + decrypted);
module.exports.aesCrypto = aesCrypto;
module.exports.aesDecrypto = aesDecrypto;