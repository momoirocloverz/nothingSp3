<template>
  <div style="width:100%;">
    <div style="margin-bottom:30px">
      <el-radio-group v-model="radio4">
        <el-radio-button label="1">基本信息</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
    </div>
    <div style="margin:0 auto">
      <div class="workerName">{{data.realNameAlias}}</div>
      <div class="basicInfo">基本信息</div>
      <div class="table-info">
        <div class="table-info-col1"><span>姓名</span></div>
        <div class="table-info-col2"><span>{{data.realNameAlias}}</span></div>
        <div class="table-info-col1"><span>状态</span></div>
        <div class="table-info-col2"><span>{{data.paltFormStatus}}</span></div>
        <div class="table-info-col1"><span>性别</span></div>
        <div class="table-info-col2"><span>{{data.sexName}}</span></div>
        <div class="table-info-col1"><span>身份证号</span></div>
        <div class="table-info-col2"><span>{{data.idCard}}</span></div>
        <div class="table-info-col1"><span>手机号</span></div>
        <div class="table-info-col2"><span>{{data.mobile}}</span></div>
        <div class="table-info-col1"><span>出生日期</span></div>
        <div class="table-info-col2"><span>{{data.birthday}}</span></div>
        <div class="table-info-col1"><span>民族</span></div>
        <div class="table-info-col2"><span>{{data.nation}}</span></div>
        <div class="table-info-col1"><span>户籍地址</span></div>
        <div class="table-info-col2">
          <el-tooltip
            class="item"
            effect="dark"
            :content="data.originAddress"
            placement="top-start"
          >
            <span show-overflow-tooltip>{{data.originAddress}}</span>
          </el-tooltip>
        </div> 
        <div class="table-info-col1"><span>背调信息</span></div>
        <div class="table-info-col2">
          <el-tooltip
            class="item"
            effect="dark"
            :content="data.backgroundSurvey"
            placement="top-start"
          >
            <span show-overflow-tooltip>{{data.backgroundSurvey}}</span>
          </el-tooltip>
          </div>
        <div class="table-info-col1"><span>创建时间</span></div>
        <div class="table-info-col2"><span>{{data.createdAt}}</span></div>
        <div class="table-info-col1"><span>标签</span></div>
        <div class="table-info-col2">
          <el-tooltip class="item" effect="dark" :content="tag" :disabled="!tag"  placement="top-start">
            <span show-overflow-tooltip>{{tag ? tag :'无' }}</span>
          </el-tooltip>
          </div>
          <div class="table-info-col1"><span></span></div>
          <div class="table-info-col2"><span></span></div>
          <div class="table-info-col1"><span>开户行</span></div>
          <div class="table-info-col2"><span>{{data.accountBanks ? data.accountBanks[0].bankName :'无' }}</span></div>
          <div class="table-info-col1"><span>银行卡号</span></div>
          <div class="table-info-col2"><span>{{data.accountBanks && data.accountBanks.length !=0 ? data.accountBanks[0].cardNumber : '无'}}</span></div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "WorkerDetail",
  data() {
    return {
      radio4: 1,
      form: {
        sex: "不限",
        settleType: "不限",
        manager: "不限",
        tag: "不限",
        keyWord: ""
      },
      data: {},
      talentContacts: [],
      tag:'',
      radio4:1,
      social:{}
    };
  },
    mounted() {
        if(this.$router.name== 'customerworkerDetail'){
            this.customerId=this.$route.params.customerId;
            this.getListcustomer()
        }else{
            this.getList();
        }
    },
  watch: {
    'data.talentSkills': {
　　　　handler(newValue, oldValue) {
          if(newValue){
            let tag = []
　　　　　　for (let i = 0; i < newValue.length; i++) {
              tag.push(newValue[i].skillName)
　　　　　　}
            this.tag = tag.join(',')
          }
　　　　},
　　　　deep: true
　　},
  },
  methods: {
    getList() {
      const params = {
        id: this.$route.params.id,
        managerId: this.$route.params.managerId,
      };
      this.$api
        .getWorkerDetail(params)
        .then(response => {
          this.data = response.data.data;
          this.social = response.data.data.empWelfare && response.data.data.empWelfare.isSociaSecurity == 1 && this.data.talentType == 1 ? response.data.data.empWelfare : {};
          this.talentContacts = response.data.data.talentContacts ? response.data.data.talentContacts : [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    getListcustomer() {
      const params = {
        talentId: this.$route.params.id,
        managerId: this.$route.params.managerId,
        customerId:this.customerId,
      };
      this.$api
        .getWorkerDetailcustomer(params)
        .then(response => {
          this.data = response.data.data;
          this.social = response.data.data.empWelfare ? response.data.data.empWelfare : {};
          this.talentContacts = response.data.data.talentContacts;
          // this.data.talentSkills = response.data.data.talentSkills.length != 0 ? response.data.data.talentSkills :[]
        }).catch(error => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.workerName {
  font-size: 18px;
  color: #262626;
}
</style>