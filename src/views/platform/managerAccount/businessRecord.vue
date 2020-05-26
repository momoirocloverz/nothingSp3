<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="date" :formatter="createdAt" :show-overflow-tooltip="true" label="日期" align="center"
                             min-width="">
            </el-table-column>
            <el-table-column prop="shortName" :show-overflow-tooltip="true" label="经理人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="manageFee" :formatter="dateFor" :show-overflow-tooltip="true" label="合计管理费" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="status" :formatter="status" :show-overflow-tooltip="true" label="状态" align="center"
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
    export default {
        name: 'businessRecord',
        data() {
            return {
                tableData: [],
                list: [],
                currentPage: 1,
                pageSize: 20,
                pageCount: 1,
                total: 0,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            dateFor(row, column, cellValue){
                if (cellValue) {
                    return Number(cellValue).toFixed(2)
                } else {
                    return '0.00'
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
                const params = {
                    status: 1,
                    pageNum: this.currentPage,
                    pageSize: 20,
                };
                this.$api
                    .manageFeeList(params)
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
            fortype(val) {
                return val
            },
        },
    }
</script>

<style scoped>
</style>