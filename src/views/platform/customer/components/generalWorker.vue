<template>
  <div class="generalWorkerCon">
    <el-form label-width="110px" label-position="left" :rules="rules" ref="generalWorkerForm" :model="generalWorkerForm">        
        <div class="topPart">
            <div class="leftTextCon">系统使用费</div>
            <div class="rightCon">
                <div class="multipleItem" key="1">
                    <div class="itemName">保险</div>
                    <div class="itemCon">
                        <el-form-item label="是否收费："  class="formSearchMargin formSearchMarginTop" >
                            <el-radio-group class="radio-search" v-model="feeStatus1">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="收费对象：" class="formSearchMargin formSearchMarginTop">
                            <el-radio-group class="radio-search" v-model="feeObj1">
                                <el-radio label="1">经理人</el-radio>
                                <el-radio label="2">零工</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="金额：" class="formSearchMargin formSearchMarginTop" prop="fee1checkAmount" v-show="feeStatus1 == '1'" >
                            <el-input v-model.trim="generalWorkerForm.feeAmount1" style="width:330px" @input="keyUpCost1('generalWorkerForm','feeAmount1')"></el-input>&nbsp;&nbsp;&nbsp;元/条
                        </el-form-item>
                    </div>
                </div>
                <div class="multipleItem" key="2">
                    <div class="itemName">系统费</div>
                    <div class="itemCon">
                        <el-form-item label="是否收费："  class="formSearchMargin formSearchMarginTop" >
                            <el-radio-group class="radio-search" v-model="feeStatus2">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="收费对象：" class="formSearchMargin formSearchMarginTop">
                            <el-radio-group class="radio-search" v-model="feeObj2">
                                <el-radio label="1">经理人</el-radio>
                                <el-radio label="2">零工</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="金额：" class="formSearchMargin formSearchMarginTop" prop="fee2checkAmount" v-if="feeStatus2 == '1'">
                            <el-input v-model.trim="generalWorkerForm.feeAmount2" style="width:330px" @input="keyUpCost2('generalWorkerForm','feeAmount2')"></el-input>&nbsp;&nbsp;&nbsp;元/天
                        </el-form-item>
                    </div>
                </div>
            </div>
        </div>
      <el-button class="myplain-btn btngroup" style="margin: 45px 0 0 110px;width:110px" @click="getData">保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {    
  data() {      
      let fee1Validate = (rule, value, callback)=>{  
          let trans = this['generalWorkerForm']['feeAmount1'];
          if (this.feeStatus1 == '1') {              
              if( trans == '' ){
                  callback(new Error('金额不能为空'));
              }else{
                  if( trans == 0 ){                        
                      callback(new Error('金额不能为0'));
                  }else{
                      let pattern = /^-?\d*\.?\d*$/;
                      if(!pattern.test(trans)) {
                          callback(new Error('金额只能是数字'));
                      }else{
                          callback();
                      }
                  }
              }
          }else{
              callback();
          }
      };      
      let fee2Validate = (rule, value, callback)=>{
          let trans = this['generalWorkerForm']['feeAmount2'];
          if (this.feeStatus2 == '1') {              
              if( trans == '' ){
                  callback(new Error('金额不能为空'));
              }else{
                  if( trans == 0 ){                        
                      callback(new Error('金额不能为0'));
                  }else{
                      let pattern = /^-?\d*\.?\d*$/;
                      if(!pattern.test(trans)) {
                          callback(new Error('金额只能是数字'));
                      }else{
                          callback();
                      }
                  }
              }
          }else{
              callback();
          }
      };  
    return {
        feeStatus1: "1",
        feeStatus2: "1",  
        generalWorkerForm:{
            feeAmount1: '',
            feeAmount2: '',
        },
        feeObj1: '2',
        feeObj2: '2',
        customerFeeSettingList: [],
        statusAmount: [],
        isShow: true,
        isVisible: true,
        rules:{
            fee1checkAmount:[
                { validator: fee1Validate, trigger: 'blur' }
            ],         
            fee2checkAmount:[
                { validator: fee2Validate, trigger: 'blur' }
            ],
        },        
    };
  },
  props: ["customerId"],
  mounted() {
      this.getStatusAmount();
  },
  methods: {
    getData() { 
        this.$refs['generalWorkerForm'].validate((valid) => {
            if( valid ){
                let pattern = /^-?\d*\.?\d*$/;
                if( this.feeStatus1 == "2" ){
                    this.generalWorkerForm.feeAmount1 = 0;
                }
                if(this.feeStatus2 == "2"){
                    this.generalWorkerForm.feeAmount2 = 0;
                }
                this.customerFeeSettingList = [
                    {
                        feeStatus: this.feeStatus1,
                        feeAmount: this.generalWorkerForm.feeAmount1,
                        feeType: 1,
                        feeObj: this.feeObj1
                    },
                    {
                        feeStatus: this.feeStatus2,
                        feeAmount: this.generalWorkerForm.feeAmount2,
                        feeType: 2,
                        feeObj: this.feeObj2
                    }
                ];                
                const params = {
                    customerId: this.customerId,
                    customerFeeSettingList: this.customerFeeSettingList
                };
                this.$api.setCustomerFee(params).then(res => {
                    let { data:layer1 } = res;
                    let { respCode } = layer1;
                    if( respCode == 0 ){
                        this.$message.success("保存成功");
                    }else{
                        this.$message.error(res.data.errorMsg)
                    }
                }).catch(err=>{
                    console.log('err',err);
                })
            }else{
                return false;
            }
        });
    },
    getStatusAmount() {
      const params = {
          customerId: this.customerId
      };
      this.$api.getCustomerFee(params).then(res => {
          let { respCode,data } = res;
          if( respCode === 0 ){
              if(data && data.length ){
                  let find1 = data.find(ele=>{
                      return ele.feeType == 1;
                  })
                  this.feeStatus1 = String(find1.feeStatus);
                  this.generalWorkerForm.feeAmount1 = find1.feeAmount;
                  this.feeObj1 = String(find1.feeObj);                  
                  let find2 = data.find(ele=>{
                      return ele.feeType == 2;
                  })
                  this.feeStatus2 = String(find2.feeStatus);
                  this.generalWorkerForm.feeAmount2 = find2.feeAmount;
                  this.feeObj2 = String(find2.feeObj);                   
              }
          }
      }).catch(err=>{
          console.log('err',err);
      });
    }, 
      keyUpCost2(form,item){
          this.keyUpCost1(form,item);
      },   
      keyUpCost1(form,item) {
          let pattern = /^-?\d*\.?\d*$/;
          let value = this[form][item];
          if (pattern.test(value)) {
              if (Number(value >= 0)) {
                  let falseNum = value.substr(0, 1);
                  let numLength = value.indexOf('.');
                  if (value.indexOf('.') != -1) {
                      this[form][item] = value.substr(0, value.indexOf(".") + 3);
                      if (Number(falseNum) == 0 && numLength >= 2) {
                          this[form][item] = '';
                      }
                  }else{
                      this[form][item] = value.substr(0,3);
                  }
              } else {
                  this[form][item] = '';
              }
          } else {
              this[form][item] = '';
          }
      },
  }
};
</script>
<style scoped lang="scss">
    .generalWorkerCon {
        padding-bottom: 100px;
        .topPart {
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            align-items: flex-start;   
            padding-bottom: 30px;
        }
        .leftTextCon {
            margin-top: 28px;
            margin-right: 20px;
            width: 100px;
        }
        .rightCon {
            .multipleItem {
                display: flex;
                justify-content: flex-start;
                align-content: flex-start;
                align-items: flex-start;   
            }
            .itemName {
                margin-top: 28px;
                width: 60px;
            }
        }
    }
</style>