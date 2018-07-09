<template>
	<div>

		<div class="fawen">
			<div class="fawen-primary">
				<p class="fawen-banli" @click="Tab2">
					<span :class="{bot3: fawen}">发文办理</span>
				</p>
				<p class="fawen-guocheng" @click="Tab">
					<span :class="{bot3: banli}">办理过程</span>
				</p>
			</div>
		</div>
		<!-- 办理过程 -->
		<div class="fawen-wrap" v-if="fawen">
			<h3>{{bastInfo.title}}</h3>
			<p>
				<span>发文单位:</span>
				<span>{{bastInfo.departmentName}}</span>
			</p>

			<p>
				<span>文件号</span>
				<span>{{bastInfo.docNo}}</span>
			</p>

			<p>
				<span>正文内容</span>
				<span>{{bastInfo.docViewName}}</span>
			</p>

			<p v-for="mess in fileList">
				<span>附件下载</span>
				<span>{{mess.oldFileName}}</span>
			</p>

			<p>
				<span>审批意见</span>
				<span>{{content}}</span>
			</p>

			<p>
				<span>办理意见</span>
				<span>{{content}}</span>
			</p>
		</div>


		<div class="banli-wrap" v-if="banli">
			<div class="fawen-title" v-for="(mess,index) in liucheng">
				<div class="fawen-title-primary">
					<p class="hei44">
						<span class="font15 wt210">{{index + 1 + '.'}} {{mess.nodeName}}</span>
						<time class="time2">{{timeFormat(mess.executeTime)}}</time>
					</p>
					<p class="font13 hei20">
						<span>{{mess.userName}}</span>
						<span class="fr" v-if="mess.executeFlag">{{mess.content}}</span>
						<span class="jinxingzhong" v-else>进行中</span>
					</p>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>

	export default {
		
		name: 'faWenXiangQing',
		//引用外部组件
		components: {
		},
		//数据源
		data() {
			return {
				wasDoDetails: {
					'formId' : this.$cookie.getCookie('formId'),
					'nodeId' : this.$cookie.getCookie('nodeId'),
					'isSignIn' : this.$cookie.getCookie('isSignIn')
				},		
				handleProcessInfoList: {
					'formId': this.$cookie.getCookie('formId')
				},
				content: '',
				bastInfo: {},
				fileList: [],			
				// 流程
				liucheng: [],
				// 切换
				fawen: true,
				banli: false

			}
		},
		//跟随页面加载 只执行一次
		mounted: function() {
			this.loadWasDoInfo();
			this.loadHandleProcessInfoList();
		},
		//行为
		methods: {
			//加载 wasDoInfo 接口数据
			loadWasDoInfo() {	
				let that = this;		
				that.$http.post('api-office/receivefile/commonform/wasDoInfo',that.wasDoDetails,function(response) {
					let data = response.data.datamap;
					that.bastInfo = data.bastInfo;
					that.fileList = data.fileList
					that.content = data.content;
					
				});
			},
			//加载 handleProcessInfoList 接口数据
			loadHandleProcessInfoList() {
				let that = this;
				this.$http.post('api-office/receivefile/commonform/handleProcessInfoList',that.handleProcessInfoList,function(response) {
					console.log(response);
					if(response.status === 200) {
					 	if(response.data.code === 1) {
						 	that.liucheng = response.data.list;
					 	}
					}
				})
			},
			//切换到办理流程，并加载办理流程数据
			Tab: function() {
				let that = this;
				this.fawen = false;
				this.banli = true;
				
			},
			Tab2: function() {
				this.fawen = true;
				this.banli = false;
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

		}
	}	
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import url("../../style/mixin");
@import url("/shouWenXiangQing");
.fawen-wrap {
	.mgb(0);
	.pdl(15px);
	.pdt(20px);
	.wh(100%,100%);
	position: fixed;
	background-color: #fff;
	h3 {
		.mgb(10px);
		.sc(15px,#000);
	}
	p {
		padding: 5px 0;
		span {
			.sc(13px,#999);
		}
	}
}


</style>