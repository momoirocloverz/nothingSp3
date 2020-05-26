<template>
    <div>
    <div class="box-body-item">
        <!--<div class="box-body-item-title">客户基本信息</div>-->
        <!--<div class="line"></div>-->
        <el-button class="myplain-btn btngroup"  @click="routePwd">修改密码</el-button>
        <el-button class="myplain-btn btngroup"  @click="routePhone">修改绑定手机号</el-button>
        <div class="table-info info-item">
            <div class="table-info-col1"><span>登录账号</span></div>
            <div class="table-info-col2"><span>{{this.form.loginName}}</span></div>
            <div class="table-info-col1"><span>绑定手机号</span></div>
            <div class="table-info-col2"><span>{{this.form.mobile}}</span></div>

        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {
        msg: "Hello Vue.js",
        form:{},
      }
    },

    watch: {

    },
    mounted(){
      this.getDetail()
    },
    methods: {
      getDetail(){
        const params = {
          customerId:this.$route.params.id,
        }
        this.$api.detailCusAccount(params).then((response) => {
          console.log(response)
          if(response.respCode==0){
            this.form=response.data;
          }

          console.log(this.form)
        }).catch((error) => {
          console.log(error);
        });
      },
      routePwd(){
        this.$router.push({name:'editPwd',params:{id:this.form.id}})
      },
      routePhone(){
        console.log(this.form)
        this.$router.push({name:'editPhone',params:{userId:this.form.id}})
      }

    }
  }
</script>

<style scoped>
    .btngroup{
        margin-right: 10px;
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
        height: 2px;
        background-color: #e5e5e5;
        width:100%;
    }
</style>