<template>
  <div>
    <el-form label-width="110px" label-position="left">
      <el-form-item label="是否收取：" class="formSearchMargin formSearchMarginTop">
        <el-radio-group class="radio-search" v-model="needManagerFee">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="管理费：" class="formSearchMargin formSearchMarginTop" prop="managerFee" v-if="isShow">
        <el-input v-model="managerFee" style="width:330px" @keyup.native="keyUpCost" @blur="blurCost"></el-input>&nbsp;&nbsp;&nbsp;元/条考勤
      </el-form-item>
      <el-button class="myplain-btn btngroup" style="margin: 45px 0 0 110px;width:110px" @click="save">保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      managerFee: '',
      needManagerFee: '',
    }
  },
  props: ['customerId'],
  computed: {
    'isShow': function(){
      if(this.needManagerFee == 1){
        return true
      }else if(this.needManagerFee == 2){
        return false
      }
    }
  },
  mounted(){
    this.getCustomerList()
  },
  methods: {
    save(){
      let pattern = /^-?\d*\.?\d*$/
      if(this.needManagerFee == 1){
          if(!this.managerFee){
          return this.$message.error('管理费不能为空！')
        }else if(this.managerFee == 0){
          return this.$message.error('管理费不能为0')
        }else if(!pattern.test(this.managerFee)){
          return this.$message.error('管理费只能是数字！')
        }
      }
      
      
      let params = {
        customerId: this.customerId,
        needManagerFee: this.needManagerFee,
        managerFee: this.managerFee
      }
      console.log(params)
      this.$api.setManagerFee(params).then(res => {
        // console.log(res)
        if(res.data.respCode == 0){
          this.$message.success('保存成功')
          this.$emit('funcVal',this.managerFee)
          this.$emit('funcNeed',this.needManagerFee)
        }
      }).catch()
    },
    getCustomerList() {
      const params = {
        
      }
      this.$api.getCustomerList(params).then((response) => {
        console.log(response)
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
            this.managerFee = item.managerFee
            this.needManagerFee = item.needManagerFee.toString()
          }
        });
        this.pageCount = pages
      }).catch((error) => {
        console.log(error);
      });
    },
    keyUpCost() {
      let value = this.managerFee
      let pattern = /^-?\d*\.?\d*$/
      console.log(Number(value))
      if (pattern.test(value)) {
        if (Number(value >= 0)) {
          let falseNum = value.substr(0, 1);
          let numLength = value.indexOf('.');
          if (value.indexOf('.') != -1) {
            this.managerFee = value.substr(0, value.indexOf(".") + 3);
            if (Number(falseNum) == 0 && numLength >= 2) {
              this.managerFee = null;
            }
          }else{
            this.managerFee = value.substr(0,8)
          }
        } else {
          this.managerFee = null
        }
      } else {
        this.managerFee = null
      }
    },
    blurCost(){
      if(!this.managerFee){
        return this.$message.error('管理费不能为空！')
      }
    }
  },
}
</script>
<style scoped>
</style>


