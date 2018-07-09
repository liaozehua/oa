/*  
	sessionStorage api 同 localStorage一样，但sessionStorage 关闭浏览器所保存的信息就会丢失，localStorage关闭浏览器还存在

    设置localStorage
	localStorage.setItem(key,value)

	删除单个localStorage
	localStorage.removeItem(key)

	删除所有localStorage
	localStorage.clear()

	读取localStorage
	localStorage.getItem(key)

	得到某个索引的key
	localStorage.key(index)

 */
import NengLong from './nenglong.common'
NengLong.namespace("localStorage");
// 读取localStorage
NengLong.localStorage.getLocalStorage =  function (key) {
	if(typeof(Storage) !== "undefined") {
		return localStorage.getItem(key);
	}else {
		alert('抱歉，您的浏览器不制作localStorage')
	}
}

// 设置localStorage
NengLong.localStorage.setLocalStorage = function(key,val) {
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem(key,val);
	}else {
		alert('抱歉，您的浏览器不制作localStorage')
	}
}

// 删除单个localStorage
NengLong.localStorage.removeLocalStorage = function(key) {
	if(typeof(Storage) !== "undefined") {
		localStorage.removeItem(key);
	}else {
		alert('抱歉，您的浏览器不制作localStorage')
	}
}
// 删除所有localStorage
NengLong.localStorage.clearLocalStorage = function() {
	if(typeof(Storage) !== "undefined") {
		localStorage.clear();
	}else {
		alert('抱歉，您的浏览器不制作localStorage')
	}
}

// 得到某个索引的key
NengLong.localStorage.keyLocalStorage = function(index) {
	if(typeof(Storage) !== "undefined") {
		return localStorage.key(index);
	}else {
		alert('抱歉，您的浏览器不制作localStorage')
	}
}

export default NengLong.localStorage