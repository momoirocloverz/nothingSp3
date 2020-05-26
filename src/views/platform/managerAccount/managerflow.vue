<template>
    <div>
        <el-form :model="formDetail" label-width="100px" label-position="left" class="formSearchMarginTop">
            <!--<el-form-item label="日期：" class="formSearchMargin" >-->
                <!--<el-radio-group class="radio-search" v-model="formDetail.date">-->
                    <!--<el-radio label="">不限</el-radio>-->
                    <!--<el-radio label="1">本月</el-radio>-->
                    <!--<el-radio label="2">自定义</el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item label="类型：" class="formSearchMargin">
                <el-radio-group class="radio-search wrap" v-model="formDetail.note">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="充值">充值</el-radio>
                    <el-radio label="考勤管理费">考勤管理费</el-radio>
                    <el-radio label="系统使用费">系统使用费</el-radio>
                    <el-radio label="保险费">保险费</el-radio>
                    <el-radio label="付款手续费">付款手续费</el-radio>
                    <el-radio label="信息服务费">信息服务费</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="收支分类：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.type">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">收入</el-radio>
                    <el-radio label="2">支出</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="日期范围：" class="formSearchMargin">
                <el-date-picker class="margin_left40" size="mini" v-model="formDetail.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
                </el-date-picker>
                --
                <el-date-picker class="margin_left10" size="mini" v-model="formDetail.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" size="small" class="datesearchBtn" @click="true_btn">确定</el-button>
            </el-form-item>
            <el-form-item label="经理人：" class="formSearchMargin ">
                <el-input class="rant-input inputWidth keyWFormParent f12" placeholder="输入经理人名称搜索" v-model="formDetail.agentName"></el-input>
                <el-button type="primary" class="searchBtn keyWBtn" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="pt10 pb20 f14">合计收入{{totalInfo.recharge}}元、合计支出{{totalInfo.totalOut}}元</div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="note" :show-overflow-tooltip="true" label="类型" align="center"
                             min-width="">
            </el-table-column>
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="经理人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="inAmount" :formatter="dateFor" :show-overflow-tooltip="true" label="收入(元)" align="center" min-width=""></el-table-column>
            <el-table-column prop="outAmount" :formatter="dateFor" :show-overflow-tooltip="true" label="支出(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="receiveTime" :formatter="createdAt" :show-overflow-tooltip="true" label="时间" align="center"
                             min-width="">
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination
                    class="pagebox"
                    @current-change="changePage"
                    :current-page="currentPage"
                    :page-count="pageCount"
                    background
                    layout="prev, pager, next"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Interval from '../../../common/interval.js'
    export default {
        name: 'managerflow',
        data() {
            return {
                tableData: [],
                list: [],
                currentPage: 1,
                pageSize: 20,
                pageCount: 1,
                total: 0,
                formDetail: {
                    date: '1',
                    startDate: '',
                    endDate: '',
                    agentName:"",
                    type:'',
                    note:'',
                },
                totalInfo:{}
            }
        },
        watch: {
            "formDetail.note":function (val,old) {
                this.currentPage = 1;
                this.getList()
                this.getTotal()
            },
            "formDetail.type":function (val,old) {
                this.currentPage = 1;
                this.getList()
                this.getTotal()
            }
            // 'formDetail.date':function(val,old){
            //     if(val == ''){
            //         this.formDetail.startDate = ''
            //         this.formDetail.endDate = ''
            //         this.currentPage = 1
            //         this.getList()
            //     }else if(val == '1'){
            //         this.formDetail.startDate = new Date().getFullYear()+ '-' +((new Date().getMonth() + 1).toString().length == 1 ? '0'+(new Date().getMonth() + 1) : (new Date().getMonth() + 1))+'-01'
            //         this.formDetail.endDate = Interval.getDay(0)
            //         this.currentPage = 1
            //         this.getList()
            //     }else if(val == '2'){
            //         this.formDetail.startDate = ''
            //         this.formDetail.endDate = ''
            //     }
            // }
        },
        mounted() {
            this.getList()
            this.getTotal()
        },
        methods: {
            handleSearch() {
                this.currentPage = 1
                this.getList()
                this.getTotal()
            },
            true_btn(){
                if (!this.formDetail.startDate) {
                    return this.$message.error('开始日期不能为空!')
                }
                if (!this.formDetail.endDate) {
                    return this.$message.error('结束日期不能为空!')
                }
                if (this.formDetail.startDate > this.formDetail.endDate) {
                    return this.$message.error('结束日期不能早于开始日期!')
                }
                this.currentPage = 1
                this.getList()
                this.getTotal()
            },
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            dateFor(row, column, cellValue){
                if (cellValue>0) {
                    return Number(cellValue).toFixed(2)
                } else {
                    return 0.00
                }
            },
            status(row, column, cellValue) {
                //0未支付1已冻结2已到账"
                let text = ''
                switch (Number(cellValue)) {
                    case 0:
                        text = '未支付';
                        break;
                    case 1:
                        text = '已冻结';
                        break;
                    case 2:
                        text = '已到账';
                        break;
                    default:
                        text = ''
                }
                return text
            },
            createdAt(row, column, cellValue) {
                if (cellValue) {
                    return cellValue.substr(0, 16)
                } else {
                    return '无'
                }
            },
            getList() {
                this.tableData = [];
                this.pageCount = 1;
                const params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    note: this.formDetail.note,
                    toUserName: this.formDetail.toUserName,
                    type: this.formDetail.type,
                    endDate: this.formDetail.endDate,
                    startDate: this.formDetail.startDate,
                    accountType: 1,
                    customerName:this.formDetail.agentName,
                };
                this.$api
                    .getMyAccountDetail(params)
                    .then(response => {
                        console.log(response)
                        if (response.data.respCode === 0) {
                            this.tableData = response.data.data.list;
                            this.pageCount = response.data.data.pages
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getTotal(){
                this.totalInfo = {
                    recharge:0,
                    totalOut:0,
                }
                const params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    note: this.formDetail.note,
                    toUserName: this.formDetail.toUserName,
                    type: this.formDetail.type,
                    endDate: this.formDetail.endDate,
                    startDate: this.formDetail.startDate,
                    accountType: 1,
                    customerName:this.formDetail.agentName,
                };
                this.$api
                    .selectSumAccountDetail(params)
                    .then(res => {
                        if(res.data.respCode === 0){
                            this.totalInfo = res.data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            fortype(val) {
                return val
            },
        },
    }
</script>

<style scoped>
</style>