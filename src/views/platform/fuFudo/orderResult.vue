<template>
    <div>
        <div class="info-class">
            <p><span class="pr20">发放成功金额: {{info.payAmount}}元</span> <span class="pr20">发放成功: {{info.isnum}}人</span> <span class="pr20">实收服务费:{{info.charge}}元</span></p>
            <p><span class="pr20">发放失败金额：{{info.amount}}元</span> <span class="pr20">发放失败: {{info.nonum}}人</span> </p>
            <p>是否从零工收入中扣除: {{info.deduction? '是' : '否'}}</p>
        </div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="amount" :show-overflow-tooltip="true" label="姓名" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceType" :show-overflow-tooltip="true" label="实发收入(元)" align="center" min-width=""
                             :formatter="fortype">
            </el-table-column>
            <el-table-column prop="payFee" :show-overflow-tooltip="true" label="付款手续费(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceTax" :show-overflow-tooltip="true" label="信息服务费(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="createdAt" :show-overflow-tooltip="true" label="薪福多应发收入(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="个人所得税(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="薪福多实际到账(元)" :formatter="fortype" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="薪福多历史已付收入(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="薪福多历史已付个税(元)" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="发放状态" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="invoiceName" :show-overflow-tooltip="true" label="失败原因" align="center" min-width="">
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
    export default {
        name: 'Drawing',
        data() {
            return {
                tableData: [{invoiceReceiver:'2019-10-21: 12:20'}],
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form:{
                    descUpdate:''
                },
                info:{
                    amount:0,
                    isnum:0,
                    nonum:0,
                    payAmount:0,
                    charge:0,
                    deduction:false,
                },
                dialogUpdateVisible:false,
            }
        },
        methods: {
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            createdAt(row, column, cellValue) {
                if (cellValue) {
                    return cellValue.substr(0, 10)
                } else {
                    return '无'
                }
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: 20,
                    status: 1,
                };
                this.$api
                    .ForDraw2(params)
                    .then(response => {
                        console.log(response)
                        if (response.data.respCode == 0) {
                            this.tableData = response.data.data.list;
                            this.pageCount = response.data.data.pages
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
        mounted() {
            // this.getList()
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