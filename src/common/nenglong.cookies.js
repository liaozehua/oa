import NengLong from './nenglong.common'		//引入公用库，获取命名对面
NengLong.namespace("Cookies");			
//获取cookie、
NengLong.Cookies.getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 	if (arr = document.cookie.match(reg)){
  		return (arr[2]);
 	}
 	else{
  		return null;
 	}
}
// export function getCookie(name) {
//  	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//  	if (arr = document.cookie.match(reg)){
//   		return (arr[2]);
//  	}
//  	else{
//   		return null;
//  	}
// }
 
//设置cookie,增加到vue实例方便全局调用
NengLong.Cookies.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
 	exdate.setDate(exdate.getDate() + expiredays);
 	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
// export function setCookie (c_name, value, expiredays) {
//  	var exdate = new Date();
//  	exdate.setDate(exdate.getDate() + expiredays);
//  	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// };
 
//删除cookie
NengLong.Cookies.delCookie = function(name) {
	var exp = new Date();
 	exp.setTime(exp.getTime() - 1);
 	var cval = NengLong.Cookies.getCookie(name);
 	if (cval != null){
  		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
 	}
}
// export function delCookie (name) {
//  	var exp = new Date();
//  	exp.setTime(exp.getTime() - 1);
//  	var cval = getCookie(name);
//  	if (cval != null){
//   		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//  	}
// };

export default NengLong.Cookies