<template>
    <div>
        <div style="margin-top: 20px">
            <el-radio-group v-model="radio4" @change="TabClick">
                <el-radio-button label="1">全部任务</el-radio-button>
                <el-radio-button label="2">待确认</el-radio-button>
                <el-radio-button label="3">领取成功</el-radio-button>
            </el-radio-group>
            <hr class="el-radio-group-hr" />
        </div>

        <AllTask v-if="firstShow"></AllTask>
        <ToConfirm v-if="secondShow"></ToConfirm>
        <GetSuccess v-if="thirdShow"></GetSuccess>
    </div>
</template>

<script>
  import AllTask from './components/AllTask.vue'
  import GetSuccess from './components/GetSuccess.vue'
  import ToConfirm from './components/ToConfirm.vue'
  import util from '../../../common/util'
  export default {
    name: "",
    components: {
      AllTask:AllTask,
      GetSuccess:GetSuccess,
      ToConfirm:ToConfirm
    },
    data() {
      return {
        code:'',
        pageCount:'',
        currentPage:1,
        pageSize:20,
        tabledata:[{
          accountMobile: "",
          bindingTime: "",
          name: "",
          unbindingStartTime: "",
          unbindingTime: "",
        }],
        radio4: 1,
        firstShow:true,
        secondShow:false,
        thirdShow:false,
        form: {
          sex: "不限",
          settleType: "不限",
          manager: "不限",
          tag: "不限",
          keyWord: "",
          bindingStatus:'4'
        }
      }
    },
    created(){
    },
    mounted(){
//      this.getPmList();
    },
    filters:{
      formatminDate(val){
        if(val){
          return util.minDate(val)
        }else{
          return ''
        }
      }
    },
    watch:{
      'form.bindingStatus':function (val,oldval) {
        if(val){
          this.getPmList()
        }
      }
    },
    methods: {

      TabClick(){
        this.firstShow=false;
        this.secondShow=false;
        this.thirdShow=false;
        if(this.radio4==1){
          this.firstShow=true
        }else if(this.radio4==2){
          this.secondShow=true;
        }else if(this.radio4==3){
          this.thirdShow=true;
        }
//        this.getPmList()
      },
    },

  }
</script>

<style scoped>
    .vp-tab{
        margin: 20px 0;
    }
    .cut-line{
        width:100%;
        height: 2px;
        background-color: #eeeeee;
        /*border: solid 1px #eeeeee;*/
    }

</style>