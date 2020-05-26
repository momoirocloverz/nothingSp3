<template>
  <div class="record-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="提现记录" name="first"></el-tab-pane>
      <el-tab-pane label="劳务费" name="second"></el-tab-pane>
    </el-tabs>
    <withdraw-list v-if="activeName === 'first'"></withdraw-list>
    <labor-list v-if="activeName === 'second'"></labor-list>
  </div>
</template>

<script>
import WithdrawList from './components/WithdrawList.vue'
import LaborList from './components/LaborList.vue'
export default {
  name: 'RecordList',
  components: { WithdrawList, LaborList },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>
