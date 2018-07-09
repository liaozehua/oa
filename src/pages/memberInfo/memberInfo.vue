<template>
	<div>
		<Info :info="info"></Info>
	</div>
</template>

<script>
	import Info from '../../components/info/info'
	export default {
		// 数据源
		data() {
			return {
				//用户ID
				userId: {'userId':this.$cookie.getCookie('userId')},
				info: ''
				
			}
		},
		// 组件
		components: {
			Info
		},
		//生命周期
		mounted: function() {
			this.loadGetUserInfo();
		},
		
		//行为方法
		methods: {
			//加载 getUserInfo 接口数据
			loadGetUserInfo() {
				let that = this;
			    this.$http.post('/api-user/api/userInfo/getUserInfo',this.userId,function(response) {
			     
			      	that.info = response.data.datamap;
			      	if(that.info.sex === 0) {
			      		that.info.sex = '男'
			      	}else if(that.info.sex === 1) {
			      		that.info.sex = '女'
			      	}else if(that.info.sex === 2){
			      		that.info.sex = '未知'
			      	}
		
			    });
			},
			text: function() {
				console.log('测试一下');
			}
		} 
	}
</script>