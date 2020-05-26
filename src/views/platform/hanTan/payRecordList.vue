<template>
    <div>
        <el-radio-group v-model="active">
            <el-radio-button label="1">信息服务费</el-radio-button>
            <el-radio-button label="2">个人所得税</el-radio-button>
        </el-radio-group>
        <hr class="el-radio-group-hr"/>
        <one v-if="active == '1'" />
        <two v-if="active == '2'" />
    </div>
</template>

<script>
    import one from './components/payRecordListOne.vue'
    import two from './components/payRecordListTwo.vue'

    export default {
        name: 'Drawing',
        components:{one,two},
        data() {
            return {
                active:'1'
            }
        },

        mounted() {
        },
        methods: {

        },
    }
</script>

<style scoped>
</style>