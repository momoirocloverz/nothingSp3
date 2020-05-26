<template>
    <div>
        <div style="margin-bottom:30px">
        <el-radio-group v-model="radio4">
            <el-radio-button label="1">待开票</el-radio-button>
            <el-radio-button label="2">已开票</el-radio-button>
        </el-radio-group>
        <hr class="el-radio-group-hr" />
        </div>
        <!-- <el-button
        class="myplain-btn1"
         v-if="radio4 == 1"
        style="margin: 8px 14px 18px 14px"
        @click="addNew"
      >我要开票</el-button> -->
      <managerUndraw v-if="radio4 == 1"></managerUndraw>
      <ManagerDrawed v-if="radio4 == 2"></ManagerDrawed>
    </div>
</template>

<script>
import managerUndraw from './managerUndraw'
import ManagerDrawed from './ManagerDrawed'
    export default {
        name:'ManagerDrawList',
        components: {
            ManagerDrawed,
            managerUndraw,
        },
        data () {
            return {
                radio4:1,
            }
        },
        methods: {
            addNew(){
                this.$router.push({name:'drawing'})
            }
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