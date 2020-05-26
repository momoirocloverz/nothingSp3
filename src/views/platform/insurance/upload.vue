<template>
    <div>
        <div class="centerContainer">
            <el-upload  ref="uploadexcel"
                   class="upload-demo"
                   :action="$importInsuEmp"
                   :on-change="handleChange"
                   :on-remove="handleRemove"
                   :before-upload="beforeAvatarUpload"
                   :limit="1"
                   accept=".xls,.xlsx"
                   :on-exceed="handleExceed"
                   :on-success="handleUploadScucess"
                   :file-list="fileList"
                   :auto-upload="false"
                   :headers="uploadHeaders">
                <el-button size="small" class="btnborder" round>浏览</el-button>
<!--                <span slot="tip" class="el-upload__tip marginleft20 is-link" @click="downloadExcelTemplate">点击下载文件模板</span>-->
                <span slot="tip" class="el-upload__tip">&nbsp;（只支持excel文件）</span>
            </el-upload>
            <div class="box-footer">
                <el-button :disabled="importing" round size="medium" type="primary" @click="submitUpload" style="width: 250px;" > {{importingLabel}}</el-button>
            </div>
        </div>
        <el-dialog title="错误列表" :visible.sync="dialogTableVisible">
          <el-table :data="gridData" height="500">
            <el-table-column property="name" label="姓名" ></el-table-column>
            <el-table-column property="idCard" label="身份证号" ></el-table-column>
          </el-table>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialogTableVisible:false,
            gridData:[
            ],
            uploadHeaders:{},
            fileList:[],
            importingLabel:'导 入',
            importing:true,
        }
    },
    mounted(){
        this.getToken();
    },
    watch:{
        fileList:function(nval,val){
            if( nval.length ){
                this.importing = false;
            }else{
                this.importing = true;
            }
        },
    },
    methods: {
        downloadExcelTemplate(){
//            this.$api.downBG().then((response) => {
//                if(response.respCode==0){
//                    window.open(response.data)
//                }
//            });
        },
        getToken(){
            let token = sessionStorage.getItem('token')
            this.uploadHeaders={
                Authorization: `Bearer ${token}`
            }
        },
        submitUpload() { 
            if(this.fileList.length ){
                this.$refs.uploadexcel.submit();
            }else{
                return this.$message({
                    type:'error',
                    message:"导入的模板不能为空！"
                });
            }
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        handleUploadScucess(response, file) {
            this.importingLabel='导 入';
            this.$refs.uploadexcel.clearFiles();
            if(response.respCode==0){
                if( response.data && response.data.length ){
                    this.$message.error(`请检查名单。`);
                    this.dialogTableVisible = true;
                    this.gridData = response.data;
                }else{
                    this.$message.success('上传成功。')
                }
            }else {
                this.$message.error(`上传错误，${response.errorMsg}`)
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`请删除当前文件再重新上传！`);
        },
        beforeAvatarUpload(file) {
            var fileName = [];
            fileName =file.name.split('.');
            const extension = fileName[fileName.length-1] === 'xls';
            const extension2 =  fileName[fileName.length-1]=== 'xlsx';
            if (!extension && !extension2) {
                this.$message.error('请上传excel文件');
            }else {
                this.importingLabel='导入中';
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .centerContainer {
        width: 280px;
        margin: 0 auto;
        padding-top: 50px;
        height: 300px;
        text-align: center;
    }
    .box-footer {
        margin-top: 50px;
    }
    .btnborder {
        margin-right: 10px;
    }
</style>
