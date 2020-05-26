<template>
  <div v-loading="loading" element-loading-text="正在导出excel">
    <el-form ref="form" :model="form" label-position="left" label-width="90px">
      <el-form-item label="客户：" class="formSearchMargin">
        <el-radio-group class="radio-search" v-model="form.customerId">
          <el-radio label="">不限</el-radio>
          <el-radio label="-1">个人</el-radio>
          <el-radio :label="item.id" v-for="item in customers">{{item.shortName}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提现：" class="formSearchMargin">
        <el-radio-group class="radio-search" v-model="form.note">
          <el-radio label="">不限</el-radio>
          <el-radio label="充值">充值</el-radio>
          <el-radio label="提现">提现</el-radio>
          <el-radio label="提现退回">提现退回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期范围：" class="formSearchMargin">
        <el-date-picker class="margin_left10" size="mini" v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
        </el-date-picker>
        &nbsp; ——
        <el-date-picker class="margin_left10" size="mini" v-model="form.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
        </el-date-picker>
        <el-button type="primary" class="searchBtn" @click="btn_true">确定</el-button>
      </el-form-item>
    </el-form>
    <el-button class="myplain-btn" style="margin: 8px 14px 18px 0px" @click="exportCollect" :disabled=isDisabled>导出</el-button>
    <div style="margin:10px 0">
      合计收入：<strong style="color:#e84518">{{totalIn}}</strong>元、
      合计支出：<strong style="color:#e84518">{{totalOut}}</strong>元
    </div>
    <el-table class="table-outline" :data="tableData" emptyText="暂无相关信息" style="width: 100%;">
      <el-table-column prop="customerTypeName" label="客户" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="note" align="center" label="类型" min-width="180">
      </el-table-column>
      <el-table-column prop="totalIn" label="收入" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="handleFee" label="手续费支出" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="withdrawTotalFee" label="提现支出" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="amount" label="易宝余额" align="center" min-width="180">
      </el-table-column>
      <el-table-column prop="receiveTime" label="时间" align="center" min-width="180">
        <template scope="scope">
          {{scope.row.receiveTime |formatminDate }}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import util from '../../common/util'
export default {
  name: '',
  data() {
    return {
      form: {
        customerId: '',
        note: '',
        startDate: '',
        endDate: ''
      },
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      customers: [],
      totalIn: 0,
      totalOut: 0,
      customerType: '',
      isDisabled: false,
      loading: false
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getCustomerList()
    this.getDataCashFlowList()
    this.getCashFlowSummary()
  },
  filters: {
    formatminDate(val) {
      if (val) {
        return util.minDate(val)
      } else {
        return ''
      }
    },
  },
  watch: {
    'form.customerId': function (newval, oldval) {
      this.currentPage = 1
      this.getDataCashFlowList()
      this.getCashFlowSummary()
    },
    'form.note': function (newval, oldval) {
      this.currentPage = 1
      this.getDataCashFlowList()
      this.getCashFlowSummary()
    }
  },
  methods: {
    // 获取客户列表接口
    getCustomerList() {
      this.$api.accountCustomerList()
        .then(res => {
          // console.log(res)
          if (res.data.respCode == 0) {
            this.customers = res.data.data.list
          }
        })
        .catch()
    },
    // 资金流列表接口
    getDataCashFlowList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        note: this.form.note,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.NewAccountCashFlowList(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              const {
                data: {
                  list,
                  pages,
                  total,
                  pageNum
                }
              } = res.data
              this.tableData = list
              this.pageCount = pages
            } else {
              this.tableData = []
              this.pageCount = 0
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCashFlowSummary() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        note: this.form.note,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.NewAccountCashFlowSummary(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              const {
                data: {
                  totalOut,
                  totalIn
                }
              } = res.data
              this.totalIn = totalIn
              this.totalOut = totalOut
              this.isDisabled = false
            } else {
              this.totalIn = 0
              this.totalOut = 0
              this.isDisabled = true
            }
          }
        })
        .catch()
    },
    btn_true() {
      // console.log('日期范围搜索')
      if (this.form.startDate == '' || this.form.endDate == '') {
        this.$message({
          message: '结束日期或者开始日期都不能为空！',
          type: 'error'
        })
        return
      } else if (this.form.startDate > this.form.endDate) {
        this.$message({
          message: '结束日期不能早于开始日期',
          type: 'error'
        })
        return
      } else {
        this.currentPage = 1
        this.getDataCashFlowList()
        this.getCashFlowSummary()
      }
    },
    exportCollect() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        note: this.form.note,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.loading = true
      this.$api.NewCashFlowSummaryExport(params)
        .then(res => {
          if (res.data.respCode == 0) {
            setTimeout(() => {
              this.loading = false
            }, 2000)
            if (res.data.data) {
              window.open(res.data.data)
            }
          }
        })
        .catch()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.getDataCashFlowList()
    }
  }
}
</script>
<style scoped>
.searchBtn {
  margin-left: 10px;
}
</style>