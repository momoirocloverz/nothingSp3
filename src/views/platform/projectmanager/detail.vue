<template>
    <div>
        <div style="margin-top: 20px">
<span style="font-size: 18px">{{this.form.nameAlias}}</span>
            <br/>
            <br/>
            <el-radio-group v-model="radio4" @change="TabClick">
                <el-radio-button label="1">基本信息</el-radio-button>
                <el-radio-button label="2">零工</el-radio-button>

            </el-radio-group>
            <hr class="el-radio-group-hr"/>
            <baseInfo v-if="first" :form="form"></baseInfo>
            <worker v-if="second" :id="form.id"></worker>
        </div>
    </div>
</template>

<script>
    import baseInfo from './components/baseInfo.vue'
    import worker from './components/worker.vue'
//    import adminInfo from './components/adminInfo.vue'
//    import proManager from './components/proManager.vue'
  export default {
    name: "",
    components: {
      baseInfo:baseInfo,
      worker:worker,
//      adminInfo:adminInfo
    },
    data() {
      return {
        first:true,
        second:false,
        third:false,
        fourth:false,
        radio4:'1',
        msg: "Hello Vue.js",
        customerId:'',
        form:{
          managerProjectVO:{}
        },
      }
    },
    watch() {

    },
    mounted(){
      console.log(this.$route.params.id)
      this.pmId=this.$route.params.id
      this.getDetail()
    },
    methods: {
      getDetail(){
        const params = {
          id:this.$route.params.id,
        }
        this.$api.detailPm(params).then((response) => {
          console.log(response)
          this.form=response.data;
          if(!this.form.financeCustomer){
            console.log('sssss')
            this.form.financeCustomer={}
          }else {
            if( this.form.financeCustomer.businessLicense){
              console.log('aaaa')
              let watermark = sessionStorage.getItem('watermark')
              this.form.financeCustomer.businessLicense=this.form.financeCustomer.businessLicense+watermark
              console.log(this.form.financeCustomer.businessLicense)
            }
          }
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

</style>