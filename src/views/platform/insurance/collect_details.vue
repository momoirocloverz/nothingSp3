<template>
    <div>
        <el-form :model="formDetail" label-width="100px" label-position="left" class="formSearchMarginTop">
            <el-form-item label="状态：" class="formSearchMargin" >
                <el-radio-group class="radio-search" v-model="formDetail.policyStatus" @change="policyStatusChange('formDetail','policyStatus')">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">保障中</el-radio>
                    <el-radio label="0">待生效</el-radio>
                    <el-radio label="2">已失效</el-radio>
                </el-radio-group>
            </el-form-item>            
            <el-form-item label="出险状态：" class="formSearchMargin" >
                <el-radio-group class="radio-search" v-model="formDetail.riskStatus" @change="statusChange('formDetail','riskStatus')">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">已出险</el-radio>
                    <el-radio label="0">未出险</el-radio>
                </el-radio-group>
            </el-form-item>            
            <!-- <el-form-item label="投保时间：" class="formSearchMargin" >
                <el-radio-group class="radio-search" v-model="formDetail.date">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">本月</el-radio>
                    <el-radio label="2">自定义</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自定义：" class="formSearchMargin" v-if="formDetail.date == '2'">
                <el-date-picker class="margin_left40" size="mini" v-model="formDetail.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
                </el-date-picker>
                --
                <el-date-picker class="margin_left10" size="mini" v-model="formDetail.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" size="small" class="datesearchBtn">确定</el-button>
            </el-form-item> -->
            <el-form-item label="关键字：" class="formSearchMargin">
                <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入被保人姓名搜索" v-model="formDetail.talentName"></el-input>
                <el-button type="primary" size="small" class="datesearchBtn" @click="btn_search">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="medium " class="datesearchBtn" style="margin:30px 0 20px 0;" :disabled="tableData.length == 0?true:false" @click="export_excel">导出</el-button>
            <div>合计保单数&nbsp;{{total || 0}}</div>
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息" style="margin:20px 0 0 0;">
                <el-table-column prop="policyNo" label="保单号" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="talentName" label="被保人" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="policyTime" label="保障时间" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="createdTime" label="投保时间" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="managerName"  :formatter="managerName" label="项目经理" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="schedulingName" label="排班" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="policyStatusStr" label="状态" align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="riskStatus" label="出险状态" align="center" min-width="100">
                </el-table-column>
          </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount" :page-size="pageSize" :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [{a:1,b:2,c:3}],
            formDetail: {
                policyStatus: '',
                // date: '1',
                // startDate: '',
                // endDate: '',
                talentName: '',
                riskStatus:'',
            },
            pageCount: 1,
            pageSize: 20,
            currentPage: 1,
            total: 0,
            date: '',
        }
    }, 
    mounted(){
        this.date = this.$route.params.date;
        this.getData()
    },
    methods: {
        getData(){
            const params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                talentName: this.formDetail.talentName,
                policyStatus: this.formDetail.policyStatus,
                riskStatus: this.formDetail.riskStatus,
                startDate: this.date,
                endDate: this.date
            }
            this.$api.insuList(params).then(res => {
                if(res.data.respCode == 0){
                    if(res.data.data){
                        this.tableData = res.data.data.list || []
                        this.pageCount = res.data.data.pages
                        this.total = res.data.data.total
                    }
                }
            }).catch()
        },
        managerName(row, column, cellValue){
            if(cellValue) {
                return cellValue
            }else{
                return '无'
            }
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getData()
        },
        export_excel(){
            const params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                talentName: this.formDetail.talentName,
                policyStatus: this.formDetail.policyStatus,
                riskStatus: this.formDetail.riskStatus,
                startDate: this.date,
                endDate: this.date
            }
            this.$api.insuListExport(params).then(res => {
                if(res.data.respCode == 0){
                    window.open(res.data.data)
                }
            }).catch()
        },
        btn_search(){
            this.resetCurrentPage();
        },
        resetCurrentPage(){
            this.currentPage = 1
            this.getData()
        },
        policyStatusChange(form,item){
            this.resetCurrentPage();
        },
        statusChange(form,item){
            this.resetCurrentPage();
        },
    },    
}
</script>
<style>
.inputWidth{
    width: 300px;
}
.datesearchBtn{
    margin-left: 15px;
}
.page-container{
    margin-top: 15px;
}
</style>
