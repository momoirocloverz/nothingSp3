<template>
  <div>
    <div class="firstName">
      <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
        <el-form-item label="结算方式：" class="formSearchMargin">
          <el-radio-group class="radio-search" v-model="form.jobType">
            <el-radio label="">不限</el-radio>
            <el-radio label="1">日结</el-radio>
            <el-radio label="4">周结</el-radio>
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
          <el-radio-group class="radio-search" v-model="form.industry" style="">
            <el-radio class="first-radio" label="">不限</el-radio>
            <div class="div-radio">
              <el-radio class="end-radios" :label=item.dicVal v-for="item in CodeAndLevelList">{{item.dicName}}</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
        <el-table-column prop="industryName" label="工种" align="center" min-width="100">
        </el-table-column>
        <el-table-column prop="jobType" label="结算方式" align="center" min-width="120" :formatter="jobTypeFormatter">
        </el-table-column>
        <el-table-column prop="customerShortName" label="客户" show-overflow-tooltip align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="managerNameAlias" label="项目经理" align="center" min-width="120">
        </el-table-column>
        <el-table-column label="劳务地区" align="center" min-width="120">
          <template v-slot="scope">
            {{scope.row.province}}{{scope.row.city}}{{scope.row.region}}
          </template>
        </el-table-column>
        <el-table-column label="推荐进度" align="center" min-width="80">
          <template v-slot="scope">
            {{scope.row.recommendCount/scope.row.maxRecommend}}
          </template>
        </el-table-column>
        <el-table-column prop="reachCommissionAmount" label="已支付佣金（元）" align="center" min-width="130">
        </el-table-column>
        <el-table-column prop="jobInfoFee" label="已支付信息费（元）" align="center" min-width="130">
        </el-table-column>
        <el-table-column label="剩余冻结费用（元）" align="center" min-width="130">
          <template v-slot="scope">
            <span>{{scope.row.freezeCommissionFee + scope.row.freezeInformationFee}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template v-slot="scope">
            <el-button size="small" type="text" @click="goToJobInfo(scope.row)">查看</el-button>
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
  name: 'underway',
  data() {
    return {
      form: {
        jobType: '',
        managerId: '',
        industry: ''
      },
      currentPage: 1,
      pageSize: 20,
      pageCount: 1,
      tableData: []
    };
  },
  props: {
    managerList: Array,
    CodeAndLevelList: Array,
  },
  components: {},
  computed: {},
  watch: {
    'form.jobType': function (newval, oldval) {
      this.currentPage = 1,
        this.getJobInfoList()
    },
    'form.managerId': function (newval, oldval) {
      this.currentPage = 1,
        this.getJobInfoList()
    },
    'form.industry': function (newval, oldval) {
      this.currentPage = 1,
        this.getJobInfoList()
    },
  },
  mounted() {
    this.getJobInfoList()
  },
  methods: {
    // 职位列表接口
    getJobInfoList() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        industry: this.form.industry,
        jobType: this.form.jobType,
        managerId: this.form.managerId,
        status: 2
      }
      this.$api.jobInfoList(params)
        .then(res => {
          console.log(res.data)
          if (res.data.respCode == 0) {
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
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    jobTypeFormatter(row, column, cellValue) {
      if (cellValue == 1) {
        return '日结'
      } else if (cellValue == 2) {
        return '月结'
      } else if (cellValue == 4) {
        return '周结'
      } else {
        return ''
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getJobInfoList()
    },
    goToJobInfo(row) {
      // this.$router.push({
      //   name: 'jobInfo'
      // })
      const { href } = this.$router.resolve({
        name: 'jobInfo',
        params: {
          id: row.id
        }
      })
      window.open(href, "_blank")
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
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