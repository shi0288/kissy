var CurSite = new function(){};
CurSite.site = window.document.location.protocol + "//" + window.document.location.hostname + ":" + window.document.location.port;
CurSite.getContextPath = function() {
    /*var b = document.location.pathname.substr(1);
    b = "/" + b.substr(0, b.indexOf("/"));
    return b;*/
    return "";
};
CurSite.conextPath = CurSite.getContextPath();
CurSite.getAbsolutePath = function(url) {
    return CurSite.site + CurSite.conextPath + "/" + url;
};
CurSite.interPath = CurSite.getAbsolutePath("mcp-filter/main/interface.htm");
CurSite.createUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";
    var uuid = s.join("");
    return uuid;
};
/**
 * 格式化int，不够的位置补0
 * @param value
 * @param len
 */
CurSite.formatInt= function(value, len)
{
    var str = value + "";
    var prefix = "";
    for(var i = 0; i < len - str.length; i++)
    {
        prefix += "0";
    }
    return prefix + str;
};
CurSite.getShortDateStr = function(str)
{
    return str.substring(0, 10) + " " + str.substring(11, 19);
};
CurSite.redirectTo = function(wId, url)
{
    if(wId != null)
    {
        var frame = parent.document.getElementById(wId);
        frame.src = url;
    }
    else
    {
        window.location = url;
    }
};
CurSite.getDateStr = function()
{
    var date = new Date();
    var str = "";
    str += date.getFullYear();
    str += "-";
    str += CurSite.formatInt(date.getMonth() + 1, 2);
    str += "-";
    str += CurSite.formatInt(date.getDay(), 2);
    str += "T";
    str += CurSite.formatInt(date.getHours(), 2);
    str += ":";
    str += CurSite.formatInt(date.getMinutes(), 2);
    str += ":";
    str += CurSite.formatInt(date.getSeconds(), 2);
    str += ".";
    str += CurSite.formatInt(date.getMilliseconds(), 3);
    var flag = "-";
    var oMinutes = date.getTimezoneOffset();
    if(oMinutes < 0)
    {
        flag = "+";
        oMinutes = -oMinutes;
    }
    str += flag;
    str += CurSite.formatInt(oMinutes/60, 2);
    str += CurSite.formatInt(oMinutes%60, 2);
    return str;
};
CurSite.getHead = function(cmd, body)
{
    return {id:CurSite.createUUID(), ver:"0.0.1", cmd:cmd, digestType:"md5", digest:hex_md5(body), timestamp:CurSite.getDateStr()};
};
/**
 * 数组复制，并删除指定序号的元素
 */
CurSite.arrayCopyAndExclude = function(data, index)
{
    var j = 0;
    var newArray = [];
    for(var i = 0; i < data.length; i++)
    {
        if(i != index)
        {
            newArray[j] = data[i];
            newArray[j].index = j;
            j++;
        }
    }
    return newArray;
};
CurSite.getFrameDocById = function(wId)
{
    var cDoc = window.frames[wId].contentDocument;
    if(cDoc == undefined)
    {
        cDoc = window.frames[wId].document;
    }
    return cDoc;
};
CurSite.getFrameWinById = function(wId)
{
    var cWin = window.frames[wId].contentWindow;
    if(cWin == undefined)
    {
        cWin = window.frames[wId].window;
    }
    return cWin;
};
/**
 * get cookies
 */
CurSite.getCookie = function()
{
    var cookieStr = document.cookie;
    var cookieStrArray = cookieStr.split(";");
    var siteCookies = {};
    for(var index in cookieStrArray)
    {
        if(cookieStrArray[index].length > 0)
        {
            var cookieArray = cookieStrArray[index].split("=");
            var key = cookieArray[0].trim();
            var value = cookieArray[1].trim();
            siteCookies[key] = value;
        }
    }
    return siteCookies;
};
CurSite.setCookie = function(name, value, expSeconds)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + expSeconds*1000);
    document.cookie = name + "="+ value + ";expires=" + exp.toGMTString() + ";path=/";
};
CurSite.getDefualtKey = function()
{
    return "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
};
CurSite.getDefaultIv = function()
{
    return "AAAAAAAAAAA=";
};

CurSite.encryptUrl = function(data, Json)
{
    var self = this;
    var msgNode = self.encrypt({digestType:'3des-empty'}, null, Json.stringify(data));
    return encodeURIComponent(msgNode.body);
};

CurSite.decryptUrl = function(str, Json)
{
    var self = this;
    var decodedBodyStr = self.decrypt({digestType:'3des-empty'}, null, str);
    return Json.parse(decodedBodyStr);
};

CurSite.encrypt = function(headNode, key, bodyStr)
{
    if(headNode.digestType == "3des-empty")
    {
        key = CurSite.getDefualtKey();
    }
    var arrayKey = CryptoJS.enc.Base64.parse(key);
    var iv  = CryptoJS.enc.Base64.parse(CurSite.getDefaultIv());
    var encrypted = CryptoJS.TripleDES.encrypt(bodyStr, arrayKey, {iv:iv, mode:CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding}) + "";
    return {head:headNode, body:encrypted};
};

CurSite.decrypt = function(headNode, key, encodedBodyStr)
{
    if(headNode.digestType == "3des-empty")
    {
        key = CurSite.getDefualtKey();
    }
    var arrayKey = CryptoJS.enc.Base64.parse(key);
    var iv  = CryptoJS.enc.Base64.parse(CurSite.getDefaultIv());
    var decrypted = CryptoJS.TripleDES.decrypt(encodedBodyStr, arrayKey, {iv:iv, mode:CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding});
    return decrypted.toString(CryptoJS.enc.Utf8);
};

//one year
CurSite.cookieExpireTime = 365*24*60*60;

//send undigest msg to server
CurSite.sendUnDigest = function(Io, Json, cmd, bodyNode, cb)
{
    var headNode = {cmd:cmd, digestType:"3des-empty"};
    var msgNode = CurSite.encrypt(headNode, null, Json.stringify(bodyNode));
    Io({type:"post", url:CurSite.interPath, data:{message:Json.stringify(msgNode)}, success:function(data){
        var backBodyStr = data.body;
        var decodedBodyStr = CurSite.decrypt(data.head, null, backBodyStr);
        var backBodyNode = Json.parse(decodedBodyStr);
        cb(null, backBodyNode);
    }});
};

//send digest msg to server
CurSite.sendDigest = function(Io, Json, cmd, key, bodyNode, cb)
{
    var self = this;
    var cookies = self.getCookie();
    if(!key)
    {
        var key = cookies["st"];
    }

    var headNode = {cmd:cmd, digestType:"3des", userId:cookies["userId"], userType:cookies["userType"]};
    var msgNode = CurSite.encrypt(headNode, key, Json.stringify(bodyNode));
    Io({type:"post", url:CurSite.interPath, data:{message:Json.stringify(msgNode)}, success:function(data){
        var backBodyStr = data.body;
        var decodedBodyStr = CurSite.decrypt(data.head, key, backBodyStr);
        var backBodyNode = Json.parse(decodedBodyStr);
        if(backBodyNode.repCode == '9004')
        {
            CurSite.redirectTo(null, "admin_login.html");
        }
        else
        {
            cb(null, backBodyNode);
        }
    }});
}
