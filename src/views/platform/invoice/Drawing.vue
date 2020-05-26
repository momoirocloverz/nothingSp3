<template>
    <div>
        <div class="overflow-box" style="width:646px;" >
            <div class="box-title"><span>{{$route.query.edit==1?'修改发票':'开票'}}</span></div>
            <div class="box-body1">
                <div class="box-body-item">
                    <div class="box-body-form">
                        <el-form ref="form" :model="form" label-width="150px" label-position="left" :rules="rules">
                            <div v-for="(item,index) in form.items" :key="index">
                            <el-form-item :label="'发票号码'+Number(index+1)+'：'" class="delete-rela" :prop="`items.${index}.num` " :rules="itemsRules.num">
                                <img src="../../../assets/images/delete_ladder.png" alt="删除" class="delete-mark" v-if="index!==0" @click="deleteItem(index)">
                                <el-input class="radius-input workerInp" placeholder=""  size="medium" v-model="item.num"   maxlength="128"></el-input>
                            </el-form-item>
                                <el-button size="small" class="btnborder  " round style="margin-left: 150px" v-if="index==form.items.length-1" @click="addItem">添加发票号码</el-button>

                                <div class="splitLine" v-if="index!=form.items.length-1"></div>
                            </div>
                            <div class="u-text">请输入发票寄送信息：</div>
                            <el-form-item label="物流公司:" prop="company">
                                <el-input v-model="form.company"></el-input>
                            </el-form-item>
                            <el-form-item label="快递单号:" prop="oddNumbers">
                                <el-input v-model="form.oddNumbers"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

            </div>
            <div class="box-footer">
                <el-button v-if="$route.query.edit==1" round size="medium" type="primary"  @click="handlePostEdit">确 认</el-button>
                <el-button v-else round size="medium" type="primary"  @click="handleExort">确 认</el-button>
                <el-button round size="medium"   @click="$router.go(-1)">取 消</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'undrawed',
        data () {
            return {
                form:{
                    items:[{num:''}],
                    company:'',
                    oddNumbers:''
                },
                itemsRules: {
                    num: [
                        {
                            required: true,
                            message: "发票号码不能为空",
                            trigger: "blur"
                        }
                    ],
                },
                rules:{
                    company:[{
                        required: true, message: '请输入物流公司', trigger: 'blur',
                    }],
                    oddNumbers:[{
                        required: true, message: '请输入快递单号', trigger: 'blur',
                    }]
                }
            }
        },
        methods: {
            changePage(val){
                this.currentPagePlat = val
                this.getList()
            },
            handlePostEdit(){
                this.$refs.form.validate((valid) => {
                if (valid) {
                    let arr = []
                    for(let i in this.form.items){
                        arr.push(this.form.items[i].num)
                    }
                    // let str = arr.join(',')
                    
                    let param = {
                        invoiceId: this.$route.params.id,
                        invoiceNumberList: arr,
                        expressCompany:this.form.company,
                        expressNumber:this.form.oddNumbers
                    }
                    // console.log(this.items)
                    this.$api.invoiceUpdate(param)
                    .then(response => {
                    if (response.data.respCode == 0) {
                        this.$store.commit('CLEAR_EDIT');
                        this.$message.success('修改成功')
                        this.$router.go(-1)
                    }
                    })
                    .catch(error => {
                    console.log(error);
                });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            handleExort(){
                this.$refs.form.validate((valid) => {
                if (valid) {
                    let arr = []
                    for(let i in this.form.items){
                        arr.push(this.form.items[i].num)
                    }
                    // let str = arr.join(',')
                    
                    let param = {
                        invoiceId: this.$route.params.id,
                        invoiceNumberList: arr,
                        expressCompany:this.form.company,
                        expressNumber:this.form.oddNumbers
                    }
                    // console.log(this.items)
                    this.$api.ToDraw2(param)
                    .then(response => {
                        console.log(response)
                    if (response.data.respCode == 0) {
                        this.$message.success('开票成功')
                        this.$router.go(-1)
                    }
                    })
                    .catch(error => {
                    console.log(error);
                });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                
            },
            addItem(){
                this.form.items.push({num:''})
            },
            deleteItem(index){
                this.form.items.splice(index,1)
            }
        },
        created(){
            console.log(this.$route.params.id)
        },
        mounted() {
            const {query} = this.$route;
            if(query.edit==1){
                const {edit} = this.$store.state;
                if(edit){
                    this.form.company = edit.expressCompany;
                    this.form.oddNumbers = edit.expressNumber;
                    this.form.items = (edit.invoiceRecordNumberList?edit.invoiceRecordNumberList.split(','):[]).map(it=>{
                    return {num:it};
                    });
                }
            }
        },
    }
</script>

<style scoped>
.recordNum1 {
    font-size: 16px;
    color: #666666;
    margin-bottom: 16px;
    margin-top: 16px;
}
.box-body-item-title{
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #262626;
        line-height: 40px;
    }
    .box-body-item{
        margin:40px;
    }
    .box-body-form{
        margin:20px;
    }
    .line{
        height: 1px;
        background-color: #e5e5e5;
        width:100%;
    }
    .overflow-box{
        font-family: MicrosoftYaHei;
        background-color: #ffffff;
        box-shadow: 0px 2px 21px 0px
        rgba(156, 156, 156, 0.35);
        border-radius: 8px;
        margin:70px auto;
        padding-bottom: 36px;
    }
    .box-title{
        text-align: center;
        padding-top: 35px;
        width: 100%;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 1px;
        color: #262626;
    }
    .box-title span{
        padding-bottom: 10px;
        border-bottom: 3px solid #e84518;
        border-radius: 1px;
    }
    .box-footer{
        text-align: center;
        margin-bottom: 40px;
    }
    .box-body1{
        padding: 10px;
        /*height: 300px;*/
    }
    .note-label{
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #666666;
    }
    .delete-rela{
        position: relative;
    }
    .delete-mark{
        position: absolute;
        left: -62px;
        top: 12px;
    }
    .btnborder{
        border: solid 1px #e84518;
        color: #e84518;
        /*padding: 12px 22px;*/
    }
    .u-text {
        font-size: 14px;
        color: #606266;
        margin: 10px 0;
    }
</style>