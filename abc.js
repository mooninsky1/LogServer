var str="param1=Prefabs/UI/Login/UILogin.prefab&opt=logdata&time=2020/06/22 08:24:46&logtype=OpenUI&user=&param2=nil&param3=nil&"
var str1 = str.split('&');
console.log(str1);
var temp;
for( key in str1)
{
    var a=key.split('=')
    temp[a[0]]=a[1];
}
console.log(temp);