<template>
  <div class="labor-list">
    <el-form ref="form" :model="form" label-width="110px" :style="{display:'flex',alignItems:'center'}">
      <el-form-item label="经理人：">
        <el-select v-model="name" placeholder="请选择" @change="changeName">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客户：">
        <el-select v-model="customer" placeholder="请选择" @change="changeCustomer">
          <el-option v-for="item in customers" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始日期：" prop="startDate">
        <el-date-picker v-model="form.startDate" type="date" class="radius-input dateWidth" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期：" prop="endDate">
        <el-date-picker class="radius-input dateWidth" v-model="form.endDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="searchBtn" @click="search" :style="{marginLeft:'-103px'}">搜索</el-button>
      </el-form-item>
    </el-form>

    <div>劳务费总额：<strong style="color:#e84518">{{laborSummary}}</strong>
      总平台账户余额：<strong style="color:#e84518">{{platformAccountSummary}}</strong>
      总客户账户余额：<strong style="color:#e84518">{{customerAccountSummary}}</strong>
      总经理人账户余额：<strong style="color:#e84518">{{managerAccountSummary}}</strong>
      总经纪人账户余额：<strong style="color:#e84518">{{brokerAccountSummary}}</strong>
      总零工账户余额：<strong style="color:#e84518">{{talentAccountSummary}}</strong></div>

    <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
      <el-table-column prop="beforeBalance" :show-overflow-tooltip="true" label="劳务费发放前零工账户余额" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="amount" :show-overflow-tooltip="true" label="劳务费金额" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="balance" :show-overflow-tooltip="true" label="劳务费发放后零工账户余额" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="userName" :show-overflow-tooltip="true" label="项目经理绑定的公司名称" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="managerName" :show-overflow-tooltip="true" label="项目经理姓名" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="note" :show-overflow-tooltip="true" label="备注" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="toUserName" :show-overflow-tooltip="true" label="零工姓名" align="center" min-width="140">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="创建时间" align="center" min-width="140">
        <template v-slot="scope">
          <span>{{ scope.row.receiveTime == null ? '暂无' : scope.row.receiveTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagebox" @current-change="changePage" :current-page="pageNum" :page-count="pageCount" background layout="prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'LaborList',
  data() {
    return {
      name: '',
      pageNum: 1,
      pageCount: 1,
      pageSize: 15,
      laborSummary: 0,
      platformAccountSummary: 0,
      customerAccountSummary: 0,
      managerAccountSummary: 0,
      brokerAccountSummary: 0,
      talentAccountSummary: 0,
      form: {
        startDate: '',
        endDate: ''
      },
      options: [],
      customers: [],
      customer: '',
      tableData: [],
      valName: ''
    }
  },
  mounted() {
    this.getLaborPmList()
    this.getCustomerList()
    this.getRecordList()
    this.getSummary()
  },
  methods: {
    getLaborPmList() {
      let params = {
        managerStatus: 2
      }
      this.$api.getPmList(params)
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            this.options = res.data.data.list
            this.options.unshift({ managerId: '', name: '全部' })
          }
        })
        .catch()
    },
    getCustomerList() {
      this.$api.accountCustomerList()
        .then(res => {
          console.log(res)
          if (res.data.respCode == 0) {
            this.customers = res.data.data.list
            this.customers.unshift({ id: '', name: '全部' })
          }
        })
        .catch()
    },
    getRecordList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: 1,
        managerId: this.valName,
        customerId: this.customer,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.accountRecordList(params)
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.list
          this.pageCount = res.data.data.pages
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSummary() {
      const params = {
        type: 1,
        managerId: this.valName,
        customerId: this.customer,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api.accountLaborSummary(params)
        .then(res => {
          console.log(res)
          this.laborSummary = (res.data.data && res.data.data.laborSummary) || 0
          this.platformAccountSummary = (res.data.data && res.data.data.platformAccountSummary) || 0
          this.customerAccountSummary = (res.data.data && res.data.data.customerAccountSummary) || 0
          this.managerAccountSummary = (res.data.data && res.data.data.managerAccountSummary) || 0
          this.brokerAccountSummary = (res.data.data && res.data.data.brokerAccountSummary) || 0
          this.talentAccountSummary = (res.data.data && res.data.data.talentAccountSummary) || 0
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePage(val) {
      this.pageNum = val
      this.getRecordList()
    },
    changeName(val) {
      console.log(val)
      this.valName = val
      this.pageNum = 1
      this.getRecordList()
      this.getSummary()
    },
    changeCustomer(val) {
      this.customer = val
      this.pageNum = 1
      this.getRecordList()
      this.getSummary()
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
