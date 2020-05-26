<template>
  <div class="external-detail">
    <el-tabs v-model="activeName">
      <el-tab-pane label="零工" name="first"></el-tab-pane>
      <el-tab-pane label="班务经理" name="second"></el-tab-pane>
      <el-tab-pane label="经纪人" name="third"></el-tab-pane>
      <el-tab-pane label="经理人" name="forth"></el-tab-pane>
    </el-tabs>

    <detail-worker v-if="activeName === 'first'"></detail-worker>
    <detail-pm v-if="activeName === 'second'"></detail-pm>
    <detail-agent v-if="activeName === 'third'"></detail-agent>
    <detail-customer v-if="activeName === 'forth'"></detail-customer>
  </div>
</template>

<script>
import DetailWorker from './components/DetailComponents/DetailWorker.vue'
import DetailPm from './components/DetailComponents/DetailPm.vue'
import DetailAgent from './components/DetailComponents/DetailAgent.vue'
import DetailCustomer from './components/DetailComponents/DetailCustomer.vue'

// 其他账户明细
export default {
  name: 'ExternalDetail',
  components: { DetailWorker, DetailPm, DetailAgent, DetailCustomer },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>