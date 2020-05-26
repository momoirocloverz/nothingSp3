<template>
    <div>
        <el-radio-group v-model="insuranceName">
        <el-radio-button label="detail">保单明细</el-radio-button>
        <el-radio-button label="collect">保单汇总</el-radio-button>
        <el-radio-button label="records">出险记录</el-radio-button>
            <el-radio-button label="upload">上传excel</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
      <detail v-if="insuranceName == 'detail'"></detail>
      <collect v-if="insuranceName == 'collect'"></collect>
      <records v-if="insuranceName == 'records'"></records>
        <upload v-if="insuranceName == 'upload'"></upload>
    </div>
</template>
<script>
import detail from './detail.vue'
import collect from './collect.vue'
import records from './records.vue'
import upload from './upload.vue'
export default {
    components: {
        detail,collect,records,upload
    },
    data(){
        return {
            insuranceName: 'detail'
        }
    },
    methods: {
        
    }
}
</script>
<style>

</style>
