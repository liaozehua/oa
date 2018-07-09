<template>
	<div>
		<mail-list v-if="ifMail" @getArr="getArr" :getName="getName"></mail-list>
		<div v-if="!messShow && !ifMail">
			<div class="fawen">
				<div class="fawen-primary">
					<p class="fawen-banli" @click="Tab2"><span :class="{bot3: fawen}">收文办理</span></p>
					<p class="fawen-guocheng" @click="Tab"><span :class="{bot3: banli}">办理过程</span></p>
				</div>
			</div>
			<!-- 办理过程 -->
			<div class="fawen-wrap" v-show="fawen">
				<div class="fawen-title">
					<div class="fawen-title-primary">
						<p class="font15 hei44">{{bastInfo.title}}</p>
						<p class="font13 hei20">发文单位: {{bastInfo.departmentName}}</p>
						<p class="font13 hei20">文件号: {{bastInfo.docNo}}</p>
					</div>
				</div>
				<div>
					<div class="fawen-content" >
						<div class="fawen-content-primary">
							<p class="font15">
								<span>正文内容</span>
								<!-- <a class="fr" @click="downDocViewName(bastInfo.docViewName)">{{bastInfo.docViewName}}</a> -->
								<a class="fr" :href="'http://13512799741.imwork.net:23605/api-office/receivefile/commonform/downLoadDocFile?formId='+formId">{{bastInfo.docViewName}}</a>
							</p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" v-for="(file,index) in fileList">
						<div class="fawen-content-primary">
							<p class="font15">
								<span v-show="!index > 0">附件下载</span>
								<!-- <a class="fr" @click="downFile(file.attachmentId,file.oldFileName)">{{file.oldFileName}}</a> -->
								<a class="fr" :href="'http://13512799741.imwork.net:23605/api-office/receivefile/commonform/downLoadFile?fileId='+file.attachmentId+'&formId='+formId">{{file.oldFileName}}</a>
							</p>

						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" @click="shouJianRen('审批意见')">
						<div class="fawen-content-primary">
							<p class="font15"><span>审批意见</span><a class="fr">{{mess}}</a></p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" @click="getBanLiYiJian()">
						<div class="fawen-content-primary">
							<p class="font15"><span>办理意见</span><a class="fr"></a></p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>

				<div v-if="!isSignIn">
					<div class="fawen-content" @click="shouJianRen('执行动作')" v-if="ifZhiXingDongZuo">
						<div class="fawen-content-primary">
							<p class="font15">
								<span>执行动作</span>
								<a class="fr">{{zhiXingDongZuoShow}}</a>
							</p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" @click="getNextNodeBanLiRen('下一环节办理人')" v-if="ifJieShouRen" v-show="ifZhiXingDongZuo">
						<div class="fawen-content-primary">
							<p class="font15">
								<span>下一环节办理人</span>
								<a class="fr" v-if="userName1 === []">选择成员</a>
								<a class="fr" v-else="userName1">{{userName1}}</a>
							</p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>
					<div class="fawen-content" @click="shouJianRen('短信提醒')" v-if="ifDuanXin" v-show="ifZhiXingDongZuo">
						<div class="fawen-content-primary">
							<p class="font15"><span>短信提醒</span><a class="fr">{{duanXinShow}}</a></p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>
					<div class="fawen-content" @click="getNextNodeBanLiRen('抄送')" v-show="ifZhiXingDongZuo">
						<div class="fawen-content-primary">
							<p class="font15">
								<span>抄送</span>
								<a class="fr" v-if="userName2 === []">选择成员</a>
								<a class="fr" v-else="userName2">{{userName2}}</a>
							</p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>
				
				</div>
				</div>
				
				<div class="fawen-footer">
					<div class="fawen-footer-warp">
						<div class="fawen-footer-button">
							<a href="javascript:void(0)"  @click="wanChengBanLi()" v-if="!isSignIn">完成办理</a>
							<a href="javascript:void(0)"  v-if="isSignIn" @click="qianShou()">签收</a>
						</div>
						
					</div>
				</div>
			</div>	

			<!-- 办理流程 start-->
			<div class="banli-wrap" v-show="banli">
				<div class="fawen-title" v-for="(mess,index) in liucheng">
					<div class="fawen-title-primary">
						<p class="hei44">
							<span class="font15 wt210">{{index + 1 + '.'}} {{mess.nodeName}}</span>
							<time class="time2">{{timeFormat(mess.executeTime)}}</time>
						</p>
						<p class="font13 hei20">
							<span>{{mess.userName}}</span>
							<span class="fr">{{mess.content}}</span>
							<!-- <span class="jinxingzhong" v-else>进行中</span> -->
						</p>
					</div>
				</div>
			</div>
			<!-- 办理流程 ned -->

			
			
			<!-- 弹窗内容 start-->
			<transition name="popop">	
				<div class="popop" v-show="popShow"> 
					<!-- 审批意见 -->
					<div class="bor1" v-if="isPanDuan === '审批意见'" v-for="item in shenPiYiJian" @click="getShenPiYiJian(item)">
						<p>{{item}}</p>
					</div>
					<!-- 短信 -->
					<div class="bor1" v-if="isPanDuan === '短信提醒'" v-for="item in duanXinTiXing" @click="getDuanXinTiXing(item)">
						<p>{{item.name}}</p>
					</div>
	
					<!-- 执行动作 -->
					<div class="bor1" v-if="isPanDuan === '执行动作'" v-for="item in zhiXingDongZuo" @click="getZhiXingDongZuo(item)">
						<p>{{item.describe}}</p>
					</div>

					<div class="mgt10" @click="shouJianRen">
						<p>取消</p>
					</div>
				</div>
			</transition>
			<!-- 弹窗内容 end -->
 
 			<!-- 遮罩层 start-->
			<transition name="mask">	
				<div id="mask" v-show="popShow" @click="shouJianRen">
					
				</div>
			</transition>
			<!-- 遮罩层 end -->
		</div>
		<!-- 办理意见 start -->
		<div class="banLiYiJian" v-if="messShow">
			<div class="banLiYiJian-content">
				<textarea name="neirong" rows="10" autofocus="autofocus" placeholder="请输入办理意见"	 v-model="mess"></textarea>
			</div>
			<div class="banLiYiJian-complete">
				<div>
					<a href="javascript:void(0)" @click="getBanLiYiJian()">完成</a>
				</div>
				
			</div>
		</div>
		<!-- 办理意见 end -->
	</div>
