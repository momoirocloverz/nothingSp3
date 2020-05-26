<template>
    <div>
        <div class="info-class">
            <p><span class="pr20">发放总金额: {{info.totalFee | toFixeFortter2}}</span> <span class="pr20">可发放人数: {{info.successAmount}}</span> <span class="pr20">不可发放人数:{{info.failAmount}}</span></p>
            <p><span class="pr20">实际支付金额：{{info.totalRealFee | toFixeFortter2}}</span> <span class="pr20">服务费: {{info.serviceFee | toFixeFortter2}}</span> </p>
            <!--<p>是否从零工收入中扣除: {{info.deduction? '是' : '否'}}</p>-->
        </div>
        <el-table class="table-outline" :data="tableData"
                  emptyText="暂无相关信息" style="width: 100%;">
            <el-table-column label="姓名" prop="talentName"></el-table-column>
            <el-table-column prop="payFee" :show-overflow-tooltip="true" label="付款手续费(元)" align="center" min-width=""></el-table-column>
            <el-table-column label="汉唐信息服务费(元)" :formatter="_number" prop="serviceFee"></el-table-column>
            <el-table-column label="平台信息服务费(元)" :formatter="_number" prop="wcServiceFee"></el-table-column>
            <el-table-column label="薪福多应发收入(元)" :formatter="_number" prop="totalMoney"></el-table-column>
            <el-table-column label="个人所得税(元)" :formatter="_number" prop="tax"></el-table-column>
            <el-table-column label="实际到账(元)" :formatter="_number" prop="money"></el-table-column>
            <!--<el-table-column label="薪福多本月已付收入(元)" :formatter="_number" prop="alreayPay"></el-table-column>-->
            <!--<el-table-column label="薪福多本月已付个税(元)" :formatter="_number" prop="alreayTax"></el-table-column>-->
            <el-table-column label="汉唐返回金额(元)" :formatter="_number" prop="htServiceFee"></el-table-column>
            <el-table-column label="状态" prop="status" :formatter="settlementTypeFormatter"></el-table-column>
            <el-table-column label="失败原因" prop="message"></el-table-column>
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
    export default {
        name: 'hantanDetail',
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form:{
                    descUpdate:''
                },
                info:{
                },
                dialogUpdateVisible:false,
            }
        },
        filters:{
            toFixeFortter2(val) {
                if (val) {
                    return Number(val).toFixed(2)
                } else {
                    return 0
                }
            }
        },
        methods: {
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            _number(row, column, cellValue) {
                if (Number(cellValue) >= 0) {
                    return cellValue.toFixed(2)
                } else {
                    return '-'
                }
            },
            getList() {
                const params = {
                    orderNo:this.$route.query.orderNo,
                    pageNum: this.currentPage,
                    pageSize: 20,
                };
                this.$api
                    .htOrdersDetails(params)
                    .then(res => {
                        console.log(res)
                        if (res.respCode === 0) {
                            this.info = res.data.htOrderDOS[0];
                            console.log(this.successInfo)
                            if (res.data.pageInfo.list) {
                                this.tableData = res.data.pageInfo.list;
                                this.pageCount = res.data.pageInfo.pages
                            } else {
                                this.tableData = []
                                this.pageCount = 0
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            settlementTypeFormatter(row, column, cellValue, index) {
                let status = '' //1:待确认 2:待支付 3:支付成功 4:发放完成 5:已取消 6:处理出错
                switch (Number.parseInt(cellValue)) {
                    case 1:
                        status = '待确认'
                        break
                    case 2:
                        status = '待支付'
                        break
                    case 3:
                        status = '支付成功'
                        break
                    case 4:
                        status = '发放完成'
                        break
                    case 5:
                        status = '已取消'
                        break;
                    case 6:
                        status = '处理出错'
                        break
                    default:
                        status = '--'
                        break
                }
                return status
            },
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .info-class{
        padding: 20px;
        color: #606266;
        font-size: 15px;
        line-height: 2;
    }
    .pr20{
        padding-right: 20px;
    }
</style>