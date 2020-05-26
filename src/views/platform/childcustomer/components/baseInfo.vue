<template>
    <div style="margin: 0 auto;">
    <div class="box-body-item">
        <div class="box-body-item-title">客户基本信息</div>
        <div class="line"></div>
        <div class="table-info info-item">
            <div class="table-info-col1"><span>公司简称</span></div>
            <div class="table-info-col2">
              <el-tooltip class="item" effect="dark" :content="this.form.shortName" placement="top-start">
                    <span>{{this.form.shortName}}</span>
                </el-tooltip></div>
            <div class="table-info-col1"><span>所属行业</span></div>
            <div class="table-info-col2"><span>{{this.form.industryName}}</span></div>

            <div class="table-info-col1"><span>公司所在地</span></div>

            <div class="table-info-col2 text-overflow">
                <el-tooltip class="item" effect="dark" :content="this.form.provinceName+this.form.cityName+this.form.regionName+this.form.address" placement="top-start">
                    <span>{{this.form.provinceName}}{{this.form.cityName}}{{this.form.regionName}}{{this.form.address}}</span>
                </el-tooltip></div>

            <div class="table-info-col1"><span>营业执照</span></div>
            <!--<div class="table-info-col2"><span>{{this.form.businessLicense}}</span></div>-->
            <div class="table-info-col2">
                <p type="text" @click="visible=true" class="chakan" v-if="this.form.businessLicense">查看</p>
            </div>
            <div class="table-info-col1"><span>添加时间</span></div>
            <div class="table-info-col2"><span>{{this.form.createdAt | formatminDate}}</span></div>
            <div class="table-info-col1"><span></span></div>
            <div class="table-info-col2"><span></span></div>
        </div>
    </div>
    <div class="box-body-item">
        <div class="box-body-item-title">客户开票信息</div>
        <div class="line"></div>
        <div class="table-info info-item">
            <div class="table-info-col1 "><span>公司全称</span></div>
            <div class="table-info-col2 text-overflow">
                <el-tooltip class="item" effect="dark" :content="this.form.name" placement="top-start">
                <span show-overflow-tooltip>{{this.form.name}}</span>
                </el-tooltip>
            </div>
            <div class="table-info-col1"><span>统一社会信用代码</span></div>
            <div class="table-info-col2"><span>{{this.form.creditCode}}</span></div>
            <div class="table-info-col1"><span>注册地址</span></div>
            <div class="table-info-col2">
                <el-tooltip class="item" effect="dark" :content="this.form.registeAddress" placement="top-start">
                    <span>{{this.form.registeAddress}}</span>
                </el-tooltip>
            </div>
            <div class="table-info-col1"><span>注册电话</span></div>
            <div class="table-info-col2"><span>{{this.form.phone}}</span></div>
            <div class="table-info-col1"><span>开户银行</span></div>
            <div class="table-info-col2"><span>{{this.form.bankName}}</span></div>
            <div class="table-info-col1"><span>银行账号</span></div>
            <div class="table-info-col2"><span>{{this.form.bankCard}}</span></div>
        </div>
    </div>
    <div class="box-body-item">
        <div class="box-body-item-title">客户联系人信息</div>
        <div class="line"></div>
        <div class="table-info info-item">
            <div class="table-info-col1"><span>联系人</span></div>
            <div class="table-info-col2"><span>{{this.form.contactName}}</span></div>
            <div class="table-info-col1"><span>联系电话</span></div>
            <div class="table-info-col2"><span>{{this.form.phone}}</span></div>

        </div>
    </div>
        <big-image @handleWrapperClick="handleWrapperClick" :image="this.form.businessLicense" :visible="visible"></big-image>
</div>
</template>

<script>
  import BigImage from "../../../../components/bigImage.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import util from "../../../../common/util"
  export default {
    name: "",
    components: {
      ElButton,
      BigImage},
    data() {
      return {
        form:{},
        visible:false,
        msg: "Hello Vue.js",
      }
    },
    watch: {

    },
    filters:{
      formatStatus(val){
        if(val==1){
          return '可用'
        }else if(val==2){
          return '冻结'
        }else{
          return ''
        }
      },
      formatminDate(val){
        if(val){
          return util.minDate(val)
        }else{
          return ''
        }
      }
    },
    created(){
//      this.getCustomerDetail()
    },
    mounted(){
      this.getChildCusDetail()
      console.log(this.form)
    },
    methods: {
      handleWrapperClick(){
        this.visible=false
      },
      getChildCusDetail(){
        const params = {
          id:this.$route.params.id,
        }
        this.$api.ChildCusDetail(params).then((response) => {
          this.form=response.data;
          console.log(this.form)
          if(this.form.businessLicense){
            this.form.businessLicense=this.form.businessLicense+'?imageView2/0/q/75|watermark/2/text/5LuF55So5LqO5byA6YCa5LiH5omN572R6LSm5Y-3/font/5b6u6L2v6ZuF6buR/fontsize/1000/fill/I0ZERkFGQQ==/dissolve/35/gravity/Center/dx/10/dy/10|imageslim\n'
          }
          console.log(this.form)
        }).catch((error) => {
          console.log(error);
        });
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
        margin:0 auto;
        margin-top:40px;
    }
    .line{
        /*height: 2px;*/
        /*background-color: #e5e5e5;*/
        /*width:100%;*/
    }
</style>