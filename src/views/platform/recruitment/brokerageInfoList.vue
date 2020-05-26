<template>
  <div>
    <!-- 第一次 -->
    <div>第1次</div>
    <div :style="{marginTop: '20px',marginBottom: '20px'}" v-if="dataList.jobType == 4">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>给付条件</span></div>
          <div class="table-info-col2"><span>出勤满10天</span></div>
          <div class="table-info-col1"><span>佣金金额（元）</span></div>
          <div class="table-info-col2"><span>100</span></div>
        </div>
      </div>
    </div>
    <!-- <div>第2次</div> -->
    <div :style="{marginTop: '20px',marginBottom: '20px'}" v-if="dataList.jobType == 2">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>给付条件</span></div>
          <div class="table-info-col2"><span>出勤满10天</span></div>
          <div class="table-info-col1"><span>佣金金额（元）</span></div>
          <div class="table-info-col2"><span>100</span></div>
        </div>
      </div>
    </div>
    <div :style="{marginTop: '20px',marginBottom: '20px'}" v-if="dataList.jobType == 1">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>给付条件</span></div>
          <div class="table-info-col2"><span>出勤1天给付1次，最多30天</span></div>
          <div class="table-info-col1"><span>单次佣金金额（元）</span></div>
          <div class="table-info-col2"><span>1</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  props: {
    dataList: Object
  },
  components: {},
  computed: {},
  mounted() {
    console.log(this.dataList)
  },
  methods: {}
}
</script>
<style scoped>
</style>