<template>
  <div>
    <div>
      <el-radio-group v-model="jobName">
        <el-radio-button label="1">劳务机会</el-radio-button>
        <el-radio-button label="2">候选人</el-radio-button>
        <el-radio-button label="3">费用</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
      <Recruitmenting v-if="jobName == 1" />
      <CandidateList v-if="jobName == 2" />
      <ExpenditureList v-if="jobName == 3" />
    </div>
  </div>
</template>

<script>
import Recruitmenting from './recruitmenting.vue' //职位列表（劳务机会）
import CandidateList from '../candidate/candidateList.vue' //候选人列表
import ExpenditureList from '../expenditure/expenditureList.vue' //招聘支出列表(费用)
export default {
  name: 'JobList',
  data() {
    return {
      jobName: '1'
    };
  },
  components: {
    Recruitmenting,
    CandidateList,
    ExpenditureList
  },
  computed: {},
  mounted() { },
  methods: {}
}
</script>
<style scoped>
</style>