<template>
  <div class="classManagerListsCon">
    <div>
      <el-table :data="tableData" empty-text="暂无相关客户信息">
        <el-table-column prop="createdAt" :formatter= "formatTime" label="注册时间" show-overflow-tooltip align="left" >
        </el-table-column>
        <el-table-column prop="nameAlias" label="姓名" align="left" >
        </el-table-column>
        <el-table-column prop="mobile" show-overflow-tooltip label="手机号" align="left" >
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="left" >
        </el-table-column>
        <el-table-column prop="address" label="项目团队所在位置" align="left" >
        </el-table-column>
          <el-table-column prop="status" label="实名认证" :formatter="formatStatus" align="left" >
        </el-table-column>
          <el-table-column prop="accountStatus" label="状态" :formatter="formatAccountStatus" align="left" >
        </el-table-column>
        <el-table-column label="操作" align="left" min-width="100">
          <template v-slot="scope">
            <el-button v-if="scope.row.accountStatus == 1" size="small"  type="text" @click="freeze( scope.row)">冻结</el-button>
            <el-button v-if="scope.row.accountStatus == 2" size="small"  type="text" @click="unfreeze( scope.row)">解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/common/util'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0,
      tableData: [],
        limitAmount:'',
    }
  },
  mounted() {
      this.getLists(); 
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLists();
    },
      formatTime(row){
           if (row.createdAt) {
               return util.minDate(row.createdAt)
           } else {
               return ''
           }
      },
      formatAccountStatus(row){
          let val = row.accountStatus;
          if( val == 1 ){
              return '可用'
          }else if( val == 2 ){
              return '冻结'
          }else{
              return '无状态'
          }
      },
    formatStatus(row) {
      let val = row.status;
      if (val == 1) {
        return '待认证'
      } else if (val == 2) {
        return '已认证'
      } else {
        return ''
      }
    },
    freeze(row) {
      this.$confirm(`确认冻结客户${row.nameAlias}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let params = {
            userId:row.userId,
            status:2
        }; 
        this.$api.classManagerSwitchStatus(params).then((res) => {
            let { respCode } = res;
            if( respCode === 0 ){
                this.$message.success('冻结成功')
                this.currentPage = 1;
                this.getLists();
            }
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    unfreeze(row) {
      this.$confirm(`确认解冻客户${row.nameAlias}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
         let params = {
            userId:row.userId,
            status:1
        }; 
        this.$api.classManagerSwitchStatus(params).then((res) => {
            let { respCode } = res;
            if( respCode === 0 ){
                this.$message.success('解冻成功')
                this.currentPage = 1;
                this.getLists();
            }
        }).catch((error) => {
          console.log(error);
        });
      })
    },
    getLists() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$api.classManagerList(params).then((res) => {
          let { data:layer1 } = res;
          let { data,respCode } = res;
          if( respCode === 0 ){
              this.total = data.total
              if( data.list ){
                  this.tableData = data.list;
              }else{
                  this.tableData = [];
              }
          }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
<style scoped lang="scss">
    .classManagerListsCon {
      
    }
</style>