<template>
  <div>
    <!--<el-form ref="form" :model="form" label-width="110px" class="formSearchMarginTop" labelPosition="left">-->
    <!--&lt;!&ndash;选择条件的单选按钮&ndash;&gt;-->
    <!--<el-form-item label="关键字：" class="formSearchMargin ">-->

    <!--<el-input placeholder="输入关键字搜索" v-model="input5" size="mini" class="input-with-select select-input">-->
    <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
    <!--<el-option label="任务名称" value="1"></el-option>-->
    <!--<el-option label="发布人" value="2"></el-option>-->
    <!--<el-option label="任务所属" value="3"></el-option>-->
    <!--<el-option label="接单人" value="4"></el-option>-->
    <!--</el-select>-->
    <!--</el-input>-->
    <!--<el-button type="primary" class="searchBtn" @click="getList">搜索</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <div class="splitLine"></div>
    <div>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关任务信息">
        <el-table-column prop="talentName" label="姓名" show-overflow-tooltip align="center" min-width="150px">
        </el-table-column>
        <el-table-column prop="industryName" label="工种" show-overflow-tooltip align="center" min-width="150px">
        </el-table-column>
        <el-table-column prop="sexName" label="性别" show-overflow-tooltip align="center" min-width="150px">
        </el-table-column>

        <el-table-column prop="" label="上班打卡" show-overflow-tooltip align="center" min-width="150">
          <template v-slot="scope">
            {{scope.row.workStartTime | formatTimeString}}
          </template>
        </el-table-column>
        <el-table-column prop="customerContact.contactName" show-overflow-tooltip label="下班打卡" align="center" min-width="150">
          <template v-slot="scope">
            <span v-if="scope.row.workEndTime">{{scope.row.workEndDate==scope.row.schedulingDate?'当日':'次日'}}{{scope.row.workEndTime | formatTimeString}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="settlementTypeName" label="计件量"  align="center" min-width="120">-->
        <!--<template scope="scope">-->
        <!--{{scope.row.pieceSize }}  {{scope.row.pieceState | formatpieceState }}-->
        <!--</template>-->
        <!--</el-table-column>-->
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

  data() {
    return {
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
        taskStatus: '',
        belongtoItem: '',
        settlementType: "",
      },
      mineItem: {},
      reveiveId: '',
      publishId: '',
    }
  },
  filters: {
    formatpieceState(val) {
      if (val == 1) {
        return '(待审核)'
      } else {
        return ''
      }
    },
    formatminDate(val) {
      return util.minDate(val)
    },
    formatTimeString(val) {
      if (val) {
        return val.substring(0, 5)
      } else {
        return '未打卡'
      }
    },
    formatStatus(val) {
      if (val == 1) {
        return '待领取'
      } else if (val == 2) {
        return '领取完毕'
      } else if (val == 3) {
        return '关闭'
      } else {
        return ''
      }
      return util.minDate(val)
    }
  },
  mounted() {
    //      this.getsettlement();
    //      this.getbelongtoList();
    this.getList();
  },
  watch: {
    'form.industry': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.settlementType': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
  },
  methods: {
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
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        settlementType: this.form.settlementType,
        industry: this.form.industry,
        schedulingId: this.$route.params.id,
        talentType: 2
      }
      console.log(params)

      this.$api.scheduleWorker(params).then((response) => {
        const {
          data: {
            list,
            pages,
            total,
            pageNum,
          },
        } = response.data;
        this.tableData = list
        //          console.log(this.tabledata[0])
        //          if(this.tabledata[0]==null){
        //            this.tabledata=[
        //
        //            ]
        //
        //          }
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
    getbelongtoList() {
      this.$api
        .getBelongtoList()
        .then(response => {
          this.belongtoList = response.data;
          console.log(this.belongtoList)
        })
        .catch(error => {
          console.log(error);
        });
    },
    routeToDetail(row) {
      const { href } = this.$router.resolve({
        name: "TaskDetail",
        params: {
          id: row.id,
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
    formatbindingStatus(row) {
      let val = row.bindingStatus
      if (val == 1) {
        return '服务中'
      } else if (val == 2) {
        return '待项目经理同意解绑'
      } else if (val == 3) {
        return '待客户同意解绑'
      } else if (val == 4) {
        return '已解绑'
      } else {
        return ''
      }
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
};
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