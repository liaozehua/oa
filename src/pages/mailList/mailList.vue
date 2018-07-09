<template>
    <div id="Company">
        <!-- 搜索框 -->
        <search @searchData="searchData"></search>
        <!-- 通讯录导航条 -->
        <contacts :contacts="contacts"  @gainData="gainData"></contacts>

        
        <div style="margin-bottom:80px">
            <div class="weui-cells weui-cells_checkbox" style="margin:15px 0" v-if="ifSear">
                <label for="checkbox_yvu1m_0" class="weui-cell weui-check_label vux-checklist-label-left">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :data-id="dataId" :value="datas" v-model="checked" id="checkbox_yvu1m_0"  @click="changeAllChecked(dataId,$event)"> 
                        <i class="iconfont icon-success1"></i>
                    </div> 
                </label>
                <div class="weui-cell__bd">
                    <p>{{datas}}</p> 
                </div>
            </div>
            <!-- 子部门 -->
            <div style="margin-bottom:15px;">
                <div class="weui-cells weui-cells_checkbox" v-for="item in data1">
                    <label :for="'checkbox_yvu1m' + item.departmentId" class="weui-cell weui-check_label vux-checklist-label-left" @click="getData(item,$event)"> 
                        <div class="weui-cell__hd">
                            <input type="checkbox" class="weui-check" :value="item.departmentName" :id="'checkbox_yvu1m' + item.departmentId" v-model="datas2"> 
                            <i class="iconfont icon-success1"></i>
                        </div> 
                    </label>
                    <div class="weui-cell__bd" @click="gainData(item.departmentId)">
                        <p>{{item.departmentName}}</p> 
                    </div>
                </div>
            </div>

            <!-- 成员 -->
            <div class="weui-cells weui-cells_checkbox" v-for="item in data3">
                <label :for="'checkbox_yvu1m' + item.userId" class="weui-cell weui-check_label vux-checklist-label-left" @click="getUser(item,$event)"> 
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" :value="item.userName" :id="'checkbox_yvu1m' + item.userId" v-model="datas1"> 
                        <i class="iconfont icon-success1"></i>
                    </div> 
                </label>
                <div class="weui-cell__bd">
                    <p>{{item.userName}}</p> 
                </div>
            </div>

            <!-- 显示选择 -->
            <div class="attr-wrap">
                <div class="attr-rel">
                    <div class="attr-name">
                        <span v-for="attr in attr1">{{attr.userName}},</span>
                    </div>
                    <div class="attr-complete" @click="retData(getName)">
                        完成({{attr1.length}})
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import Search from '../../components/search/search'
import Contacts from '../../components/contacts/contacts'
import  Cookies from '../../common/nenglong.cookies'

