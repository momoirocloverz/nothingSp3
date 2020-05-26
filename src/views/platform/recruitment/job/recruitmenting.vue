<template>
  <div>
    <div>
      <el-tabs v-model="recruitmentingName" class="recruitmentClass">
        <el-tab-pane label="进行中" name="first">
          <underway :managerList=managerList :CodeAndLevelList=CodeAndLevelList></underway>
          <!-- <div class="firstName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.jobType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="3">月结</el-radio>
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
              <el-table-column prop="jobType" label="类型" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="customerShortName" label="客户" show-overflow-tooltip align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="managerNameAlias" label="项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column label="工种地区" align="center" min-width="120">
                <template scope="scope">
                  {{scope.row.province}}{{scope.row.city}}{{scope.row.region}}
                </template>
              </el-table-column>
              <el-table-column label="推荐进度" align="center" min-width="80">
                <template scope="scope">
                  {{scope.row.recommendCount/scope.row.maxRecommend}}
                </template>
              </el-table-column>
              <el-table-column prop="singleCommissionFee" label="已支付佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column prop="remainCommissionAmount" label="剩余冻结佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="120">
                <template scope="scope">
                  <el-button size="small" type="text" @click="goToJobInfo">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
              </el-pagination>
            </div>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="待发布" name="second">
          <awaitIssue :managerList=managerList :CodeAndLevelList=CodeAndLevelList></awaitIssue>
          <!-- <div class="secondName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.jobType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="3">月结</el-radio>
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
            </el-form>
            <el-table class="table-outline" :data="tableData2" empty-text="暂无相关信息">
              <el-table-column prop="a" label="工种" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="s" label="类型" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="d" label="客户" show-overflow-tooltip align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="f" label="项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="工种地区" align="center" min-width="120">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="80">
                <template scope="scope">
                  <el-button size="small" type="text">查看222</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
              </el-pagination>
            </div>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="已关闭" name="third">
          <closed :managerList=managerList :CodeAndLevelList=CodeAndLevelList></closed>
          <!-- <div class="thirdName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.jobType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="3">月结</el-radio>
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
            </el-form>
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
              <el-table-column prop="a" label="工种" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="s" label="类型" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="d" label="客户" show-overflow-tooltip align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="f" label="项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="工种地区" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="h" label="推荐进度" align="center" min-width="80">
              </el-table-column>
              <el-table-column prop="j" label="已支付佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column prop="k" label="剩余冻结佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="120">
                <template scope="scope">
                  <el-button size="small" type="text">查看333</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
              </el-pagination>
            </div>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import underway from './underway.vue' //进行中
import awaitIssue from './awaitIssue.vue' //待发布
import closed from './closed.vue' //已关闭
export default {
  name: 'recruitmenting',
  data() {
    return {
      recruitmentingName: 'first',
      // form: {
      //   jobType: '',
      //   managerId: '',
      //   industry: ''
      // },
      managerList: [],
      CodeAndLevelList: [],
      // tableData: [],
      // tableData2: [],
      // currentPage: 1,
      // pageSize: 10,
      // pageCount: 1,
    };
  },
  components: {
    underway,
    awaitIssue,
    closed
  },
  computed: {},
  mounted() {
    this.getFormManagerList() // 所有项目经理
    this.getCodeAndLevelList() // 全部工种
    // this.getJobInfoList()
  },
  methods: {
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
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>
<style scoped>
</style>