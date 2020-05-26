<template>
    <div>
        <el-form :model="formDetail" label-width="100px" label-position="left" class="formSearchMarginTop">
            <el-form-item label="日期：" class="formSearchMargin" >
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
                <el-button type="primary" size="small" class="datesearchBtn" @click="true_btn">确定</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="medium " class="datesearchBtn" style="margin:20px 0 20px 0;" :disabled="tableData.length == 0?true:false" @click="export_btn">导出</el-button>
        <div>合计保单数&nbsp;{{total || 0}}</div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关经理人信息" style="margin:20px 0 0 0;">
            <el-table-column prop="date" label="日期" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="count" label="可结算保单数量" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="c" label="操作" align="center" min-width="100">
                <template scope="scope">
                    <span style="cursor: pointer;" @click="goToDetails(scope.row)">明细</span>
                </template>
            </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount" :page-size="pageSize" :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
</template>
<script>
import Interval from '../../../common/interval.js'
export default {
    data(){
        return{
            tableData: [{a:1,b:2,c:3}],
            formDetail: {
                date: '1',
                startDate: '',
                endDate: ''
            },
            pageCount: 1,
            pageSize: 20,
            currentPage: 1,
            total: 0
        }
    },
    mounted(){
        this.getData()
    },
    watch: {
        'formDetail.date':function(val,old){
            if(val == ''){
                this.currentPage = 1
                this.getData()
            }else if(val == '1'){
                this.currentPage = 1
                this.getData()
            }else if(val == '2'){
                this.formDetail.startDate = ''
                this.formDetail.endDate = ''
            }
        }
    },
    methods: {
        getData(){
            if(this.formDetail.date == ''){
                this.formDetail.startDate = ''
                this.formDetail.endDate = ''
            }else if(this.formDetail.date == '1'){
                this.formDetail.startDate = new Date().getFullYear()+ '-' +((new Date().getMonth() + 1).toString().length == 1 ? '0'+(new Date().getMonth() + 1) : (new Date().getMonth() + 1))+'-01'
                this.formDetail.endDate = Interval.getDay(0)
            }else if(this.formDetail.date == '2'){
                this.formDetail.startDate = this.formDetail.startDate
                this.formDetail.endDate = this.formDetail.endDate
            }
            const params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                startDate: this.formDetail.startDate,
                endDate: this.formDetail.endDate
            }
            this.$api.platInsuSummaryList(params).then(res => {
                // console.log(res)
                if(res.data.respCode == 0){
                    if(res.data.data){
                        this.tableData = res.data.data.list.list || []
                        this.pageCount = res.data.data.list.pages
                        this.total = res.data.data.total
                    }
                }
            }).catch()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getData()
        },
        goToDetails(row){
            const { href } = this.$router.resolve({
                name: 'collectDetails',
                params: {
                    date: row.date
                }
            })
            window.open(href, '_blank')
        },
        true_btn(){
            this.currentPage = 1
            this.getData()
        },
        export_btn(){
            const params = {
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                startDate: this.formDetail.startDate,
                endDate: this.formDetail.endDate
            }
            this.$api.platInsuSummaryExport(params).then(res => {
                // console.log(res)
                if(res.data.respCode == 0){
                    window.open(res.data.data)
                }
            }).catch()
        }
    }
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
