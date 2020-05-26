<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="createdAt" :formatter="createdAt" :show-overflow-tooltip="true" label="订单时间" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="经理人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="orderNo" :show-overflow-tooltip="true" label="订单号" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="successAmount" :show-overflow-tooltip="true" label="发放人数" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="totalRealFee" :show-overflow-tooltip="true" label="订单金额" :formatter="fortype" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="serviceFee" :show-overflow-tooltip="true" label="信息服务费" :formatter="fortype" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="订单详情" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
                </template>
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
                tableData: [],
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form:{
                    descUpdate:''
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
                    return cellValue.substr(0, 16)
                } else {
                    return '无'
                }
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: 20,
                    status:2,
                };
                this.$api
                    .getXfdOrderList(params)
                    .then(response => {
                        console.log(response)
                        if (response.respCode == 0) {
                            this.tableData = response.data.list;
                            this.pageCount = response.data.pages
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            routeToDetail(row){
                this.$router.push({
                    path: "orderDetail",
                    query: {
                        orderNo: row.orderNo,
                    }
                });
            },
            fortype(row,cell,val) {
                if(val){
                    return val.toFixed(2)
                }else{
                    return 0
                }
            },
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
</style>