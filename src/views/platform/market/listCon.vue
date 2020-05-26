<template>
    <div>
        <el-radio-group v-model="insuranceName">
        <el-radio-button label="first">挂靠任务保证金</el-radio-button>
        <el-radio-button label="sec">班务保证金</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
      <taskAmount v-if="insuranceName == 'first'"></taskAmount>
      <classAmount v-if="insuranceName == 'sec'"></classAmount>
    </div>
</template>
<script>
import taskAmount from './taskAmount.vue'
import classAmount from './classAmount.vue'
export default {
    components: {
        taskAmount,classAmount
    },
    data(){
        return {
            insuranceName: 'first'
        }
    },
    methods: {
        
    }
}
</script>
<style>

</style>
