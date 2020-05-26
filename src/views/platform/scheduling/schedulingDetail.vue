<template>
    <div>
       <span class="sche-title">{{scheName}}</span>
        <div style="margin-top: 20px">

            <el-radio-group v-model="radio4" @change="TabClick">
                <el-radio-button label="1">排班设置</el-radio-button>
                <el-radio-button label="2">排班人员(正常)</el-radio-button>
                <el-radio-button label="3">排班人员(空挂)</el-radio-button>
            </el-radio-group>
            <hr class="el-radio-group-hr"/>
            <setting v-if="first"></setting>
            <normalWoker v-if="second"></normalWoker>
            <emptyWoker v-if="third"></emptyWoker>
        </div>
    </div>
</template>

<script>
  import setting from './components/setting.vue'
  import emptyWoker from './components/emptyWoker.vue'
  import normalWoker from './components/normalWoker.vue'
  import util from '../../../common/util'
//  import worker from './components/worker.vue'
  export default {
    name: "",
    components: {
      setting:setting,
      emptyWoker:emptyWoker,
      normalWoker:normalWoker,
//      worker:worker
    },
    data() {
      return {
        scheName:'',
        first:true,
        second:false,
        third:false,
        fourth:false,
        radio4:'1',
        msg: "Hello Vue.js",
        customerId:'',
        form:{
          customerBill:{},
          customerContact:{}
        },
      }
    },
    watch() {

    },
    mounted(){
      console.log(this.$route.params.id)
      this.customerId=this.$route.params.id
      this.scheName = util.getLocalStorage('scheName')
//      this.getCustomerDetail()
    },
    methods: {
      getCustomerDetail(){
        const params = {
          id:this.$route.params.id,
        }
        this.$api.detailCustomer(params).then((response) => {
          console.log(response)
          this.form=response.data;
          if(this.form.businessLicense){
            this.form.businessLicense=this.form.businessLicense+'?imageView2/0/q/75|watermark/2/text/5LuF55So5LqO5byA6YCa5LiH5omN572R6LSm5Y-3/font/5b6u6L2v6ZuF6buR/fontsize/1000/fill/I0ZERkFGQQ==/dissolve/35/gravity/Center/dx/10/dy/10|imageslim\n'
          }
          console.log(this.form)
        }).catch((error) => {
          console.log(error);
        });
      },
      TabClick(){
        this.first=false;
        this.second=false;
        this.third=false;
        this.fourth=false;
        switch (this.radio4){
          case '1':
            this.first=true;
            break;
          case '2':
            this.second=true;
            break;
          case '3':
            this.third=true;
            break;
          case '4':
            this.fourth=true;
            break;
        }
      }
    }
  }
</script>

<style scoped>
    .sche-title{
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #262626;
    }
</style>