<template>
  <div class="notPassCon">
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关经理人信息">
          <el-table-column prop="updatedAt" label="审核时间" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="shortName" label="简称" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="name" label="经理人全称" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="mobile" label="绑定手机号码" show-overflow-tooltip align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="contactName" label="联系人" align="center"  min-width="120">
        </el-table-column>
        <el-table-column prop="contactPhone" label="联系电话"  align="center" min-width="80">
        </el-table-column>
        <el-table-column label="审核未通过原因" prop="failReason" align="center" min-width="120">
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :total="total" :page-count="pageCount">
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: "notPass",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
      tableData: [],
    }
  },
  mounted() {
      this.initRequest();
  },
  methods: {
      initRequest(){
          this.getPmList();
      },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPmList();
    },
    getPmList() {
        let params = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            status: 2,
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
  },
}
</script>