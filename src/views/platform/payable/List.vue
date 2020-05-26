<template>
  <div>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio4" @change="TabClick">
        <el-radio-button label="1">零工结算-汇总</el-radio-button>
        <el-radio-button label="3" id='id_ert'>零工结算-明细</el-radio-button>
        <el-radio-button label="2">项目结算</el-radio-button>
        <!--<el-radio-button label="3">项目利润</el-radio-button>-->
      </el-radio-group>
      <hr class="el-radio-group-hr" />
    </div>

    <workerPay v-if="firstShow"></workerPay>
    <projectPay v-if="secondShow"></projectPay>
    <workerDetail v-if="thirdShow"></workerDetail>
    <!-- <managerProfit v-if="thirdShow"></managerProfit> -->
  </div>
</template>

<script>
import workerPay from './components/workerPay.vue'
import projectPay from './components/projectPay.vue'
import managerProfit from './components/managerProfit.vue'
import workerDetail from './components/workerDetail.vue'
// import util from '../../../common/util.js'
export default {
  // name: "",
  components: {
    workerPay: workerPay,
    projectPay: projectPay,
    managerProfit: managerProfit,
    workerDetail: workerDetail
  },
  data() {
    return {
      code: '',
      pageCount: 0,
      currentPage: 1,
      pageSize: 20,
      tabledata: [{
        accountMobile: "",
        bindingTime: "",
        name: "",
        unbindingStartTime: "",
        unbindingTime: "",
      }],
      radio4: 1,
      firstShow: true,
      secondShow: false,
      thirdShow: false,
      form: {
        sex: "不限",
        settleType: "不限",
        manager: "不限",
        tag: "不限",
        keyWord: "",
        bindingStatus: '4'
      }
    }
  },
  created() {
  },
  mounted() {
    //      this.getPmList();
  },
  filters: {
    // formatminDate(val) {
    //   if (val) {
    //     return util.minDate(val)
    //   } else {
    //     return ''
    //   }
    // }
  },
  watch: {
    'form.bindingStatus': function (val, oldval) {
      if (val) {
        this.getPmList()
      }
    }
  },
  methods: {

    TabClick() {
      this.firstShow = false;
      this.secondShow = false;
      this.thirdShow = false;
      this.fourthShow = false;
      if (this.radio4 == 1) {
        this.firstShow = true
      } else if (this.radio4 == 2) {
        this.secondShow = true;
      } else if (this.radio4 == 3) {
        this.thirdShow = true;
      } else if (this.radio4 == 4) {
        this.fourthShow = true;
      }
      //        this.getPmList()
    },
  },

}
</script>

<style scoped>
.vp-tab {
  margin: 20px 0;
}
.cut-line {
  width: 100%;
  height: 2px;
  background-color: #eeeeee;
  /*border: solid 1px #eeeeee;*/
}
</style>