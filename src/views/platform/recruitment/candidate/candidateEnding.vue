<template>
  <div>
    <div class="secondName">
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
          <el-radio-group class="radio-search" v-model="form.industry">
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
          <template v-slot="scope">
            <el-button size="small" type="text" @click="YJXQ_Visible = true">佣金详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog v-if="YJXQ_Visible" @sessionFalse=openDialog @sessionFalsed=openDialogd></el-dialog>
  </div>
</template>

<script>
import elDialog from './components/elDialog.vue'
export default {
  name: '',
  data() {
    return {
      YJXQ_Visible: false,
      form: {
        jobType: '',
        managerId: '',
        industry: '',
        keyWord: '',
        selectType: '2',
        statusType: ''
      },
      tableData: [
        { a: 1, s: 2, d: 333, f: 4, g: 5, h: 6, j: 7, k: 8 }
      ],
      currentPage: 1,
      pageSize: 20,
      pageCount: 1,
    };
  },
  props: {
    managerList: Array,
    CodeAndLevelList: Array
  },
  components: {
    elDialog
  },
  watch: {
    'form.jobType': function (newval, oldval) {
      this.currentPage = 1
    },
    'form.managerId': function (newval, oldval) {
      this.currentPage = 1
    },
    'form.industry': function (newval, oldval) {
      this.currentPage = 1
    }
  },
  computed: {},
  mounted() { },
  methods: {
    handleCurrentChange() {
      console.log(1)
    },
    goToJobInfo() {
      this.$router.push({
        name: 'jobInfo'
      })
    },
    openDialog() {
      this.YJXQ_Visible = false
    },
    openDialogd() {
      this.YJXQ_Visible = false
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