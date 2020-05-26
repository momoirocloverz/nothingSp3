<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="invoiceReceiver" :formatter="createdAt" :show-overflow-tooltip="true" label="审核时间"
                             align="center" min-width="">
            </el-table-column>
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="简称" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="行业" align="center" min-width=""
                             :formatter="fortype">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="联系人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="联系电话" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="" :show-overflow-tooltip="true" label="资料" align="center" min-width="">

            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="操作" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" @click="agree(scope.row)">开户成功</el-button>
                    <el-button size="small" type="text" @click="notAgree(scope.row)">开户失败</el-button>
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
        <!--开户失败-->
        <el-dialog title="开户成功" :visible.sync="dialogOpenVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="请填写该经理人的薪福多设置"  label-width="242px" style="margin-bottom:10px">
                </el-form-item>
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
        <!--开户失败-->
        <el-dialog title="开户失败" :visible.sync="dialogUpdateVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="确认该经理人的开户失败,失败后可修改资料再次提交"  label-width="372px" style="margin-bottom: 0">
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
                currentPage: 1,
                pageCount: 1,
                total: 0,
                form:{
                    rate:'',
                    mobile:'',
                    charge:'',
                    descUpdate:''
                },
                dialogUpdateVisible:false,
                dialogOpenVisible:false,
            }
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
                this.dialogUpdateVisible = false;
                this.dialogOpenVisible = false;
            },
            createdAt(row, column, cellValue) {
                if (cellValue) {
                    return cellValue.substr(0, 10)
                } else {
                    return '无'
                }
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: 20,
                    status:3,
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
            agree(row){
                this.dialogOpenVisible = true;
            },
            utf8_strlen(str){
                let len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length
                return len;
            },
            notAgree(row){
                this.dialogUpdateVisible = true;
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

                }
                this.$api.activeInsu(params).then(res=>{
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

                }
                this.$api.activeInsu(params).then(res=>{
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
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
</style>