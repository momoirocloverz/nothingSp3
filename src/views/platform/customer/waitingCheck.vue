<template>
  <div class="waitingCheckCon">
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关经理人信息">
        <el-table-column prop="updatedAt" label="提交时间" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="shortName" label="简称" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="name" label="经理人全称" show-overflow-tooltip align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="绑定手机号码" align="center"  min-width="120">
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" align="center" min-width="80">
        </el-table-column>
          <el-table-column prop="contactPhone" label="联系电话" align="center" min-width="80">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template scope="scope">
            <el-button size="small" type="text" @click="routeToDetail( scope.row)">通过</el-button>
            <el-button size="small" type="text" @click="handleRecharge( scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount" :total="total">
        </el-pagination>
      </div>
    <el-dialog :visible.sync="showNow" title="审核不通过" width="450px" class="helloDialog">
      <el-form label-width="100px">
        <el-form-item label="不通过原因" required>
            <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" size="large" @click="confirmReject">确认</el-button>
            <el-button  size="large" @click="cancelReject">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "waitingCheck",
  data() {
    return {
        textarea:'',
        showNow:false,
      currentPage: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
      tableData: [],
        rowBridge:{},
    }
  },
  mounted() {
      this.initRequest();
  },
  methods: {
      confirmReject(){
          if( this.textarea ){
              let params = {
                  customerId:this.rowBridge.id,
                  status:2,
                  failReason:this.textarea,
              }; 
              this.$api.setExamine(params).then(res=>{
                  let { data:layer1 } = res;
                  let { respCode,data } = layer1;
                  if( respCode === 0 ){
                      this.$message({
                          message: '操作成功。',
                          type: 'success'
                        });
                      this.showNow = false;
                      this.initRequest();
                  }
              }).catch(err=>{
                  console.log('err',err);
              })
          }else{
              this.$message.error('不通过原因不能为空。');
          }
      },
      cancelReject(){
          this.rowBridge = {};
          this.showNow = false;
          this.textarea = '';
      },
    handleRecharge(row) {
        console.log('row',row);
        this.rowBridge = row;
        this.showNow = true;
        this.textarea = ''
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPmList();
    },
      initRequest(){
          this.getPmList();
      },
    getPmList() {
        let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            status: 1,
        }
        this.$api.getReviewList(params).then(res=>{
            let { data,respCode } = res;
            if( respCode === 0 ){
                this.total = data.total;
                if( data.list && data.list.length ){
                    this.tableData = data.list;
                }else{
                    this.tableData = [];
                }                
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
    routeToDetail(row) {        
        this.$router.push({ name: 'newAddCus',query:row })
    },
  },
}
</script>