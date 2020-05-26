<template>
  <div>
    <div :style="{textAlign:'center',fontSize:'30px'}">{{dataList.name}}</div>
    <div>基本信息</div>
    <div :style="{marginTop: '20px'}">
      <div class="box-body-item">
        <div class="table-info info-item">
          <div class="table-info-col1"><span>姓名</span></div>
          <div class="table-info-col2"><span>{{dataList.name}}</span></div>
          <div class="table-info-col1"><span>状态</span></div>
          <div class="table-info-col2"><span>{{dataList.availableState | availableStateFilter}}</span></div>
          <div class="table-info-col1"><span>性别</span></div>
          <div class="table-info-col2"><span>{{dataList.sex | sexFilter}}</span></div>
          <div class="table-info-col1"><span>身份证号</span></div>
          <div class="table-info-col2"><span>{{dataList.idCard}}</span></div>
          <div class="table-info-col1"><span>手机号</span></div>
          <div class="table-info-col2"><span>{{dataList.mobile | mobileFilter}}</span></div>
          <div class="table-info-col1"><span>出生日期</span></div>
          <div class="table-info-col2"><span>{{dataList.birthday}}</span></div>
          <div class="table-info-col1"><span>银行卡号</span></div>
          <div class="table-info-col2"><span>{{dataList.cardNumber | cardNumberFilter}}</span></div>
          <div class="table-info-col1"><span>创建时间</span></div>
          <div class="table-info-col2"><span>{{dataList.createdAt}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentDetails',
  data() {
    return {
      id: this.$route.params.id,
      dataList: {}
    };
  },
  filters: {
    availableStateFilter(val) {
      if (val == 1) {
        return "可用"
      } else if (val == 2) {
        return "冻结"
      } else {
        return ''
      }
    },
    sexFilter(val) {
      if (val == 1) {
        return "男"
      } else if (val == 2) {
        return "女"
      } else {
        return ''
      }
    },
    mobileFilter(val) {
      if (val) {
        return val.substr(0, 3) + '-' + val.substr(3, 4) + '-' + val.substr(7)
      } else {
        return ''
      }

    },
    cardNumberFilter(val) {
      return val ? val : ''
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let params = {
        id: this.id
      }
      this.$api.agentList(params).then(res => {
        if (res.data.respCode == 0) {
          console.log(res.data)
          this.dataList = res.data.data.list[0]
        }
      })
    }
  }
}
</script>
<style scoped>
</style>