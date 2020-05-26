<template>
    <div>
        <el-form :model="formDetail" label-width="100px" label-position="left" class="formSearchMarginTop">
            <!--<el-form-item label="状态：" class="formSearchMargin" >-->
            <!--<el-radio-group class="radio-search" v-model="formDetail.policyStatus" @change="policyStatusChange('formDetail','policyStatus')">-->
            <!--<el-radio label="">不限</el-radio>-->
            <!--<el-radio label="1">保障中</el-radio>-->
            <!--<el-radio label="0">待生效</el-radio>-->
            <!--<el-radio label="2">已失效</el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item label="投保时间：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="formDetail.date"
                                @change="dateChange('formDetail','date')">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">本月</el-radio>
                    <el-radio label="2">自定义</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="自定义：" class="formSearchMargin" v-if="formDetail.date == '2'">
                <el-date-picker class="margin_left40" size="mini" v-model="formDetail.startDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择开始时间">
                </el-date-picker>
                --
                <el-date-picker class="margin_left10" size="mini" v-model="formDetail.endDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" size="small" class="datesearchBtn" @click="true_btn">确定</el-button>
            </el-form-item>
            <!--<el-form-item label="出险状态：" class="formSearchMargin" >-->
            <!--<el-radio-group class="radio-search" v-model="formDetail.riskStatus" @change="statusChange('formDetail','riskStatus')">-->
            <!--<el-radio label="">不限</el-radio>-->
            <!--<el-radio label="1">已出险</el-radio>-->
            <!--<el-radio label="0">未出险</el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item label="关键字：" class="formSearchMargin">
                <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入被保人姓名搜索"
                          v-model="formDetail.talentName"></el-input>
                <el-button type="primary" size="small" class="datesearchBtn" @click="search_btn">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="medium " class="datesearchBtn" style="margin:30px 0 20px 0;"
                   @click="export_btn">添加出险保单
        </el-button>
        <div>合计保单数&nbsp;{{total || 0}}</div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息" style="margin:20px 0 0 0;">
            <el-table-column prop="recordDate" label="记录时间" align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="policyNo" label="保单号" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="talentName" label="被保人" align="center" min-width="80">
            </el-table-column>
            <el-table-column prop="policyTime" label="保障时间" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="createdTime" label="投保时间" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="managerName" :formatter="managerName" label="班务经理" align="center" min-width="80">
            </el-table-column>
            <el-table-column prop="schedulingName" label="排班" align="center" min-width="150">
            </el-table-column>
            <el-table-column prop="policyRecord" label="出险记录" align="center" min-width="220">
            </el-table-column>
            <el-table-column label="操作" min-width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateSchedule(scope.row)">更新进度</el-button>
                    <!--<el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" background layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-count="pageCount" :page-size="pageSize" :current-page="currentPage">
            </el-pagination>
        </div>

        <el-dialog title="添加出险保单" :visible.sync="dialogFormVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:30px">
                <el-form-item label="保单号" label-width="100px">
                    <el-input placeholder="请输入保单号" v-model="form.number" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="emptyData">取 消</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="goTwo()">下一步</el-button>
            </div>
        </el-dialog>
        <!--添加出险保单第二步-->
        <el-dialog title="添加出险保单" :visible.sync="dialogInsuVisible" width="1100px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="保单信息:" label-width="120px">
                    <div style="">保单号: {{form.number}}</div>
                    <el-table class="table-outline" :data="formList"  style="margin:20px 0 0 0;">
                        <el-table-column prop="talentName" label="被保人" align="center" min-width="100">
                        </el-table-column>
                        <el-table-column prop="policyTime" label="保障时间" align="center" min-width="120">
                        </el-table-column>
                        <el-table-column prop="insuStartAt" label="投保时间" align="center" min-width="100">
                        </el-table-column>
                        <el-table-column prop="managerName" label="班务经理" align="center" min-width="100">
                        </el-table-column>
                        <el-table-column prop="schedulingName" label="排班" align="center" min-width="100">
                        </el-table-column>
                        <el-table-column prop="policyStatus" label="状态" :formatter="statusText" align="center" min-width="80">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="出险记录:" label-width="120px" style="padding-top:30px">
                    <div style="padding-top:10px"></div>
                    <el-input type="textarea" :rows="6" placeholder="记录出现进度" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="goOne()">上一步</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="saveInsu()">保 存</el-button>
            </div>
        </el-dialog>
        <!--更新出险进度-->
        <el-dialog title="更新出险进度" :visible.sync="dialogUpdateVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="出险记录:" label-width="120px" style="padding-top:30px">
                    <div style="padding-top:10px"></div>
                    <el-input type="textarea" :rows="8" placeholder="更新出险进度" v-model="form.descUpdate"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="emptyData">取 消</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="saveInsu('update')">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Interval from '../../../common/interval.js'

    export default {
        data() {
            return {
                tableData: [],
                formDetail: {
                    policyStatus: '',
                    date: '1',
                    startDate: '',
                    endDate: '',
                    talentName: '',
                    riskStatus: '',
                },
                formList:[],
                form:{
                    number:'',
                    desc:'',
                    descUpdate:'',
                },
                updateInfo:null,
                request:false,
                dialogFormVisible:false,
                dialogInsuVisible:false,
                dialogUpdateVisible:false,
                pageCount: 1,
                pageSize: 20,
                currentPage: 1,
                total: 0
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            emptyData(){
                this.form.number = '';
                this.form.desc = '';
                this.form.descUpdate = '';
                this.dialogInsuVisible = false;
                this.dialogFormVisible = false;
                this.dialogUpdateVisible = false;
            },
            statusText(row, column, cellValue) {
                if (cellValue == 1) {
                    return "保障中"
                } else if (cellValue == 0) {
                    return "待生效"
                }else if (cellValue == 2) {
                    return "已失效"
                }
            },
            goOne(){
                this.dialogInsuVisible = false;
                this.dialogFormVisible = true;
            },
            utf8_strlen(str){
                let len = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length
                return len;
            },
            goTwo(){
                let _this = this;
                let reg = /^[0-9]+$/;
                if(!this.form.number){
                    return this.$message.warning('保单号不能为空!')
                }
                if(this.form.number.length > 30){
                    return this.$message.warning('保单号长度需小于30!')
                }
                if(_this.request){return}
                _this.request = true;
                _this.formList = [];
                let params = {
                    policyNo:this.form.number,
                }
                this.$api.insuDetail(params).then(res=>{
                    if(res.respCode === 0){
                        if(res.data.riskStatus === "未出险"){
                            _this.formList.push(res.data);
                            _this.dialogFormVisible = false;
                            _this.dialogInsuVisible = true;
                        }else if(res.data.riskStatus === "已出险"){
                            _this.$message.warning('该保单已出险！')
                            _this.dialogFormVisible = false;
                            _this.form.number = '';
                            _this.form.desc = '';
                        }else{
                            _this.$message.error(res.errorMsg)
                        }
                    }
                }).catch(err =>{
                    console.log(err)
                }).finally(()=>{
                    setTimeout(()=>{
                        _this.request = false;
                    },500)
                })
            },
            saveInsu(type){
                let _this = this;
                let desc = '';
                let params = {};
                if(type == 'update'){ //更新的话多加个参数
                    desc = _this.utf8_strlen(_this.form.descUpdate)
                    params = {
                        id: _this.updateInfo.riskId, //保单id",
                        insuId: _this.updateInfo.insuId, //保单id",
                        policyNo:_this.updateInfo.policyNo, //保单号",
                        policyRecord:_this.form.descUpdate, //出险记录",
                    }
                }else{
                    desc = _this.utf8_strlen(_this.form.desc)
                    let insuId = _this.formList[0].insuId;
                    params = {
                        insuId: insuId, //保单id",
                        policyNo:_this.form.number, //保单号",
                        policyRecord:_this.form.desc, //出险记录",
                    }
                }
                console.log(desc)
                if(desc > 500){
                    return _this.$message.error('最多只能输入500个文字!')
                }
                if(_this.request){return}
                _this.request = true;
                this.$api.activeInsu(params).then(res=>{
                    if(res.data.respCode === 0){
                        _this.getData()
                        _this.dialogInsuVisible = false;
                        _this.dialogUpdateVisible = false;
                        _this.form.number = '';
                        _this.form.desc = '';
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
            getData() {
                if (this.formDetail.date == '') {
                    this.formDetail.startDate = ''
                    this.formDetail.endDate = ''
                } else if (this.formDetail.date == '1') {
                    this.formDetail.startDate = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1).toString().length == 1 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-01'
                    this.formDetail.endDate = Interval.getDay(0)
                } else if (this.formDetail.date == '2') {
                    this.formDetail.startDate = this.formDetail.startDate
                    this.formDetail.endDate = this.formDetail.endDate
                }
                if (this.formDetail.startDate > this.formDetail.endDate) {
                    return this.$message.error('结束日期不能早于开始日期！')
                }
                const params = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    // policyStatus: this.formDetail.policyStatus,
                    // riskStatus: this.formDetail.riskStatus,
                    talentName: this.formDetail.talentName,
                    startDate: this.formDetail.startDate,
                    endDate: this.formDetail.endDate
                }
                this.$api.activeList(params).then(res => {
                    if (res.data.respCode == 0) {
                        if (res.data.data) {
                            const {
                                data: {
                                    list,
                                    total,
                                    pageNum,
                                    pages
                                }
                            } = res.data
                            this.tableData = list || []
                            this.pageCount = pages
                            this.total = total
                        }
                    }
                }).catch()
            },
            export_btn() {
                this.dialogFormVisible = true;
            },
            managerName(row, column, cellValue) {
                if (cellValue) {
                    return cellValue
                } else {
                    return '无'
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData()
            },
            true_btn() {
                this.resetCurrentPage();
            },
            search_btn() {
                this.resetCurrentPage();
            },
            policyStatusChange(form, item) {
                console.log(this[form][item]);
                this.resetCurrentPage();
            },
            resetCurrentPage() {
                this.currentPage = 1;
                this.getData();
            },
            dateChange(form, item) {
                let val = this[form][item];
                switch (val) {
                    case '':
                        this.resetCurrentPage();
                        break;
                    case '1':
                        this.resetCurrentPage();
                        break;
                    case '2':
                        this.formDetail.startDate = '';
                        this.formDetail.endDate = '';
                        break;
                }
            },
            statusChange(form, item) {
                console.log(this[form][item]);
                this.resetCurrentPage();
            },
            updateSchedule(row) {
                this.dialogUpdateVisible = true;
                this.updateInfo = row;
                this.form.descUpdate = row.policyRecord
                console.log(this.updateInfo)
            }
        }
    }
</script>
<style>
    .inputWidth {
        width: 300px;
    }

    .datesearchBtn {
        margin-left: 15px;
    }

    .page-container {
        margin-top: 15px;
    }
</style>
