<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <!--选择条件的单选按钮-->
            <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="form.payStatus">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">待付</el-radio>
                    <el-radio label="2">待确认收款</el-radio>
                    <el-radio label="3">已付</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <div >
            <el-table
                    class="table-outline"
                    :data="tableData"
                    empty-text="暂无相关信息"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column prop="payerName" label="付款方" align="center" min-width="120">
                    <template v-slot="scope">
                    <span class="is-link" @click="RouteToPay(scope.row)">
                        {{scope.row.payerName}}
                    </span>
                    </template>
                </el-table-column>
                <el-table-column prop="taskName" label="任务" align="center" min-width="120">
                    <template v-slot="scope">
                    <span class="is-link" @click="RouteToTask(scope.row)">
                        {{scope.row.taskName}}
                    </span>
                    </template>
                </el-table-column>
                <el-table-column prop="managerName" label="项目经理"  align="center" show-overflow-tooltip min-width="120">
                    <template v-slot="scope">
                        <span class="is-link" @click="RouteToManager(scope.row)">{{scope.row.managerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="receiveMoneyCompany" label="收款方" show-overflow-tooltip align="center" min-width="150">
                </el-table-column>
                <el-table-column prop="batchNumber" show-overflow-tooltip label="批次" align="center" min-width="120">
                </el-table-column>
                <el-table-column prop="salary" label="金额(元)"  align="center" min-width="100">
                </el-table-column>
                <el-table-column prop="workHours" label="总工时" align="center" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="pieceSize" label="计件量" align="center" show-overflow-tooltip min-width="100">
                  <template v-slot="scope">
                        {{scope.row.pieceSize | formatpieceSize}}
                    </template>
                </el-table-column>
                <!--<el-table-column prop="valuationType" label="计价方式" align="center" show-overflow-tooltip min-width="100">-->
                    <!--<template scope="scope">-->
                        <!--{{scope.row.valuationType | formatvaluationType}}-->
                    <!--</template>-->

                <!--</el-table-column>-->
                <!--<el-table-column prop="taskSalary" label="单价" align="center" show-overflow-tooltip min-width="150">-->
                  <!--<template scope="scope">-->
                        <!--{{scope.row.taskSalary | formataskSalary}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="payStatus" label="状态" align="center" min-width="100">
                    <template v-slot="scope">
                        {{scope.row.payStatus | formatpayStatus}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="100">
                    <template v-slot="scope">
                        <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
                        <!--<el-button size="small" v-if="scope.row.status==1" type="text" @click="freeze( scope.row)">冻结</el-button>-->
                        <!--<el-button size="small" v-if="scope.row.status==2" type="text" @click="unfreeze(scope.row)">解冻</el-button>-->
                    </template>

                </el-table-column>

            </el-table>
            <div class="page-container" v-if="pageCount">
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
                    :visible.sync="payVisible"
                    width="450px"
                    center
            >
                <div class="dialog-head" style="margin-top: 40px">
                    <span>确认中心局白班2018年12月项目费已付款吗？</span>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" >已付款</el-button>
                <el-button round size="medium"  >未付款</el-button>
            </span>
            </el-dialog>

            <el-dialog
                    title=""
                    :visible.sync="payBatchVisible"
                    width="450px"
                    center
            >
                <div class="dialog-head" style="margin-top: 40px">
                    <span>确认批量已付款吗？</span>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" >已付款</el-button>
                <el-button round size="medium"  >未付款</el-button>
            </span>
            </el-dialog>
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
        selectedItem:{},
        payVisible:false,
        payBatchVisible:false,
        currentPage:1,
        pageSize:20,
        pageCount:'',
        settlementTypeList:'',
        belongtoList:'',
        input5:'',
        select:'',
        tableData:[],
        form: {
          payStatus:'',
        },
        mineItem:{},
        reveiveId:'',
        publishId:'',
      }
    },
    filters:{
      formatminDate(val){
        return util.minDate(val)
      },
      formatvaluationType(val){
        if(val==1){
          return '计时'
        }else if(val==2){
          return '计件'
        }else if(val==3){
          return '计时+计件'
        }else{
          return ''
        }
      },
      formatpayStatus(val){
        if(val==1){
          return '待付'
        }else if(val==2){
          return '待确认收款'
        }else if(val==3){
          return '已付'
        }else{
          return ''
        }
      },
      formatpieceSize(val){
        if(val){
            if(util.formatPieceSize(val) == ''){
                return '无'
            }else{
                return util.formatPieceSize(val)
            }
        }else{
            return '无'
        }
      },
      formataskSalary(val){
        if(val){
          let data = JSON.parse(val)
            return util.price(data)
        }else{
            return '无'
        }
      }
    },
    mounted(){
      this.getList();
    },
    watch:{
      'form.payStatus':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
    },
    methods: {
      handlePay(row){
        this.payVisible=true
        this.selectedItem= row
        this.selectedIds=[]
        this.selectedIds.push(row.id)
      },
      handleBatch(){
        this.payBatchVisible=true
      },
      handleSelectionChange(val) {
        this.selectedIds = []
        for (let x in val){
          this.selectedIds.push(val[x].id)
        }
      },
      RouteToPay(row){
        if(row.taskType==1 || row.taskType==2){
          const {href} = this.$router.resolve({
            name: "customerDetail",
            params: {
              id: row.customerId,
            }
          });
          window.open(href, "_blank");
        }else if(row.taskType==3){
          const {href} = this.$router.resolve({
            name: "pmDetail",
            params: {
              id: row.managerId,
            }
          });
          window.open(href, "_blank");
        }

      },
      RouteToTask(row){
        const {href} = this.$router.resolve({
          name: "TaskDetail",
          params: {
            id: row.taskId,
          }
        });
        window.open(href, "_blank");
      },
      RouteToManager(row){
        const {href} = this.$router.resolve({
          name: "pmDetail",
          params: {
            id: row.taskManagerId,
          }
        });
        window.open(href, "_blank");
      },
      SetPaid(){
        this.$api.batchSetPaid(this.selectedIds).then((response) => {
          if(response.data.respCode==0){
            this.payBatchVisible=false
            this.payVisible=false
            this.$message.success('操作成功')
            this.getList()
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getList(){
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          payStatus:this.form.payStatus,
        }
        console.log(params)

        this.$api.needPayList(params).then((response) => {
          if(response.data.respCode==0){
            const {
              data: {
                list,
                pages,
              },
            } = response.data;
            console.log(list)
            this.tableData=list
            this.pageCount=pages
          }

        }).catch((error) => {
          console.log(error);
        });
      },
      routeToDetail(row){
        console.log(row.taskId)
        console.log(row.taskName)
        const { href } = this.$router.resolve({
          name: "projectPayDetail",
          params: {
            id: row.taskId,
            name:row.taskName,
            payerType:row.payerType,
          }
        });
        window.open(href, "_blank");
      },
      routeToEdit(row){
        this.$router.push({name:'editTask',params:{id:row.id}})
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getList();
      },
      routeTowoker(){
        this.$router.push({name:'myworker'})
      },
      handleClose(){

      },
      addNew(){
        this.$router.push({name:'addTask'})
      }
    }
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

</style>