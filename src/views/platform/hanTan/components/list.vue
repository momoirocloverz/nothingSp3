<template>
    <div>
        <el-table class="table-outline" :data="tableData" empty-text="暂无相关信息">
            <el-table-column prop="customerName" :show-overflow-tooltip="true" label="简称" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="industryName" :show-overflow-tooltip="true" label="行业" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="contactName" :show-overflow-tooltip="true" label="联系人" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="phone" :show-overflow-tooltip="true" label="联系电话" align="center"
                             min-width="">
            </el-table-column>
            <el-table-column prop="subAccountNo" :show-overflow-tooltip="true" label="网商银行子账号" align="center" min-width="">
            </el-table-column>
            <el-table-column prop="financePhone" :show-overflow-tooltip="true" label="汉唐信通余额" align="center"
                             min-width="">
            </el-table-column>
            <el-table-column prop="havingAcount" :formatter="settlementTypeFormatter" :show-overflow-tooltip="true" label="状态" align="center"
                             min-width="">
            </el-table-column>
            <el-table-column prop="rate" :formatter="rateFor" :show-overflow-tooltip="true" label="汉唐信通服务费率" align="center"
                                               min-width="">
            </el-table-column>
            <el-table-column prop="cusRate" :formatter="rateFor" :show-overflow-tooltip="true" label="汉唐平台服务费率" align="center"
                             min-width="">
            </el-table-column>
            <!--<el-table-column prop="minMoney" :show-overflow-tooltip="true" label="单笔最低限额" align="center" min-width="">-->
            <!--</el-table-column>-->
            <el-table-column :show-overflow-tooltip="true" label="操作" align="center" min-width="">
                <template v-slot="scope">
                    <el-button size="small" type="text" @click="edit(scope.row)">设置</el-button>
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
        <el-dialog title="汉唐信通服务费率" :visible.sync="dialogOpenVisible" width="680px" :before-close="emptyData">
            <el-form :model="form" style="padding-right:20px">
                <el-form-item label="汉唐信通服务费率:" label-width="180px">
                    <el-input type="text" v-model="form.rate" @keyup.native="rate"></el-input>%
                </el-form-item>
                <el-form-item label="汉唐平台服务费率:" label-width="180px">
                    <el-input type="text" v-model="form.charge" @keyup.native="charge"></el-input>%
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="emptyData">取 消</el-button>
                <el-button type="primary" style="margin-left: 50px" @click="save()">确 认</el-button>
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
                form: {
                    rate: '',
                    mobile: '',
                    charge: '',
                    descUpdate: ''
                },
                id:'',
                orderInfo: {},
                dialogOpenVisible: false,
            }
        },

        mounted() {
            this.getList()
        },
        methods: {
            rateFor(row,cell,val){
                if(val){
                    return `${val}%`
                }else{
                    return '';
                }
            },
            changePage(val) {
                this.currentPage = val
                this.getList()
            },
            settlementTypeFormatter(row, column, cellValue, index) {
                let status = '' //
                switch (Number.parseInt(cellValue)) {
                    case 0:
                        status = '未开户'
                        break
                    case 1:
                        status = '已开户'
                        break
                    default:
                        status = '--'
                        break
                }
                return status
            },
            rate() {
                this.form.rate = this.form.rate.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                this.form.rate = this.form.rate.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                this.form.rate = this.form.rate.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                this.form.rate = this.form.rate.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                if (this.form.rate.indexOf(".") < 0 && this.form.rate != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    this.form.rate = parseFloat(this.form.rate);
                }
            },
            charge() {
                this.form.charge = this.form.charge.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
                this.form.charge = this.form.charge.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
                this.form.charge = this.form.charge.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                this.form.charge = this.form.charge.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
                if (this.form.charge.indexOf(".") < 0 && this.form.charge != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    this.form.charge = parseFloat(this.form.charge);
                }
            },
            emptyData() {
                this.form.rate = '';
                this.form.charge = '';
                this.dialogOpenVisible = false;
            },
            createdAt(row, column, cellValue) {
                if (cellValue) {
                    return cellValue.substr(0, 16)
                } else {
                    return '无'
                }
            },
            getList() {
                const params = {
                    pageNum: this.currentPage,
                    pageSize: 20,
                };
                this.$api
                    .htAccountList(params)
                    .then(response => {
                        console.log(response)
                        if (response.respCode == 0) {
                            this.tableData = response.data.list ? response.data.list : [];
                            this.pageCount = response.data.pages;
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            },
            edit(row) {
                this.id = row.id;
                this.form.rate = row.rate || '';
                this.form.charge = row.cusRate || '';
                this.dialogOpenVisible = true;
            },
            save() {
                let _this = this;
                if (!_this.form.rate) {
                    return _this.$message.error('汉唐信通服务费率不能为空!')
                }
                if (!_this.form.charge) {
                    return _this.$message.error('汉唐平台服务费率不能为空!')
                }
                if (_this.request) {
                    return
                }
                _this.request = true;
                let params = {
                    id: _this.id,
                    rate: _this.form.rate,
                    cusRate: _this.form.charge
                }
                this.$api.htAccountOperation(params).then(res => {
                    console.log(res);
                    if (res.data.respCode === 0) {
                        _this.dialogOpenVisible = false;
                        _this.getList()
                    }
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    setTimeout(() => {
                        _this.request = false;
                    }, 500)
                })
            },
        },
    }
</script>

<style scoped>
</style>