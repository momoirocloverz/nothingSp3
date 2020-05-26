<template>
    <div>
        <el-form ref="form" :model="form" label-width="130px">
            <!--选择条件的单选按钮-->
            <el-form-item label="字号名称：" class="formSearchMargin">
                {{$route.params.name}}
            </el-form-item>
            <el-form-item label="经营者姓名：" class="formSearchMargin">
                {{$route.params.legalPerson}}
            </el-form-item>
            <el-form-item label="累计收取服务费：" class="formSearchMargin">
                {{totalAmount ? totalAmount+'元' : ''}}
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <el-table class="table-outline" :data="tableData">
            <el-table-column prop="userName" label="使用人" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="recordDate" label="支付时间" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="charge" label="服务费(元)" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="amount" label="统筹金额(元)" align="center" min-width="160">
            </el-table-column>
            <el-table-column prop="proportion" label="服务费比例" align="center" min-width="160">
            </el-table-column>
        </el-table>
        <div class="page-container" style="margin-top:30px">
            <el-pagination class="pagebox" @current-change="changePage" :current-page="currentPage" :page-count="pageCount" background layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: "ViewRecordP",
    data() {
        return {
            form: {
                name: "不限",
                boss: "不限",
                manager: "不限"
            },
            tableData: [],
            currentPage: 1,
            pageCount: 1,
            totalAmount:''
        };
    },
    methods: {
        getList() {
            const params = {
                financeCustomerId: this.$route.params.id,
                pageSize: 20,
                pageNum: this.currentPage
            };
            this.$api
                .PViewRecord(params)
                .then(response => {
                    if (response.data.respCode == 0) {
                        this.tableData = response.data.data.lists.list;
                        this.totalAmount = response.data.data.totalAmount
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        changePage(val) {
            this.currentPage = val;
            this.getList();
        }
    },
    mounted() {
        // console.log(this.$router.params)
        this.getList();
    }
};
</script>
<style scoped>
</style>

