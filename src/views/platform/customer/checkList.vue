<template>
  <div class="checkListCon">
    <div>
      <el-radio-group v-model="radio4" @change="TabClick">
        <el-radio-button label="1">待审核</el-radio-button>
        <el-radio-button label="2">审核未通过</el-radio-button>
      </el-radio-group>
      <hr class="el-radio-group-hr" />
    </div>
    <div class="margintop20">
        <waitingCheck v-if="radio4 == '1'"></waitingCheck>
        <notPass v-else></notPass>
    </div>
  </div>
</template>
<script>
    import notPass from './notPass.vue';
    import waitingCheck from './waitingCheck.vue';
    export default {
    name: "customerCheckList",
        components: {
            notPass,
            waitingCheck
        },
        data() {
            return {
                radio4: '1',
            }
        },
        mounted() {
        },
        methods: {
            TabClick() {
                if (this.radio4 == 1) {
                    
                } else if (this.radio4 == 2) {
                    
                }
            },
        },
    }
</script>
<style scoped lang="scss">
    
</style>