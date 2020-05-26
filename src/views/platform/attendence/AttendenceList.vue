<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <!--选择条件的单选按钮-->
            <el-form-item label="客户：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="form.customerId">
                    <el-radio label="">不限</el-radio>
                    <el-radio :label="item.customerId" v-for="item in customerList" v-if="item.customerId">{{item.customerName}}</el-radio>
                    <!-- <el-radio label="2">领取完毕</el-radio>
                    <el-radio label="3">已关闭</el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group  class="radio-search"  v-model="form.settlementType"  >
                    <el-radio label="">不限</el-radio>
                    <!--<el-radio :label="item.dicVal" v-for="item in settlementTypeList" >{{item.dicName}}</el-radio>-->

                    <el-radio label="2">月结</el-radio>
                    <el-radio label="4">周结</el-radio>
                    <el-radio label="1">日结</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="日期范围：" class="formSearchMargin">
                <!--<el-date-picker-->
                <!--class="margin_left10"-->
                <!--size="mini"-->
                <!--v-model="form.date"-->
                <!--type="daterange"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
                <el-date-picker
                        class="margin_left10"
                        size="mini"
                        v-model="startDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间">
                </el-date-picker>
                &nbsp; ——
                <el-date-picker
                        class="margin_left10"
                        size="mini"
                        v-model="endDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="关键字：" class="formSearchMargin ">

                <el-input placeholder="输入关键字搜索" v-model="form.keyWord" size="mini" class="input-with-select select-input">
                    <el-select v-model="form.selectType" slot="prepend" placeholder="请选择">
                        <el-option label="任务名称" value="2"></el-option>
                        <el-option label="排班名称" value="1"></el-option>
                        <el-option label="零工姓名" value="3"></el-option>
                    </el-select>
                </el-input>
                <el-button type="primary" class="searchBtn" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <div >
            <el-table
                    class="table-outline"
                    :data="tableData"
                    empty-text="暂无相关考勤信息"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="工种">
                                <span >  {{props.row.industryName }}</span>
                            </el-form-item>
                            <el-form-item label="任务">
                                <span class="is-link" @click="RouteToTask(props.row)">
                        {{props.row.taskName}}
                    </span>
                            </el-form-item>
                            <el-form-item label="客户">
                               <span>
                        {{props.row.customerShortName}}
                    </span>
                            </el-form-item>
                            <el-form-item label="间接客户">
                               <span>
                        {{props.row.platformIndirectCustomerName}}
                    </span>
                            </el-form-item>
                            <el-form-item label="来源">
                              <span v-if="props.row.type==1">
                     排班
                    </span>
                                <span class="is-link" @click="RouteToTask(props.row)" v-if="props.row.type==2">
                        {{props.row.sourceTaskName}}
                    </span>
                            </el-form-item>
                            <el-form-item label="考勤图片">
                                <el-button size="small" type="text" @click="routeToImg( props.row)">查看</el-button>

                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="realNameAlias" label="姓名" show-overflow-tooltip align="center" min-width="100px">
                </el-table-column>
                <el-table-column prop="" label="排班" show-overflow-tooltip align="center" min-width="150">
                    <template v-slot="scope">
                    <span class="is-link" @click="RouteToschedule(scope.row)">
                        {{scope.row.schedulingName}}
                    </span>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="customerShortName" label="客户"  align="center" min-width="140">-->
                <!--</el-table-column>-->
                <el-table-column prop="schedulingDate" label="考勤日期" align="center"  min-width="120">
                </el-table-column>
                <el-table-column prop="startTimeTrue" label="上班时间(零工)" align="center" show-overflow-tooltip min-width="120">
                    <template v-slot="scope">
                       <span v-if="scope.row.workStartTime">{{scope.row.workStartDate==scope.row.schedulingDate?'当日':'次日'}}{{scope.row.workStartTime | formatTimeString}}</span>
                       <span v-else>无</span>
                    </template>
                </el-table-column>
                <el-table-column prop="endTimeTrue" label="下班时间(零工)" align="center" min-width="120">
                    <template v-slot="scope">
                       <span v-if="scope.row.workEndTime">{{scope.row.workEndDate==scope.row.schedulingDate?'当日':'次日'}}{{scope.row.workEndTime | formatTimeString}}</span>
                       <span v-else>无</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pieceSize" label="计件量(零工)" align="center" show-overflow-tooltip min-width="130">
                    <template v-slot="scope">
                    {{scope.row.pieceSize | formatTotal}}{{scope.row.pieceState | formatState}}
                    </template>
                </el-table-column>

                <el-table-column prop="startTimeTrue" label="上班打卡(客户)" align="center" show-overflow-tooltip min-width="120" :formatter="forTypeStart">
                    <!-- <template scope="scope">
                        {{scope.row.customerStartTime | formatCusTimeString}}
                    </template> -->
                </el-table-column>
                <el-table-column prop="endTimeTrue" :formatter="forType" label="下班打卡(客户)" align="center" min-width="120">
                    <!-- <template scope="scope">
                        {{scope.row.customerEndWorkType == 2 ? '次日' : '当日'}}{{scope.row.customerEndTime | formatCusTimeString}}
                    </template> -->
                </el-table-column>

            </el-table>
            <div class="page-container">
                <el-pagination
                        class="pagebox"
                        background
                        layout="prev, pager, next"
                        :current-page="currentPage"
                        @current-change="handleCurrentChange"
                        :page-count="pageCount">
                </el-pagination>
            </div>
            <el-dialog
                    title=""
                    :visible.sync="ImageVisible"
                    width="500px"
                    center
            >
                <div class="">
                    <span class="img-label">上班考勤图片</span>
                    <img :src="selected.startPhoto" v-if="selected.startPhoto" style="width: 100%"/>
                    <p v-else style="text-align: center">暂无图片</p>
                    <span class="img-label">下班考勤图片</span>
                    <img :src="selected.endPhoto" v-if="selected.startPhoto" style="width: 100%"/>
                    <p v-else style="text-align: center">暂无图片</p>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button round size="large" class="dialog-large-button" type="primary" @click="ImageVisible = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import util from '../../../common/util'
  export default {
    name:'AttendenceList',
    data () {
      return {
        selected:{},
        startDate:'',
        endDate:'',
        customerList:[],
        form:{
          customerId:'',
          settlementType:'',
          keyWord:'',
          date:'',
          selectType:'1',
        },
        tableData:[],
        settlementTypeList:[],
        pageCount:0,
        currentPage:1,
        pageSize:10,
        ImageVisible:false,
      }
    },
    filters:{
      formatState(val){
        if(val==1){
          return '(待审核)'
        }
        else if(val==2){
          return '(通过审核)'
        }
        else if(val==3){
          return '(审核拒绝)'
        }else {
          return ''
        }
      },
      formatCusTimeString(val){
        if(val){
          return val.substring(0,5)
        }else{
          return '无'
        }
      },
      formatTimeString(val){
        if(val){
          return val.substring(0,5)
        }else{
          return '未打卡'
        }
      },
      formatTotal(val){
        if(val){
          return util.formatPieceSize(val)
        }
      },
    },
    watch:{
      'form.customerId':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
      'form.settlementType':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },

    },
    methods: {
      routeToImg(row){
        this.selected=row;
        this.ImageVisible=true
      },
      RouteToTask(row) {
        const {href} = this.$router.resolve({
          name: "TaskDetail",
          params: {
            id: row.taskId,
          }
        });
        window.open(href, "_blank");
      },
      RouteToschedule(row) {
        const {href} = this.$router.resolve({
          name: "schedulingDetail",
          params: {
            id: row.schedulingId,
            hasPhoto:row.hasPhoto
          }
        });
        window.open(href, "_blank");
      },
      getList(){
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          customerId:this.form.customerId,
          selectType:this.form.selectType,
          keyWords:this.form.keyWord,
          startDate:this.startDate,
          endDate:this.endDate,
          settlementType:this.form.settlementType,
        }
        this.$api.attendanceList(params).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.tableData=list
          this.pageCount=pages
        }).catch((error) => {
          console.log(error);
        });
      },
      getCustomerList(){
        const params ={
          type:1
        }
        this.$api.scheCustomer(params).then((response) => {
          if(response.respCode==0){
            this.customerList=response.data
            console.log(this.customerList)
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getsettlement() {
        this.$api
            .getDicList("settlementType", 0)
            .then(response => {
              this.settlementTypeList = response.data.data;
            })
            .catch(error => {
              console.log(error);
            });
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getList()
      },
      forType(val){
        if(val.customerEndTime){
          if(val.customerEndDate == val.schedulingDate){
            return `当日${val.customerEndTime.substring(0,5)}`
          }else{
            return `次日${val.customerEndTime.substring(0,5)}`
          }
        }else{
          return '无'
        }
      },
      forTypeStart(val){
        if(val.customerStartTime){
          if(val.customerStartDate == val.schedulingDate){
            return `当日${val.customerStartTime.substring(0,5)}`
          }else{
            return `次日${val.customerStartTime.substring(0,5)}`
          }
        }else{
          return '无'
        }
      },
      search(){
        this.currentPage = 1
        this.getList()
      }
    },
    mounted() {
//        this.getsettlement()
      this.getCustomerList()
      this.getList()
    },
  }
</script>
<style scoped>
    .el-input  .el-select{
        width: 100px;
    }
    .select-input{
        width:396px;
        margin-right: 20px;
    }
    .img-label{
        font-family: PingFang-SC-Heavy;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 0px;
        color: #3b3b3b;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>