<template>
    <div class="classMangerHugeCon">
        <el-form label-width="150px" :model="form" label-position="left" :rules="rules" ref="classMangerRef">
            <el-form-item label="班务经理数量上限：" class="formSearchMargin formSearchMarginTop" prop="amount">
                <el-input v-model.trim="form.amount" maxlength="10"></el-input>
            </el-form-item>
            <div class="warning">*该经理人下状态为正常的班务经理数量上限</div>
            <el-button class="myplain-btn btngroup" style="margin: 45px 0 0 110px;width:110px" @click="save">保存</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        let checkValidate = (rule, value, callback)=>{
              if( this.form.amount == '' ){
                 callback(new Error("数量不能为空"));
              }else{
                  let numberFormat = Number(this.form.amount);
                      let isNan = Number.isNaN(numberFormat);
                      let isInteger = Number.parseInt( numberFormat,10 ) === numberFormat;
                  if( numberFormat === 0 ){
                      this.form.amount = '';
                      callback(new Error("请填写正确的数量"));
                  }
                  if(isNan){
                      this.form.amount = '';
                      callback(new Error("请填写正确的数量"));
                  }else{
                      if(isInteger){
                          if( numberFormat<0 ){
                              this.form.amount = '';
                              callback(new Error("请填写正确的数量"));
                          }else{
                              callback(); 
                          }
                      }
                  }
              }  
      };
        return {
            form:{
                amount:0,
            },            
            rules:{
               amount: [
                    { trigger: 'blur',validator:checkValidate }
               ], 
            },
        }
    },
    props: ['customerId'],
    mounted(){
        this.getData();
    },
    methods: {
        save(){            
            this.$refs.classMangerRef.validate((valid)=>{
                if( valid ){
                    let params = {
                        limit:this.form.amount,
                        customerId:this.customerId,
                    };
                    this.$api.setManagerLimit(params).then(res=>{
                        console.log('res',res);
                        let { respCode,data } = res;
                        if( respCode === 0 ){
                            this.$message({
                              message: '设置成功',
                              type: 'success'
                            });
                        }
                    }).catch(err=>{
                        console.log('err',err);
                    })
                }else{
                    this.$message.error('请检查表单');
                }
            })
        },
        getData() {
            let params = {
                customerId:this.customerId,
            };
            this.$api.getManagerLimit(params).then(res=>{
                let { respCode,data } = res;
                if( respCode === 0 ){
                    this.form.amount = data;
                }
            }).catch(err=>{
                console.log('err',err);
            })            
        },
    }
}
</script>
<style lang="scss" >
    .classMangerHugeCon {
        .el-input {
            width: 330px;
        }
        .warning {
            padding-left: 150px;
            font-size: 13px;
            margin-top: 30px;
        }
    }
</style>