</template>

<script>
	import mailList from '../mailList/mailList'
	export default {
		
		name: 'faWenXiangQing',
		//引用外部组件
		components: {
			mailList
		},
		//数据源
		data() {
			return {
				ifMail: false,
				getName: '',
				// userName1 存放下一环节办理人选中的成员，userName2 存放抄送选中的成员
				userName1:'',
				userName2:'',
				formId: this.$cookie.getCookie('formId'),
				// 结束与作废环节短信提醒不显示
				ifDuanXin: true,
				//退回环节接收人不显示
				ifJieShouRen: true,
				//判断执行动作存在否
				ifZhiXingDongZuo: true,
				// 是否签收
				isSignIn: this.$cookie.getCookie('isSignIn') == 1 ? true : false,
				//办理意见显示
				messShow: false,
				// 是否发送短信
				msg: false,
				//审批意见
				shenPiYiJian:['同意','不同意'],
				// 办理意见内容
				mess: '同意',
				
				
				// 发文办理接口 参数  使用cookie   防止页面刷新失效
				todoInfo: {
				  	'formId': this.$cookie.getCookie('formId'),
				  	'nodeId': this.$cookie.getCookie('nodeId'),
				  	'isSignIn': this.$cookie.getCookie('isSignIn') == 1 ? true : false
				},
				// 办理流程接口参数
				handleProcessInfoList: {
					'formId': this.$cookie.getCookie('formId')
				},
				

	
				// 完成办理接口参数
				nextStep : {
	      			'content': '',
	      			'copyUserIdList': [],
	      			'formId' : this.$cookie.getCookie('formId') + '',
	      			'msg': false,
	      			'nextNodeExecuteUserIdList': [],
	      			'nextNodeItemId':'',
	      			'nowNodeId': this.$cookie.getCookie('nodeId') + '',
	      		},
				//判断弹窗
				popShow: false,		
				

				// 短信提醒
				duanXinTiXing: [{'name':'发送'},{'name':'不发送'}],
				// 短信提醒显示
				duanXinShow:'不发送',

				// 执行动作
				zhiXingDongZuo: [],
				//执行动作显示
				zhiXingDongZuoShow:'',
			
				// 判断是哪个弹窗内容
				isPanDuan: '',
				// 协议
				bastInfo:'',
				//附件下载
				fileList:[],
								
				// 流程
				liucheng: [],
				// 切换
				fawen: true,
				banli: false

			}
		},
		//跟随页面加载 只执行一次
		mounted: function() {
			this.loadTodoInfo()
			this.loadHandleProcessInfoList();

		},
		//行为
		methods: {
			//加载 todoInfo 接口数据
			loadTodoInfo() {
				let that = this;
				this.$http.post('api-office/receivefile/commonform/todoInfo',that.todoInfo,function(response) {
					if (response.status === 200) {
						let data = response.data.datamap
						that.bastInfo = data.bastInfo;
						that.fileList = data.fileList;
						if(!that.isSignIn) {
							that.loadSandlingOpinions();
							if(data.nextNodeItemList) {
								that.ifZhiXingDongZuo = true
								that.zhiXingDongZuo = data.nextNodeItemList;
								that.zhiXingDongZuoShow = that.zhiXingDongZuo[0].describe;
								that.nextStep.nextNodeItemId = that.zhiXingDongZuo[0].code;
							}else {
								that.loadSignInOpinions()
								that.ifZhiXingDongZuo = false;
							}
							
						}
					
					}	
				});
			},
			//加载 handleProcessInfoList 接口数据
			loadHandleProcessInfoList() {
				let that = this;
				this.$http.post('api-office/receivefile/commonform/handleProcessInfoList',that.handleProcessInfoList,function(response) {
					if(response.status === 200) {
					 	if(response.data.code === 1) {
						 	that.liucheng = response.data.list;
					 	}
					}
				})
			},
			//加载办理意见
			loadSandlingOpinions() {
				let that = this;
				that.$http.post('api-office/office/sendfile/sandlingOpinions',{},function(response) {
					if(response.status === 200) {
					 	if(response.data.code === 1) {
						 	that.shenPiYiJian = response.data.result;
					 	}
					}
				})
			},
			//加载签收意见
			loadSignInOpinions() {
				let that = this;
				that.$http.post('api-office/office/sendfile/signInOpinions',{},function(response) {
					if(response.status === 200) {
					 	if(response.data.code === 1) {
						 	that.shenPiYiJian = response.data.result;
					 	}
					}
				})
			},
			// 弹出框
			// 审批意见
			getShenPiYiJian(str) {
				this.mess = str;
				this.mess = str;
		    	this.popShow = !this.popShow;
			},
			// 短信提醒
			getDuanXinTiXing(str) {
				if(str.name === '不发送') {
					this.msg = false;
				}else if(str.name === '发送'){
					this.msg = true;
				}
				this.duanXinShow = str.name;
		    	this.popShow = !this.popShow;
			},
			
	      
	      	// 执行动作
	      	getZhiXingDongZuo(str) {
	      		if(str.describe === '结束' || str.describe === '作废') {
	      			this.ifJieShouRen = false;
	      			this.ifDuanXin = false;
	      		}else if(str.describe === '退回'){
	      			this.ifJieShouRen = false;
	      			this.ifDuanXin = true;
	      		}else {
	      			this.ifJieShouRen = true;
	      			this.ifDuanXin = true;
	      		}
	      		this.nextStep.nextNodeItemId = str.code;
	      		this.zhiXingDongZuoShow = str.describe;
	      		this.popShow = !this.popShow;
	      		
	      	},
	      	// 下一环节办理人  与抄送
	      	getNextNodeBanLiRen(str) {
	      		this.ifMail = true;
	      		this.getName = str;
	      		// this.$router.push({
         //            path: '/mailList',
         //            name: 'mailList',
         //            query: {
         //                'name' : 'shouWenXiangQing',
         //                'chaoSong': 'chaoSong'
         //            }
         //        })
	      	},
	      	//下一环节办理人 与抄送 数据获取
	      	getArr(data) {
	      		this.ifMail = false;
	      		if(data.name == '下一环节办理人') {
	      			this.userName1 = [];
		      		for(let i=0, len = data.arr.length; i < len; i++) {
						this.nextStep.nextNodeExecuteUserIdList.push(data.arr[i].userId);
						this.userName1.push(data.arr[i].userName);
					}
					this.userName1 = this.userName1.join(',');
	      		}else if(data.name === '抄送') {
	      			this.userName2 = [];
	      			this.nextStep.copyUserIdList = [];
		      		for(let i=0, len = data.arr.length; i < len; i++) {
						this.nextStep.copyUserIdList.push(data.arr[i].userId);
						this.userName2.push(data.arr[i].userName);
					}
					this.userName2 = this.userName2.join(',');
	      		}
	      		
	      		
	      	},

	      	// 
	      	shouJianRen(str) {
	      		this.isPanDuan = str;
	      		this.popShow = !this.popShow;
	      	},
		    // 弹出框选项
		    showItem: function(item) {
		    	this.popShow = !this.popShow;
		    	
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
	      	
	      	//签收
	      	qianShou() {
				let that = this;
				let signIn = {
					"content": that.mess,
					"formId": this.$cookie.getCookie('formId')
				}

				this.$http.post('api-office/receivefile/commonform/signIn',signIn,function(response) {
					console.log(response);
					debugger
					if (response.status === 200) {
						alert('操作成功！');
						that.$router.push('daibanshouwen');
						
					}
				});
	      	},
	      	// 完成办理
	      	wanChengBanLi() {
	      		let that = this;
	      		
	      		that.nextStep.content = that.mess;
	      		that.nextStep.msg = that.msg;

	      		console.log(that.nextStep);
	      		debugger;
	      		this.$http.post('api-office/receivefile/commonform/nextStep',that.nextStep,function(response) {
					console.log(response);
					if (response.status === 200) {
						alert('操作成功！');
						that.$router.push('daibanshouwen');
						
					}
				});
	      	},
	      	// 办理意见
	      	getBanLiYiJian() {
	      		this.messShow = !this.messShow;
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
	      
	      	
		},

	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import url("../../style/mixin");
@import url("/shouWenXiangQing");



</style>