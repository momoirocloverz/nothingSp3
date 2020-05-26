<template>
  <div>
    <div>
      <el-radio-group v-model="fudoName">
        <el-radio-button label="1">待审核</el-radio-button>
        <!--<el-radio-button label="2">审核不通过</el-radio-button>-->
        <el-radio-button label="2">审核不通过</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
      <pendingStatusOne v-if="fudoName == 1" />
      <!--<pendingStatusTwo v-if="fudoName == 23" />-->
      <pendingStatusThr v-if="fudoName == 2" />
    </div>
  </div>
</template>

<script>
  import pendingStatusOne from './components/pStatusOne.vue'
  import pendingStatusTwo from './components/pStatusTwo.vue'
  import pendingStatusThr from './components/pStatusThr.vue'
export default {
  name: 'pendingFudo',
  data() {
    return {
      fudoName: '1'
    };
  },
  components: {
    pendingStatusOne,
    pendingStatusTwo,
    pendingStatusThr
  },
  computed: {},
  mounted() { },
  methods: {}
}
</script>
<style scoped>
</style>