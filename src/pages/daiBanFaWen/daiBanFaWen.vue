<template>
	<div>
		<search @searchData="searchData"></search>
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
		<!-- <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
            <ul>
                <li v-for="(item,index) in listdata">{{item.name}}</li>
                <li v-for="(item,index) in downdata">{{item.name}}</li>
            </ul>
        </vscroll> -->
        <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
        	<div>
        		<div class="infoContent" v-for="mess in message" @click="gofawenxiangqing(mess.formId,mess.nodeId,mess.isSignIn,mess.isFlow)" v-if="fawen">
					<div class="infoContent-primary">
						<p class="font15 hei44">{{mess.title}}</p>
						<p class="mgt15 hei20"><span>{{mess.departmentName}}</span><time>{{timeFormat(mess.applyTime)}}</time></p>
					</div>
				</div>
        	</div>
        </vscroll>	
		<!-- <div class="infoContent" v-for="mess in message" @click="gofawenxiangqing(mess.formId,mess.nodeId,mess.isSignIn,mess.isFlow)" v-if="fawen">
			<div class="infoContent-primary">
				<p class="font15 hei44">{{mess.title}}</p>
				<p class="mgt15 hei20"><span>{{mess.departmentName}}</span><time>{{timeFormat(mess.applyTime)}}</time></p>
			</div>
		</div> -->

		<!-- 已办理 -->
			<div>
				<div class="infoContent" v-if="banli" v-for="mess in message2" @click="gofawenxiangqing3(mess.formId,mess.nodeId,mess.isSignIn)">
					<div class="infoContent-primary">
						<p class="font15 hei44">{{mess.title}}</p>
						<p class="mgt15 hei20">
							<span>{{mess.departmentName}}</span>
							<time>{{timeFormat(mess.applyTime)}}</time>
						</p>
					</div>
				</div>
			</div>	
	</div>
</template>

<script>
	import Search from '../../components/search/search';
	import Vscroll from "../../components/index"
	export default {
		
		name: 'daiBanFaWen',
		//引用外部组件
		components: {
			Search,
			Vscroll
		},
		//数据源
		data() {
			return {
				// 待办列表参数
				todoList : {
					"pageSize":8,	
					"pageIndex":1,
					"keyWsord" : ''
				},
				wasList: {
					"pageSize":8,	
					"pageIndex":1,
					"keyWsord" : ''
				},
				// 待办列表信息
				message : [],
				//已办列表信息
				message2 : [],
				isFlow : true,
				// 切换
				fawen: true,
				banli: false,
				// 加载数据
                scrollData:{
                    noFlag: false //暂无更多数据显示
                }
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
				console.log(that.todoList);
				that.$http.post('api-office/office/sendfile/todoList',that.todoList,function(response) {
					console.log(response.data.result.list);
					that.message = response.data.result.list;
					that.isFlow = that.message.isFlow;
				
				});
			},
			//加载 wasList 接口数据
			loadWasList() {
				let that = this;
				that.$http.post('api-office/office/sendfile/wasList',that.wasList,function(response) {
					that.message2 = response.data.result.list;
					
				});
			},
			//上啦刷新
            onRefresh(done) {
            	this.todoList.pageIndex = 1;
                this.loadTodoList();
                done(); // call done
            },
			//下拉加载
            onInfinite(done) {
            	let that = this;
            	let more = this.$el.querySelector('.load-more');
            	that.todoList.pageIndex++;
            	that.$http.post('api-office/office/sendfile/todoList',that.todoList,function(response) {
            		let data = response.data.result.list;
            		debugger;
            		that.message = that.message.concat(data);
					that.isFlow = that.message.isFlow;
					more.style.display = 'none'; //隐藏加载条
					done();
            		if(data.length < 8) {
            			more.style.display = 'none'; //隐藏加载条
            			//走完数据调用方法
                        that.scrollData.noFlag = true;
            		}	
            	})
            },
			// hasFlow 为true跳转到有流程页面，为false 跳转到无流程页面
			gofawenxiangqing(formId,nodeId,isSignIn,isFlow) {
				this.$cookie.setCookie('formId',formId);
				this.$cookie.setCookie('nodeId',nodeId);
				this.$cookie.setCookie('isSignIn',isSignIn);
				if(isFlow) {
					this.$router.push({
						path: '/fawenxiangqing',
						name: 'faWenXiangQing',
					})
				}else {
					this.$router.push({
						path: '/fawenxiangqing2',
						name: 'faWenXiangQing2',
					})
				}
				
			},
			//待办发文之已已办详情页面
			gofawenxiangqing3(formId,nodeId,isSignIn) {
				this.$cookie.setCookie('formId',formId);
				this.$cookie.setCookie('nodeId',nodeId);
				this.$cookie.setCookie('isSignIn',isSignIn);
				this.$router.push({
					path: '/fawenxiangqing3',
					name: 'faWenXiangQing3',
				})
			},
			//搜索
			searchData(key) {
				this.todoList.keyWord = key;
				this.loadTodoList();
				this.loadWasList();
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
			    return this.add0(month)+'-'+this.add0(date)+' '+this.add0(hours)+':'+this.add0(minutes);
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
	@import url("/daiBanFaWen");
	
</style>