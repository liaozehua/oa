<template>
	<div>
		<search  @searchData="searchData"></search>
		<div class="fawen">
			<div class="fawen-primary">
				<p class="fawen-banli">
					<span  class="mgl15" :class="{bot3: fawen}" @click="Tab2">待办理</span>
					<span :class="{bot3: banli}" @click="Tab">已办理</span>
				</p>
				<span class="mgr15">新建</span>
			</div>
		</div>
		<!-- 待办理 -->
		<div class="infoContent" v-for="mess in message" @click="goshouwenxiangqing(mess.formId,mess.nodeId,mess.isSignIn)" v-if="fawen">
			<div class="infoContent-primary">
				<p class="font15 hei44">{{mess.title}}</p>
				<p class="mgt15 hei20"><span>{{mess.departmentName}}</span><time>{{timeFormat(mess.applyTime)}}</time></p>
			</div>
		</div>

		<!-- 已办理 -->
		<div class="infoContent" v-if="banli" v-for="mess in message2" @click="goshouwenxiangqing2(mess.formId,mess.nodeId,mess.isSignIn)">
			<div class="infoContent-primary">
				<p class="font15 hei44">{{mess.title}}</p>
				<p class="mgt15 hei20">
					<span>{{mess.departmentName}}</span>
					<time>{{timeFormat(mess.applyTime)}}</time>
				</p>
			</div>
		</div>

	</div>
</template>

<script>
	import Search from '../../components/search/search';
	export default {
		
		name: 'daiBanFaWen',
		//引用外部组件
		components: {
			Search
		},
		//数据源
		data() {
			return {
				// 待办列表参数
				todoList: {
					"pageSize":30,	
					"pageIndex":1,
					"keyWord": ''
				},
				// 待办列表信息
				message: [],
				//已办列表信息
				message2 : [],
				// 切换
				fawen: true,
				banli: false
			}
		},
		//跟随页面加载 只执行一次
		mounted: function() {
			this.loadTodoList();
			this.loadWasList();
			
		},
		//行为
		methods: {
			//加载 todoList 接口数据
			loadTodoList() {
				let that = this;
				this.$http.post('api-office/receivefile/commonform/todoList',this.todoList,function(response) {
					that.message = response.data.result.list;
				});
			},
			//加载 wasList 接口数据
			loadWasList() {
				let that = this;
				this.$http.post('api-office/receivefile/commonform/wasList',this.todoList,function(response) {
					that.message2 = response.data.result.list;
					that.isFlow = that.message.isFlow;
				});
			},
			//搜索
			searchData(key) {
				this.todoList.keyWord = key;
				this.loadTodoList();
				this.loadWasList();
			},
			// 跳转到收文详情
			goshouwenxiangqing: function(formId,nodeId,isSignIn) {
				this.$cookie.setCookie('formId',formId);
				this.$cookie.setCookie('nodeId',nodeId);
				this.$cookie.setCookie('isSignIn',isSignIn);
				this.$router.push({
					path: '/shouwenxiangqing',
					name: 'shouWenXiangQing',
				})
				
			},
			// 跳转到已办收文
			goshouwenxiangqing2: function(formId,nodeId,isSignIn) {
				this.$cookie.setCookie('formId',formId);
				this.$cookie.setCookie('nodeId',nodeId);
				this.$cookie.setCookie('isSignIn',isSignIn);
				this.$router.push({
					path: '/shouwenxiangqing2',
					name: 'shouWenXiangQing2',
				})
				
			},
			add0(m){
	      		return m<10?'0'+m:m 
	      	},
			//时间戳转化成时间格式
			timeFormat(timestamp){
			  //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
			    let time = new Date(timestamp);
			    let year = time.getFullYear();
			    let month = time.getMonth()+1;
			    let date = time.getDate();
			    let hours = time.getHours();
			    let minutes = time.getMinutes();
			    let seconds = time.getSeconds();
			    return year+'-'+this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes)+':'+this.add0(seconds);
			},
			getParams() {  
		       	console.log(routerParams);
	      	},
	      	//切换到办理流程，并加载办理流程数据
			Tab: function() {
				let that = this;
				this.fawen = false;
				this.banli = true;
				// 办理流程
				
			},
			Tab2: function() {
				this.fawen = true;
				this.banli = false;
			},
		},
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
	@import url("../../style/mixin");
	@import url("/daiBanShouWen");
</style>