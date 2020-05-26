<template>
    <div class="taskAmountCon">
        <el-form :model="formDetail" label-width="120px" label-position="left" class="formSearchMarginTop">
            <el-form-item label="任务领取状态：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.receiveStatus">
                    <el-radio label="">不限</el-radio>
                    <!--1：待挂靠确认-班务经理领取的任务就是该状态\r-->
                    <!--2：待对方确认-挂靠经理人同意后需要发任务的经理人进行确认\r-->
                    <!--3：领取成功-发任务的经理人同意\r-->
                    <!--4：领取失败-发任务的经理人拒绝\r-->
                    <!--5：挂靠失败-挂靠经理不同意该挂靠任务\r-->
                    <!--6：已放弃-1状态下班务经理进行放弃操作或2状态下挂靠经理人进行放弃操作",-->
                    <el-radio label="1">待挂靠确认</el-radio>
                    <el-radio label="2">待对方确认</el-radio>
                    <el-radio label="3">领取成功</el-radio>
                    <el-radio label="4">领取失败</el-radio>
                    <el-radio label="5">挂靠失败</el-radio>
                    <el-radio label="6">已放弃  </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="保证金状态：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.depositStatus">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">已支付</el-radio>
                    <el-radio label="3">已退回</el-radio>
                    <el-radio label="2">退回失败</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="receiveTime" :formatter="isHaveTime" label="抢单时间" min-width="100"></el-table-column>
            <el-table-column prop="taskName" label="任务名称" min-width="100"></el-table-column>
            <el-table-column prop="publisherName" :formatter="isHave" label="发布人" min-width="100"></el-table-column>
            <el-table-column prop="hookCusShortName" :formatter="isHave" label="挂靠经理人" min-width="100"></el-table-column>
            <el-table-column prop="managerNameAlias" :formatter="isHave" label="接单班务经理" min-width="100"></el-table-column>
            <el-table-column prop="startTime" :formatter="isHaveTime" label="开始日期" min-width="100"></el-table-column>
            <el-table-column prop="endTime" :formatter="isHaveTime" label="结束日期" min-width="100"></el-table-column>
            <el-table-column prop="settlementType" :formatter="setTypeFor" label="结算方式" min-width="100"></el-table-column>
            <el-table-column prop="workingPlace" label="工作地点" min-width="100"></el-table-column>
            <el-table-column prop="cusAuthorizedNumber" label="所需人数" min-width="100"></el-table-column>
            <el-table-column prop="price" label="任务单价" :formatter="forPrice" min-width="100"></el-table-column>
            <el-table-column prop="status" label="抢单状态" :formatter="statusModify" min-width="100"></el-table-column>
            <el-table-column prop="deposit" label="保证金"  min-width="100"></el-table-column>
            <el-table-column prop="depositStatus" label="保证金状态" :formatter="statusDeposit" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="see(scope.row)">查看记录</el-button>
                    <!--<el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="pageCount" :page-size="pageSize" :current-page="currentPage">
            </el-pagination>
        </div>
        <!--查看记录-->
        <el-dialog :title="`${viewInfo.taskName} - 保证金交易记录`" :visible.sync="dialogInsuVisible" width="1100px">
            <el-table class="table-outline" :data="formList" style="margin:20px 0 0 0;">
                <el-table-column prop="createdAt" label="日期" align="center">
                </el-table-column>
                <el-table-column prop="deposit" label="金额" align="center">
                </el-table-column>
                <el-table-column prop="status" :formatter="statusDeposit" label="状态" align="center">
                </el-table-column>
            </el-table>
            <!--<div class="page-container">-->
            <!--<el-pagination class="pagebox" background layout="prev, pager, next" @current-change="viewChange"-->
            <!--:page-count="pageViewCount" :page-size="pageSize" :current-page="currentViewPage">-->
            <!--</el-pagination>-->
            <!--</div>-->
            <div slot="footer" class="dialog-footer pt20 pb20" style="text-align: center">
                <el-button type="primary" @click="dialogInsuVisible=false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                formList: [],
                formDetail: {
                    receiveStatus: '',
                    depositStatus: '',
                },
                dialogInsuVisible:false,
                pageCount: 1,
                pageViewCount: 1,
                pageSize: 20,
                currentPage: 1,
                currentViewPage: 1,
                total: 0,
                viewInfo:{}
            }
        },
        watch: {
            'formDetail.receiveStatus': function (val, oldVal) {
                this.currentPage = 1;
                this.getData()
            },
            'formDetail.depositStatus': function (val, oldVal) {
                this.currentPage = 1;
                this.getData()
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            isHave(row,col,val){
                if(val){
                    return val
                }else{
                    return '--'
                }
            },
            isHaveTime(row,col,val){
                if(val){
                    return `${val.substring(0,10)} \n ${val.substring(10,16)}`;
                }else{
                    return '--'
                }
            },
            setTypeFor(row,col,val){
                if(val == 1){
                    return '日结'
                }else if(val == 2){
                    return '月结'
                }else if(val == 4){
                    return '周结'
                }else{
                    return '--'
                }
            },
            statusDeposit(row, column, cellValue, index){
                let status = '';
                // 1.已支付 2.退回失败  3.已退回
                switch (Number.parseInt(cellValue)) {
                    case 1:
                        status = '已支付';
                        break;
                    case 2:
                        status = '退回失败';
                        break;
                    case 3:
                        status = '已退回';
                        break;
                    default:
                        status = '--';
                        break
                }
                return status
            },
            statusModify(row, column, cellValue, index) {
                let status = '';
                // 待挂靠确认-班务经理领取的任务就是该状态
                // 待对方确认-挂靠经理人同意后需要发任务的经理人进行确认
                // 领取成功-发任务的经理人同意
                // 领取失败-发任务的经理人拒绝
                // 挂靠失败-挂靠经理不同意该挂靠任务
                // 已放弃-1状态下班务经理进行放弃操作或2状态下挂靠经理人进行放弃操作
                switch (Number.parseInt(cellValue)) {
                    case 1:
                        status = '待挂靠确认';
                        break;
                    case 2:
                        status = '待对方确认';
                        break;
                    case 3:
                        status = '领取成功';
                        break;
                    case 4:
                        status = '领取失败';
                        break;
                    case 5:
                        status = '挂靠失败';
                        break;
                    case 6:
                        status = '已放弃';
                        break;
                    default:
                        status = '--';
                        break
                }
                return status
            },
            async getData() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    receiveStatus: this.formDetail.receiveStatus,//任务领取状态（1.待挂靠确认,2.待对方确认,3.领取成功,4.领取失败,5.挂靠失败,6.已放弃）",
                    depositStatus: this.formDetail.depositStatus,//（1.已支付 2.退回失败  3.已退回）"
                };
                const {data} = await this.$api.assmList(params);
                if(data.respCode === 0){
                    if(data.data.list){
                        this.tableData = [...data.data.list];
                        this.pageCount = data.data.pages;
                    }else{
                        this.tableData = [];
                        this.pageCount = 1;
                    }
                }
                console.log(data);
            },
            async getViewData() {
                this.formList = [];
                this.pageViewCount = 1;
                const params = {
                    bizType:this.viewInfo.bizType,
                    bizId:this.viewInfo.bizId,
                };
                const {data,respCode} = await this.$api.recordList(params);
                console.log(data,respCode);
                if(respCode === 0){
                    if(data){
                        this.formList = [...data];
                    }
                }
            },
            see(row) {
                this.viewInfo = row;
                this.getViewData();
                this.dialogInsuVisible = true;
            },
            managerName(row, column, cellValue) {
                if (cellValue) {
                    return cellValue
                } else {
                    return '无'
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData()
            },
            viewChange(val) {
                this.currentViewPage = val
                this.getData()
            },
            forPrice(val) {
                if(val.price){
                    let salary = JSON.parse(val.price)
                    for (let item of salary.price) {
                        let content = ''
                        if (salary.valuationType == 1) {
                            content = `${item.countTime}元/小时`
                        } else if (salary.valuationType == 8) {
                            content = `${item.countFixed}元/天`
                        } else if (salary.valuationType == 2) {
                            if (salary.unit == 1) {
                                content = `${item.countSettle}元/件`
                            } else if (salary.unit == 2) {
                                content = `${item.countDai}元/袋`
                            } else if (salary.unit == 3) {
                                content = `${item.countChe}元/车`
                            } else {
                                content = `${item.countDun}元/吨`
                            }
                        } else if (salary.valuationType == 3) {
                            let varUnit
                            if (salary.unit == 1) {
                                varUnit = '件'
                            } else if (salary.unit == 2) {
                                varUnit = '袋'
                            } else if (salary.unit == 3) {
                                varUnit = '车'
                            } else {
                                varUnit = '吨'
                            }
                            content += `${(item.ladderObj)[0].count}${varUnit}以下（含），${(item.ladderObj)[0].unit}元/${varUnit}`
                            for (let z in item.ladderObj) {
                                if (z > 0 && z != (item.ladderObj.length - 1)) {
                                    content += `；${(Number((item.ladderObj)[z - 1].count)) + 1}至${(item.ladderObj)[z].count}${varUnit}（含），${(item.ladderObj)[z].unit}元/${varUnit}`
                                }
                            }
                            content += `；${(item.ladderObj)[item.ladderObj.length - 2].count}${varUnit}以上，${(item.ladderObj)[item.ladderObj.length - 1].overUnit}元/${varUnit}`
                        } else if (salary.valuationType == 4) {
                            if (item.countSettle) {
                                content += `${item.countSettle}元/件,`
                            }
                            if (item.countDai) {
                                content += `${item.countDai}元/袋,`
                            }
                            if (item.countChe) {
                                content += `${item.countChe}元/车,`
                            }
                            if (item.countDun) {
                                content += `${item.countDun}元/吨`
                            }
                        } else if (salary.valuationType == 5) {

                            if (salary.unit == 1) {
                                content += `${item.countSettle}元/件，`
                            } else if (salary.unit == 2) {
                                content += `${item.countDai}元/袋，`
                            } else if (salary.unit == 3) {
                                content += `${item.countChe}元/车，`
                            } else {
                                content += `${item.countDun}元/吨，`
                            }
                            content += `${item.countTime}元/小时`
                        } else if (salary.valuationType == 6) {
                            content += `${item.countTime}元/小时,`
                            let varUnit
                            if (salary.unit == 1) {
                                varUnit = '件'
                            } else if (salary.unit == 2) {
                                varUnit = '袋'
                            } else if (salary.unit == 3) {
                                varUnit = '车'
                            } else {
                                varUnit = '吨'
                            }
                            content += `${(item.ladderObj)[0].count}${varUnit}以下（含），${(item.ladderObj)[0].unit}元/${varUnit}`
                            for (let z in item.ladderObj) {
                                if (z > 0 && z != (item.ladderObj.length - 1)) {
                                    content += `；${(Number((item.ladderObj)[z - 1].count)) + 1}至${(item.ladderObj)[z].count}${varUnit}（含），${(item.ladderObj)[z].unit}元/${varUnit}`

                                }
                            }
                            content += `；${(item.ladderObj)[item.ladderObj.length - 2].count}${varUnit}以上，${(item.ladderObj)[item.ladderObj.length - 1].overUnit}元/${varUnit}`
                        } else {

                            if (item.countSettle) {
                                content += `${item.countSettle}元/件,`
                            }
                            if (item.countDai) {
                                content += `${item.countDai}元/袋,`
                            }
                            if (item.countChe) {
                                content += `${item.countChe}元/车,`
                            }
                            if (item.countDun) {
                                content += `${item.countDun}元/吨,`
                            }
                            content += `${item.countTime}元/小时`
                        }
                        return content
                    }
                }else{
                    return '';
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .page-container {
        margin-top: 15px;
    }

    .table-outline {
        margin-top: 20px;
    }
</style>
<style lang="scss">
    .taskAmountCon {
        .el-table {
            .cell {
                text-align: center;
            }
        }
    }
</style>