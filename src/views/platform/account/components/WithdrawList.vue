<template>
  <div class="withdraw-list">
    <el-form ref="form" :model="form" label-width="110px" :style="{display:'flex',alignItems:'center'}">

      <el-form-item class="" label="开始日期：" prop="startDate">
        <el-date-picker v-model="form.startDate" type="date" class="radius-input dateWidth" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="" label="截止日期：" prop="endDate">
        <el-date-picker class="radius-input dateWidth" v-model="form.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" class="searchBtn keyWBtn" @click="search">搜索</el-button>

    </el-form>

    <div>提现总额：<strong style="color:#e84518">{{withdrawSummary}}</strong> 提现总手续费<strong style="color:#e84518">{{withdrawFeeSummary}}</strong></div>

    <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
      <el-table-column prop="beforeBalance" :show-overflow-tooltip="true" label="交易前余额" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="amount" :show-overflow-tooltip="true" label="交易金额" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="balance" :show-overflow-tooltip="true" label="交易后余额" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="userName" :show-overflow-tooltip="true" label="零工姓名" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="managerName" :show-overflow-tooltip="true" label="零工对应的项目经理姓名" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="note" :show-overflow-tooltip="true" label="备注" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="orderNo" :show-overflow-tooltip="true" label="易宝支付订单号" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="status" :show-overflow-tooltip="true" label="交易状态" :formatter="statusFormatter" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="receiveTime" :show-overflow-tooltip="true" label="创建时间" :formatter="receiveTimeFormatter" align="center" min-width="140">
      </el-table-column>
    </el-table>

    <el-pagination class="pagebox" @current-change="changePage" :current-page="pageNum" :page-count="pageCount" background layout="prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'WithdrawList',

  data() {
    return {
      tableData: [],
      startDate: '',
      endDate: '',
      pageNum: 1,
      pageCount: 1,
      pageSize: 20,
      form: {
        startDate: '',
        endDate: ''
      },
      withdrawFeeSummary: 0,  // 提现手续费
      withdrawSummary: 0,  // 提现总额
    }
  },
  mounted() {
    this.getRecordList()
    this.getSummary()
  },
  methods: {
    statusFormatter(row, column, cellValue, index) {
      if (cellValue == 1) {
        return '处理中'
      } else if (cellValue == 2) {
        return '交易成功'
      } else if (cellValue == 3) {
        return '交易失败'
      }
    },
    receiveTimeFormatter(row, column, cellValue, index) {
      return cellValue ? cellValue : '暂无'
    },
    getRecordList() {
      let params = {
        type: 2,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }
      this.$api.accountRecordList(params)
        .then(res => {
          console.log(res.data.data)
          this.tableData = res.data.data.list
          this.pageCount = res.data.data.pages
        })
        .catch(error => {
          console.log(error);
        })
    },
    getSummary() {
      let params = {
        type: 2,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.accountWithdrawSummary(params)
        .then(res => {
          this.withdrawSummary = (res.data.data && res.data.data.withdrawSummary) || 0
          this.withdrawFeeSummary = (res.data.data && res.data.data.withdrawFeeSummary) || 0
        })
        .catch(error => {
          console.log(error);
        })
    },
    changePage(val) {
      this.pageNum = val
      this.getRecordList()
    },
    search() {
      this.pageNum = 1
      this.getRecordList()
      this.getSummary()
    }
  }
}
</script>

<style scoped>
.el-input .el-select {
  width: 134px;
}
.select-input {
  width: 245px;
  margin-right: 20px;
}
.keyWBtn {
  position: absolute;
  left: 899px;
  top: 109px;
}
</style>
