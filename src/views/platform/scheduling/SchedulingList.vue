<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <!--选择条件的单选按钮-->
            <el-form-item label="客户：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="form.customerId">
                    <el-radio label="">不限</el-radio>
                    <el-radio :label="item.customerId" v-for="item in customerList" v-if="item.customerId">{{item.customerName}}</el-radio>
                    <!-- <el-radio label="1">待领取</el-radio>
                    <el-radio label="2">领取完毕</el-radio>
                    <el-radio label="3">已关闭</el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态：" class="formSearchMargin">
                <el-radio-group  class="radio-search"  v-model="form.status"  >
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">待确认</el-radio>
                    <el-radio label="2">待结算</el-radio>
                    <el-radio label="3">已结束</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="formSearchMargin ">

                <el-input placeholder="输入关键字搜索" v-model="form.keyWords" size="mini" class="input-with-select select-input">
                    <el-select v-model="form.selectType" slot="prepend" placeholder="请选择">
                        <el-option label="排班名称" value="1"></el-option>
                        <el-option label="所属任务" value="2"></el-option>
                        <el-option label="项目经理" value="3"></el-option>
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
                    empty-text="暂无相关排班信息"
            >
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="所属客户">
                            <span class="is-link" @click="RouteToCus(props.row)">{{props.row.customerShortName}}</span>
                        </el-form-item>

                        <el-form-item label="所属任务">
                            <span class="is-link" @click="RouteToTask(props.row)">
                        {{props.row.taskName}}
                    </span>
                        </el-form-item>
                        <el-form-item label="最早上班时间">
                            <span >  {{props.row.workStartTime }}</span>
                        </el-form-item>
                        <el-form-item label="最晚下班时间">
                            <span> {{props.row.endWorkType==1?'当日':'次日'}}{{props.row.workEndTime}}</span>
                        </el-form-item>
                        <el-form-item label="核定人数">
                            <span>{{ props.row.authorizedNumber}}</span>
                        </el-form-item>
                        <el-form-item label="正常人数">
                            <span >{{ props.row.normalNumber}}</span>

                        </el-form-item>
                        <el-form-item label="空挂人数">
                            <span >{{ props.row.emptyNumber}}</span>
                        </el-form-item>

                        <el-form-item label="工作地点" style="width: 100%;">
                            <span >{{ props.row.workingPlace}}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column prop="schedulingName" label="排班名称" show-overflow-tooltip align="center" min-width="150">
                </el-table-column>

                <el-table-column prop="managerName" label="项目经理" show-overflow-tooltip align="center" min-width="120">
                    <template scope="scope">

                        <span  class="is-link" @click="RouteToPm(scope.row)">
                         {{scope.row.managerNameAlias}}
                    </span>

                    </template>
                </el-table-column>
                <el-table-column prop="foremanName" label="班组长" align="center" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="total" label="班务工作总量" align="center" show-overflow-tooltip min-width="150">
                    <template v-slot="scope">
                        {{scope.row.total | formatTotal}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip min-width="100">
                    <template scope="scope">
                        {{scope.row.schedulingStatus}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="100">
                    <template v-slot="scope">
                        <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
                    </template>

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
        </div>
    </div>
</template>
<script>
  import util from '../../../common/util'
  export default {
    name:'SchedulingList',
    data () {
      return {
        customerList:[],
        pageSize:10,
        form:{
          customerId:'',
          settlementType:'',
          keyWord:'',
          date:'',
          select:'1',
          status:'',
          selectType:'1'
        },
        tableData:[],
        settlementTypeList:[],
        pageCount:0,
        currentPage:1,
      }
    },
    filters:{
      formatTotal(val){
        if(val){
          return util.formatPieceSize(val)
        }
      },
      formatTimeString(val){
        if(val){
          return val.substring(0,5)
        }
      },
      formatminDate(val){
        return util.minDate(val)
      },
      formatStatus(val){
        if(val==1){
          return '未结束'
        }else if(val==2){
          return '已结束'
        }else{
          return ''
        }
      }
    },
    watch:{
      'form.customerId':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
      'form.status':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },

    },
    methods: {
      routeToDetail(row) {
        util.setLocalStorage('scheName',row.schedulingName)
        const {href} = this.$router.resolve({
          name: "schedulingDetail",
          params: {
            id: row.id,
            hasPhoto:row.hasPhoto
          }
        });
        window.open(href, "_blank");
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
      RouteToPm(row) {

        const {href} = this.$router.resolve({
          name: "pmDetail",
          params: {
            id: row.managerId,
          }
        });
        window.open(href, "_blank");
      },
      RouteToCus(row) {

        const {href} = this.$router.resolve({
          name: "customerDetail",
          params: {
            id: row.customerId,
          }
        });
        window.open(href, "_blank");
      },
      getList(){
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          customerId:this.form.customerId,
          status:this.form.status,
          selectType:this.form.selectType,
          keyWords:this.form.keyWords,
          talentType:1
        }
        this.$api.scheduleList(params).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          if(response.data.respCode==0){
            this.tableData=list
            this.pageCount=pages          }

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
      search(){
        this.currentPage = 1
        this.getList()
      }
    },
    mounted() {
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
