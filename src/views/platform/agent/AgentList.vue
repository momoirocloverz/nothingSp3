<template>
  <div class="page-agent">
    <el-form ref="form" :model="form" label-width="110px" class="formSearchMarginTop">
      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入经纪人姓名搜索" v-model="form.agentName"></el-input>
        <el-button type="primary" class="searchBtn keyWBtn" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <div :style="{marginTop: '20px'}">符合查询条件的记录&nbsp;&nbsp;<span :style="{color:'#e84518'}">{{total}}</span>&nbsp;&nbsp;条</div>
    <div>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="name" label="姓名" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center" min-width="130" :formatter="formatterSex">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="availableState" label="状态" align="center" min-width="80" :formatter="formatterState">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template scope="scope">
            <el-button size="small" type="text" @click="checkDetails(scope.row)">查看</el-button>
            <el-button size="small" type="text" v-if="scope.row.availableState == 1" @click="handleFreezing(scope.row)">冻结</el-button>
            <el-button size="small" type="text" v-if="scope.row.availableState == 2" @click="handleThawing(scope.row)">解冻</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentList',
  data() {
    return {
      form: {
        agentName: '',
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageCount: 1,
      total: 0,
    };
  },
  components: {},
  watch: {
    // 'form.agentName': function (val, oldVal) {
    //   this.currentPage = 1
    //   this.getAgentList()
    // }
  },
  computed: {},
  mounted() {
    this.getAgentList()
  },
  methods: {
    handleSearch() {
      this.currentPage = 1
      this.getAgentList()
    },
    handleCurrentChange(val) {
      this.currentPage = val,
        this.getAgentList()
    },
    getAgentList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        name: this.form.agentName
      }

      this.$api.agentList(params).then((response) => {
        console.log(response.data)
        if (response.data.respCode == 0) {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.tableData = list
          this.pageCount = pages
          this.total = total
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    checkDetails(row) {
      // this.$router.push({
      //   name: 'agDetails',
      //   params: {
      //     id: row.id
      //   }
      // })
      const { href } = this.$router.resolve({
        name: "agDetails",
        params: {
          id: row.id,
        }
      });
      window.open(href, "_blank");
    },
    formatterSex(row, column, cellValue) {
      if (cellValue == 1) {
        return "男"
      } else if (cellValue == 2) {
        return "女"
      }
    },
    formatterState(row, column, cellValue) {
      if (cellValue == 1) {
        return "可用"
      } else if (cellValue == 2) {
        return "冻结"
      }
    },
    // 冻结
    handleFreezing(row) {
      console.log(row.userId)
      console.log(row.availableState)
      this.$confirm(`确认冻结经纪人${row.name}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let params = {
          userId: row.userId
        }
        this.$api.agentFreeze(params).then((response) => {
          if (response.respCode == 0) {
            if (response.data) {
              this.$message.success('冻结成功')
              row.availableState = 2
            } else {
              this.$message.success('冻结失败')
            }
          }
        }).catch((error) => {
          console.log(error);
        });
      })
    },

    // 解冻
    handleThawing(row) {
      this.$confirm(`确认解冻经纪人${row.name}吗?`, "谨慎操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        let params = {
          userId: row.userId
        }
        this.$api.agentFreeze(params).then((response) => {
          if (response.respCode == 0) {
            if (response.data) {
              this.$message.success('解冻成功')
              row.availableState = 1
            } else {
              this.$message.success('解冻失败')
            }

          }
        }).catch((error) => {
          console.log(error);
        });
      })
    }
  }
}
</script>
<style scoped>
</style>