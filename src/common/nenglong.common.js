/// <reference path="jquery-1.7.2.js" />
 
var NengLong = {};
//命名空间
NengLong.namespace = function (str) {
    var arr = str.split("."), o = NengLong;
    for (var i = (arr[0] == "NengLong") ? 1 : 0 ; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
}

//继承
NengLong.extend = function (subClass, superClass) {
    var F = function () { };
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}


//基础方法
//trim
NengLong.trim = function (str) {
    return str.replace(/^\s+|\s+$/g , "");
};
//isNumber
NengLong.isNumber = function (s) {
    return !isNaN(s);
}
//isString
NengLong.isString = function (s) {
    return typeof s === "string";
}
//isBoolean
NengLong.isBoolean = function (s) {
    return typeof s === "boolean";
}
//isFunction
NengLong.isFunction = function (s) {
    return typeof s === "function";
}
//isUndefined
NengLong.isUndefined = function (s) {
    return typeof s === "undefined";
}
//isNull
NengLong.isNull = function (s) {
    return  s === null;
}
//isEmpty
NengLong.isEmpty = function (s) {
    return /^\s*$/.test(s);
}
//isArray
NengLong.isArray = function (s) {
    return s instanceof Array;
}

//检测是否安装Flash 
NengLong.checkFlash = function checkFlash() {
    var myCheckFlash = function () { try { var isIE = (navigator.appVersion.indexOf("MSIE") >= 0); var hasFlash = true; if (isIE) { try { new ActiveXObject("ShockwaveFlash.ShockwaveFlash") } catch (e) { hasFlash = false } } else { if (!navigator.plugins["Shockwave Flash"]) { hasFlash = false } } return hasFlash } catch (ex) { alert(ex.message) } }; if (myCheckFlash()) { return true } else { window.alert("没有安装flash插件！请安装flash插件才能使用"); window.location.href = "http://get.adobe.com/cn/flashplayer/" }
}
//将ISO8601日期格式字符串转换成日期对象
NengLong.parseISO8601 = function (s, ignoreTimezone) {
    var m = s.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/); if (!m) { return null } var fixDate = function (d, check) { if (+d) { while (d.getDate() != check.getDate()) { d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS) } } }; var date = new Date(m[1], 0, 1); if (ignoreTimezone || !m[13]) { var check = new Date(m[1], 0, 1, 9, 0); if (m[3]) { date.setMonth(m[3] - 1); check.setMonth(m[3] - 1) } if (m[5]) { date.setDate(m[5]); check.setDate(m[5]) } fixDate(date, check); if (m[7]) { date.setHours(m[7]) } if (m[8]) { date.setMinutes(m[8]) } if (m[10]) { date.setSeconds(m[10]) } if (m[12]) { date.setMilliseconds(Number("0." + m[12]) * 1000) } fixDate(date, check) } else { date.setUTCFullYear(m[1], m[3] ? m[3] - 1 : 0, m[5] || 1); date.setUTCHours(m[7] || 0, m[8] || 0, m[10] || 0, m[12] ? Number("0." + m[12]) * 1000 : 0); if (m[14]) { var offset = Number(m[16]) * 60 + (m[18] ? Number(m[18]) : 0); offset *= m[15] === "-" ? 1 : -1; date = new Date(+date + (offset * 60 * 1000)) } } return date
}

/**
 * 设置根据对象指定属性的值
 * @author chendejiang
 * @param obj object对象
 * @param name string 属性名。（可以带.多层设置值）
 * @param value 值
 * @例子
 * var obj={name:"abc"};
 * setProperty(obj, "type.code", "test");//obj={name:"abc",type:{code:"test"}}
 * setProperty(obj, "type", "类型");//obj={name:"abc",type:"类型"}
 */
NengLong.setProperty = function (obj, name, value) {
    var properties = name.split("."), size = properties.length - 1, i = -1, nextObj;
    do {
        nextObj = obj[properties[++i]];
        if (i === size) {
            obj[properties[i]] = value;
            break;
        }
        if (!nextObj) {
            obj[properties[i]] = {};
        }
        obj = obj[properties[i]];
    } while (i <= size);
}
/**
 * 获取根据对象指定属性的值
 * @author chendejiang
 * @param obj object对象
 * @param name string 属性名。（可以带.多层设置值）
 * @param value 值
 * @例子
 * var obj={name:"abc", type:{code:"test"}};
 * getProperty(obj, "type.name");//undefined
 * getProperty(obj, "type.code");//test
 * getProperty(obj, "name");//abc
 */
