<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="updatedAt" :formatter="createdAt" :show-overflow-tooltip="true" label="提交时间"
                             align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="经理人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="industry" :show-overflow-tooltip="true" label="行业" align="center" min-width="" >
            </el-table-column>
            <el-table-column prop="customerCon" :show-overflow-tooltip="true" label="联系人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerConPhone" :show-overflow-tooltip="true" label="联系电话" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="资料" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" @click="down(scope.row)">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="操作" align="center" min-width="">
                <template v-slot="scope">
                    <el-button v-show="scope.row.status == 1" size="small" type="text" @click="agreePre(scope.row)">通过</el-button>
                    <el-button v-show="scope.row.status == 1" size="small" type="text" @click="notAgree(scope.row)">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination
                    class="pagebox"
                    @current-change="changePage"
                    :current-page="currentPage"
                    :page-count="pageCount"
                    background
                    layout="prev, pager, next"
            >
            </el-pagination>
        </div>
        <!--审核通过-->
        <el-dialog title="薪福多设置" :visible.sync="dialogOpenVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="薪福多服务费费率:" label-width="180px">
                    <el-input type="text" v-model="form.rate" @keyup.native="rate"></el-input>
                </el-form-item>
                <el-form-item label="财务确认人手机号:" label-width="180px">
                    <el-input type="text" v-model="form.mobile" @keyup.native="mobile"></el-input>
                </el-form-item>
                <el-form-item label="单笔服务费最低限额:" label-width="180px">
                    <el-input type="text" v-model="form.charge" @keyup.native="charge"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="emptyData">取 消</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="save()">确 认</el-button>
            </div>
        </el-dialog>
        <!--审核不通过-->
        <el-dialog title="审核不通过" :visible.sync="dialogUpdateVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="确认该经理人的资料审核不通过?"  label-width="250px" style="margin-bottom: 0">
                </el-form-item>
                <el-form-item label="不通过原因:" label-width="120px">
                    <div style="padding-top:10px"></div>
                    <el-input type="textarea" :rows="8" placeholder="不通过原因(必填)" v-model="form.descUpdate"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="emptyData">取 消</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="saveInsu()">确 认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Drawing',
        data() {
            return {
                tableData: [],
                list:[],
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form:{
                    rate:'',
                    mobile:'',
                    charge:'',
                    descUpdate:''
                },
                id:'',
                dialogUpdateVisible:false,
                dialogOpenVisible:false,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            rate(){
                this.form.rate = this.form.rate.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                this.form.rate = this.form.rate.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                this.form.rate = this.form.rate.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                this.form.rate = this.form.rate.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                if(this.form.rate.indexOf(".")< 0 && this.form.rate !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    this.form.rate= parseFloat(this.form.rate);
                }
            },
            mobile(){
                this.form.mobile=this.form.mobile.replace(/[^\d]/g,'')
            },
            charge(){
                this.form.charge = this.form.charge.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
                this.form.charge = this.form.charge.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
                this.form.charge = this.form.charge.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                this.form.charge = this.form.charge.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
                if(this.form.charge.indexOf(".")< 0 && this.form.charge !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    this.form.charge= parseFloat(this.form.charge);
                }
            },
            emptyData(){
                this.form.descUpdate = '';
                this.form.rate = '';
                this.form.mobile = '';
                this.form.charge = '';
                this.dialogOpenVisible = false;
                this.dialogUpdateVisible = false;
            },
            createdAt(row, column, cellValue) {
                if (cellValue) {
                    return cellValue.substr(0, 16)
                } else {
                    return '无'
                }
            },
            down(row){
                this.list = [];
                this.list[0] = row.businessLicense //营业执照正本",
                this.list[1] = row.businessLicenseCopy//营业执照副本",
                this.list[2] = row.openPermit //开户许可证",
                this.list[3] = row.creditCode //机构信用代码",
                this.list[4] = row.legalIdCard//法人身份证",
                this.list[5] = row.authorization //授权书",
                this.list[6] = row.handlerIdCard//经办人身份证",
                this.list[7] = row.financeIdCard//财务联系人身份证",
                this.list[8] = row.financeOwnIdCard //财务负责人身份证",
                this.list[9] = row.associationArticles //公司章程",
                this.list[10] = row.shareholderIdCard  //股东身份证",
                let dowList = [];
                for(let item of this.list){
                    item = item.split(',');
                    dowList.push(item)
                }
                for (let i of dowList){
                    for (let d of i){
                        console.log(d);
                        window.open(d,'_blank')
                    }
                }
            },
            getList() {
                const params = {
                    status:1,
                    pageNum: this.currentPage,
                    pageSize: 20,
                };
                this.$api
                    .xfdAccountShow(params)
                    .then(response => {
                        console.log(response)
                        if (response.respCode == 0) {
                            this.tableData = response.data.list;
                            this.pageCount = response.data.pages
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            agreePre(row){
                this.id = row.customerId
                this.dialogOpenVisible = true;
            },
            save(){
                let _this = this;
                if(!_this.form.rate){
                    return _this.$message.error('薪福多服务费费率不能为空!')
                }
                if(!_this.form.mobile){
                    return _this.$message.error('财务确认人手机号不能为空!')
                }
                if(!_this.form.charge){
                    return _this.$message.error('单笔服务费最低限额不能为空!')
                }
                if(_this.form.mobile.length != 11){
                    return _this.$message.error('请输入正确的财务确认人手机号!')
                }
                if(_this.request){return}
                _this.request = true;
                let params = {
                    status:2,
                    reason:'',
                    customerId:_this.id,
                    rate:_this.form.rate,
                    financePhone:_this.form.mobile,
                    minMoney:_this.form.charge
                }
                this.$api.xfdOperation(params).then(res=>{
                    console.log(res);
                    if(res.data.respCode === 0){
                        _this.dialogOpenVisible = false;
                        _this.form.descUpdate = '';
                        _this.form.rate = '';
                        _this.form.financePhone = '';
                        _this.form.minMoney = '';
                        _this.getList()
                    }
                }).catch(err =>{
                    console.log(err)
                }).finally(()=>{
                    setTimeout(()=>{
                        _this.request = false;
                    },500)
                })
            },
            agree(row){
                console.log(row)
                let params = {
                    customerId:this.id,
                    status:2,
                    reason:'',
                    rate:'',
                    financePhone:'',
                    minMoney:''
                }
                this.$confirm(`确认该经理人的资料审核通过?`, `审核通过`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then((action) => {
                    this.$api.xfdOperation(params).then(res=>{
                        console.log(res)
                        let {data: result} = res;
                        let {data, respCode} = result;
                        if (respCode === 0) {
                            this.getList()
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(() => {

                });
            },
            utf8_strlen(str){
                let len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length
                return len;
            },
            notAgree(row){
                this.id = row.customerId
                this.dialogUpdateVisible = true;
            },
            saveInsu(){
                let _this = this;
                let desc = _this.utf8_strlen(_this.form.descUpdate);
                if(!_this.form.descUpdate){
                    return _this.$message.error('不通过原因不能为空!')
                }
                if(desc > 500){
                    return _this.$message.error('最多只能输入500个文字!')
                }
                if(_this.request){return}
                _this.request = true;
                let params = {
                    customerId:this.id,
                    status:3,
                    reason:this.form.descUpdate,
                    rate:'',
                    financePhone:'',
                    minMoney:''
                }
                this.$api.xfdOperation(params).then(res=>{
                    if(res.data.respCode === 0){
                        _this.getList()
                        _this.dialogUpdateVisible = false;
                        _this.form.descUpdate = '';
                    }else{
                        if(res.data.errorCode != 170003){
                            _this.$message.error(res.data.errorMsg)
                        }
                    }
                    console.log(res)
                }).catch(err =>{
                    console.log(err)
                }).finally(()=>{
                    setTimeout(()=>{
                        _this.request = false;
                    },500)
                })
            },
            fortype(val) {
                return val
            },
        },
    }
</script>

<style scoped>
</style>