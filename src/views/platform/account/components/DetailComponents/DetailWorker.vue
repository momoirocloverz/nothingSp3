<template>
  <div class="detail-worker">
    <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
      <!--选择条件的单选按钮-->
      <el-form-item label="类型：" class="formSearchMargin formSearchMarginTop">
        <el-radio-group class="radio-search" v-model="form.note">
          <el-radio label="">不限</el-radio>
          <el-radio label="外包费用">外包费用</el-radio>
          <el-radio label="代发收入">代发收入</el-radio>
          <el-radio label="提现-外包费用">提现-外包费用</el-radio>
          <el-radio label="提现手续费-外包费用">提现手续费-外包费用</el-radio>
          <el-radio label="提现-代发收入">提现-代发收入</el-radio>
          <el-radio label="提现手续费-代发收入">提现手续费-代发收入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收入/支出：" class="formSearchMargin">
        <el-radio-group class="radio-search" v-model="form.inOutType">
          <el-radio label="">不限</el-radio>
          <el-radio label="1">收入</el-radio>
          <el-radio label="2">支出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期范围：" class="formSearchMargin">
        <el-date-picker class="margin_left10" size="mini" v-model="startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
        </el-date-picker>
        &nbsp; ——
        <el-date-picker class="margin_left10" size="mini" v-model="endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
        </el-date-picker>
        <el-button type="primary" class="searchBtn" @click="handleDate">确定</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" class="searchBtn" @click="handleExport" :disabled="tableData.length == 0">导出</el-button>
      <p class="tip">合计收入{{totalIn}}元，合计支出{{totalOut}}元</p>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="note" label="类型" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="userName" label="姓名" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="bizUserName" label="交易对象" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="inOutTypeName" label="收入/支出" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="amount" label="金额（元）" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="receiveTime" label="时间" :formatter="timeFormatter" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailWorker',
  components: {},
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 20,
      pageCount: 1,
      tableData: [],
      form: {
        note: '',
        inOutType: '',
        startDate: '',
        endDate: ''
      },
      startDate: '',
      endDate: '',
      totalIn: 0,
      totalOut: 0
    };
  },

  computed: {},

  mounted() {
    this.getList()
  },
  watch: {
    'form.inOutType': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.note': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.startDate': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
    'form.endDate': function (val, oldval) {
      this.currentPage = 1
      this.getList();
    },
  },
  methods: {
    timeFormatter(row, column, cellValue, index) {
      if (cellValue && String(cellValue).length > 8) {
        return String(cellValue).substring(0, 16)
      }
    },
    getList() {
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        queryType: 5,  // 2:客户  3:项目经理  4:经纪人  5:零工
      }

      this.$api.getOtherAccountDetailList(param)
        .then((res) => {
          if (res.data.respCode == 0) {
            let { list, pages } = res.data.data
            this.tableData = list || []
            this.pageCount = pages
          } else {
            console.log('get other account detail fail.')
          }
        })
        .catch((err) => {
          console.log('get other account detail error.')
        })

      this.$api.getOtherAccountDetailSummary(param)
        .then((res) => {
          if (res.data.respCode == 0) {
            if (res.data.data) {
              let { totalIn, totalOut } = res.data.data
              this.totalIn = totalIn
              this.totalOut = totalOut
            } else {
              this.totalIn = 0
              this.totalOut = 0
            }
          } else {
            console.log('get other account detail summary fail.')
          }
        })
        .catch((err) => {
          console.log('get other account detail summary error.')
        })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    handleDate() {
      // if (this.startDate == '') {
      //   this.$message({
      //     message: '开始日期不能为空',
      //     type: 'error'
      //   })
      //   return
      // }
      // if (this.endDate == '') {
      //   this.$message({
      //     message: '结束日期不能为空',
      //     type: 'error'
      //   })
      //   return
      // }
      if (this.startDate != '' && this.endDate != '' && this.startDate > this.endDate) {
        this.$message({
          message: '结束日期不能早于开始日期',
          type: 'error'
        })
        return
      }
      this.form.startDate = this.startDate
      this.form.endDate = this.endDate
    },
    handleExport() {
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        queryType: 5,  // 2:客户  3:项目经理  4:经纪人  5:零工
      }
      this.$api
        .exportOtherAccountDetail(param)
        .then(response => {
          if (response.data.respCode == 0) {
            window.open(response.data.data)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
}
</script>
<style lang='scss' scoped>
.tip {
  color: #999;
  line-height: 2;
}
</style>