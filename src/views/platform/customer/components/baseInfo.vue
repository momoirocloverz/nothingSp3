<template>
  <div style="margin: 0 auto;">
   <!-- <div class="box-body-item">
      <div class="box-body-item-title">客户基本信息</div>
      <div class="line"></div>
      <div class="table-info info-item">
        <div class="table-info-col1"><span>公司简称</span></div>
        <div class="table-info-col2">
          <el-tooltip class="item" effect="dark" :content="this.form.shortName" placement="top-start">
            <span>{{this.form.shortName}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>状态</span></div>
        <div class="table-info-col2"><span>{{this.form.status | formatStatus}}</span></div>
        <div class="table-info-col1"><span>公司所在地</span></div>

        <div class="table-info-col2 text-overflow">
          <el-tooltip class="item" effect="dark" :content="this.form.provinceName+this.form.cityName+this.form.regionName+this.form.address" placement="top-start">
            <span>{{this.form.provinceName}}{{this.form.cityName}}{{this.form.regionName}}{{this.form.address}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>所属行业</span></div>
        <div class="table-info-col2"><span>{{this.form.industryName}}</span></div>
        <div class="table-info-col1"><span>类型</span></div>
        <div class="table-info-col2"><span>{{this.form.customerType | customerTypeFilter}}</span></div>
        <div class="table-info-col1"><span>是否上市</span></div>
        <div class="table-info-col2"><span>{{this.form.isListed | isListedFilter}}</span></div>
        <div class="table-info-col1"><span>规模</span></div>
        <div class="table-info-col2"><span>{{this.form.size | sizeFilter}}</span></div>
        <div class="table-info-col1"><span>简介</span></div>
        <div class="table-info-col2"><span>{{this.form.profile}}</span></div>
        <div class="table-info-col1"><span>企业logo</span></div>
        <div class="table-info-col2">
          <p type="text" @click="logoVisible=true" class="chakan" v-if="this.form.logo">查看</p>
        </div>
        <div class="table-info-col1"><span>营业执照</span></div>
        <div class="table-info-col2">
          <p type="text" @click="visible=true" class="chakan" v-if="this.form.businessLicense">查看</p>
        </div>
      </div>
    </div>-->
    <!--<div class="box-body-item">
      <div class="box-body-item-title">客户开票信息</div>
      <div class="line"></div>
      <div class="table-info info-item">
        <div class="table-info-col1 "><span>公司全称</span></div>
        <div class="table-info-col2 text-overflow">
          <el-tooltip class="item" effect="dark" :content="this.form.customerBill.name" placement="top-start">
            <span show-overflow-tooltip>{{this.form.customerBill.name}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>统一社会信用代码</span></div>
        <div class="table-info-col2"><span>{{this.form.customerBill.creditCode}}</span></div>
        <div class="table-info-col1"><span>注册地址</span></div>
        <div class="table-info-col2">
          <el-tooltip class="item" effect="dark" :content="this.form.customerBill.registeAddress" placement="top-start">
            <span>{{this.form.customerBill.registeAddress}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>注册电话</span></div>
        <div class="table-info-col2"><span>{{this.form.customerBill.phone}}</span></div>
        <div class="table-info-col1"><span>开户银行</span></div>
        <div class="table-info-col2"><span>
            <el-tooltip class="item" effect="dark" :content="this.form.customerBill.bankName" placement="top-start">
              <span show-overflow-tooltip>{{this.form.customerBill.bankName}}</span>
            </el-tooltip>
          </span></div>
        <div class="table-info-col1"><span>银行账号</span></div>
        <div class="table-info-col2"><span>{{this.form.customerBill.bankCard}}</span></div>
      </div>
    </div>-->
    <div class="box-body-item">
      <div class="table-info info-item">
        <div class="table-info-col1"><span>联系人</span></div>
        <div class="table-info-col2"><span>{{form.customerContact.contactName}}</span></div>
        <div class="table-info-col1"><span>联系人身份证号</span></div>
        <div class="table-info-col2"><span>{{form.legalIdCard||''}}</span></div>
        <div class="table-info-col1"><span>行业</span></div>
        <div class="table-info-col2"><span>{{form.industryName}}</span></div>
          <div class="table-info-col1"><span>统一社会信用代码</span></div>
        <div class="table-info-col2"><span>{{form.creditCode}}</span></div>
        <div class="table-info-col1"><span>公司简称</span></div>
        <div class="table-info-col2">
          <el-tooltip class="item" effect="dark" :content="form.shortName" placement="top-start">
            <span>{{form.shortName}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>团队所在地</span></div>
        <div class="table-info-col2 text-overflow">
          <el-tooltip class="item" effect="dark" :content="String(form.provinceName+form.cityName+form.regionName+form.address)" placement="top-start">
            <span>{{form.provinceName}}{{form.cityName}}{{form.regionName}}{{form.address}}</span>
          </el-tooltip>
        </div>
        <div class="table-info-col1"><span>营业执照</span></div>
        <div class="table-info-col2">
          <p type="text" @click="visible=true" class="chakan" v-if="form.businessLicense">查看</p>
        </div>
        <div class="table-info-col1"><span></span></div>
        <div class="table-info-col2"><span>{{''}}</span></div>
      </div>
    </div>
    <big-image @handleWrapperClick="handleWrapperClick" :image="this.form.businessLicense" :visible="visible"></big-image>
    <big-image @handleWrapperClick="handleWrapperClick" :image="this.form.logo" :visible="logoVisible"></big-image>
  </div>
</template>

<script>
import BigImage from "../../../../components/bigImage.vue";
import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";

export default {
  name: "helloBitches",
  components: {
      ElButton,
      BigImage 
  },
  data() {
    return {
      visible: false,
      logoVisible: false,
      msg: "Hello Vue.js",
        form:{
            customerBill:{},
            customerContact:{},
        },
    }
  },
  filters: {
    formatStatus(val) {
      if (val == 1) {
        return '可用'
      } else if (val == 2) {
        return '冻结'
      } else {
        return ''
      }
    },
    sizeFilter(val) {
      let result = ''
      switch (Number(val)) {
        case 1:
          result = '少于15人'
          break;
        case 2:
          result = '15-50人'
          break;
        case 3:
          result = '50-150人'
          break;
        case 4:
          result = '150-500人'
          break;
        case 5:
          result = '500-2000人'
          break;
        case 6:
          result = '2000人以上'
          break;
        default:
          result = ''
          break;
      }
      return result
    },
    isListedFilter(val) {
      let value = Number(val)
      if (value === 1) {
        return '是'
      } else if (value === 2) {
        return '否'
      }
    },
    customerTypeFilter(val) {
      let result = ''
      switch (Number(val)) {
        case 1:
          result = '民营'
          break;
        case 2:
          result = '国企'
          break;
        case 3:
          result = '外资'
          break;
        case 4:
          result = '其他'
          break;
        default:
          result = '其他'
          break;
      }
      return result
    }
  },
  mounted() {
    this.getCustomerDetail()
  },
  methods: {
    handleWrapperClick() {
      this.visible = false
      this.logoVisible = false
    },
    getCustomerDetail() {
      const params = {
        id: this.$route.params.id,
      }
      this.$api.detailCustomer(params).then((response) => {
        this.form = response.data;
        if (this.form.businessLicense) {
          let watermark = sessionStorage.getItem('watermark')
          this.form.businessLicense = this.form.businessLicense + watermark
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  }
}
</script>
<style scoped>
.chakan {
  margin-top: 15px;
  color: #e84518;
  cursor: pointer;
}
.info-item {
  margin: 20px 0px;
}
.box-body-item-title {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #262626;
  line-height: 40px;
}
.box-body-item {
  margin: 0 auto;
  margin-top: 40px;
}
.line {
  /*height: 2px;*/
  /*background-color: #e5e5e5;*/
  /*width:100%;*/
}
</style>