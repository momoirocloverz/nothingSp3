<template>
    <div>
        <div style="margin-top: 20px">

            <!--<el-radio-group v-model="radio4" @change="TabClick">-->
                <!--<el-radio-button label="1">基本信息</el-radio-button>-->
                <!--<el-radio-button label="2">任务</el-radio-button>-->
            <!--</el-radio-group>-->
            <!--<hr class="el-radio-group-hr"/>-->
            <baseInfo v-if="first" ></baseInfo>
            <!--<task v-if="second" ></task>-->
        </div>
    </div>
</template>

<script>
    import baseInfo from './components/baseInfo.vue'
    import task from './components/task.vue'

  export default {
    name: "",
    components: {
      baseInfo:baseInfo,
      task:task,
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
    },
    methods: {

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