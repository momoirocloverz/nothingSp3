<template>
    <div class="g-transfer-list">
      <div><a :href="hrefDate" ref="hrefDate" v-show="false">模版下载</a></div>

      <div class="u-condition-wrapper">
        <div class="keyword-wrapper">
          <div class="keyword-value">
            <el-input placeholder="输入姓名搜索" v-model="name" class="input-with-select" size="small">
            </el-input>
            <el-button  size="small" type="primary" style="margin-left: 25px" @click="handleGetRemitRecord">搜索</el-button>
          </div> 
          </div>
      </div>
       <div class="just-wrapper">
        <div class="just-key">
          状态:
        </div>
        <div class="just-value">
          <el-radio-group class="radio-search" v-model="status"  @change="handleChangeStatus">
              <el-radio label="">不限</el-radio>
              <el-radio :label="2">成功</el-radio>
              <el-radio :label="3">失败</el-radio>
              <el-radio :label="1">处理中</el-radio>
          </el-radio-group>
        </div>
      </div>
       <div class="just-wrapper">
        <div class="just-key">
          日期范围:
        </div>
        <div class="just-value">
          <el-radio-group class="radio-search" v-model="dateType"  @change="handleChangeDateType">
              <el-radio label="">不限</el-radio>
              <el-radio :label="1">自定义</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="u-date-picker-wrapper"  v-if="dateType===1">
              <el-date-picker
                v-model="dateValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        <el-button @click="handleSearchOwnDate">确 定</el-button>
      </div>
      <div class="derive-wrapper">
          <el-button @click="handleGetExport()" :loading="exportLoading" type="primary" size="small">导出</el-button>
      </div>
        <el-table
      emptyText="暂无相关信息"
      :data="$tableData"
      v-loading="loading"
      height="500"
      style="width: 100%">
      <el-table-column
        prop="createdAt"
        label="时间"
        
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="转账人"
        >
      </el-table-column>
     <el-table-column
        prop="amount"
        label="金额(元)"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        >
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
        <template slot-scope="{row}">
          <div class="u-operation" v-if="row.status==='成功'">
            <el-button type="text" class="btn-icon" size="mini" @click="handleBack(row)" :loading="subLoading">资金回退至钱包</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
     <div class="pagination-container" v-if="params.total">
        <el-pagination class="mypagination" @current-change="handlePageNumChange" :current-page="params.pageNum" :page-size="params.pageSize" layout="total , prev, pager, next, jumper" :total="params.total"></el-pagination>
      </div>
    </div>
</template>

<script>
 import moment from 'moment';
  export default {
    name: "transferList",
    components: {
     
    },
    data() {
      return {
        status:'',
        dateType:'',
        dateValue:'',
        name:'',
        params: {
          pageNum:1,
          pageSize:20,
          total:0,
        },
        tableData:[],
        startDate:'',
        endDate:'',
        loading: false,
        showBackForm: false,
        subLoading: false,
        hrefDate:'',
        exportLoading:false,
      }
    },
    created(){
    },
    mounted(){
      this.handleGetRemitRecord();
    },
    filters:{

    },
    watch:{
      dateType(val){
        if(val===''){
          this.startDate = '';
          this.endDate = '';
        }
      }
    },
    computed:{
      $tableData(){
        return this.tableData.map(it=>{
          switch(it.status){
            case 1:
            it.status = '处理中';
            break;
            case 2:
            it.status = '成功';
            break;
            case 3:
            it.status = '失败';
            break;
            default:
            it.status = '失败';
            break;
          };
          return it;
        })
      }
    },
    methods: {
      handleGetExport(){
        const {status,startDate,endDate,name} = this;
        const {pageSize,pageNum} = this.params;
        this.exportLoading = true;
        this.$api.getExport({status,startDate,endDate,pageSize,pageNum,userName:name}).then(res=>{
          if(res.respCode ===0){
            this.hrefDate = res.data;
            this.$nextTick(()=>{
              this.$refs.hrefDate.click();
            })
          }
          this.exportLoading = false;

        }).catch(err=>{
          this.exportLoading = false;
        })
      },
      handleGetRemitRecord(){
        const {status,startDate,endDate,name} = this;
        const {pageSize,pageNum} = this.params;
        this.loading = true;
        this.$api.getRemitRecord({status,startDate,endDate,pageSize,pageNum,userName:name}).then(res=>{
          if(res.respCode ===0){
            this.tableData = res.data.list||[];
            this.params.total = res.data.total||0;
          }
          this.loading = false;

        }).catch(err=>{
          this.loading = false;
        })
      },
      handleChangeStatus(){
        this.handleGetRemitRecord();
      },
      handleChangeDateType(val){
        if(val!==1){
          this.handleGetRemitRecord();
        }
      },
      handlePageNumChange(val){
        this.params.pageNum = val;
        this.handleGetRemitRecord();
      },
     handleSearchOwnDate(val){
        this.startDate = moment(this.dateValue[0]).format('YYYY-MM-DD');
        this.endDate = moment(this.dateValue[1]).format('YYYY-MM-DD');
        this.handleGetRemitRecord();
      },
      handleGetRollbackRecord({accountId,orderNo}){
        return this.$api.getRollbackRecord({accountId,orderNo})
      },
      handleBack(row){
        const {accountId,orderNo} = row;
      this.$confirm('确认资金回退至钱包', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.subLoading = true;
          this.handleGetRollbackRecord({accountId,orderNo}).then(res=>{
            if(res.respCode ===0){
              this.$message({
                type: 'success',
                message: '回退成功!'
              });
              this.subLoading = false;
              this.handleGetRemitRecord();
              
            }
          }).catch(err=>{
            this.subLoading = false;

          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .u-condition-wrapper {
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
  .keyword-wrapper {
    display:flex;
    margin-bottom: 20px;
    .keyword-value {
      display: flex;
    }
    .keyword-key {
    font-size: 14px;
    line-height: 32px;
    color: #606266;
    margin-right: 10px;
    }
  }
  .just-wrapper {
    display:flex;
    height: 26px;
    margin-bottom: 10px;
    .just-key {
      font-size: 14px;
      line-height: 20px;
      color: #606266;
      margin-right: 58px;
    }
  }
  .derive-wrapper {
    width: 100%;
    background-color: #fff;
    padding: 10px 20px;
    height: 56px;
    margin-top: 20px;
  }
  .u-date-picker-wrapper {
    width: 500px;
    display: flex;
  }
  .btn-icon {
    cursor: pointer;
  }
</style>