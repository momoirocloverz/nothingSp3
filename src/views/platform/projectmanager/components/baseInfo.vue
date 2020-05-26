<template>
    <div>
    <div class="box-body-item">
        <div class="box-body-item-title">基本信息</div>
        <div class="line"></div>
        <div class="table-info info-item">
            <div class="table-info-col1"><span>姓名</span></div>
            <div class="table-info-col2"><span>{{this.form.nameAlias}}</span></div>
            <div class="table-info-col1"><span>状态</span></div>
            <div class="table-info-col2"><span>{{this.form.accountStatus | formataccountStatus}}</span></div>
            <div class="table-info-col1"><span>手机号</span></div>

            <div class="table-info-col2"><span>{{this.form.accountMobile}}</span></div>
            <div class="table-info-col1"><span>身份证号</span></div>
            <div class="table-info-col2"><span>{{this.form.idCard}}</span></div>
            <div class="table-info-col1"><span>所在位置</span></div>
            <div class="table-info-col2 text-overflow">
                <el-tooltip class="item" effect="dark" :content="this.form.address" placement="top-start">
                    <span show-overflow-tooltip>{{this.form.address}}</span>
                </el-tooltip>
            </div>
            <!--<div class="table-info-col2">-->
                <!--<el-button type="text" @click="visible=true" class="chakan">查看</el-button>-->
            <!--</div>-->
            <div class="table-info-col1"><span>管理费状态</span></div>
            <div class="table-info-col2"><span>{{this.form.feeStatus | formatFeeStatus}}</span></div>
        </div>
    </div>
    <div class="box-body-item">
        <div class="box-body-item-title">企业信息</div>
        <div class="line"></div>
        <div class="table-info info-item">
            <div class="table-info-col1"><span>公司名称</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.financeCustomer.name" placement="top-start">
                    <span>{{this.form.financeCustomer.name}}</span>
                </el-tooltip>
               </div>
            <div class="table-info-col1"><span>统一社会信用代码</span></div>
            <div class="table-info-col2"><span>{{this.form. financeCustomer.creditCode}}</span></div>
            <div class="table-info-col1"><span>注册地址</span></div>
            <div class="table-info-col2">

                <el-tooltip class="item" effect="dark" :content="this.form.financeCustomer.registeAddress" placement="top-start">
                    <span>{{this.form. financeCustomer.registeAddress}}</span>
                </el-tooltip>
            </div>
            <div class="table-info-col1"><span>注册电话</span></div>
            <div class="table-info-col2"><span>{{this.form. financeCustomer.phone}}</span></div>
            <div class="table-info-col1"><span>开户银行</span></div>
            <div class="table-info-col2"><span>{{this.form. financeCustomer.bankName}}</span></div>
            <div class="table-info-col1"><span>银行账号</span></div>
            <div class="table-info-col2"><span>{{this.form. financeCustomer.bankCard}}</span></div>
            <div class="table-info-col1"><span>营业执照</span></div>
            <div class="table-info-col2">
                <p type="text" @click="visible=true" class="chakan" v-if="this.form.financeCustomer.businessLicense">查看</p>
            </div>
            <div class="table-info-col1"><span></span></div>
            <div class="table-info-col2"><span></span></div>
        </div>
    </div>

        <big-image @handleWrapperClick="handleWrapperClick" :image="this.form.financeCustomer.businessLicense" :visible="visible"></big-image>
</div>
</template>

<script>
  import BigImage from "../../../../components/bigImage.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    name: "",
    components: {
      ElButton,
      BigImage},
    data() {
      return {
        visible:false,
        msg: "Hello Vue.js",
      }
    },
    props: {
      form: Object , //定义传值的类型<br>    }
//      default:function(){
//        return {
//          form: {
//            managerProjectVO:{}
//          }
//        }
//      }
    },
    filters:{
      formataccountStatus(val){
        if(val==1){
          return '可用'
        }else if(val==2){
          return '冻结'
        }else{
          return ''
        }
      },
      formatFeeStatus(val){
        if(val==1){
          return '未开通'
        }else if(val==2){
          return '免费试用'
        }else if(val==3){
          return '正常'
        }else if(val==4){
          return '欠费'
        }else{
          return ''
        }
      },
      formatAccountStatus(val){

      }
    },

    created(){
      console.log(this.form)
      if(!this.form. financeCustomer){
        console.log('sssss')
        this.form. financeCustomer={}
      }
      console.log(this.form)
    },
    mounted(){

    },
    methods: {
      handleWrapperClick(){
        this.visible=false
      },
    }
  }
</script>

<style scoped>
    .chakan{
        margin-top: 15px;
        color: #e84518;
        cursor: pointer;
    }
    .info-item{
        margin: 20px 0px;
    }
    .box-body-item-title{
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        line-height: 40px;
    }
    .box-body-item{
        margin-top:40px;
    }
    .line{
        /*height: 2px;*/
        /*background-color: #e5e5e5;*/
        /*width:100%;*/
    }
</style>