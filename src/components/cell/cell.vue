<template>
	<div>
		<!-- 部门 -->
		<div class="cell cell-access" @click="gainId(item.departmentId)" v-for="item in department" :data-id="item.departmentId">
			<div class="cell-primary">
				<p class="font15">{{item.departmentName}}</p>
			</div>
			<div class="cell-ft"></div>
		</div>
	</div>	
</template>
<script>
	export default {
		name:'cell',
		//数据源
		data() {
			return {
				routers: this.$store.state.routers,	//判断是跳到哪个页面	
				hrefs: window.location.href,
				parameter: {						//接口参数
		        	"departmentId": this.$store.state.departmentId,
			        "isSearch": false,
			        "keyword":""
		      	},
			}
		},
		props:['company','department'],
		// 生命周期，跟随页面加载
		mounted: function() {
			if(this.hrefs.indexOf('mailList') > 0) {
				this.routers = 'department';
			}else if(this.hrefs.indexOf('department') > 0) {
				this.routers = 'member';
			}
		},
		// 行为集合
		methods: {
			goRouter: function() {
				// this.$router.push(this.routers);
		    },
		    gainId: function(id) {
		    	this.$store.state.departmentId = id;
		 		this.$emit('gainData',id);
		    },
		}
	}
</script>

<style lang="less" scoped rel="stylesheet/less">
	@import url("/cell");
</style>