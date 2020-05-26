<template>
  <div>
    <h1 style="text-align: center">分练</h1>
    <div>
      <el-radio-group v-model="jobInfoName">
        <el-radio-button label="1">劳务机会信息</el-radio-button>
        <el-radio-button label="2">佣金设置信息</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" style="margin-bottom: 20px" />
      <JobInfoList :dataList=dataList v-if="jobInfoName == 1" />
      <BrokerageInfoList :dataList=dataList v-if="jobInfoName == 2" />
    </div>
  </div>
</template>

<script>
import JobInfoList from './jobInfoList.vue' //劳务机会信息
import BrokerageInfoList from './brokerageInfoList.vue' //佣金设置信息
export default {
  name: '',
  data() {
    return {
      jobInfoName: '1',
      dataList: {},
      id: this.$route.params.id
    };
  },
  components: {
    JobInfoList,
    BrokerageInfoList
  },
  computed: {},
  mounted() {
    this.getJobInfoDetails()
  },
  methods: {
    getJobInfoDetails() {
      let params = {
        jobInfoId: this.id
      }
      this.$api.getJobInfoDetail(params)
        .then(res => {
          console.log(res.data)
          this.dataList = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
</style>