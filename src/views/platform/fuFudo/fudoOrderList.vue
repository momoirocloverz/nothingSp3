<template>
  <div>
    <div>
      <el-radio-group v-model="fudoName">
        <el-radio-button label="1">已付款</el-radio-button>
        <el-radio-button label="2">待付款</el-radio-button>
        <el-radio-button label="3">已失效</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr"/>
      <Paid v-if="fudoName == 1" />
      <Payment v-if="fudoName == 2" />
      <Failure v-if="fudoName == 3" />
    </div>
  </div>
</template>

<script>

import Paid from './components/paid.vue'
import Payment from './components/payment.vue'
import Failure from './components/failure.vue'
export default {
  name: 'pendingFudo',
  data() {
    return {
      fudoName: '1'
    };
  },
  components: {
    Paid,
    Payment,
    Failure
  },
  computed: {},
  mounted() { },
  methods: {}
}
</script>
<style scoped>
</style>