NengLong.getProperty = function getProperty(obj, name) {
    var v, properties = name.split("."), j = 1, length = properties.length, v = obj[properties[0]];
    while (j < length && v && (v = v[properties[j++]]) !== undefined) { }
    return v;
}

/**
 * 格式化字符串， {} 做占位符
 */
NengLong.format = function format(str) { 
    for (var i = 0, length = arguments.length; i < length - 1; i++) {
        str = str.replace("{" + i + "}", arguments[i + 1]);
    }
    return str;
}

//获取指定元素填充的默认长度的数组
NengLong.getDefaultArray = function (length,item) {
    var arr = new Array();
    for (i = 0; i < length; i++) {
        arr[i] = item;
    }
    return arr;
}
/***********************************************************************************************************/
//Dom相关
NengLong.namespace("Dom");
//获取后续节点
NengLong.Dom.getNextNode = function (node) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    var nextNode = node.nextSibling;
    if (!nextNode) return null;
    if (!document.all){
        while (true){
            if (nextNode.nodeType == 1) {
                break;
            } else {
                if (node.nextSibling) {
                    nextNode = node.nextSibling;
                } else {
                    break;
                }
            }
        }
    }
    return nextNode;
}
//设置透明度
NengLong.Dom.setOpacity = function (node, level) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    if (document.all) {
        node.style.filter = 'alpha(opacity=' + level + ')';
    } else {
        node.style.opacity = level / 100;
    }

}
//Get
NengLong.Dom.get = function (node) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    return node;
}
//getElementByClassName
NengLong.Dom.getElementByClassName = function (str,root,tag) {
    if (root) {
        root = typeof root == "string" ? document.getElementById(root) : root;
    } else {
        root = document.body;
    }
    tag = tag || "*";
    var els = root.getElementsByTagName(tag), arr = [];
    for (var i = 0, n = els.length; i < n; i++) {
        for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l;j++){
            if (k[j] == str) {
                arr.push(els[i]);
                break;
            }
        }         
    }
    return arr;
}


/***********************************************************************************************************/
//Event相关
NengLong.namespace("Event");
//getEventTarget
NengLong.Event.getEventTarget = function (e) {
    e = window.event || e;
    return e.srcElement || e.target;
}
//停止事件冒泡
NengLong.Event.stopPropagation = function (e) {
    e = window.event || e;
    if (document.all) {
        e.cancelBubble == true;
    } else {
        e.stopPropagation();
    }
}
//on关联事件
NengLong.Event.on = function (node ,eventType ,handler) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    if (document.all) {
        node.attachEvent("on" + eventType, handler);
    } else {
        node.addEventListener(eventType, handler, false);
    }
}

/***********************************************************************************************************/
//Array相关
NengLong.namespace("Array");
//contain
NengLong.Array.contain = function (itemArray ,item) {
    for (var i = 0, length = itemArray.length; i < length; i++) {
        if (item == itemArray[i]) {
            return true;
        }
    }
    return false;
} 

