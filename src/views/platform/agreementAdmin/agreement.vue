<template>
    <div class="agreementManageCon"> 
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="平台自由职业者协议" name="first">
                <firstArticle v-if=" activeName ==  'first' "></firstArticle>
            </el-tab-pane>
            <el-tab-pane label="生产现场安防协议" name="second">
                <secondArticle v-if=" activeName ==  'second' "></secondArticle>
            </el-tab-pane>            
            <el-tab-pane label="隐私权规定" name="third">
                <thirdArticle v-if=" activeName ==  'third' "></thirdArticle>
            </el-tab-pane>
            <el-tab-pane label="万才平台注册服务协议" name="fourth">
                <fourthArticle v-if=" activeName ==  'fourth' "></fourthArticle>
            </el-tab-pane>
<!--
            <el-tab-pane label="万才平台经理人服务协议" name="fifth">
                <fifthArticle v-if=" activeName ==  'fifth' "></fifthArticle>
            </el-tab-pane>
-->
            <el-tab-pane label="班务经理服务合作协议" name="sixth">
                <sixthArticle v-if=" activeName ==  'sixth' "></sixthArticle>
            </el-tab-pane>
<!--
            <el-tab-pane label="协议" name="seventh">
                <seventhArticle v-if=" activeName ==  'seventh' "></seventhArticle>
            </el-tab-pane>
-->
            
            
        </el-tabs>
    </div>
</template>
<script>
    import firstArticle from '@/views/platform/agreementAdmin/firstArticle.vue';
    import secondArticle from '@/views/platform/agreementAdmin/secondArticle.vue';    
    import thirdArticle from '@/views/platform/agreementAdmin/thirdArticle.vue';
    import fourthArticle from '@/views/platform/agreementAdmin/fourthArticle.vue';    
    import fifthArticle from '@/views/platform/agreementAdmin/fifthArticle.vue';
    import sixthArticle from '@/views/platform/agreementAdmin/sixthArticle.vue';    
    import seventhArticle from '@/views/platform/agreementAdmin/seventhArticle.vue';
    
export default {
    components:{
        firstArticle,secondArticle,thirdArticle,fourthArticle,fifthArticle,sixthArticle,seventhArticle
    },
    data() {
        return {
            activeName:'first',
        };
    },
    mounted() {
    },
    methods: {  
        handleClick(tab, event) {
//            console.log(tab);
        },
    },
}
</script>
<style lang='scss' scoped>
    .agreementManageCon {
        height: 100%;        
    }
</style>