<template>
  <div>
    <div>
      <el-tabs v-model="recruitmentingName" class="recruitmentClass">
        <el-tab-pane label="进行中" name="first">
          <candidate-going :managerList=managerList :CodeAndLevelList=CodeAndLevelList></candidate-going>
          <!-- <div class="firstName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.radioType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="2">月结</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="项目经理：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.managerType">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.id v-for="item in managerList">{{item.nameAlias}}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="工种：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.dicCode">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.dicVal v-for="item in CodeAndLevelList">{{item.dicName}}</el-radio>
                  </div>
                </el-radio-group>
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
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
              <el-table-column prop="a" label="候选人" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="s" label="推荐人" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="d" label="工种" show-overflow-tooltip align="center" min-width="120">
                <template slot-scope="scope">
                  <span @click="goToJobInfo" style="color:#e84518;cursor:pointer">{{scope.row.d}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="f" label="职位项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="已出勤天数" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="j" label="已支付佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="120">
                <template scope="scope">
                  <el-button size="small" type="text" @click="YJXQ_Visible = true">佣金详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
              </el-pagination>
            </div>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="已结束" name="second">
          <candidate-ending :managerList=managerList :CodeAndLevelList=CodeAndLevelList></candidate-ending>
          <!-- <div class="secondName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.radioType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="2">月结</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="项目经理：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.managerType">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.id v-for="item in managerList">{{item.nameAlias}}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="工种：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.dicCode">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.dicVal v-for="item in CodeAndLevelList">{{item.dicName}}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="状态：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.statusType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">成功</el-radio>
                  <el-radio label="2">失败</el-radio>
                </el-radio-group>
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
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关经理人信息">
              <el-table-column prop="a" label="候选人" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="s" label="推荐人" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="d" label="工种" show-overflow-tooltip align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="f" label="z职位项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="失败原因" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="已出勤天数" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="j" label="已支付佣金（元）" align="center" min-width="130">
              </el-table-column>
              <el-table-column prop="g" label="状态" align="center" min-width="100">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="120">
                <template scope="scope">
                  <el-button size="small" type="text">佣金详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page-container">
              <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
              </el-pagination>
            </div>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="申诉中" name="third">
          <candidate-complaining :managerList=managerList :CodeAndLevelList=CodeAndLevelList></candidate-complaining>
          <!-- <div class="thirdName">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="结算方式：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.radioType">
                  <el-radio label="">不限</el-radio>
                  <el-radio label="1">日结</el-radio>
                  <el-radio label="2">周结</el-radio>
                  <el-radio label="2">月结</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="项目经理：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.managerType">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.id v-for="item in managerList">{{item.nameAlias}}</el-radio>
                  </div>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="工种：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.dicCode">
                  <el-radio class="first-radio" label="">不限</el-radio>
                  <div class="div-radio">
                    <el-radio class="end-radios" :label=item.dicVal v-for="item in CodeAndLevelList">{{item.dicName}}</el-radio>
                  </div>
                </el-radio-group>
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
            <el-table class="table-outline" :data="tableData" empty-text="暂无相关经理人信息">
              <el-table-column prop="a" label="候选人" align="center" min-width="100">
              </el-table-column>
              <el-table-column prop="s" label="推荐人" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="d" label="工种" show-overflow-tooltip align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="f" label="职位项目经理" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="g" label="失败原因" align="center" min-width="120">
              </el-table-column>
              <el-table-column prop="h" label="已出勤天数" align="center" min-width="80">
              </el-table-column>
              <el-table-column prop="j" label="已支付佣金（元）" align="center" min-width="100">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="150">
                <template scope="scope">
                  <el-button size="small" type="text">佣金详情</el-button>
                  <el-button size="small" type="text">申诉信息</el-button>
                  <el-button size="small" type="text" @click="goAgree">同意</el-button>
                  <el-button size="small" type="text">驳回</el-button>
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

    <!-- 佣金详情弹窗start -->
    <!-- <el-dialog title="佣金详情" :visible.sync="YJXQ_Visible" width="540px" center>
      <div class="dialog-head">
        <div>
          <span>条件1：</span>
          <span>入职10天给付200元</span>&nbsp;&nbsp;&nbsp;<label style="color:#008000">达成</label>
        </div>
        <div>
          <span>条件2：</span>
          <span>入职10天给付200元</span>&nbsp;&nbsp;&nbsp;<label style="color:#FF0000">失败</label>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button round size="medium" type="primary" @click="YJXQ_Visible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 佣金详情弹窗end -->
  </div>
</template>

<script>
import candidateGoing from './candidateGoing.vue' //候选人进行中
import candidateEnding from './candidateEnding.vue' //候选人已结束
import candidateComplaining from './candidateComplaining.vue' //候选人申诉中
export default {
  name: 'candidateList',
  data() {
    return {
      recruitmentingName: 'first',
      // YJXQ_Visible: false,
      // form: {
      //   radioType: '',
      //   managerType: '',
      //   dicCode: '',
      //   keyWord: '',
      //   selectType: '2',
      //   statusType: ''
      // },
      managerList: [],
      CodeAndLevelList: [],
      // tableData: [
      //   { a: 1, s: 2, d: 333, f: 4, g: 5, h: 6, j: 7, k: 8 }
      // ],
      // currentPage: 1,
      // pageSize: 20,
      // pageCount: 1,
    };
  },
  components: {
    candidateGoing,
    candidateEnding,
    candidateComplaining
  },
  computed: {},
  mounted() {
    this.getFormManagerList() // 所有项目经理
    this.getCodeAndLevelList() // 全部工种
  },
  methods: {
    // 获取所有项目经理接口
    getFormManagerList() {
      this.$api.getManagerList()
        .then(res => {
          console.log(res)
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
          console.log(res)
          if (res.respCode == 0) {
            this.CodeAndLevelList = res.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChange() {
      console.log(1)
    },
    goToJobInfo() {
      this.$router.push({
        name: 'jobInfo'
      })
    }
  }
}
</script>
<style scoped>
.dialog-head div span,
label {
  font-size: 16px !important;
}
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