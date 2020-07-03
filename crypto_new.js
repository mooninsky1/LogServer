const CryptoJS = require('crypto-js');
var _KEY = "fuv3pk7qcfwx8cd4ns8u6ew4herjss6q";//32位
//var _KEY = "11223344";//8位
var _IV = "1234567890000000";//16位
/**************************************************************
*字符串加密
*   str：需要加密的字符串
****************************************************************/
function aesCrypto(str) {
    var key = CryptoJS.enc.Utf8.parse(_KEY);
    var iv = CryptoJS.enc.Utf8.parse(_IV);

    var encrypted = '';

    var srcs = CryptoJS.enc.Utf8.parse(str);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString();
}

/**************************************************************
*字符串解密
*   str：需要解密的字符串
****************************************************************/
function aesDecrypto(str) {
    var key = CryptoJS.enc.Utf8.parse(_KEY);
    var iv = CryptoJS.enc.Utf8.parse(_IV);
    var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

module.exports.aesCrypto = aesCrypto;
module.exports.aesDecrypto = aesDecrypto;