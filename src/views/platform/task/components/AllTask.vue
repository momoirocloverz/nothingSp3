<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <!--选择条件的单选按钮-->
            <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="form.taskStatus">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">待领取</el-radio>
                    <el-radio label="2">领取完毕</el-radio>
                    <el-radio label="3">已关闭</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发布方：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.belongtoItem">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">客户</el-radio>
                    <el-radio label="2">项目经理</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group  class="radio-search"  v-model="form.settlementType"  >
                    <el-radio label="">不限</el-radio>
                    <!--<el-radio :label="item.dicVal" v-for="item in settlementTypeList" >{{item.dicName}}</el-radio>-->
                    <el-radio label="1">日结</el-radio>
                    <el-radio label="2">月结</el-radio>
                    <el-radio label="3">实时结</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="formSearchMargin ">

                <el-input placeholder="输入关键字搜索" v-model="input5" size="mini" class="input-with-select select-input">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="任务名称" value="1"></el-option>
                        <el-option label="发布人" value="2"></el-option>
                        <el-option label="任务所属" value="3"></el-option>
                    </el-select>
                </el-input>
                <el-button type="primary" class="searchBtn" @click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <div >
            <el-table
                    class="table-outline"
                    :data="tableData"
                    empty-text="暂无相关任务信息"
            >
                <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip align="center" min-width="150px">
                </el-table-column>
                <!--<el-table-column prop="belongToName" label="任务所属"  align="center" show-overflow-tooltip min-width="120">-->
                    <!--<template scope="scope">-->
                        <!--<span class="is-link" @click="RouteToBelong(scope.row)">{{scope.row.belongToName}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="publishName" label="发布人" align="center"  min-width="120">
                    <template v-slot="scope">
                    <span class="is-link" @click="RouteToPublish(scope.row)">
                        {{scope.row.publishName}}
                    </span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="开始时间" show-overflow-tooltip align="center" min-width="150">
                    <template v-slot="scope">
                        {{scope.row.startTime | formatminDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="customerContact.contactName" show-overflow-tooltip label="结束时间" align="center" min-width="150">
                    <template v-slot="scope">
                        {{scope.row.endTime | formatminDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="settlementTypeName" label="任务结算方式"  align="center" min-width="120">
                </el-table-column>
                <!-- <el-table-column prop="status" label="任务单价" align="center"  min-width="120"> -->
                <!-- </el-table-column> -->
                <!--<el-table-column prop="workingPlace" label="工作地点" align="center" show-overflow-tooltip min-width="150"></el-table-column>-->
                <el-table-column prop="createdAt" label="状态" align="center" min-width="120">
                    <template v-slot="scope">
                    {{scope.row.status | formatStatus}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="100">
                    <template v-slot="scope">
                        <el-button size="small" type="text" @click="routeToDetail( scope.row)">查看</el-button>
                        <!--<el-button size="small" type="text" @click="routeToEdit(scope.row)">编辑</el-button>-->
                        <!--<el-button size="small" v-if="scope.row.status==1" type="text" @click="freeze( scope.row)">冻结</el-button>-->
                        <!--<el-button size="small" v-if="scope.row.status==2" type="text" @click="unfreeze(scope.row)">解冻</el-button>-->
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
  import util from '../../../../common/util'
  export default {
    name: "Unbound",
    component: {
      //someComponent
    },
    data() {
      return {
        DeleteVisible:false,
        currentPage:1,
        pageSize:10,
        pageCount:'',
        settlementTypeList:'',
        belongtoList:'',
        input5:'',
        select:'',
        tableData:[],
        form: {
          taskStatus:'',
          belongtoItem: '',
          settlementType: "",
        },
        mineItem:{},
        publishId:'',
      }
    },
    filters:{
      formatminDate(val){
        return util.minDate(val)
      },
      formatStatus(val){
        if(val==1){
          return '待领取'
        }else if(val==2){
          return '领取完毕'
        }else if(val==3){
          return '已关闭'
        }else{
          return ''
        }
        return util.minDate(val)
      }
    },
    mounted(){
      this.getsettlement();
//      this.getbelongtoList();
      this.getList();
    },
    watch:{
      'form.taskStatus':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
      'form.belongtoItem':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
      'form.settlementType':function (val,oldval) {
        this.currentPage=1
        this.getList();
      },
    },
    methods: {
      RouteToPublish(row){
        const params = {
          userId:row.createdBy,
          type:(row.taskType==1 || row.taskType==2)?1:2,
        }
        this.$api.getPrimaryKey(params).then(response => {
          console.log(response)
          if(response.respCode==0){
            this.publishId=response.data
            if(row.taskType==1 || row.taskType==2){
              const { href } = this.$router.resolve({
                name: "customerDetail",
                params: {
                  id: this.publishId,
                }
              });
              window.open(href, "_blank");
            }else if(row.taskType==3){
              const { href } = this.$router.resolve({
                name: "pmDetail",
                params: {
                  id: this.publishId,
                }
              });
              window.open(href, "_blank");
            }
          }else {
            this.$message.error(response.errorMsg)
          }
            })
            .catch(error => {
              console.log(error);
            });
      },
      RouteToBelong(row){
        if(row.taskType==3){
          const { href } = this.$router.resolve({
            name: "TaskDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }else if(row.taskType==2){
          const { href } = this.$router.resolve({
            name: "subCustomerDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }else if(row.taskType==1){
          const { href } = this.$router.resolve({
            name: "customerDetail",
            params: {
              id: row.belongTo,
            }
          });
          window.open(href, "_blank");
        }

      },
      getList(){
        let taskName = this.select==1?this.input5:'';
        let publisherName = this.select==2?this.input5:'';
        let belongToName = this.select==3?this.input5:'';
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          taskName:taskName,
          publisherName:publisherName,
          belongToName:belongToName,
          taskStatus:this.form.taskStatus,
          publishType:this.form.belongtoItem,
          settlementType:this.form.settlementType,
        }
        console.log(params)

        this.$api.mainTaskList(params).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.tableData=list
          //          if(this.tabledata%2!=0){
          //            this.tabledata.push(
          //                {}
          //            )
          //          }
          //          console.log(this.tabledata[0])
          //          if(this.tabledata[0]==null){
          //            this.tabledata=[
          //
          //            ]
          //
          //          }
          this.pageCount=pages
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
      getbelongtoList() {
        this.$api
            .getBelongtoList()
            .then(response => {
              this.belongtoList = response.data;
              console.log(this.belongtoList )
            })
            .catch(error => {
              console.log(error);
            });
      },
      routeToDetail(row){
        const { href } = this.$router.resolve({
          name: "TaskDetail",
          params: {
            id: row.id,
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
      formatbindingStatus(row){
        let val = row.bindingStatus
        if(val==1){
          return '服务中'
        }else if(val==2){
          return '待项目经理同意解绑'
        }else if(val==3){
          return '待客户同意解绑'
        }else if(val==4){
          return '已解绑'
        }else{
          return ''
        }
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