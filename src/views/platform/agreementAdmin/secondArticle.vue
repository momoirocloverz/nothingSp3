<template>
    <div class="secondArticleCon"> 
        <div class="editorCon">
            <quill-editor v-model="content"   ref="secondMyQuillEditor"  :options="editorOption"   @blur="onEditorBlur($event)"  @focus="onEditorFocus($event)"   @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="btnCon">
            <el-button type="primary" @click="saveAgreement">保存协议</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" class="alertDialog">
          <span>是否保存协议内容</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmSave">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible:false,
            content:'',
            bridgeId:'',
            editorOption: {
                placeholder: '请输入协议内容。',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],  
                        [{ 'header': 1 }, { 'header': 2 }],  
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],   
                        [{ 'size': ['small', false, 'large', 'huge'] }],  
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],      
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean'] 
                    ]
                },
            },
        };
    },
    mounted() {
        this.initContent();
    },
    methods: { 
        initContent(){
            let params = {
                title:'生产现场安防协议',
            };
            this.$api.getUserAgreement(params).then(res=>{
                let { respCode,data } = res;
                if( respCode === 0 ){ 
                    if(data){
                        this.content = data.content;
                        this.bridgeId = data.id;
                    }else{
                        this.content = '';
                        this.bridgeId = '';
                    }
                }else{
                }
            }).catch(err=>{
                console.log('err',err);
            })
        },
        confirmSave(){
            let data = {
                title:'生产现场安防协议',
                content:this.content,
            }; 
            if( this.bridgeId ){
                data.id = this.bridgeId;
            }             
            this.$api.setUserAgreement(data).then(res=>{
                let { data:layer1 } = res;
                let { respCode } = layer1;
                if( respCode === 0 ){
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                }else{
                    this.$message.error('网络异常');
                }
            }).catch(err=>{
                console.log('err',err);
            });
        },
        onEditorBlur(quill) {
            console.log('editor blur!')
        },
        onEditorFocus(quill) {
            console.log('editor focus!')
        },
        onEditorReady(quill) {
//            console.log('editor ready!', '22')
        },
        saveAgreement(){
            if(this.content){
                this.dialogVisible = true;
            }else{
                this.$message.error('内容不能为空');
            }
        },
    },
}
</script>
<style lang='scss' scoped>
    .secondArticleCon {
        padding-bottom: 50px;
        .btnCon {
            margin-top: 30px;
            text-align: center;
            width: 700px;
        }
    }
</style>
<style lang='scss'>
    .secondArticleCon {
        .ql-container {
            height: 550px;            
        }
        .quill-editor {
            width: 700px;
        }
        .alertDialog {
            .el-dialog {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto !important;
                width: 500px;
                height: 220px;
            }
            .el-dialog__footer {
                padding-left: 20px;
                padding-right: 20px;
            }
            .el-dialog__body {
                padding: 30px 20px;
            }
        }
    }    
</style>