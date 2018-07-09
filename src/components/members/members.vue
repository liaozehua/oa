<template>
	<div>
		<div class="members members-access" v-for="item in members" @click="userId(item.userId)" :data-id="item.userId">
			<div class="members-primary">
				<div class="members-img">
					<img src="../../assets/logo.png" alt="" width="48" height="48">
				</div>
				<div class="members-info">
					<p class="font15 name" :data-id="item.userId">{{item.userName}}</p>
					<p class="font13 info">
						<span class="iconfont icon-order_fill"></span>
						<span class="job">{{item.positionName}}</span>
						<span class="iconfont icon-dianhua"></span>
						<span></span>
					</p>
				</div>

			</div>
			<div class="members-ft"></div>
		</div>
	</div>	
</template>
<script>
	export default {
		//数据源
		data() {
			return {
				
			}
		},
		props:['members'],
		// 生命周期，跟随页面加载
		mounted: function() {
		},
		// 行为集合
		methods: {
			userId: function(id) {
				this.$cookie.setCookie('userId',id);		//传用户id
				this.$router.push('memberInfo');	//跳转到用户信息页面
			},
			text: function(id) {
				alert('调用members子组件并传参数：'+id);
			}

		}
	}
</script>

<style lang="less" scoped rel="stylesheet/less">
	@import url("/members");
</style>