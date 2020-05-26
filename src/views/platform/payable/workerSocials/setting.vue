<template>
    <div>
        <div class="overflow-box" style="width:646px;" >
            <div class="box-title"><span>添加零工社保信息</span></div>
            <div class="box-body1">
                <div class="box-body-item">
                    <div class="box-body-form">
                        <el-form ref="form" :model="form" label-width="150px" label-position="left" :rules="rules">

                            <el-form-item label="养老保险缴纳比例" prop="oldAgePension">
                                <el-input class="radius-input workerInp"   size="medium" v-model.number="form.oldAgePension"  placeholder="" style="width: 90%;" @blur="checkSum"></el-input> %
                            </el-form-item>
                            <el-form-item label="医疗保险缴纳比例" prop="medicalInsurance">
                                <el-input class="radius-input workerInp"  size="medium" v-model.number="form.medicalInsurance"  placeholder="" style="width: 90%;" @blur="checkSum"></el-input> %
                            </el-form-item>
                            <el-form-item label="失业保险缴纳比例" prop="unemploymentInsurance">
                                <el-input class="radius-input workerInp"   size="medium" v-model.number="form.unemploymentInsurance"  placeholder="" style="width: 90%;" @blur="checkSum"></el-input> %
                            </el-form-item>
                            <el-form-item label="公积金缴纳比例" prop="accumulationFund">
                                <el-input class="radius-input workerInp" placeholder=""  size="medium" v-model.number="form.accumulationFund"  style="width: 90%;" @blur="checkSum"></el-input> %
                            </el-form-item>
                            <el-form-item label="生效月份" prop="takeEffectMonth">
                                <el-radio-group v-model="form.takeEffectMonth">
                                    <el-radio label="1">本月</el-radio>
                                    <el-radio label="2">次月</el-radio>
                                </el-radio-group>
                            </el-form-item>


                        </el-form>
                    </div>
                </div>

            </div>
            <div class="box-footer">

                <el-button round size="medium" type="primary"  @click="handleSubmit">保 存</el-button>
                <el-button round size="medium"   @click="$router.go(-1)">取 消</el-button>

            </div>
        </div>
    </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import util from '../../../../common/util'

  export default {
    name: "",
    components: {ElRow},
    data() {
      return {
        routeForm:'',
        form:{
          oldAgePension:'',
          medicalInsurance:'',
          unemploymentInsurance:'',
          accumulationFund:'',
          takeEffectMonth:'1',
        },
        rules:{
          oldAgePension:[
            { required: true, message: '养老保险缴纳比例不能为空', trigger: 'blur' },
            {pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.[0-9][1-9])$/, message: '比例输入格式错误：请输入正确的比例', trigger: ['blur', 'change']}
          ],
          medicalInsurance:[
            { required: true, message: '医疗保险缴纳比例不能为空', trigger: 'blur' },
            {pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.[0-9][1-9])$/, message: '比例输入格式错误：请输入正确的比例', trigger: ['blur', 'change']}
          ],
          unemploymentInsurance:[
            { required: true, message: '失业保险缴纳比例不能为空', trigger: 'blur' },
            {pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.[0-9][1-9])$/, message: '比例输入格式错误：请输入正确的比例', trigger: ['blur', 'change']}
          ],
          accumulationFund:[
            { required: true, message: '公积金缴纳比例不能为空', trigger: 'blur' },
            {pattern: /^(([1-9]\d*)(\.\d{1,2})?|0\.[0-9][1-9])$/, message: '比例输入格式错误：请输入正确的比例', trigger: ['blur', 'change']}
          ],
          takeEffectMonth:[
            { required: true, message: '生效月份不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    watch:{
      'form.belongto':function (val,oldval) {
        if(val){
          for(let x in this.belongtoList){
            if(this.belongtoList[x].id==val){
              this.taskType=this.belongtoList[x].taskType
              this.belongto=this.belongtoList[x].belongto
              break;
            }
          }
          this.getTaskList()
        }
      },
      'form.province':function (val,oldval) {
        if(val){
          if(this.form.city && this.count1!=1){
            this.form.city =''
          }
          this.getCity()
          this.count1++
        }
      },
      'form.city':function (val,oldval) {
        if(val){
          if(this.form.region && this.count2!=1) {
            this.form.region = ''
          }
          this.getRegion()
          this.count2++
        }
      },
    },
    mounted(){
      console.log(this.$route)
    },
    methods: {
      checkSum(){
        let sum = Number(this.form.medicalInsurance) + Number(this.form.unemploymentInsurance) + Number(this.form.accumulationFund)+ Number(this.form.oldAgePension)
        if(sum>99){
          this.$message.error('四项之和>=100：所有比例之和必须小于100')
        }
      },
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid){
            const params = {
              oldAgePension:this.form.oldAgePension,
              medicalInsurance:this.form.medicalInsurance,
              unemploymentInsurance:this.form.unemploymentInsurance,
              accumulationFund:this.form.accumulationFund,
              takeEffectMonth:this.form.takeEffectMonth,
            }
            this.$api
                .AddSocial(params)
                .then(response => {
                  if(response.data.respCode==0){
                    console.log(this.routeForm)
                    if(this.routeForm==1){
                      sessionStorage.setItem('isSettingSocialSecurity',true)
                      this.$router.replace({name:'home'})
                    }else{
                      this.$router.push({name:'payableList'})

                    }
                  }
                })
                .catch(error => {
                  console.log(error);
                });
          }
        });

      },
    },
    beforeRouteEnter(to,form,next){
      next(vm=>{
        console.log(form.name)
        if(form.name=='login' ){
          vm.routeForm=1
        }else{
          vm.routeForm=2
        }
      })
    }
  }
</script>

<style scoped>
    .btnborder{
        border: solid 1px #e84518;
        color: #e84518;
        /*padding: 12px 22px;*/
    }
    .marginleft20{
        margin-left: 20px;
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
        margin:40px;
    }
    .box-body-form{
        margin:20px;
    }
    .line{
        height: 1px;
        background-color: #e5e5e5;
        width:100%;
    }
    .overflow-box{
        font-family: MicrosoftYaHei;
        background-color: #ffffff;
        box-shadow: 0px 2px 21px 0px
        rgba(156, 156, 156, 0.35);
        border-radius: 8px;
        margin:70px auto;
        padding-bottom: 36px;
    }
    .box-title{
        text-align: center;
        padding-top: 35px;
        width: 100%;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #262626;
    }
    .box-title span{
        padding-bottom: 10px;
        border-bottom: 3px solid #e84518;
        border-radius: 1px;
    }
    .box-footer{
        text-align: center;
        margin-bottom: 40px;
    }
    .box-body1{
        padding: 10px;
        /*height: 300px;*/
    }
    .note-label{
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #666666;
    }
    .delete-rela{
        position: relative;
    }
    .delete-mark{
        position: absolute;
        left: -80px;
        top: 12px;
    }
    .btnborder{
        border: solid 1px #e84518;
        color: #e84518;
        /*padding: 12px 22px;*/
    }
</style>