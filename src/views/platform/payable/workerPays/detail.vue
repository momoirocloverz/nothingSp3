<template>
  <div>
    <div class="workerName">{{settlementType | formatsettlementType}}详情{{batchNumber}}</div>
    <div class="redLine"></div>
    <el-form ref="form" :model="form" label-width="110px" class="formSearchMarginTop" labelPosition="left">
      <!--选择条件的单选按钮-->

      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入零工姓名搜索" v-model="form.talentName"></el-input>
        <el-button type="primary" class="searchBtn keyWBtn" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="talentNameAlias" show-overflow-tooltip label="姓名" align="center" min-width="120">
          <template v-slot="scope">
            {{scope.row.talentNameAlias}} {{scope.row.talentType | formattalentType}}
          </template>
        </el-table-column>

        <el-table-column prop="salary" label="应发(元)" align="center" min-width="120">
          <template v-slot="scope">
            <span v-if="scope.row.dept">{{scope.row.salary}}(剩余欠款{{scope.row.dept}})</span>
            <span v-else>{{scope.row.salary}}</span>
          </template>
        </el-table-column>
        <!--<div v-if="settlementType==2">-->
        <el-table-column prop="socialPay" label="社保扣款(元)" align="center" show-overflow-tooltip min-width="120" v-if="settlementType==2"></el-table-column>
        <el-table-column prop="accumulationFund" label="公积金扣款(元)" align="center" show-overflow-tooltip min-width="120" v-if="settlementType==2"></el-table-column>

        <el-table-column prop="personalTax" label="个税(元)" align="center" show-overflow-tooltip min-width="120" v-if="settlementType==2"></el-table-column>
        <!--</div>-->
        <el-table-column prop="otherAmount" label="扣款(元)" align="center" show-overflow-tooltip min-width="100"></el-table-column>

        <el-table-column prop="totalAmount" label="实发(元)" align="center" min-width="80">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template v-slot="scope">
            <el-button size="small" type="text" @click="routeToDetail( scope.row)">收入条</el-button>
          </template>

        </el-table-column>

      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
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
      batchNumber: '',
      settlementType: '',
      DeleteVisible: false,
      currentPage: 1,
      pageSize: 20,
      pageCount: '',
      settlementTypeList: '',
      belongtoList: '',
      input5: '',
      select: '',
      tableData: [],
      form: {
        talentName: '',
      },
      mineItem: {},
      reveiveId: '',
      publishId: '',
    }
  },
  filters: {
    formattalentType(val) {
      if (val == 1) {
        return ''
      } else if (val == 2) {
        return '(学生)'
      } else if (val == 3) {
        return '(退休人员)'
      }
    },
    formatsettlementType(val) {
      if (val == 1) {
        return '日收入'
      } else if (val == 2) {
        return '月收入'
      } else if (val == 4) {
        return '周收入'
      } else {
        return ''
      }
    },
    formatStatus(val) {
      if (val == 1) {
        return '待领取'
      } else if (val == 2) {
        return '进行中'
      } else if (val == 3) {
        return '已结束'
      } else {
        return ''
      }
      return util.minDate(val)
    }
  },
  mounted() {
    this.batchNumber = this.$route.params.batchNumber;
    this.settlementType = this.$route.params.settlementType;
    this.getList();
  },
  watch: {
    'form.taskStatus': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
  },
  methods: {
    routeToImport() {
      this.$router.push({        name: 'salaryImport', params: {
          batchNumber: this.batchNumber,
          settlementType: this.settlementType,
        }      })
    },
    handleSelectionChange(val) {
    },
    RouteToReceive(row) {
      const params = {
        userId: row.receiveUserId,
        type: row.receiveUserType == 1 ? 2 : 3,
      }
      this.$api.getPrimaryKey(params).then(response => {
        console.log(response)
        if (response.respCode == 0) {
          this.reveiveId = response.data
          if (row.receiveUserType == 1) {
            const { href } = this.$router.resolve({
              name: "pmDetail",
              params: {
                id: this.reveiveId,
              }
            });
            window.open(href, "_blank");
          } else if (row.receiveUserType == 2) {
            const { href } = this.$router.resolve({
              name: "workerDetail",
              params: {
                id: this.reveiveId,
              }
            });
            window.open(href, "_blank");
          }
        } else {
          this.$message.error(response.errorMsg)
        }
      })
        .catch(error => {
          console.log(error);
        });
    },
    RouteToPublish(row) {
      const params = {
        userId: row.createdBy,
        type: (row.taskType == 1 || row.taskType == 2) ? 1 : 2,
      }
      this.$api.getPrimaryKey(params).then(response => {
        console.log(response)
        if (response.respCode == 0) {
          this.publishId = response.data
          if (row.taskType == 1 || row.taskType == 2) {
            const { href } = this.$router.resolve({
              name: "customerDetail",
              params: {
                id: this.publishId,
              }
            });
            window.open(href, "_blank");
          } else if (row.taskType == 3) {
            const { href } = this.$router.resolve({
              name: "pmDetail",
              params: {
                id: this.publishId,
              }
            });
            window.open(href, "_blank");
          }
        } else {
          this.$message.error(response.errorMsg)
        }
      })
        .catch(error => {
          console.log(error);
        });
    },
    RouteToBelong(row) {
      if (row.taskType == 3) {
        const { href } = this.$router.resolve({
          name: "TaskDetail",
          params: {
            id: row.belongTo,
          }
        });
        window.open(href, "_blank");
      } else if (row.taskType == 2) {
        const { href } = this.$router.resolve({
          name: "subCustomerDetail",
          params: {
            id: row.belongTo,
          }
        });
        window.open(href, "_blank");
      } else if (row.taskType == 1) {
        const { href } = this.$router.resolve({
          name: "customerDetail",
          params: {
            id: row.belongTo,
          }
        });
        window.open(href, "_blank");
      }

    },
    getList() {
      let params = {
      }
      if (this.$route.params.payAboutType == 1) {
        params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          batchNumber: this.batchNumber,
          talentName: this.form.talentName,
          customerId: this.$route.params.id,
        }
      } else {
        params = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          batchNumber: this.batchNumber,
          talentName: this.form.talentName,
          managerId: this.$route.params.id,
        }
      }
      console.log(params)

      this.$api.batchNumberDetail(params).then((response) => {
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
    routeToDetail(row) {
      const { href } = this.$router.resolve({
        name: "salaryBill",
        params: {
          id: row.id,
          talentType: row.talentType,
          isSocialSecurity: row.isSocialSecurity,
          //            isSocialSecurity:1,
          name: row.talentNameAlias,
          settlementType: row.settlementType
        }
      });
      window.open(href, "_blank");
    },
    routeToEdit(row) {
      this.$router.push({ name: 'editTask', params: { id: row.id } })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    routeTowoker() {
      this.$router.push({ name: 'myworker' })
    },
    handleClose() {

    },
    addNew() {
      this.$router.push({ name: 'addTask' })
    }
  }
}
</script>

<style scoped>
.el-input .el-select {
  width: 100px;
}
.select-input {
  width: 396px;
  margin-right: 20px;
}
</style>