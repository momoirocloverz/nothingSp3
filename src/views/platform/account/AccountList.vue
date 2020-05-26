<template>
  <div class="account" v-loading="loading" :element-loading-text="elLoadingText">
    <!-- <div>
            <img src="" alt="钱包">
            <div class="text">您的账户尚未开通</div>
            <el-button round size="medium" type="primary" @click="fullTagDia = false">去开通</el-button>
        </div> -->
    <div>
      <div class="clearfix">
        <div class="floatLeft">
          <div class="amount">账户余额</div>
          <div class="mt">
            <span class="hudrend">{{accountInfo.balance}}</span>
            <span class="yuan">元</span>
          </div>
        </div>
        <!--<div class="floatLeft btnG">-->
        <!--<div class="btnCharge">-->
        <!--<el-button round size="medium" type="primary" @click="recharge">充值</el-button>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <div class="splitLine"></div>
      <!--<div class="moneyInfo">-->
      <!--<div class="useable floatLeft">-->
      <!--<div class="amount">可用余额</div>-->
      <!--<div>-->
      <!--<span class="black">{{accountInfo.balance}}</span>-->
      <!--<span class="amount">元</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="span floatLeft"></div>-->
      <!--<div class="useable floatLeft">-->
      <!--<div class="amount">冻结金额</div>-->
      <!--<div>-->
      <!--<span class="black">{{accountInfo.freezingAmount}}</span>-->
      <!--<span class="amount">元</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="splitLine"></div>-->
      <div class="title1">明细</div>
      <el-button class="myplain-btn" style="margin: 8px 14px 18px 0px" @click="RouteToExport" :disabled=isDisabledDetail>导出明细</el-button>
      <el-button class="myplain-btn" style="margin: 8px 14px 18px 0px" @click="exportCollect" :disabled=isDisabledCollect>导出汇总</el-button>
      <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
        <el-form-item label="客户：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.customerId">
            <el-radio label="">不限</el-radio>
            <el-radio label="-1">个人</el-radio>
            <el-radio v-for="item in customers" :label="item.id">{{item.shortName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目经理：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.managerId">
            <el-radio label="">不限</el-radio>
            <el-radio :label='item.id' v-for="item in managerList">{{item.nameAlias}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.note">
            <el-radio label="">不限</el-radio>
            <el-radio label="充值手续费">充值手续费</el-radio>
            <el-radio label="提现手续费">提现手续费</el-radio>
            <el-radio label="开票服务费">开票服务费</el-radio>
            <el-radio label="管理费">管理费</el-radio>
            <el-radio label="佣金">佣金</el-radio>
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
          <el-date-picker class="margin_left10" size="mini" v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
          </el-date-picker>
          &nbsp; ——
          <el-date-picker class="margin_left10" size="mini" v-model="form.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
          </el-date-picker>
          <el-button type="primary" class="searchBtn" @click="btn_true">确定</el-button>
        </el-form-item>
      </el-form>
      <div style="margin:10px 0">
        充值手续费收入：<strong style="color:#e84518">{{totality.rechargeTotalFee || 0}}</strong>元、
        提现手续费收入：<strong style="color:#e84518">{{totality.withdrawTotalFee || 0}}</strong>元、
        管理费收入：<strong style="color:#e84518">{{totality.managementTotalFee || 0}}</strong>元、
        开票服务费收入：<strong style="color:#e84518">{{totality.invoiceFeeTotal || 0}}</strong>元、
        佣金收入：<strong style="color:#e84518">{{totality.commissionTotalIn || 0}}</strong>元、
        合计收入：<strong style="color:#e84518">{{totality.totalIn || 0}}</strong>元、
        佣金支出：<strong style="color:#e84518">{{totality.commissionTotalOut || 0}}</strong>元、
        合计支出：<strong style="color:#e84518">{{totality.totalOut || 0}}</strong>元
      </div>
      <el-table class="table-outline" :data="tableData" emptyText="暂无相关明细" style="width: 100%;">
        <el-table-column prop="customerTypeName" label="客户" align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="userName" label="姓名" align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="note" label="类型" align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="inOutTypeName" align="center" label="收入/支出" min-width="180">

          <!-- <template scope="scope">
            {{scope.row.type |formatType}}
          </template> -->
        </el-table-column>
        <el-table-column prop="amount" label="金额（元）" align="center" min-width="180">
          <template scope="scope">
            <span v-if="scope.row.inOutTypeName=='收入'">+ {{scope.row.amount}}</span>
            <span v-if="scope.row.inOutTypeName=='支出'">- {{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="invoiceStatusName" label="开票状态" align="center" min-width="180">
        </el-table-column>
        <el-table-column prop="date" label="时间" align="center" min-width="180">
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
  </div>
</template>
<script>
import util from '../../../common/util'
export default {
  name: "AccountList",
  data() {
    return {
      tableData: [],
      accountInfo: {},
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      form: {
        customerId: '',
        managerId: '',
        note: '',
        inOutType: '',
        startDate: '',
        endDate: ''
      },
      // customerType: 1,
      managerList: [],
      customers: [],
      totality: {},
      isDisabledDetail: false,
      isDisabledCollect: false,
      loading: false,
      elLoadingText: '正在导出明细excel...'
    };
  },
  filters: {
    formatType(val) {
      return val == 1 ? '收入' : '支出'
    },
    //  formatAmount(val){
    //    if(Number(val)>0){
    //      return '+'+val;
    //    }else{
    //      return val;
    //    }
    //  },
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
      this.getDataList()
      this.getNewAccountSummaryData()
    },
    'form.managerId': function (newval, oldval) {
      this.currentPage = 1
      this.getDataList()
      this.getNewAccountSummaryData()
    },
    'form.note': function (newval, oldval) {
      this.currentPage = 1
      this.getDataList()
      this.getNewAccountSummaryData()
    },
    'form.inOutType': function (newval, oldval) {
      this.currentPage = 1
      this.getDataList()
      this.getNewAccountSummaryData()
    }
  },
  methods: {
    // 获取所有项目经理接口
    getFormManagerList() {
      let params = {
        managerStatus: 2
      }
      this.$api.getPmList(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            this.managerList = res.data.data.list
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取客户列表接口
    getCustomerList() {
      this.$api.accountCustomerList()
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            this.customers = res.data.data.list
          }
        })
        .catch()
    },
    recharge() {
      this.$router.push({ name: 'Recharge' })
    },
    RouteToExport() {
      // this.$router.push({ name: 'export' })
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        managerId: this.form.managerId,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.loading = true
      this.elLoadingText = '正在导出明细excel...'
      this.$api.NewAccountExport(params)
        .then(res => {
          if (res.data.respCode == 0) {
            setTimeout(() => {
              this.loading = false
            }, 2000)
            window.open(res.data.data)
          }
        })
        .catch()
    },
    exportCollect() {
      // console.log('导出汇总')
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        managerId: this.form.managerId,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.loading = true
      this.elLoadingText = '正在导出汇总excel...'
      this.$api.NewAccountSummaryExport(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            setTimeout(() => {
              this.loading = false
            }, 2000)
            window.open(res.data.data)
          }
        })
        .catch()
    },
    btn_true() {
      if (this.form.startDate == '' || this.form.endDate == '') {
        this.$message({
          message: '结束日期或者开始日期都不能为空！',
          type: 'error'
        })
        return
      } else if (this.form.startDate > this.form.endDate) {
        this.$message({
          message: '结束日期不能早于开始日期！',
          type: 'error'
        })
        return
      } else {
        this.currentPage = 1
        this.getDataList()
        this.getNewAccountSummaryData()
      }

    },
    getDetail() {
      this.$api.AccountDetail().then((response) => {
        if (response.data.respCode == 0) {
          if (response.data.data) {
            this.accountInfo = response.data.data
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getList();
      this.getDataList()
    },
    // 平台账户交易记录列表接口
    getDataList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        managerId: this.form.managerId,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.NewAccountRunning(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              const {
                data: {
                  list,
                  pages,
                  total,
                  pageNum,
                },
              } = res.data;
              this.tableData = list
              this.pageCount = pages
            } else {
              this.tableData = []
              this.pageCount = 0
            }
          }
        })
        .catch()
    },
    // 平台账户交易明细汇总数据
    getNewAccountSummaryData() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerId: this.form.customerId == -1 ? 'null' : this.form.customerId,
        customerType: this.form.customerId == -1 ? 1 : (this.form.customerId == '' ? '' : 2),
        managerId: this.form.managerId,
        note: this.form.note,
        inOutType: this.form.inOutType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.NewAccountSummaryData(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            if (res.data.data) {
              this.totality = res.data.data
              this.isDisabledCollect = false
              this.isDisabledDetail = false
            } else {
              this.totality = {}
              this.isDisabledCollect = true
              this.isDisabledDetail = true
            }
          }
        })
        .catch()
    },
    getList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        objectType: 1,
      }
      this.$api.AccountRunning(params).then((response) => {
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
        }

        console.log(this.tableData)
      }).catch((error) => {
        console.log(error);
      });
    },
    forDetail(val) {
      return `${val.note} --- ${val.userName}`
    }
  },
  mounted() {
    this.getDetail()
    // this.getList()
    this.getDataList()
    this.getCustomerList()
    this.getFormManagerList()
    this.getNewAccountSummaryData()
  }

};
</script>
<style scoped>
.text {
  font-size: 16px;
  color: #666666;
}
.btn {
  width: 124px;
}
.span {
  width: 1px;
  height: 42px;
  background-color: #eeeeee;
  margin: 0 60px;
}
.amount {
  font-size: 14px;
  color: #666666;
}
.yuan {
  font-size: 18px;
  margin-left: 10px;
}
.account {
  color: #666666;
}
.hudrend {
  font-size: 30px;
  color: #e84518;
}
.btnG {
  margin-left: 60px;
}
.mt {
  margin-top: 24px;
}
.btnCharge {
  margin-top: 16px;
}
.black {
  font-size: 18px;
  color: #262626;
}
.useable {
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.moneyInfo {
  display: flex;
  justify-content: flex-start;
}
.title1 {
  font-size: 24px;
  line-height: 90px;
  color: #262626;
}
.searchBtn {
  margin-left: 10px;
}
</style>
