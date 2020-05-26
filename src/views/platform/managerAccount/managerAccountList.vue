<template>
  <div>
    <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
      <el-table-column prop="shortName" :show-overflow-tooltip="true" label="经理人简称" align="center" min-width="">
      </el-table-column>
      <el-table-column prop="subAccountNo" :show-overflow-tooltip="true" label="万才科技网商银行子账户" align="center" min-width="" >
      </el-table-column>
      <el-table-column prop="wsBalance" :formatter="dateFor"  :show-overflow-tooltip="true" label="虚拟钱包金额" align="center" min-width="">
      </el-table-column>
      <el-table-column prop="trueBalance" :formatter="dateFor" :show-overflow-tooltip="true" label="网商子账号金额" align="center" min-width="">
      </el-table-column>
      <el-table-column prop="manageFee" :formatter="dateFor" :show-overflow-tooltip="true" label="待扣管理费金额" align="center" min-width="">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="操作" align="center" min-width="">
        <template v-slot="scope">
          <el-button v-if="!scope.row.subAccountNo" size="small" type="text" @click="agree(scope.row)">开通子账户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination
              class="pagebox"
              @current-change="changePage"
              :current-page="currentPage"
              :page-count="pageCount"
              background
              layout="prev, pager, next"
      >
      </el-pagination>
    </div>
    <!--审核通过-->
  </div>
</template>

<script>
  export default {
    name: 'managerAccountList',
    data() {
      return {
        tableData: [],
        list:[],
        currentPage: 1,
        pageCount: 1,
        total: 0,
        form:{
          rate:'',
          mobile:'',
          charge:'',
          descUpdate:''
        },
        id:'',
        dialogUpdateVisible:false,
        dialogOpenVisible:false,
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      changePage(val) {
        this.currentPage = val
        this.getList()
      },
      dateFor(row, column, cellValue){
        if (cellValue) {
          return Number(cellValue).toFixed(2)
        } else {
          return '0.00'
        }
      },
      createdAt(row, column, cellValue) {
        if (cellValue) {
          return cellValue.substr(0, 16)
        } else {
          return '无'
        }
      },
      getList() {
        const params = {
          pageNum: this.currentPage,
          pageSize: 20,
        };
        this.$api
                .wsAccountList(params)
                .then(response => {
                  console.log(response)
                  if (response.respCode == 0) {
                    this.tableData = response.data.list;
                    this.pageCount = response.data.pages
                  }
                })
                .catch(error => {
                  console.log(error);
                });
      },
      agree(row){
        let _this = this;
        let params = {
          customerId:row.customerId,
        }
        this.$confirm(`确认开通子账户吗?`, `提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async (action) => {
          let {data} = await _this.$api.setWsBank(params);
          console.log(data)
          if(data.respCode === 0){
            _this.getList()
            _this.$message.success('开通成功!')
          }
        }).catch(() => {

        });
      },
    },
  }
</script>

<style scoped>
</style>