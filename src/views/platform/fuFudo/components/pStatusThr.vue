<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="updatedAt" :formatter="createdAt" :show-overflow-tooltip="true" label="审核时间"
                             align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="简称" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="industry" :show-overflow-tooltip="true" label="行业" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerCon" :show-overflow-tooltip="true" label="联系人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerConPhone" :show-overflow-tooltip="true" label="联系电话" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="资料" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" @click="down(scope.row)">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" :show-overflow-tooltip="true" label="状态" :formatter="fortype" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="reason" :show-overflow-tooltip="true" label="原因" align="center" min-width="">
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
            down(row){
                this.list = [];
                this.list[0] = row.businessLicense //营业执照正本",
                this.list[1] = row.businessLicenseCopy//营业执照副本",
                this.list[2] = row.openPermit //开户许可证",
                this.list[3] = row.creditCode //机构信用代码",
                this.list[4] = row.legalIdCard//法人身份证",
                this.list[5] = row.authorization //授权书",
                this.list[6] = row.handlerIdCard//经办人身份证",
                this.list[7] = row.financeIdCard//财务联系人身份证",
                this.list[8] = row.financeOwnIdCard //财务负责人身份证",
                this.list[9] = row.associationArticles //公司章程",
                this.list[10] = row.shareholderIdCard  //股东身份证",
                let dowList = [];
                for(let item of this.list){
                    item = item.split(',');
                    dowList.push(item)
                }
                for (let i of dowList){
                    for (let d of i){
                        console.log(d);
                        window.open(d,'_blank')
                    }
                }
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: 20,
                    status:3,
                };
                this.$api
                    .xfdAccountShow(params)
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
            fortype(row,cell,val) {
                let stutus = '';
                switch (Number(val)) {
                    case 0:
                        stutus =  '未开户'
                        break;
                    case 1:
                        stutus = '待审核'
                        break;
                    case 2:
                        stutus = '审核通过'
                        break;
                    case 3:
                        stutus = '审核未通过'
                        break;
                    case 4:
                        stutus = '开户成功'
                        break;
                    case 5:
                        stutus = '开户失败'
                        break;
                    default:
                        break
                }
                return stutus
            },
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
</style>