<template>
	<div>
		<div class="infoHead infoHead-access">
			<div class="infoHead-primary">
				<div class="infoHead-img">
					<img src="../../assets/logo.png" alt="" width="48" height="48">
				</div>
				<div class="infoHead-info">
					<p class="font15 name" :data-id="info.userId">{{info.name}}</p>
					<p class="font13 info">
						<span>性别：</span>
						<span>{{info.sex}}</span>
					</p>
				</div>
				<div class="infoHead-phone">
					<a :href="'tel:' + info.enterTime">
						<span class="iconfont icon-dianhua"></span>
					</a>
				</div>
				<div class="infoHead-sms">
					<a href="sms:15018837645" :href="'sms:' + info.enterTime">
						<span class="iconfont icon-duanxin"></span>
					</a>
				</div>

			</div>
			<div class="infoHead-ft"></div>
		</div>
		<div class="infoContent">
			<div class="infoContent-primary">
				<p class="font13">部门</p>
				<p class="font15 mg10">{{info.departmentName}}</p>
			</div>
		</div>

		<div class="infoContent">
			<div class="infoContent-primary">
				<p class="font13">职位</p>
				<p class="font15 mg10">{{info.positionName}}</p>
			</div>
		</div>	

		<div class="infoContent">
			<div class="infoContent-primary">
				<p class="font13">手机</p>
				<p class="font15 mg10"><a href="tel:110">110</a>{{info.phone}}</p>
			</div>
		</div>	

		<div class="infoContent">
			<div class="infoContent-primary">
				<p class="font13">邮箱</p>
				<p class="font15 mg10">{{info.email}}</p>
			</div>
		</div>

		<div class="infoContent">
			<div class="infoContent-primary">
				<p class="font13">入职时间</p>
				<p class="font15 mg10">{{info.enterTime}}</p>
			</div>
		</div>			
			
		</div>
	</div>
	
</template>
<script>
	export default {
		//数据源
		data() {
			return {
				sex: ''
			}
		},
		// 接收父组件传过来的参数
		props: ['info'],
		// 生命周期，跟随页面加载
		mounted: function() {
		},
		// 行为集合
		methods: {

		}
	}
</script>

<style lang="less" scoped rel="stylesheet/less">
	@import url("/info");
</style>