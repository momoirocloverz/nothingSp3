<template>
    <div v-loading="exportCollectLoading" element-loading-text="正在导出excel">
        <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <!--选择条件的单选按钮-->
            <!-- <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
              <el-radio-group class="radio-search" v-model="form.payStatus">
                <el-radio label="">不限</el-radio>
                <el-radio label="1">待付</el-radio>
                <el-radio label="2">已付</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="关键字：" class="formSearchMargin formSearchMarginTop">
                <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入零工姓名搜索"
                          v-model="form.talentName"></el-input>
                <el-button type="primary" class="searchBtn keyWBtn" @click="handleSearch">搜索</el-button>
            </el-form-item>
            <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.settlementType">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="2">月结</el-radio>
                    <el-radio label="4">周结</el-radio>
                    <el-radio label="1">日结</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="付款方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.payWay">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">线上</el-radio>
                    <el-radio label="2">线下</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="日期范围：" class="formSearchMargin">
                <el-date-picker class="margin_left10" size="mini" v-model="form.startDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择开始时间">
                </el-date-picker>
                &nbsp; ——
                <el-date-picker class="margin_left10" size="mini" v-model="form.endDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" class="searchBtn" @click="btn_true" style="margin-left:8px">确定</el-button>
            </el-form-item>
        </el-form>
        <el-button class="myplain-btn" style="margin: 8px 14px 18px 0px" @click="exportCollect" :disabled="isDisabled">
            导出
        </el-button>
        <div>
            总计<strong style="color:#e84518">{{total || 0}}</strong>条记录 &nbsp;
        </div>
        <div class="splitLine"></div>
        <div>
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息" v-loading="loading"
                      :summary-method="getSummaries" show-summary>
                <el-table-column prop="realNameAlias" label="姓名" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="batchNumber" label="批次" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="settlementTypeName" label="结算方式" show-overflow-tooltip align="center"
                                 min-width="50">
                </el-table-column>
                <el-table-column prop="attendance" label="考勤天数" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="workHours" label="工时" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column label="计件量" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
            <span>
              {{scope.row.jian ? scope.row.jian+'件、' : 0+'件、'}}
              {{scope.row.che ? scope.row.che+'车、' : 0+'车、'}}
              {{scope.row.dai ? scope.row.dai+'袋、' : 0+'袋、'}}
              {{scope.row.dun ? scope.row.dun+'吨' : 0+'吨'}}
            </span>
                    </template>
                </el-table-column>
                <el-table-column prop="salary" label="薪酬合计" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="punish" label="奖惩合计" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
                        <span>{{scope.row.punish+scope.row.reward}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="socialSecurityBase" label="应发收入" show-overflow-tooltip align="center"
                                 min-width="50">
                </el-table-column>
                <el-table-column prop="socialPay" label="社保扣款(元)" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
                        <span>{{scope.row.oldAgePension+scope.row.medicalInsurance+scope.row.unemploymentInsurance}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="accumulationFund" label="公积金扣款(元)" show-overflow-tooltip align="center"
                                 min-width="50">
                </el-table-column>
                <el-table-column prop="personalTax" label="个税(元)" show-overflow-tooltip align="center" min-width="50">
                </el-table-column>
                <el-table-column label="应发劳务收入" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
                        <span>{{scope.row.trueSalary-scope.row.socialSecurityBase}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="otherAmount" label="其余扣款合计(元)" show-overflow-tooltip align="center"
                                 min-width="50">
                </el-table-column>
                <el-table-column prop="deductAfter" show-overflow-tooltip label="实发收入(元)" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="trueShouldSalary" label="实发劳务收入(元)" show-overflow-tooltip align="center"
                                 min-width="50">
                </el-table-column>
                <el-table-column prop="totalAmount" label="实发合计" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
                        <span>{{scope.row.socialSalary+scope.row.trueSalary}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="taskName" label="类型" show-overflow-tooltip align="center" min-width="50">
                    <template v-slot="scope">
                        {{scope.row.settlementType | formatsettlementType}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="batchNumber" label="批次" align="center" show-overflow-tooltip min-width="50">
                </el-table-column>
                <el-table-column prop="talents" label="零工数" align="center" min-width="50">
                </el-table-column>
                <el-table-column prop="trueSalary" label="实发提供发票劳务收入(元)" show-overflow-tooltip align="center" min-width="50">
                </el-table-column> -->
                <!-- <el-table-column prop="charge" label="个体户服务费(元)" align="center" min-width="130">
                  <template scope="scope">
                    <span v-if="scope.row.status==1">{{(scope.row.trueSalary * rate).toFixed(2)}}</span>
                    <span v-else>{{scope.row.charge}}</span>
                  </template>
                </el-table-column> -->
                <el-table-column prop="createdAt" label="状态" align="center" min-width="50">
                    <template v-slot="scope">
                        {{scope.row.status | formatStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="付款方式" align="center" min-width="50">
                    <template v-slot="scope">
                        {{scope.row.payWay | formatPayWay }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="50">
                    <template v-slot="scope">
                        <el-button size="small" type="text" @click="routeToDetail(scope.row)">明细</el-button>
                        <!--<el-button size="small" type="text"  @click="routeToPrivate(scope.row)">个体户明细</el-button>-->
                        <!-- <el-button size="small" type="text" v-if="scope.row.status==2" @click="routeToPrivate(scope.row)">个体户明细</el-button> -->
                        <!--<el-button size="small" v-if="scope.row.status==1" type="text" @click="freeze( scope.row)">冻结</el-button>-->
                        <!--<el-button size="small" v-if="scope.row.status==2" type="text" @click="unfreeze(scope.row)">解冻</el-button>-->
                    </template>

                </el-table-column>
            </el-table>
            <div class="page-container">
                <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage"
                               @current-change="handleCurrentChange" :page-count="pageCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import util from '../../../../common/util'

    export default {
        name: "Unbound",
        component: {
            //someComponent
        },
        data() {
            return {
                DeleteVisible: false,
                currentPage: 1,
                pageSize: 20,
                pageCount: 0,
                settlementTypeList: '',
                belongtoList: '',
                input5: '',
                select: '',
                tableData: [],
                form: {
                    settlementType: '',
                    payWay: '',
                    talentName: '',
                    startDate: '',
                    endDate: ''
                },
                mineItem: {},
                publishId: '',
                total: 0,
                loading: true,
                exportCollectLoading: false,
                isDisabled: false,
                totals: {},
            }
        },
        filters: {
            formatminDate(val) {
                return util.minDate(val)
            },
            formatStatus(val) {
                if (val == 2) {
                    return '已付'
                } else if (val == 1) {
                    return '待付'
                } else {
                    return ''
                }
            },
            formatPayWay(val) {
                if (val == 1) {
                    return '线上'
                } else if (val == 2) {
                    return '线下'
                } else {
                    return '--'
                }
            },
            formatsettlementType(val) {
                if (val == 1) {
                    return '日收入'
                } else if (val == 2) {
                    return '月收入'
                } else if (val == 4) {
                    return '周收入'
                } else {
                    return ''
                }
            }
        },
        created() {
            //this.getRate();
        },
        mounted() {
            this.getDataList();
            this.getTotalData();
        },
        watch: {
            'form.payStatus': function (val, oldval) {
                this.currentPage = 1
                this.getList();
                this.getTotalData()
            },
            'form.settlementType': function (newval, oldval) {
                this.currentPage = 1
                this.getDataList()
                this.getTotalData()
            },
            'form.payWay': function (newval, oldval) {
                this.currentPage = 1
                this.getDataList()
                this.getTotalData()
            }
        },
        methods: {
            getRate() {
                const params = {
                    paramName: 'g_server_rate',
                };
                this.$api.ParamsInfo(params)
                    .then(response => {
                        if (response.respCode == 0) {
                            this.rate = response.data
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            // 合计接口
            getTotalData() {
                let params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    talentName: this.form.talentName,
                    payWay: this.form.payWay,
                    settlementType: this.form.settlementType,
                    startDate: this.form.startDate,
                    endDate: this.form.endDate
                }
                this.$api.batchNumberTotalData(params)
                    .then(res => {
                        console.log(res)
                        if (res.data.respCode == 0) {
                            if (res.data.data) {
                                this.totals = res.data.data
                            } else {
                                this.totals = {}
                            }
                        }
                    })
                    .catch()
            },
            getDataList() {
                let params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    talentName: this.form.talentName,
                    settlementType: this.form.settlementType,
                    payWay: this.form.payWay,
                    startDate: this.form.startDate,
                    endDate: this.form.endDate
                }
                this.$api.batchNumberSummary(params)
                    .then(res => {
                        this.loading = true
                        console.log(res)
                        if (res.data.respCode == 0) {
                            this.loading = false
                            if (res.data.data) {
                                const {
                                    data: {
                                        list,
                                        pages,
                                        total,
                                        pageNum,
                                    },
                                } = res.data;
                                this.tableData = list
                                this.pageCount = pages
                                this.total = total
                            } else {
                                this.tableData = []
                                this.pageCount = 0
                                this.total = 0
                            }
                            if (this.total) {
                                this.isDisabled = false
                            } else {
                                this.isDisabled = true
                            }
                        }
                    })
                    .catch(error => {
                        console.log('error')
                    })
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    payStatus: this.form.payStatus,
                }
                this.$api.batchNumberList(params).then((response) => {
                    const {
                        data: {
                            list,
                            pages,
                            total,
                            pageNum,
                        },
                    } = response.data;
                    this.tableData = list
                    this.pageCount = pages
                }).catch((error) => {
                    console.log(error);
                });
            },
            routeToDetail(row) {
                console.log(row)
                const {href} = this.$router.resolve({
                    name: "salaryDetail",
                    params: {
                        id: row.id,
                        talentId: row.talentId,
                        batchNumber: row.batchNumber,
                        settlementType: row.settlementType,
                        realNameAlias: row.realNameAlias
                    }
                });
                window.open(href, "_blank");
                // const { href } = this.$router.resolve({
                //   name: "payableDetail",
                //   params: {
                //     batchNumber: row.batchNumber,
                //     settlementType: row.settlementType,
                //     payAboutType: row.payAboutType,
                //     id: row.payAboutType == 1 ? row.customerId : row.managerId,
                //   }
                // });
                // window.open(href, "_blank");
            },
            routeToPrivate(row) {
                const {href} = this.$router.resolve({
                    name: "wokerprivateDetail",
                    params: {
                        batchNumber: row.batchNumber,
                        settlementType: row.settlementType,
                    }
                });
                window.open(href, "_blank");
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                // this.getList();
                this.getDataList()
            },
            routeTowoker() {
                this.$router.push({name: 'myworker'})
            },
            handleClose() {
            },
            addNew() {
                this.$router.push({name: 'addTask'})
            },
            handleSearch() {
                this.currentPage = 1
                this.getDataList()
                this.getTotalData()
            },
            exportCollect() {
                if (this.form.startDate == '' || this.form.endDate == '') {
                    this.$message({
                        message: '结束日期或者开始日期都不能为空！',
                        type: 'error'
                    })
                    return
                }
                if (this.form.startDate > this.form.endDate) {
                    this.$message({
                        message: '结束日期不能早于开始日期',
                        type: 'error'
                    })
                    return
                }
                if (this.exportCollectLoading) {
                    return
                }
                this.exportCollectLoading = true
                let params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    talentName: this.form.talentName,
                    payWay: this.form.payWay,
                    settlementType: this.form.settlementType,
                    startDate: this.form.startDate,
                    endDate: this.form.endDate
                }
                this.$api.AccountSettlementExport(params)
                    .then(res => {
                        if (res.data.respCode == 0) {
                            window.open(res.data.data)
                        }
                    }).catch(err => {
                    this.$message({
                        message: err,
                        type: 'error'
                    })
                }).finally(() => {
                    this.exportCollectLoading = false
                })

            },
            btn_true() {
                if (this.form.startDate == '' || this.form.endDate == '') {
                    this.$message({
                        message: '结束日期或者开始日期都不能为空！',
                        type: 'error'
                    })
                    return
                } else if (this.form.startDate > this.form.endDate) {
                    this.$message({
                        message: '结束日期不能早于开始日期',
                        type: 'error'
                    })
                    return
                } else {
                    this.currentPage = 1
                    this.getDataList()
                    this.getTotalData()
                }
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                sums[0] = '合计'
                sums[1] = ''
                sums[2] = ''
                sums[3] = this.totals.attendance ? this.totals.attendance.toFixed(2) : ''
                sums[4] = this.totals.workHours ? this.totals.workHours.toFixed(2) : ''
                sums[5] = this.totals.jian ? this.totals.jian + '件,' : '' + this.totals.che ? this.totals.che + '车,' : '' + this.totals.dai ? this.totals.dai + '袋,' : '' + this.totals.dun ? this.totals.dun + '吨' : ''
                sums[6] = this.totals.salary ? this.totals.salary.toFixed(2) : ''
                sums[7] = `${(this.totals.punish + this.totals.reward).toFixed(2) || ''}`
                sums[8] = this.totals.socialSecurityBase ? this.totals.socialSecurityBase.toFixed(2) : ''
                sums[9] = `${(this.totals.oldAgePension + this.totals.medicalInsurance + this.totals.unemploymentInsurance).toFixed(2) || ''}`
                sums[10] = this.totals.accumulationFund ? this.totals.accumulationFund.toFixed(2) : ''
                sums[11] = this.totals.personalTax ? this.totals.personalTax.toFixed(2) : ''
                sums[12] = `${(this.totals.salary - this.totals.socialSecurityBase).toFixed(2) || ''}`
                sums[13] = this.totals.otherAmount ? this.totals.otherAmount.toFixed(2) : ''
                sums[14] = this.totals.socialSalary ? this.totals.socialSalary.toFixed(2) : ''
                sums[15] = this.totals.trueShouldSalary ? this.totals.trueShouldSalary.toFixed(2) : ''
                sums[16] = `${(this.totals.socialSalary + this.totals.trueSalary).toFixed(2) || ''}`
                sums[17] = ''
                sums[18] = ''
                sums[19] = ''
                sums[20] = '明细'
                return sums;
                // <el-button size="small" type="text" id="btn_ert">明细</el-button>
            }
        },
    }
</script>


<style scoped>
    .el-input .el-select {
        width: 100px;
    }

    .select-input {
        width: 396px;
        margin-right: 20px;
    }
</style>
