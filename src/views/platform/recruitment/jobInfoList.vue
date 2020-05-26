<template>
  <div>
    <!-- 基本信息 -->
    <div>基本信息</div>
    <div :style="{marginTop: '20px',marginBottom: '20px'}">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>工种</span></div>
          <div class="table-info-col2"><span>{{dataList.industryName}}</span></div>
          <div class="table-info-col1"><span>项目经理</span></div>
          <div class="table-info-col2"><span>{{dataList.managerNameAlias}}</span></div>
          <div class="table-info-col1"><span>客户</span></div>
          <div class="table-info-col2"><span>{{dataList.customerShortName}}</span></div>
          <div class="table-info-col1"><span>结算方式</span></div>
          <div class="table-info-col2"><span>{{dataList.jobType | jobTypeFormatter}}</span></div>
          <div class="table-info-col1"><span>所属任务</span></div>
          <div class="table-info-col2"><span>{{dataList.taskName}}</span></div>
          <div class="table-info-col1"><span>劳务地点</span></div>
          <div class="table-info-col2"><span>{{dataList.province}}{{dataList.city}}{{dataList.region}}{{dataList.workingPlace}}</span></div>
          <div class="table-info-col1"><span>接收简历数量</span></div>
          <div class="table-info-col2"><span>{{dataList.recommendCount}}</span></div>
          <div class="table-info-col1"><span>创建时间</span></div>
          <div class="table-info-col2"><span>{{dataList.createdAt}}</span></div>
          <div class="table-info-col1"><span>亮点</span></div>
          <div class="table-info-col2"><span>{{dataList.highlightNameList}}</span></div>
          <div class="table-info-col1"><span>关闭时间</span></div>
          <div class="table-info-col2"><span>{{dataList.closeTime}}</span></div>
          <div class="table-info-col1"><span>发布时间</span></div>
          <div class="table-info-col2"><span>{{dataList.publishTime}}</span></div>
          <div class="table-info-col1"><span></span></div>
          <div class="table-info-col2"><span></span></div>
        </div>
      </div>
    </div>
    <!-- 收入福利 -->
    <div>收入福利</div>
    <div :style="{marginTop: '20px',marginBottom: '20px'}">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>劳务费</span></div>
          <div class="table-info-col2">
            <span v-if="dataList.jobType == 1">0-{{dataList.incomeUpper}}元/月</span>
            <span v-if="dataList.jobType == 2">{{dataList.incomeLower}}-{{dataList.incomeUpper}}元/月</span>
            <span v-if="dataList.jobType == 4">{{dataList.incomeLower}}-{{dataList.incomeUpper}}元/月</span>

          </div>
          <div class="table-info-col1"><span>发放日期</span></div>
          <div class="table-info-col2">
            <span v-if="dataList.jobType == 1">当日/次日</span>
            <span v-if="dataList.jobType == 4">每月{{dataList.payDay}}号</span>
            <span v-if="dataList.jobType == 2">每月{{dataList.payDay}}号</span>
          </div>
          <div class="table-info-col1"><span>伙食情况</span></div>
          <div class="table-info-col2"><span>{{dataList.mealSituation}}</span></div>
          <div class="table-info-col1"><span>住宿情况</span></div>
          <div class="table-info-col2"><span>{{dataList.hotelSituation}}</span></div>
          <div class="table-info-col1"><span>其他福利</span></div>
          <div class="table-info-col2"><span>{{dataList.otherWelfare}}</span></div>
          <div class="table-info-col1"><span></span></div>
          <div class="table-info-col2"><span></span></div>
        </div>
      </div>
    </div>
    <!-- 职位说明 -->
    <div>职位说明</div>
    <div :style="{marginTop: '20px',marginBottom: '20px'}">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>劳务内容</span></div>
          <div class="table-info-col2"><span>{{dataList.workingContent}}</span></div>
          <div class="table-info-col1"><span>劳务时间</span></div>
          <div class="table-info-col2"><span>{{dataList.workingTime}}</span></div>
          <div class="table-info-col1"><span>劳务方式</span></div>
          <div class="table-info-col2"><span>{{dataList.workingWay | wayFilters}}</span></div>
          <div class="table-info-col1"><span></span></div>
          <div class="table-info-col2"><span></span></div>
        </div>
      </div>
    </div>
    <!-- 职位要求 -->
    <div>职位要求</div>
    <div :style="{marginTop: '20px'}">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>性别要求</span></div>
          <div class="table-info-col2"><span>{{dataList.sex | sexFilters}}</span></div>
          <div class="table-info-col1"><span>年龄要求</span></div>
          <div class="table-info-col2"><span>{{dataList.ageLowerLimit}}-{{dataList.ageUpperLimit}}岁</span></div>
          <div class="table-info-col1"><span>学历要求</span></div>
          <div class="table-info-col2"><span>{{dataList.education | eduFilters}}</span></div>
          <div class="table-info-col1"><span>其他要求</span></div>
          <div class="table-info-col2"><span>{{dataList.otherRequirements}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jobInfoList',
  data() {
    return {
    };
  },
  props: {
    dataList: Object
  },
  filters: {
    jobTypeFormatter(val) {
      if (val == 1) {
        return '日结'
      } else if (val == 2) {
        return '月结'
      } else if (val == 4) {
        return '周结'
      } else {
        return ''
      }
    },
    sexFilters(val) {
      if (val == 1) {
        return '男'
      } else if (val == 2) {
        return '女'
      } else if (val == 3) {
        return '不限'
      } else {
        return ''
      }
    },
    wayFilters(val) {
      if (val == 1) {
        return '坐班'
      } else if (val == 2) {
        return '站班'
      } else if (val == 3) {
        return '坐站都有'
      } else {
        return ''
      }
    },
    eduFilters(val) {
      if (val == 1) {
        return '不限'
      } else if (val == 2) {
        return '初中'
      } else if (val == 3) {
        return '高中'
      } else if (val == 4) {
        return '中专/技校'
      } else if (val == 5) {
        return '大专'
      } else if (val == 6) {
        return '本科及以上'
      } else {
        return ''
      }
    }
  },
  components: {},
  computed: {},
  mounted() { },
  methods: {}
}
</script>
<style scoped>
</style>