//Date相关
NengLong.namespace("DateTime");
//dateToString 将日期转换为 YYYY-MM-DD 形式字符串
NengLong.DateTime.dateToString = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dateString = year + "-";
    dateString += month > 9 ? month : "0" + month;
    dateString += "-";
    dateString += day > 9 ? day : "0" + day;
    return dateString;
}
//dateToString 将日期转换为 HH:mm:ss 形式字符串
NengLong.DateTime.timeToString = function (date) {
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var timeString = "";
    timeString += hour > 9 ? hour : "0" + hour;
    timeString += ":";
    timeString += min > 9 ? min : "0" + min;
    timeString += ":";
    timeString += sec > 9 ? sec : "0" + sec;
    return timeString;
}
//stringToDate 将 YYYY-MM-DD 形式字符串转换为日期
NengLong.DateTime.stringToDate = function (dateString) {
    var parts = dateString.split("-");
    if (parts.length == 3) {
        var year = parts[0];
        var month = parts[1].substr(0, 1) == "0" ? parts[1].substr(1, 1) : parts[1];
        var day = parts[2].substr(0, 1) == "0" ? parts[2].substr(1, 1) : parts[2];
        return new Date(parseInt(year), parseInt(month), parseInt(day));
    }
    return new Date();
}  
//dateTimeToString 将日期转换为yyyy-MM-dd HH:mm:ss形式字符串
NengLong.DateTime.dateTimeToString = function (date,shouTime) {     
    var dateTimeString = NengLong.DateTime.dateToString(date);
    //显示时间部分
    if (shouTime) {
        dateTimeString += " ";
        dateTimeString += NengLong.DateTime.timeToString(date);
    }
    return dateTimeString;
}
//stringToDateTime 将yyyy-MM-dd HH:mm:ss形式字符串转换为日期
NengLong.DateTime.stringToDateTime = function (dateTimeString) {
    var parts = dateTimeString.split(" ");
    if (parts.length == 2) {
        var dateparts = parts[0].split("-");
        var timeparts = parts[1].split(":");
        if (dateparts.length == 3 && timeparts.length == 3) {
            var year  = dateparts[0];
            var month = dateparts[1].substr(0, 1) == "0" ? dateparts[1].substr(1, 1) : dateparts[1];
            var day   = dateparts[2].substr(0, 1) == "0" ? dateparts[2].substr(1, 1) : dateparts[2];
            var hour  = timeparts[0];
            var min   = timeparts[1].substr(0, 1) == "0" ? timeparts[1].substr(1, 1) : timeparts[1];
            var sec   = timeparts[2].substr(0, 1) == "0" ? timeparts[2].substr(1, 1) : timeparts[2];
            return new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(min), parseInt(sec));
        }
    }
    return new Date();
} 

/***********************************************************************************************************/
//Language扩展相关(待测试)
/***********************************************************************************************************/
//Array扩展
//是否包含指定项
Array.prototype.contain = function (item) {
    for (var i = 0, length = this.length; i < length; i++) {
        if (item == this[i]) {
            return true;
        }
    }
    return false;
}
//String扩展
//是否为空
String.prototype.isNullOrEmpty = function () {
    if (NengLong.isNull(this)) {
        return true;
    }
    else if (NengLong.isEmpty(this)) {
        return true;
    }
    else {
        return false;
    }
}
//是否包含指定项
String.prototype.contain = function (str) {
    if (this.indexOf(str) != -1) {
        return true;
    } else {
        return false;
    }
}
//是否以指定字符串开头
String.prototype.startWith = function (str) {
    if (this.indexOf(str) != 0) {
        return true;
    } else {
        return false;
    }
}
//是否以指定字符串开头
String.prototype.endWith = function (str) {
    if (this.indexOf(str) != (this.length - str.length)) {
        return true;
    } else {
        return false;
    }
}
//在左边用空格或指定的字符填充以达到指定的总长度
String.prototype.padLeft = function (length,char) {
    if (this.length >= length) {
        return this;
    } else {
        var arr = NengLong.getDefaultArray(length - this.length, char);
        return arr.join() + this;
    }
}
//在右边用空格或指定的字符填充以达到指定的总长度
String.prototype.padRight = function (length, char) {
    if (this.length >= length) {
        return this;
    } else {
        var arr = NengLong.getDefaultArray(length - this.length, char);
        return this + arr.join();
    }
}
//清除前后空格
String.prototype.trim = function () {
    return NengLong.trim(this);
}
//首字母大写
String.prototype.firstUpper = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
}
//首字母小写
String.prototype.firstLower = function () {
    return this.substr(0, 1).toLowerCase() + this.substr(1);
}
//将字符串风格为指定长度的子串
String.prototype.splitByLength = function (length) {
    if (this.length <= length) {
        return this;
    } else {
        var arr = new Array();
        var i = 1;
        while (this.length > length * (i - 1)) {
            if (this.length >= length * i) {
                arr.push(this.substr(length * (i - 1), length * i));
            } else {
                arr.push(this.substr(i, this.length - length * i));//最后一串
                break;
            }
            i++;
        }
        return arr;
    }
}

export default NengLong