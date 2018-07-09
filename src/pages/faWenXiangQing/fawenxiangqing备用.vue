<template>
	<div>
		<div v-if="!messShow">
			<div class="fawen">
				<div class="fawen-primary">
					<p class="fawen-banli" @click="Tab2"><span :class="{bot3: fawen}">发文办理</span></p>
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
								<a class="fr" :href="'http://13512799741.imwork.net:23605/api-office/office/sendfile/downLoadDocFile?formId='+formId">{{bastInfo.docViewName}}</a>
							</p>
						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" v-for="(file,index) in fileList">
						<div class="fawen-content-primary">
							<p class="font15">
								<span v-show="!index > 0">附件下载</span>
								<!-- <a class="fr" @click="downFile(file.attachmentId,file.oldFileName)">{{file.oldFileName}}</a> -->
								<a class="fr" :href="'http://13512799741.imwork.net:23605/api-office/office/sendfile/downLoadFile?fileId='+file.attachmentId+'&formId='+formId">{{file.oldFileName}}</a>
							</p>

						</div>
						<div class="fawen-content-ft"></div>
					</div>

					<div class="fawen-content" @click="shouJianRen('审批意见')">
						<div class="fawen-content-primary">
							<p class="font15"><span>审批意见</span><a class="fr">{{shenPiYiJianShow}}</a></p>
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
						<!-- 无关流程 start-->
						<div class="fawen-content" v-if="!hasFlow" @click="shouJianRen('执行动作')">
							<div class="fawen-content-primary">
								<p class="font15"><span>执行动作</span><a class="fr">{{zhiXingDongZuoShow}}</a></p>
							</div>
							<div class="fawen-content-ft"></div>
						</div>

						<div class="fawen-content" v-if="!hasFlow" @click="getNextNodeBanLiRen()">
							<div class="fawen-content-primary">
								<p class="font15"><span>下一环节办理人</span><a class="fr">选择成员</a></p>
							</div>
							<div class="fawen-content-ft"></div>
						</div>
						<!-- 无关流程end -->

						<!-- 有关流程 start-->
						<div class="fawen-content" v-if="nextNodeItemList.length > 0 && hasFlow" @click="shouJianRen('下一环节')">
							<div class="fawen-content-primary">
								<p class="font15"><span>下一环节</span><a class="fr">{{nextNodeItemListNameShow}}</a></p>
							</div>
							<div class="fawen-content-ft"></div>
						</div>

						<div class="fawen-content" v-if="nextNodeItemList.length > 0 && hasFlow" @click="shouJianRen('办理人')">
							<div class="fawen-content-primary">
								<p class="font15"><span>办理人</span><a class="fr">{{banLiRenShow}}</a></p>
							</div>
							<div class="fawen-content-ft"></div>
						</div>

						<!-- 有关流程end -->
						

						<div class="fawen-content" @click="shouJianRen('短信提醒')">
							<div class="fawen-content-primary">
								<p class="font15"><span>短信提醒</span><a class="fr">{{duanXinShow}}</a></p>
							</div>
							<div class="fawen-content-ft"></div>
						</div>
					</div>	

				</div>
				
				<div class="fawen-footer">
					<div class="fawen-footer-warp">
						<div class="fawen-footer-button" v-if="!isBack">
							<a href="javascript:void(0)" v-if="!isSignIn" @click="wanChengBanLi()">完成办理</a>
							<a href="javascript:void(0)" v-if="isSignIn" @click="qianShou()">签收</a>
						</div>
						<div class="fawen-footer-button" v-if="isBack">
							<a href="javascript:void(0)" class="fl" @click="wanChengBanLi()">完成办理</a>
							<a href="javascript:void(0)" class="fr" @click="shouJianRen('退回')">退回</a>
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
							<span class="fr" v-if="mess.content === '[同意]'">{{mess.content}}</span>
							<span class="jinxingzhong" v-else>进行中</span>
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
						<p>{{item.name}}</p>
					</div>
					<!-- 短信 -->
					<div class="bor1" v-if="isPanDuan === '短信提醒'" v-for="item in duanXinTiXing" @click="getDuanXinTiXing(item)">
						<p>{{item.name}}</p>
					</div>
					<!-- 退回 -->
					<div class="bor1" v-if="isPanDuan === '退回'" v-for="item in tuiHui" @click="hasFlow ? huiTui(item) : isHuiTui(item)">
						<p>{{item.nodeName}}[{{item.finalExecuteUserName}}]</p>
					</div>
					<!-- 下一环节 -->
					<div class="bor1" v-if="isPanDuan === '下一环节'" v-for="item in nextNodeItemList" @click="getNextNode(item)">
						<p>{{item.name}}</p>
					</div>
					<!-- 办理人 -->
					<div class="bor1" v-if="isPanDuan === '办理人'" v-for="item in banLiRen" @click="getBanLiRen(item)">
						<p  :data-id="item.userId">{{item.name}}</p>
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

	export default {
		
		name: 'faWenXiangQing',
		//引用外部组件
		components: {

		},
		//数据源
		data() {
			return {
				formId: this.$cookie.getCookie('formId'),
				// 办理意见内容
				mess: '同意',
				//办理意见显示
				messShow: false,
				// 是否签收
				isSignIn: this.$cookie.getCookie('isSignIn') == 1 ? true : false,
				// 是否发送短信
				msg: false,
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
				// 默认办理人环节ID 参数
				handLeUserInfoList : {
					'nodeItemId': '',
					'nodeId': ''
				},
				// 正文下载接口参数
				docViewName: {
					'formId': this.$cookie.getCookie('formId'),
					'fileName':''
				},
				// 附件下载接口参数
				files: {
					'formId': this.$cookie.getCookie('formId'),
					'fileId': ''
				},
				// 
				// 退回环节接口参数
				canBackNodeList: {
					'nodeId':'',
					'formId':''
				},
				// 完成办理接口参数
				nextStep : {
	      			'content': '',
	      			'formId' : this.$cookie.getCookie('formId') + '',
	      			'msg': false,
	      			'nextNodeExecuteUserIdList': [],
	      			'nextNodeItemId':'',
	      			'nowNodeId': this.$cookie.getCookie('nodeId') + '',
	      		},
				//判断弹窗
				popShow: false,		
				//审批意见
				shenPiYiJian:[{'name':'同意'},{'name':'不同意'}],
				// 审批意见显示
				shenPiYiJianShow:'同意',

				// 短信提醒
				duanXinTiXing: [{'name':'发送'},{'name':'不发送'}],
				// 短信提醒显示
				duanXinShow:'不发送',

				// 下一环节
				nextNodeItemList: [],
				// 下一环节名称显示
				nextNodeItemListNameShow:'',

				//默认办理人
				banLiRen: [],
				// 办理人显示
				banLiRenShow:'',

				// 执行动作
				zhiXingDongZuo: [],
				//执行动作显示
				zhiXingDongZuoShow:'',


				// 退回环节
				tuiHui: [],
			
				// 判断是哪个弹窗内容
				isPanDuan: '',
				// 协议
				bastInfo:'',
				//附件下载
				fileList:[],
				// 是否可退回
				isBack: false,
				// 是否可多人办理
				isMultiHandle: true,
				// 为true时开启其他办理人
				isOther: false,
				
				//true 时是自定义流程 false时是预设流程 
				hasFlow: true,
								
				// 流程
				liucheng: [
					{'flow':'1.开始','name':'番勇1','result':'同意','time1':'2018-06-02','time2':'04:33'},
					{'flow':'2.策划部审批','name':'番勇2','result':'同意','time1':'2018-06-02','time2':'04:33'},
					{'flow':'3.策划部总监审批','name':'番勇3','result':'同意','time1':'2018-06-02','time2':'04:33'},
					{'flow':'4.业务部副总经理审批','name':'番勇4','result':'同意','time1':'2018-06-02','time2':'04:33'},
					{'flow':'5.策划部执行','name':'番勇5','result':'进行中','time1':'2018-06-02','time2':'04:33'},
				],
				// 切换
				fawen: true,
				banli: false

			}
		},
		//跟随页面加载 只执行一次
		mounted: function() {
			let that = this;
			// 获取发文详情
			this.$http.post('api-office/office/sendfile/todoInfo',this.todoInfo,function(response) {
				console.log(response);
				if (response.status === 200) {
					let data = response.data.datamap
					that.bastInfo = data.bastInfo;
					
					that.docViewName.fileName = data.bastInfo.docViewName;
					that.fileList = data.fileList;
					

					that.isMultiHandle = data.isMultiHandle;

					if(!that.isSignIn) {
						that.isBack = data.isBack;
						that.hasFlow = data.hasFlow;
						// hasFlow 为true时是自定义流程   为false时是预设流程
						if (!that.hasFlow) {		//预设流程
							that.isOther = false;
							//显示执行动作，预设流程
							that.canBackNodeList.formId = that.$cookie.getCookie('formId') + '';
							that.canBackNodeList.nodeId = that.$cookie.getCookie('nodeId') + '';
							for (let j in data.nextNodeItemList) {
								that.zhiXingDongZuo.push(data.nextNodeItemList[j]);
							}
							that.zhiXingDongZuo.length = data.nextNodeItemList.length;
							console.log(that.zhiXingDongZuo);
							that.zhiXingDongZuoShow = that.zhiXingDongZuo[0].describe;
						}else {
							// 显示下一环节,自定义流程
							that.isOther = data.isOther;

							that.nextNodeItemList = data.nextNodeItemList;
							console.log(that.nextNodeItemList)
						
							that.nextNodeItemListNameShow = that.nextNodeItemList[0].name;
							that.nextStep.nextNodeItemId = that.nextNodeItemList[0].nextNodeItemId;
							// 默认办理人接口参数
							that.handLeUserInfoList.nodeItemId = data.nextNodeItemList[0].nextNodeItemId + '';
							that.handLeUserInfoList.nodeId = that.$cookie.getCookie('nodeId') + '';
							that.getFlow();
							// 退回环节接口参数
							if(that.isBack) {
								that.canBackNodeList.formId = that.$cookie.getCookie('formId') + '';
								that.canBackNodeList.nodeId = that.$cookie.getCookie('nodeId') + '';
							}
						}
					}	
				
				}	
			});

			
			

		},
		//行为
		methods: {
			// 弹出框
			// 审批意见
			getShenPiYiJian(str) {
				this.shenPiYiJianShow = str.name;
				this.mess = str.name;
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
			
	      	// 下一环节
	      	getNextNode(str) {
	      		this.nextNodeItemListNameShow = str.name;
	      		this.nextStep.nextNodeItemId = str.nextNodeItemId;
	      		console.log(this.nextStep);
	      		this.popShow = !this.popShow;
	      	},
	      	// 办理人
	      	getBanLiRen(str) {
	      		this.banLiRenShow = str.name;
	      		if(str.name === '其他办理人') {
	      			this.$router.push('mailList');
	      		}
	      		this.nextStep.nextNodeExecuteUserIdList.push(str.userId),
	      		console.log(this.nextStep);
	      		this.popShow = !this.popShow;
	      	},
	      	// 执行动作
	      	getZhiXingDongZuo(str) {
	      		if(str.describe === '退回') {
	      			this.isPanDuan = str.describe;
	      			this.getTuiHui();
	      		}else if(str.describe === '会签'){
	      			this.isSignIn = true;
	      			this.nextStep.nextNodeItemId = str.code;
	      			this.zhiXingDongZuoShow = str.describe;
	      			this.popShow = !this.popShow;
	      		}else {
	      			this.nextStep.nextNodeItemId = str.code;
	      			this.zhiXingDongZuoShow = str.describe;
	      			this.popShow = !this.popShow;
	      		}
	      		
	      	},
	      	// 下一环节办理人
	      	getNextNodeBanLiRen() {
	      		this.$router.push('mailList');
	      	},
	      	shouJianRen(str) {
	      		if(str === '退回') {
	      			this.getTuiHui();
	      		}
	      		this.isPanDuan = str;
	      		this.popShow = !this.popShow;
	      	},
		    // 下一环节弹出框数据处理
		    // 弹出框选项
		    showItem: function(item) {
		    	this.popShow = !this.popShow;
		    	
		    },
			//切换到办理流程，并加载办理流程数据
			Tab: function() {
				let that = this;
				this.fawen = false;
				this.banli = true;
				// 办理流程
				this.$http.post('api-office/office/sendfile/handleProcessInfoList',this.handleProcessInfoList,function(response) {
					if(response.status === 200) {
					 	if(response.data.code === 1) {
						 	that.liucheng = response.data.list;
					 	}
					}
				})
			},
			Tab2: function() {
				this.fawen = true;
				this.banli = false;
			},

			// 退回流程获取
	      	getTuiHui() {
	      		let that = this;
				// 获取发文列表
				this.$http.post('api-office/office/sendfile/canBackNodeList',this.canBackNodeList,function(response) {
					if (response.status === 200) {
						console.log(response);
						let data = response.data;
						for (let i in data.list) {
							that.tuiHui.push(data.list[i]);
						}
						that.tuiHui.length = data.list.length;
						console.log(that.tuiHui);
					}
				});

	      	},

			//自定义流程 办理人数据加载,isOther为true时加载其他办理人，false时无其他办理人
			getFlow() {
		        let that = this;
				this.$http.post('api-office/office/sendfile/handleUserInfoList',this.handLeUserInfoList,function(response) {
					if (response.status === 200) {
						console.log(response);
						if(response.data.list.length === 0 ) {
							that.banLiRenShow = '';
						}else {
							that.banLiRenShow = response.data.list[0].name;
							that.nextStep.nextNodeExecuteUserIdList.push(response.data.list[0].userId);
						}
						
						that.banLiRen = response.data.list;
						that.banLiRen.length = response.data.list.length;
						console.log(that.banLiRen)
						if(that.isOther) {
							that.banLiRen.push({'name':'其他办理人',"userId":''});
						}
					}
				});
	      	},


	      	//正文下载
	   //    	downDocViewName(name) {
	   //    		let that = this;
				// this.$http.post('api-office/office/sendfile/downLoadDocFile',this.docViewName,function(response) {
				// 	if (response.status === 200) {
				// 		console.log(response)
				// 		if (response.data) {
				// 			let url = window.URL.createObjectURL(new Blob([response.data]))
				// 	        let link = document.createElement('a')
				// 	        link.style.display = 'none'
				// 	        link.href = url
				// 	        link.setAttribute('download', name)
				// 	        document.body.appendChild(link)
				// 	        console.log(link.click());
				// 	        link.click()
				// 		}
						
						
				// 	}
				// });
	   //    	},
	      	// 附件下载
	   //    	downFile(fileId,name) {
	   //    		this.files.fileId = fileId;
	   //    		let that = this;
				
				// this.$http.post('api-office/office/sendfile/downLoadFile',this.files,function(response) {
				// 	if (response.status === 200) {
				// 		console.log(response)
				// 		if (response.data) {
				// 			debugger
				// 			let url = window.URL.createObjectURL(new Blob([response.data]));
				// 			// let url = "https://www.baidu.com/?tn=98012088_10_dg&ch=3";
				// 	        let link = document.createElement('a')
				// 	        link.style.display = 'none'
				// 	        link.href = url
				// 	        link.setAttribute('download', name)
				// 	        debugger
				// 	        document.body.appendChild(link)
				// 	        console.log(link.click());
				// 	        link.click()
				// 		}
				// 	}
				// });
	   //    	},
	      	//自定义流程回退
	      	huiTui(item) {
	      		console.log('自定义');
	      		console.log(item);
	      		let that = this;
	      		// 回退参数
	      		let back = {
	      			'backNodeItemId' : item.nodeFlowKey,
	      			'formId' : this.$cookie.getCookie('formId'),
	      			'msg': that.msg,
	      			'nowNodeId':this.$cookie.getCookie('nodeId'),
	      			'userId':item.executeUserId
	      		};
	      		console.log(back);
				// 获取发文列表
				this.$http.post('api-office/office/sendfile/back',back,function(response) {
					console.log(response);
					if (response.status === 200) {
						if(response.data.code === 1) {
							alert('操作成功！');
							that.$router.push('daibanfawen');
						}
					}
				});
	      	},
	      	// 预设流程回退
	      	isHuiTui(item) {
	      		console.log('预设');
	      		console.log(item);
	      		let that = this;
	      		let backDef = {
	      			'backNodeId' : item.nodeId,
	      			'formId' : this.$cookie.getCookie('formId'),
	      			'msg': that.msg,
	      			'nowNodeId':this.$cookie.getCookie('nodeId'),
	      			'userId':item.executeUserId
	      		}
	      		console.log(backDef);
				// 获取发文列表
				this.$http.post('api-office/office/sendfile/backDef',backDef,function(response) {
					console.log(response);
					if (response.status === 200) {
						if(response.data.code === 1) {
							alert('操作成功！');
							that.$router.push('daibanfawen');
						}
					}
				});
	      	},
	      	
	      	//签收
	      	qianShou() {
				let that = this;
				let signIn = {
					"content": that.mess,
					"formId": this.$cookie.getCookie('formId')
				}
				this.$http.post('api-office/office/sendfile/signIn',signIn,function(response) {
					console.log(response);
					if (response.status === 200) {
						alert('操作成功！');
						that.$router.push('daibanfawen');
						
					}
				});
	      	},
	      	// 完成办理
	      	wanChengBanLi() {
	      		let that = this;
	      		that.nextStep.msg = that.msg;
	      		that.nextStep.content = that.mess;
	      		console.log(that.nextStep);
	      		this.$http.post('api-office/office/sendfile/nextStep',that.nextStep,function(response) {
					console.log(response);
					if (response.status === 200) {
						alert('操作成功！');
						that.$router.push('daibanfawen');
						
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
	      	text() {
	      		console.log(6666);
	      	}
	      	// 自定义流程退回
	   //    	getback() {
	   //    		let that = this;
				// // 获取发文列表
				// this.$http.post('sendfile/back',this.docViewName,function(response) {
				// 	if (response.status === 200) {
				// 	}
				// },{'baseURL':'http://192.168.8.225:8042/api-office/office'});
	   //    	}
	      	
		},

	}
</script>

<style lang="less" rel="stylesheet/less">
@import url("../../style/mixin");
@import url("/faWenXiangQing");



</style>