<template>
  <div>
    <div class="firstName">
      <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
        <el-form-item label="结算方式：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.jobType">
            <el-radio label="">不限</el-radio>
            <el-radio label="1">日结</el-radio>
            <el-radio label="2">周结</el-radio>
            <el-radio label="2">月结</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目经理：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.managerId">
            <el-radio class="first-radio" label="">不限</el-radio>
            <div class="div-radio">
              <el-radio class="end-radios" :label=item.id v-for="item in managerList">{{item.nameAlias}}</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工种：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.industry">
            <el-radio class="first-radio" label="">不限</el-radio>
            <div class="div-radio">
              <el-radio class="end-radios" :label=item.dicVal v-for="item in CodeAndLevelList">{{item.dicName}}</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期范围：" class="formSearchMargin">
          <el-date-picker class="margin_left10" size="mini" v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始时间">
          </el-date-picker>
          &nbsp; ——
          <el-date-picker class="margin_left10" size="mini" v-model="form.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束时间">
          </el-date-picker>
          <el-button type="primary" class="searchBtn" style="margin-left:20px" @click="searchTimeBtn">确定</el-button>
        </el-form-item>
        <el-form-item label="关键字：" class="formSearchMargin ">
          <el-input placeholder="输入关键字搜索" v-model="form.keyWord" size="mini" class="input-with-select select-input">
            <el-select v-model="form.selectType" slot="prepend" placeholder="请选择" style="width:100px">
              <el-option label="候选人" value="2"></el-option>
              <el-option label="推荐人" value="1"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" class="searchBtn">搜索</el-button>
        </el-form-item>
      </el-form>
      <div :style="{marginTop: '20px'}">
        佣金合计&nbsp;&nbsp;<span :style="{color:'#e84518'}">0</span>&nbsp;&nbsp;元&nbsp;&nbsp;
        信息费合计&nbsp;&nbsp;<span :style="{color:'#e84518'}">0</span>&nbsp;&nbsp;元&nbsp;&nbsp;
        总计&nbsp;&nbsp;<span :style="{color:'#e84518'}">0</span>&nbsp;&nbsp;元&nbsp;&nbsp;
        共&nbsp;&nbsp;<span :style="{color:'#e84518'}">{{total}}</span>&nbsp;&nbsp;条记录
      </div>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="managerNameAlias" label="项目经理" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="customerShortName" label="客户" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="referrer" label="推荐人" show-overflow-tooltip align="center" min-width="120" :formatter="referrerFormatter">
        </el-table-column>
        <el-table-column prop="candidate" label="候选人" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="industryName" label="工种" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="createdAt" label="支付时间" align="center" min-width="80">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" min-width="130" :formatter="typeFormatter">
        </el-table-column>
        <el-table-column prop="amount" label="平台收取（元）" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="platformCommissionPay" label="平台支付（元）" align="center" min-width="130">
        </el-table-column>
        <el-table-column label="条件" align="center" min-width="120">
          <template scope="scope">
            <span v-if="scope.row.type == 2">{{scope.row.ruleReachQuantity}}</span>
            <span v-if="scope.row.type == 1">{{scope.row.jobId}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'expenditureList',
  data() {
    return {
      form: {
        jobType: '',
        managerId: '',
        industry: '',
        keyWord: '',
        selectType: {
          // referrer: '',
          // candidate: ''
        },
        statusType: '',
        startDate: '',
        endDate: ''
      },
      managerList: [],
      CodeAndLevelList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      pageCount: 1,
      total: 0
    };
  },
  components: {},
  computed: {},
  watch: {
    'form.jobType': function (newval, oldval) {
      this.currentPage = 1
      this.getJobListData()
    },
    'form.managerId': function (newval, oldval) {
      this.currentPage = 1
      this.getJobListData()
    },
    'form.industry': function (newval, oldval) {
      this.currentPage = 1
      this.getJobListData()
    }
  },
  mounted() {
    this.getFormManagerList() // 所有项目经理
    this.getCodeAndLevelList() // 全部工种
    this.getJobListData() // 招聘支出明细列表
  },
  methods: {
    // 招聘支出明细列表接口
    getJobListData() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        industry: this.form.industry,
        jobType: this.form.jobType,
        managerId: this.form.managerId,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        // referrer: this.form.selectType.referrer,
        // candidate: this.form.selectType.candidate,
        // keyWord: this.form.keyWord
      }
      this.$api.jobList(params)
        .then(res => {
          console.log(res.data)
          if (res.data.respCode == 0) {
            const {
              data: {
                list,
                pages,
                total,
                pageNum,
              }
            } = res.data;
            this.tableData = list
            this.pageCount = pages
            this.total = total
          }
        })
        .catch()
    },
    searchTimeBtn() {
      this.currentPage = 1
      this.getJobListData()
    },
    typeFormatter(row, column, cellValue) {
      if (cellValue == 1) {
        return '信息费'
      } else if (cellValue == 2) {
        return '佣金'
      } else {
        return ''
      }
    },
    referrerFormatter(row, column, cellValue) {
      if (cellValue) {
        return cellValue
      } else {
        return '无'
      }
    },
    // 获取所有项目经理接口
    getFormManagerList() {
      this.$api.getManagerList()
        .then(res => {
          // console.log(res)
          if (res.respCode == 0) {
            this.managerList = res.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取全部工种接口
    getCodeAndLevelList() {
      this.$api.getCodeAndLevel()
        .then(res => {
          // console.log(res)
          if (res.respCode == 0) {
            this.CodeAndLevelList = res.data
            this.CodeAndLevelList.forEach(item => {
              // this.id = item.id
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChange() {
      console.log(1)
    },
  }
}
</script>
<style scoped>
.first-radio {
  width: 38px;
  height: 26px;
  float: left;
  line-height: 36px;
}
.div-radio {
  width: 1265px;
  float: right;
  margin-left: 30px;
  padding: 5px 0 0 0;
}
.end-radios {
  margin-left: 0 !important;
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>