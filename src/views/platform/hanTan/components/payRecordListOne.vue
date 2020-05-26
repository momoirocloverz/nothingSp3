<template>
    <div>
        <el-form :model="formDetail" label-width="100px" label-position="left" class="pb10">
            <el-form-item label="日期：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.date">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">本月</el-radio>
                    <el-radio label="2">上月</el-radio>
                    <el-radio label="3">自定义</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自定义：" class="formSearchMargin" v-if="formDetail.date == '3'">
                <el-date-picker class="margin_left40" size="mini" v-model="formDetail.startDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择开始时间">
                </el-date-picker>
                --
                <el-date-picker class="margin_left10" size="mini" v-model="formDetail.endDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" size="small" class="datesearchBtn" @click="turn_btn">确定</el-button>
            </el-form-item>
            <el-form-item label="付款状态：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.status">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="0">未打款</el-radio>
                    <el-radio label="1">汇款中</el-radio>
                    <el-radio label="2">已汇款</el-radio>
                    <el-radio label="3">汇款失败</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="createdAt" :formatter="createdAt" :show-overflow-tooltip="true" label="时间"
                             align="center" min-width="">
            </el-table-column>
            <el-table-column prop="shortName" :show-overflow-tooltip="true" label="经理人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="talentName" :show-overflow-tooltip="true" label="零工姓名" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="userName" :show-overflow-tooltip="true" min-width="120" label="交易对象" align="center">
            </el-table-column>
            <el-table-column prop="money" :show-overflow-tooltip="true" label="金额" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="status" :formatter="statusModify" :show-overflow-tooltip="true" label="付款状态" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="itemNo" :show-overflow-tooltip="true" min-width="120" label="订单号" align="center">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="操作" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" v-if="scope.row.status == 3" @click="edit(scope.row)">重试</el-button>
                    <el-button size="small" type="text" v-if="scope.row.status != 3">--</el-button>
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
    import moment from 'moment';

    export default {
        name: 'Drawing',
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form: {
                    rate: '',
                    mobile: '',
                    charge: '',
                    descUpdate: ''
                },
                formDetail: {
                    date: '',
                    startDate: '',
                    endDate: '',
                    status:'',
                },
                id: '',
                orderInfo: {},
                dialogOpenVisible: false,
            }
        },
        watch: {
            'formDetail.date': function (val, old) {
                if (val == '') {
                    this.currentPage = 1
                    this.formDetail.startDate = ''
                    this.formDetail.endDate = ''
                    this.getList()
                } else if (val == '1') {
                    this.currentPage = 1
                    this.formDetail.startDate = moment().startOf('month').format('YYYY-MM-DD');
                    this.formDetail.endDate = moment().format('YYYY-MM-DD')
                    this.getList()
                } else if (val == '2') {
                    this.currentPage = 1
                    this.formDetail.startDate = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
                    this.formDetail.endDate = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
                    this.getList()
                } else {
                    this.formDetail.startDate = ''
                    this.formDetail.endDate = ''
                }
            },
            "formDetail.status":function (val,old) {
                this.currentPage = 1
                this.getList()
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            turn_btn(){
                if(!this.formDetail.startDate){
                    return this.$message.error('开始日期不能为空！')
                }
                if(!this.formDetail.endDate){
                    return this.$message.error('结束日期不能为空！')
                }
                if(this.formDetail.startDate>this.formDetail.endDate){
                    return this.$message.error('结束日期不能早于开始日期！')
                }
                this.currentPage = 1
                this.getList()
            },
            statusModify(row, column, cellValue, index){
                let status = '' //0 未打款 ; 1:汇款中 2:已汇款 3:汇款失败
                switch (Number.parseInt(cellValue)) {
                    case 0:
                        status = '未打款'
                        break
                    case 1:
                        status = '汇款中'
                        break
                    case 2:
                        status = '已汇款'
                        break
                    case 3:
                        status = '汇款失败'
                        break
                    default:
                        status = '--'
                        break
                }
                return status
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
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            emptyData() {
                this.form.rate = '';
                this.form.charge = '';
                this.dialogOpenVisible = false;
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
                    startDate: this.formDetail.startDate,
                    endDate: this.formDetail.endDate,
                    pageNum: this.currentPage,
                    pageSize: 20,
                    note: '信息服务费',
                    status: this.formDetail.status,
                };
                this.$api
                    .transaction(params)
                    .then(res => {
                        console.log(res)
                        if (res.data.respCode == 0) {
                            this.tableData = res.data.data.list ? res.data.data.list : [];
                            this.pageCount = res.data.data.pages;
                        }
                    }).catch(error => {
                    console.log(error);
                });
            },
            edit(row) {
                let params = {
                    id:row.id
                }
                this.$confirm(`确定执行重新发放?`, ``, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: false
                }).then((action) => {
                    this.$api.htRetry(params).then(res => {
                        console.log(res)
                        let {data, respCode} = res;
                        if (respCode === 0) {
                            this.$message.success('重新发放中,请稍后刷新列表!')
                            this.getList()
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(() => {

                });
            },
        },
    }
</script>

<style scoped>
</style>