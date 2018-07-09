<template>
	<div>
		<search></search>
		<div class="duanxin">
			<div class="duanxin-primary">
				<p class="duanxin-box"><span class="bot3">发件箱</span></p>
				<p class="duanxin-button"><span @click="goFaDuanXin">发短信</span></p>
			</div>

		</div>

		<div class="duanxin-wrap">
			<div class="duanxin-wrap-xinxi">
				<img src="../../assets/duanxin.png" alt="">
				<span>熊波波</span>
				<time>18：31</time>
			</div>
			<p>口语通更新通知(更新后的应用版本为5.1.6)</p>
		</div>
	</div>
</template>

<script>
	import Search from '../../components/search/search'
	export default {
		// 外部公共组件
		components: {
			Search,
		},
		//数据源
		data() {
			return {

			}
		},
		//生命周期，随页面刷新而加载
		mounted: function() {

		},
		//行为
		methods: {
			goFaDuanXin: function() {
				this.$router.push('faduanxin');	//跳转到发短信页面
			}
		}
		
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import url("../../style/mixin");
@import url("/duanxin");
</style>