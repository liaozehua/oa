<template>

	<div>
		<search @searchData="searchData"></search>
		<contacts :contacts="contacts" @gainData="gainData"></contacts>
		<h3 class="assortment" v-if="bumen">部门</h3>
		<cell :department="department" ref="cell" @gainData="gainData"></cell>
		<h3 class="assortment" v-if="chengyuan">成员</h3>
		<members :members="members" ref="members"></members>		
	</div>
</template>
<script>
	import Cell from '../../components/cell/cell'
	import Search from '../../components/search/search'
	import Contacts from '../../components/contacts/contacts'
	import Members from '../../components/members/members'
	export default {
		name:'department',
		// 组件
		components: {
			Contacts,
			Cell,
			Search,
			Members
		},
		// 数据源
		data() {
			return {
				//接口参数
				parameter: {
		        	"departmentId": 1001,
			        "isSearch": false,
			        "keyword":""
		      	},
		      	//存储接口数据
		      	record: '',		
		      	//通讯录
				contacts: '',	
				//单位	
				company:'',
				//部门
				department: '',
				//成员
				members: '',
				//部门是否显示
				bumen: true,
				//成员是否显示
				chengyuan: true,
				
			}
		},
		// 跟随页面开始加载，只加载一次
		mounted: function() {
			this.loadGetAddressList();
		},
		methods: {
			//加载 getAddressList 接口数据
			loadGetAddressList() {
				let that = this;
			    this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {
			      	that.record = response.data.datamap;
			      	that.contacts = that.record.hierarchyList;
			      	that.company = that.record.company;
			      	that.department = that.record.departmentList;
			      	that.members = that.record.userList;
			      	if(that.department.length === 0) {
			      		that.bumen = false
			      	}else {
			      		that.bumen = true
			      	}
			      	if(that.members.length === 0) {
			      		that.chengyuan = false	
			      	}else {
			      		that.chengyuan = true
			      	}

			    });
			},
			gainData: function(id) {
				this.parameter = {"departmentId" : id, "isSearch" : false, "keyword" : ''};
				let  that = this;
			    this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {
			      	that.record = response.data.datamap;
			      	that.contacts = that.record.hierarchyList;
			      	that.company = that.record.company;
			      	that.department = that.record.departmentList;
			      	that.members = that.record.userList;
			      	if(that.department.length === 0) {
			      		that.bumen = false
			      	}else {
			      		that.bumen = true
			      	}
			      	if(that.members.length === 0) {
			      		that.chengyuan = false	
			      	}else {
			      		that.chengyuan = true
			      	}
			    });
			},
			searchData: function(key) {
				console.log(key)
				if(key === '') {
					this.parameter = {"departmentId" : this.$store.state.departmentId, "isSearch" : false, "keyword" : ''};
				}else {
					this.parameter = {"departmentId" : -1, "isSearch" : true, "keyword" : key}
				}
				var that = this;
			    this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {
			      	that.record = response.data.datamap;
			      	that.contacts = that.record.hierarchyList;
			      	that.company = that.record.company;
			      	that.department = that.record.departmentList;
			      	console.log(that.department);
			      	that.members = that.record.userList;
			    });
			}
		}
	}
</script>
<style lang="less" scoped rel="stylesheet/less">
	@import url("../../style/mixin");
  	@import url("/department");
</style>