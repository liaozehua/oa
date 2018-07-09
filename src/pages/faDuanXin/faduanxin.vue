<template>
	<div>
		<div style="background-color:#fff;">
			<textarea name="duanxin-neirong" class="duanxin-neirong" rows="10" autofocus="autofocus" placeholder="请输入短信内容"	v-model="mess"></textarea>
		</div>
		<div class="cell cell-access" @click="shouJianRen">
			<div class="cell-primary">
				<p class="font15">收件人</p>
			</div>
			<div class="cell-ft"></div>
		</div>
		<div class="cell cell-access" >
			<div class="cell-primary">
				<p class="font15">签名</p>
			</div>
			<div class="cell-ft"></div>
		</div>
		<!-- 发送方式 -->
		<div class="faSongFangShi">
			<p>发送方式</p>
		</div>
		
		
		<div class="weui-cells weui-cells_checkbox">
			<label for="checkbox_yvu1m_0" class="weui-cell weui-check_label vux-checklist-label-left" @click="isSelects1">
				<div class="weui-cell__hd">
					<input type="checkbox" name="vux-checkbox-yvu1m" id="checkbox_yvu1m_0" class="weui-check" value="手机短信"> 
					<i :class="['iconfont', isSelect1 ? 'icon-success_fill': 'icon-success1']"></i>
				</div> 
				<div class="weui-cell__bd">
					<p>手机短信</p> 
				</div>
			</label>
			<label for="checkbox_yvu1m_1" class="weui-cell weui-check_label vux-checklist-label-left" @click="isSelects2">
				<div class="weui-cell__hd">
					<input type="checkbox" name="vux-checkbox-yvu1m" id="checkbox_yvu1m_1" class="weui-check" value="平台短信"> 
					<i :class="['iconfont', isSelect2 ? 'icon-success_fill': 'icon-success1']"></i>
				</div> 
				<div class="weui-cell__bd">
					<p>平台短信</p>
				</div>
			</label>
		</div>

		<!-- 确认发送 -->
	
		<div class="faSong">
			<div class="faSong-wrap">
				<div>
					<span>确定发送</span>
				</div>
			</div>
			
		</div>

		<transition name="popop">	
			<div class="popop" v-show="popShow"> 
				<div class="bor1">
					<p>手动输入号码</p>
				</div>
				<div class="bor1">
					<p @click="goMailList">选择联系人</p>
				</div>
				<div class="mgt10" @click="shouJianRen">
					<p>取消</p>
				</div>
			</div>
		</transition>

		<transition name="mask">	
			<div id="mask" v-show="popShow" @click="shouJianRen">
				
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		// 外部公共组件
		components: {

	  	},
		//数据源
		data() {
			return {
				arr: [],
				mess:'',
				labelPosition: '',
				commonList: [ '手机短信', '平台短信'],
      			popShow: false,				//判断弹窗
      			isSelect1: false,			//判断手机短信选择
      			isSelect2:false,			//判断平台短信选择
      			
			}
		},
		// 生命周期
		mounted: function() {
			console.log(this.$route.query)
		},
		//行为
		methods: {

		    // 收件人
		    shouJianRen: function() {
		    	this.popShow = !this.popShow;
		    },
		    // 跳转选择联系人控件
		    goMailList: function() {
		    	this.$router.push({
					path: '/mailList',
					name: 'mailList',
					query: {
						'name': 'faduanxin'
					}
				})
		    },
		    // 判断手机短信选择
		    isSelects1: function() {
		    	this.isSelect1 = !this.isSelect1;
		    	if(this.isSelect1) {
		    		this.isSelect2 = false;
		    	}
		    },
		    // 判断平台短信函数
		    isSelects2: function() {
		    	this.isSelect2 = !this.isSelect2;
		    	if(this.isSelect2) {
		    		this.isSelect1 = false;
		    	}
		    }
		    
		}
		
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import url("../../style/mixin");
@import url("/faduanxin");

</style>