export default {
    // 组件
    components: {
        Search,
        Contacts,
    },
    // 父组件传参
    props: ['getName'],
    // 数据源
    data () {
        return {
            ifSear : true,
            checked: false,
            // 全选或不全选显示
            datas: '能龙总部',
            dataId: -1,
            // 接口参数
            parameter: {
                "departmentId": -1,
                "isSearch": false,
                "keyword":""
            },
            // 判断是否点击部门加载部门下的用户
            isPanDuan: false,
            // 通讯录导航条
            contacts: [],
            // 子部门或者子单位数据源
            data1: [],
            // data2 数据来源于data1 的 department 属性， 目的是为了赋值与datas1  
            data2:[],
            //  成员选中的复选框
            datas1: [],
            //  部门选中的复选框
            datas2: [],
            //  用户数据源
            data3: [],
            // data4 数据来源于data3 的 department 属性， 目的是为了赋值与datas1  
            data4: [],
            //数组attr1 储存被选中的用户数据，数组attr2储存选择单位或者部门返回的用户数据， 数组attr3储存直属用户
            attr1: [],
            attr2: [],
            attr3: [],
        }
    },
    // 生命周期,跟随页面开始加载，只加载一次
    mounted:function(){
        this.loadGetAddressList()
    },

    methods: {
        //加载 getAddressList 接口数据
        loadGetAddressList() {
            let that = this;
            this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {
                that.record = response.data.datamap;
                that.contacts = that.record.hierarchyList;
                that.datas = that.contacts[that.contacts.length-1].departmentName;
                that.dataId = that.contacts[that.contacts.length-1].departmentId;
                that.data1 = that.record.departmentList;
                for(var i in that.data1) {
                    that.data2.push(that.data1[i].departmentName);
                }
                that.data2.length = that.data1.length;
                that.data3 = that.record.userList;
                for(var j in that.data3) {
                    that.data4.push(that.data3[j].userName);
                }
                that.data4.length = that.data3.length;

            });
        },
        // 调用子组件的方法
        goDepartment: function() {
            this.$refs.cell.goDepartment();
        },
        // 判断全选或者全不选
        changeAllChecked(id,e) {
            let checked = e.target.checked;
            checked ? this.getAllData(id) : this.delAllData(id);
            let self = this;
            if(!self.checked) {
                self.datas1 = self.data4;
                self.datas2 = self.data2;
            }else {
                self.datas1 = [];
                self.datas2 = [];
            }
        },
        //点击获取数据
        gainData: function(id) {
            this.datas1 = [];
            this.datas2 = [];
            this.data1 = [];
            this.data2 = [];
            this.data3 = [];
            this.data4 = [];
            this.attr1 = [];
            this.attr2 = [];
            this.attr3 = [];
            this.checked = false;
            this.ifSear = true;
            this.parameter = {"departmentId" : id, "isSearch" : false, "keyword" : ''};
            let that = this;
            this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {
                that.record = response.data.datamap;
                that.contacts = that.record.hierarchyList;
                that.datas = that.contacts[that.contacts.length-1].departmentName;
                that.dataId = that.contacts[that.contacts.length-1].departmentId;
                that.data1 = that.record.departmentList;
                for(var i in that.data1) {
                    that.data2.push(that.data1[i].departmentName);
                }
                that.data2.length = that.data1.length;
                that.data3 = that.record.userList;
                for(var j in that.data3) {
                    that.data4.push(that.data3[j].userName);
                }
                that.data4.length = that.data3.length;

            });
        },
        //true全选，获取全部用户数据
        getAllData(id) {
            let that = this;
            that.$http.post('/api-user/api/userInfo/getAllUserByDepartment',{'departmentId':id},function(response) {
                that.attr1 = [];
                that.attr2 = response.data.list;
                that.attr1 = that.attr1.concat(that.attr2);
                that.attr2 = [];
            })
        },
        //false全不选,删除所有用户数据
        delAllData() {
            this.attr1 = [];
        },
        // 点击部门获取数据
        getData(item,e) {

            let checkeds = e.target.checked;
            if(checkeds === true) {
                this.trueGetData(item);
            }else if(checkeds === false) {
                this.falseDelData(item);
            }else {
                return false;
            }
            
        },
        getUser(data,e) {
            let checkeds = e.target.checked;
            checkeds ? this.trueGetUser(data) : this.falseDelUser(data);
        },
        //true时获取所选中的部门数据
        trueGetData(data) {
            let that = this;
            let departmentId  = {
                'departmentId': data.departmentId
            }
            that.$http.post('/api-user/api/userInfo/getAllUserByDepartment',departmentId,function(response) {
                that.attr2 = response.data.list;
                that.attr1 = that.attr1.concat(that.attr2);
                that.attr2 = [];
            })
            

        },
        //false时删除所选中的部门数据
        falseDelData(data) {
            let that = this;
            let departmentId  = {
                'departmentId': data.departmentId
            }

            that.$http.post('/api-user/api/userInfo/getAllUserByDepartment',departmentId,function(response) {
                that.attr2 = response.data.list;
                that.quChong(that.attr1,that.attr2);
            })        
        },
        //true时获取所选中的用户数据
        trueGetUser(data) {
            this.attr3 = data;
            this.attr1 = this.attr1.concat(this.attr3);
            this.attr3 = [];
        },
        //false时删除所选中的用户数据
        falseDelUser(data) {
            this.attr3.push(data);

            this.quChong(this.attr1,this.attr3);
        },
        //两个数组去掉重复的数据
        quArrChong(arr1,arr2) {
            let temp = []; //临时数组1 
            let temparray = [];//临时数组2 
            for (let i = 0, len=arr2.length; i < len; i++) { 
                temp[arr2[i]] = true;//巧妙地方：把数组arr2的值当成临时数组1的键并赋值为真 

            }; 
                
            for (let i = 0, len = arr1.length; i < len; i++) { 

                if (!temp[arr1[i]]) { 
                    temparray.push(arr1[i]);//巧妙地方：同时把数组arr1的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组 
                } ; 
     
            }; 

            arr1 = temparray;
            temparray = [];
            temp = [];
            arr2 = [];
        },
        //两个数组对象去掉重复的数据
        quChong(arr1,arr2) {
            for (var i=0; i<arr1.length; i++) {  
                for (var j=0; j<arr2.length; j++) {  
                    if (arr1[i].userId == arr2[j].userId) {  
                        arr1.splice(i, 1);    
                    }  
                }  
            }  
            arr2 = [];
        },
        //去除单个数组里面重复的数据
        dedupe(array){
            return Array.from(new Set(array));
        },
        //点击完成返回数据
        retData(name) {
            console.log(name); 
            this.$emit('getArr',{'name':name,'arr':this.attr1});
        },
        searchData(key) {
            console.log(key);
            let that = this;
            that.ifSear = false;
            if(key === '') {
                    that.ifSear = true;
                    this.parameter = {"departmentId" : that.$store.state.departmentId, "isSearch" : false, "keyword" : ''};
                }else {
                    this.parameter = {"departmentId" : -1, "isSearch" : true, "keyword" : key}
            }
            
            this.$http.post('/api-user/api/department/getAddressList',this.parameter,function(response) {

                that.record = response.data.datamap;
               
                that.data1 = that.record.departmentList;
                for(var i in that.data1) {
                    that.data2.push(that.data1[i].departmentName);
                }
                that.data2.length = that.data1.length;
                that.data3 = that.record.userList;
                for(var j in that.data3) {
                    that.data4.push(that.data3[j].userName);
                }
                that.data4.length = that.data3.length;

            });
        },
    },    
    // 监视数据变化
    watch: {
        //成员变化
        "datas1": function() {

            if(this.datas1.length === this.data3.length && this.datas2.length === this.data1.length) {
                if(this.datas1.length === 0 && this.datas2.length === 0) {
                    this.checked = false;
                }else {
                    this.checked = true;
                }
                
            }else {   
                this.checked = false;
            }
        },
        //部门变化
        "datas2": function() {
            if(this.datas1.length === this.data3.length && this.datas2.length === this.data1.length) {
                if(this.datas2.length === 0 && this.datas1.length === 0) {
                    this.checked = false;
                }else {
                    this.checked = true;
                }
            }else {
                this.checked = false;
            }
        }
    }
}

</script>

<style lang="less" scoped rel="stylesheet/less">
@import url("../../style/mixin");
@import url("/mailList");


</style>
