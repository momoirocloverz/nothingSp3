<template>
  <div class="external-total">
    <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
      <!--选择条件的单选按钮-->
      <el-form-item label="角色：" class="formSearchMargin formSearchMarginTop">
        <el-radio-group class="radio-search" v-model="form.userType">
          <el-radio label="">不限</el-radio>
          <el-radio label="5">零工</el-radio>
          <el-radio label="4">经纪人</el-radio>
          <!--<el-radio label="3">项目经理</el-radio>-->
          <el-radio label="2">经理人</el-radio>
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
      <el-form-item label="关键字：" class="formSearchMargin ">
        <el-input placeholder="输入关键字搜索" v-model="name" size="mini" class="input-with-select select-input">
          <el-select v-model="searchType" slot="prepend" placeholder="请选择">
            <el-option label="零工姓名" value="1"></el-option>
            <el-option label="经纪人姓名" value="2"></el-option>
            <!--<el-option label="项目经理姓名" value="3"></el-option>-->
            <el-option label="经理人名称" value="4"></el-option>
          </el-select>
        </el-input>
        <el-button type="primary" class="searchBtn" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="splitLine"></div>
    <div>
      <el-button type="primary" class="searchBtn" @click="handleExport" :disabled="this.tableData.length == 0">导出</el-button>
      <p class="tip">合计收入{{totalIn}}元，合计支出{{totalOut}}元，合计余额{{totalBalance}}元</p>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="roleName" label="角色" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="userName" label="姓名" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="totalIn" label="收入" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="totalOut" label="支出" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
        <el-table-column prop="balance" label="余额" show-overflow-tooltip align="center" min-width="150px"></el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" :current-page="currentPage" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 其他账户汇总
export default {
  name: "ExternalTotal",

  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      tableData: [],
      searchType: '',
      name: '',
      form: {
        startDate: '',
        endDate: '',
        userType: '',
        talentName: '',
        brokerName: '',
        managerName: '',
        customerName: ''
      },
      startDate: '',
      endDate: '',
      totalIn: 0,
      totalOut: 0,
      totalBalance: 0
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    'form.userType': function (val, oldval) {
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
    getList() {
      switch (Number(this.searchType)) {
        case 1:
          this.form.talentName = this.name
          this.form.brokerName = ''
          this.form.managerName = ''
          this.form.customerName = ''
          break;
        case 2:
          this.form.talentName = ''
          this.form.brokerName = this.name
          this.form.managerName = ''
          this.form.customerName = ''
          break;
        case 3:
          this.form.talentName = ''
          this.form.brokerName = ''
          this.form.managerName = this.name
          this.form.customerName = ''
          break;
        case 4:
          this.form.talentName = ''
          this.form.brokerName = ''
          this.form.managerName = ''
          this.form.customerName = this.name
          break;
        default:
          this.form.talentName = ''
          this.form.brokerName = ''
          this.form.managerName = ''
          this.form.customerName = ''
          break;
      }
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        talentName: this.form.talentName,
        brokerName: this.form.brokerName,
        managerName: this.form.managerName,
        customerName: this.form.customerName,
        userType: this.form.userType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }

      this.$api.getOtherAccountList(params).then((response) => {
        console.info(response.data.data.list)
        if (response.data.data.list) {
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
        } else {
          this.tableData = []
          this.pageCount = 1
        }
      }).catch((error) => {
        console.log(error);
      });

      this.$api.getOtherAccountSummary(params).then((response) => {
        if (response.data.respCode == 0) {
          if (response.data.data) {
            let { totalBalance, totalIn, totalOut } = response.data.data
            this.totalOut = totalOut
            this.totalBalance = totalBalance
            this.totalIn = totalIn
          } else {
            this.totalOut = 0
            this.totalBalance = 0
            this.totalIn = 0
          }
        } else {
          console.log('get account summary fail.')
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
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
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        talentName: this.form.talentName,
        brokerName: this.form.brokerName,
        managerName: this.form.managerName,
        customerName: this.form.customerName,
        userType: this.form.userType,
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
      this.$api
        .exportOtherAccountSummary(params)
        .then(response => {
          if (response.data.respCode == 0) {
            window.open(response.data.data)
          }
        })
        .catch(error => {
          console.log(error);
        });
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
.tip {
  color: #999;
  line-height: 2;
}
</style>