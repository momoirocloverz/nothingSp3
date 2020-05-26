<template>
    <div>
        <el-form label-width="110px" label-position="left">
            <el-form-item label="外包费用付款手续费" class="formSearchMargin formSearchMarginTop">
                <el-input style="width:330px" v-model="double" @keyup.native="keyUpCost" @blur="blurCost"></el-input>&nbsp;&nbsp;&nbsp;%
            </el-form-item>
            <el-button class="myplain-btn btngroup" style="margin: 45px 0 0 110px;width:110px" @click="save">保存</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            double: ''
        }
    },
  props: ['customerId'],
  mounted(){
      this.getCustomerList()
  },
  methods: {
      save(){
          let pattern = /^-?\d*\.?\d*$/
          if(!this.double){
              return this.$message.error('外包费用付款手续费不能为空！')
          }else if(this.double == 0){
              return this.$message.error('外包费用付款手续费不能为0！')
          }else if(!pattern.test(this.double)){
              return this.$message.error('外包费用付款手续费只能是数字！')
          }
          let params = {
              customerId: this.customerId,
              billServerRate: this.double
          }
          this.$api.setBillServerRate(params).then(res => {
              console.log(res)
              if(res.data.respCode == 0){
                  this.$message.success('保存成功')
                  this.$emit('funcDouble',this.double)
              }
          }).catch()
      },
      getCustomerList() {
      const params = {
        
      }
      this.$api.getCustomerList(params).then((response) => {
        // console.log(response)
        const {
          data: {
            list,
            pages,
            total,
            pageNum,
          },
        } = response.data;
        this.tableData = list
        this.tableData.forEach(item => {
          if(this.customerId == item.id){
            this.double = item.billServerRate
          }
        });
        this.pageCount = pages
      }).catch((error) => {
        console.log(error);
      });
    },
      keyUpCost() {
      let value = this.double
      let pattern = /^-?\d*\.?\d*$/
    //   console.log(Number(value))
      if (pattern.test(value)) {
        if (Number(value >= 0)) {
          let falseNum = value.substr(0, 1);
          let numLength = value.indexOf('.');
          if (value.indexOf('.') != -1) {
            this.double = value.substr(0, value.indexOf(".") + 3);
            if (Number(falseNum) == 0 && numLength >= 2) {
              this.double = null;
            }
          }else{
            this.double = value.substr(0,8)
          }
        } else {
          this.double = null
        }
      } else {
        this.double = null
      }
    },
    blurCost(){
      if(!this.double){
        return this.$message.error('外包费用付款手续费不能为空！')
      }
    }
  }
}
</script>
<style>

</style>

