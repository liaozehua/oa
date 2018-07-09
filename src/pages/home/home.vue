<template>
	<div class="application">
		<ul class="clear">
			<li v-for="item in logo">
				<router-link :to="item.hres"><img src="../../images/logo.png" :alt="item.name" @click="item.name == '删除token' && delCookie()"></router-link>
				<span>{{item.name}}</span>
			</li>
			
		</ul>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				cookie: this.$cookie.getCookie('token'),
				logo: [
					{'hres':'javascript:void(0)','srcs':'../../images/logo.png','name':'公告'},
					{'hres':'/department','srcs':'../../images/logo.png','name':'通讯录'},
					{'hres':'javascript:void(0)','srcs':'../../images/logo.png','name':'邮箱'},
					{'hres':'/duanxin','srcs':'../../images/logo.png','name':'短信'},
					{'hres':'/daibanfawen','srcs':'../../images/logo.png','name':'代办发文'},
					{'hres':'/fawenxiangqing','srcs':'../../images/logo.png','name':'发文办理'},
					{'hres':'/daibanshouwen','srcs':'../../images/logo.png','name':'代办收文'},
					{'hres':'/shouwenxiangqing','srcs':'../../images/logo.png','name':'收文办理'},
					{'hres':'javascript:void(0)','srcs':'../../images/logo.png','name':'666'},
					{'hres':'/','srcs':'../../images/logo.png','name':'删除token'},
					{'hres':'javascript:void(0)','srcs':'../../images/logo.png','name':'协办办理'}
				],
				login:{
					"account": "zhangjianheng",
					"password": "z4kWv+EbFqly64GKHJ+Yvw==",
					"systemId": "0"
				},
			}
		},
		mounted: function() {
			if(location.href.indexOf('token') > -1) {
				let hre = this.funcUrlDel('token');

				console.log(hre);
				location.href = hre
				// location.href = hre;
			}
			// location.href = 'home';
			console.log(this.getUrlParam('token'))
		},
		//行为
		methods: {
			delCookie() {
				
				this.$cookie.delCookie('token');
			},
			getUrlParam(name) {
    			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    			var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
    			if (r != null) return unescape(r[2]); return null; // 返回参数值
    		},
			funcUrlDel(name){
			    var loca = window.location;
			    var baseUrl = loca.origin + loca.pathname + "?";
			    var query = loca.search.substr(1);
			    if (query.indexOf(name)>-1) {
			        var obj = {}
			        var arr = query.split("&");
			        for (var i = 0; i < arr.length; i++) {
			            arr[i] = arr[i].split("=");
			            obj[arr[i][0]] = arr[i][1];
			        };
			        delete obj[name];
			        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
			        return url
			    };
	
			}
		}	
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	@import url("../../style/mixin");
	@import url("/home");

</style>