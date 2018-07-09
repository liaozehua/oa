<template>
	<div class="cell cell-access">
		<div class="cell-primary">
			<p class="contacts font15">
				<a @click="load">通讯录</a>
				<i></i>
				<template v-for="item in contacts">
					<a @click="gainId(item.departmentId)" :data-id="item.departmentId">{{item.departmentName}}</a>
					<i></i>
				</template>
				
			</p>
			
		</div>
		
	</div>
</template>

<script>
	export default {
		// 数据源
		data() {
			return	{

			}
		},
		// 父组件传参
		props: ['contacts'],
		// 生命周期
		mounted: function() {
		},
		// 行为
		methods: {
			load: function() {
				this.$emit('gainData',-1)
			},
			gainId: function(id) {
				this.$emit('gainData',id);
			}
		}
	}
</script>

<style lang="less" scoped rel="stylesheet/less">
	@import url("/contacts");
</style>