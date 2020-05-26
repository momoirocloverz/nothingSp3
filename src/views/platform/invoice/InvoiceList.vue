<template>
    <div>
        <div style="margin-bottom:30px">
        <el-radio-group v-model="radio4">
            <el-radio-button label="1">待开票</el-radio-button>
            <el-radio-button label="2">已开票</el-radio-button>
        </el-radio-group>
        <hr class="el-radio-group-hr" />
        </div>
        
      <Undraw v-if="radio4 == 1"></Undraw>
      <Drawed v-if="radio4 == 2"></Drawed>
    </div>
</template>

<script>
import Drawed from './Drawed'
import Undraw from './Undraw'
    export default {
        name:"InvoiceList",
        components: {
            Drawed,
            Undraw,
        },
        data () {
            return {
                radio4:1,
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.myplain-btn1 {
  padding: 10px 24px;
  color: #e84518;
  height: 32px;
  background-color: #ffffff;
  border: solid 1px #e84518;
  border-radius: 0;
  font-size: 12px !important;
}
</style>