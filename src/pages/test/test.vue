<template>
    <div>
        <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
            <ul>
                <li v-for="(item,index) in listdata">{{item.name}}</li>
                <li v-for="(item,index) in downdata">{{item.name}}</li>
            </ul>
        </vscroll>
    </div>
</template>
<script>
    import Vscroll from "../../components/index"
    export default {
        components: {
            Vscroll,
        },
        data() {
            
            return {
                counter: 1, //当前页
                num: 10, // 一页显示多少条
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                downdata: [], // 上拉更多的数据存放数组
                scrollData:{
                    noFlag: false //暂无更多数据显示
                }
            }
        },
        mounted: function() {
            this.getList();
        },
        methods: {
            //页面加载时的数据
            getList() {
                var response = []
                for(let i = 0; i < 60; i++) {
                    response.push({
                        name: i
                    })
                }
                this.listdata = response.slice(0, this.num);
            },
            //上啦刷新
            onRefresh(done) {
                this.getList();
                done(); // call done
            },
            //下拉加载
            onInfinite(done) {
                this.counter++;
                let end = this.pageEnd = this.num * this.counter;
                let i = this.pageStart = this.pageEnd - this.num;
                let more = this.$el.querySelector('.load-more')
                debugger;
                for(i; i < end; i++) {
                    if(i >= 30) {
                        more.style.display = 'none'; //隐藏加载条
                        //走完数据调用方法
                        this.scrollData.noFlag = true;
                        break;
                    } else {
                        this.downdata.push({
                            name: i + "==="
                        })
                        more.style.display = 'none'; //隐藏加载条
                    }
                }
                debugger;
                done();
            }
        }
    }
</script>

<style lang="less" scoped>
    ul li {
        min-height: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px solid red;
    }
</style>