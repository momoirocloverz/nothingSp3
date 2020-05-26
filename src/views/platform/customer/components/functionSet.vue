<template>
    <div>
        <el-form label-width="150px" label-position="left">
            <el-form-item label="是否启用特殊考勤：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="qiyong">
                    <el-radio label="1">启用</el-radio>
                    <el-radio label="2">不启用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button class="myplain-btn btngroup" style="margin: 45px 0 0 110px;width:110px" @click="save">保存</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            qiyong: '2',
            tableArr: []
        }
    },
    props: ['customerId'],
    mounted(){
        this.getCustomerList()
    },
    methods: {
        save(){
            let params = {
                customerId: this.customerId,
                emptyTalentSwitch: this.qiyong
            }
            this.$api.emptyFunSwitch(params).then(res => {
                console.log(res)
                if(res.data.respCode == 0){
                    this.$message.success('保存成功')
                    this.$emit('funcQiyong',this.qiyong)
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
            this.qiyong = item.emptyTalentSwitch.toString()
          }
        });
        this.pageCount = pages
      }).catch((error) => {
        console.log(error);
      });
    },
    }
}
</script>

<style>

</style>
