z<template>
    <div>
        <div class="overflow-box1 input-box" >
            <div class="box-title" v-if="title2"><span>添加自有个体工商户</span></div>
            <div class="box-title" v-if="title3"><span>添加平台个体工商户</span></div>
            <div class="box-title" v-if="title4"><span>添加自有个体工商户</span></div>
            <div class="box-title" v-if="title1"><span>编辑个体工商户</span></div>
            <div class="box-body1">
                <div class="box-body-item">
                    <div class="box-body-form">
                        <el-form ref="form" :model="form" label-width="160px" label-position="left" :rules="rules">
                            <el-form-item label="所属项目经理：" v-if="isOwn && !isEdit && !customer" prop="manager">
                                <el-select v-model="form.manager" class="radius-input " style="width: 650px" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.nameAlias" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属客户：" v-if=" customer && !isEdit" prop="customer">
                                <el-select v-model="form.customer" class="radius-input " style="width: 650px;" placeholder="请选择">
                                    <el-option v-for="item in cusList" :key="item.value" :label="item.shortName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="已交年费：" v-if="!isEdit && isOwn" prop="yearFee">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.yearFee" 
                                type="number" oninput="if(value.length>10)value=value.slice(0,10)"></el-input>
                                <span class="yuanText">元</span>
                            </el-form-item>
                            <el-form-item label="交费日期：" v-if="!isEdit && isOwn" prop="paidDate">
                                <el-date-picker v-model="form.paidDate" type="date" class="radius-input dateWidth" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="服务截止日期：" v-if="!isEdit && isOwn" prop="endTime">
                                <el-date-picker class="radius-input dateWidth" v-model="form.endTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="每月最大开票金额：" prop="biggerAmount">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.biggerAmount" 
                                type="number"  oninput="if(value.length>10)value=value.slice(0,10)"></el-input>
                                <span class="yuanText">元</span>
                            </el-form-item>
                            <el-form-item label="字号名称：" prop="name">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.name" @blur="checkName"></el-input>
                            </el-form-item>
                            <el-form-item label="经营者姓名：" prop="boss">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.boss"></el-input>
                            </el-form-item>
                            <el-form-item label="经营场所：" prop="address">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.address"></el-input>
                            </el-form-item>
                            <el-form-item label="统一社会信用代码：" prop="code">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.code" @blur="checkOnly" maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item label="注册日期：" prop="submitDate">
                                <el-date-picker v-model="form.submitDate" type="date" class="radius-input dateWidth" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="开户银行：">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" maxlength="128" v-model="form.bank"></el-input>
                            </el-form-item>
                            <el-form-item label="户名：">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" maxlength="128" v-model="form.bankAccount"></el-input>
                            </el-form-item>
                            <el-form-item label="银行账号：" prop="acountId">
                                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.acountId" maxlength="128"></el-input>
                            </el-form-item>
                            
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <el-button round size="medium" type="primary" @click="submitOwn" v-if="title2">保 存</el-button>
                <el-button round size="medium" type="primary" @click="submitPlat" v-if="title3">保 存</el-button>
                <el-button round size="medium" type="primary" @click="submitCus" v-if="title4">保 存</el-button>
                <el-button round size="medium" type="primary" @click="update" v-if="title1">保 存</el-button>
                <el-button round size="medium" @click="goBack">取 消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "NewPrivately",
    data() {
        let _this = this;
        let checkNum = (rule, value, callback) => {
        if (value) {
            if (value <= 0) {
            callback(new Error("请输入大于0的数字"));
            } else {
            _this.form.biggerAmount =  value.toString().replace(/^(([1-9]\d{0,7})(\.\d{1,2})?|0\.[1-9]{1,2})$/);
            _this.form.biggerAmount = value.toString().replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            _this.form.biggerAmount = value.toString().replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            _this.form.biggerAmount = value.toString().replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            _this.form.biggerAmount = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
            callback();
            }
        } else {
            callback(new Error("请输入正确的每月最大开票金额"));
        }
        };
        let checkNum1 = (rule, value, callback) => {
        if (value) {
            if (value <= 0) {
            callback(new Error("请输入大于0的数字"));
            } else {
            _this.form.yearFee =  value.toString().replace(/^(([1-9]\d{0,7})(\.\d{1,2})?|0\.[1-9]{1,2})$/);
            _this.form.yearFee = value.toString().replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            _this.form.yearFee = value.toString().replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            _this.form.yearFee = value.toString().replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            _this.form.yearFee = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
            callback();
            }
        } else {
           
            callback(new Error("请输入正确的已交年费"));
        }
        };
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime();
                }
            },
            // form: {
            //     manager: "1",
            //     distributeManager: "2",
            //     yearFee: "3",
            //     paidDate: "2018-01-01",
            //     endTime: "2018-03-01",
            //     name: "fd",
            //     boss: "goBack",
            //     address: "法国梵蒂冈地方",
            //     code: "43fsd",
            //     submitDate: "2019-09-09",
            //     bank: "fdgdg",
            //     bankAccount: "fgaga",
            //     acountId: "534543654"
            // },
            form: {
                manager: "",
                customer: "",
                yearFee: "",
                paidDate: "",
                endTime: "",
                name: "",
                boss: "",
                address: "",
                code: "",
                submitDate: "",
                bank: "",
                bankAccount: "",
                acountId: "",
                biggerAmount: "",
            },
            isEdit: false,
            isOwn: false,
            title1: false,
            title2: false,
            title3: false,
            rules: {
                manager: [
                    {
                        required: true,
                        message: "所属项目经理不能为空",
                        trigger: "change"
                    }
                ],
                yearFee: [
                    {
                        required: true,
                        // message: "已交年费不能为空",
                        trigger: "blur",
                        validator: checkNum1
                    },
                    // { min: 1, max: 10, message: '长度不超过10字', trigger: 'blur' }
                ],
                paidDate: [
                    {
                        required: true,
                        message: "交费日期不能为空",
                        trigger: "change"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "服务截止日期不能为空",
                        trigger: "change"
                    }
                ],
                customer: [
                    {
                        required: true,
                        message: "所属客户不能为空",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "字号名称不能为空",
                        trigger: "blur"
                    }
                ],
                boss: [
                    {
                        required: true,
                        message: "经营者姓名不能为空",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "经营场所不能为空",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "统一社会信用代码不能为空",
                        trigger: "blur"
                    }
                ],
                submitDate: [
                    {
                        required: true,
                        message: "注册日期不能为空",
                        trigger: "change"
                    }
                ],
                acountId: [
                    {
                        required: false,
                        trigger: "blur",
                        // validator: checkAccount
                        // message: "请输入纯数字",
                    },
                    {
                    pattern: /^[1-9][0-9]*$/,
                    message: "请输入纯数字"
                }
                ],
                biggerAmount: [
                    {
                        required: true,
                        // message: "每月最大开票金额不能为空",
                        trigger: "blur",
                        validator: checkNum
                    },
                    // { min: 1, max: 10, message: '长度不超过10字', trigger: 'blur' }
                ],
            },
            options: [],
            isCheckName:true,
            bigger:false,
            customer:false,
            cusList:[]
        };
    },
    methods: {
        goBack() {
            this.$router.push({ name: "privatelyList",query:{ isSelf: this.$route.params.isSelf} });
        },
        submitOwn() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = {
                        managerId: this.form.manager,
                        annualFee: this.form.yearFee,
                        dateOfPayment: this.form.paidDate,
                        endTime: this.form.endTime,
                        companyName: this.form.name,
                        legalPerson: this.form.boss,
                        address: this.form.address,
                        creditCode: this.form.code,
                        recordDate: this.form.submitDate,
                        bankName: this.form.bank,
                        bankCard: this.form.acountId,
                        accountHolder: this.form.bankAccount,
                        taxAmount: this.form.biggerAmount,
                    };
                    this.$api
                        .addPrivately(params)
                        .then(response => {
                            if (response.data.respCode == 0) {
                                this.$message.success(`新增成功`);
                                this.$router.go(-1);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        test() {
            this.$api
                .aaa()
                .then(response => {
                    // console.log("1111");
                })
                .catch(error => {
                    console.log(error);
                });
        },
        clearNoNum(obj) {
            //先把非数字的都替换掉，除了数字和.
            obj.value = obj.value.replace(/[^\d.]/g, "");
            //保证只有出现一个.而没有多个.
            obj.value = obj.value.replace(/\.{2,}/g, ".");
            //必须保证第一个为数字而不是.
            obj.value = obj.value.replace(/^\./g, "");
            //保证.只出现一次，而不能出现两次以上
            obj.value = obj.value
                .replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");
            //只能输入两个小数
            obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
        },
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = {
                        financeCustomerId: this.$route.params.id,
                        companyName: this.form.name,
                        legalPerson: this.form.boss,
                        address: this.form.address,
                        creditCode: this.form.code,
                        recordDate: this.form.submitDate,
                        bankName: this.form.bank,
                        bankCard: this.form.acountId,
                        accountHolder: this.form.bankAccount,
                        taxAmount: this.form.biggerAmount,
                    };
                    this.$api
                        .updatePrivately(params)
                        .then(response => {
                            if (response.data.respCode == 0) {
                                this.$message.success(`修改成功`);
                                this.$router.push({ name: "privatelyList",query:{ isSelf: this.$route.params.isSelf} });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submitPlat() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = {
                        companyName: this.form.name,
                        legalPerson: this.form.boss,
                        address: this.form.address,
                        creditCode: this.form.code,
                        recordDate: this.form.submitDate,
                        bankName: this.form.bank,
                        bankCard: this.form.acountId,
                        accountHolder: this.form.bankAccount,
                        taxAmount: this.form.biggerAmount,
                    };
                    this.$api
                        .addPrivatelyPlat(params)
                        .then(response => {
                            if (response.data.respCode == 0) {
                                this.$message.success(`新增成功`);
                                // this.$router.push({name:'privatelyList'})
                                this.$router.go(-1);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            // this.$router.go(-1)
        },
        submitCus() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = {
                        dateOfPayment: this.form.paidDate,
                        endTime: this.form.endTime,
                        companyName: this.form.name,
                        legalPerson: this.form.boss,
                        address: this.form.address,
                        creditCode: this.form.code,
                        recordDate: this.form.submitDate,
                        bankName: this.form.bank,
                        bankCard: this.form.acountId,
                        accountHolder: this.form.bankAccount,
                        customerId: this.form.customer,
                        taxAmount: this.form.biggerAmount,
                        annualFee: this.form.yearFee,
                    };
                    this.$api
                        .addCusPrivately(params)
                        .then(response => {
                            if (response.data.respCode == 0) {
                                this.$message.success(`新增成功`);
                                this.$router.go(-1);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            // this.$router.go(-1)
        },
        getOwnDetail() {
            const params = {
                isSelf: this.$route.params.isSelf,
                financeCustomerId: this.$route.params.id
            };
            this.$api
                .PrivatelyOwnDetail(params)
                .then(response => {
                    // this.form.distributeManager = response.data.data.managerId
                    this.form.yearFee = response.data.data.annualFee;
                    this.form.paidDate = response.data.data.dateOfPayment;
                    this.form.endTime = response.data.data.endTime;
                    this.form.name = response.data.data.name;
                    this.form.boss = response.data.data.legalPerson;
                    this.form.address = response.data.data.address;
                    this.form.code = response.data.data.creditCode;
                    this.form.submitDate = response.data.data.recordDate;
                    this.form.bank = response.data.data.bankName;
                    this.form.acountId = response.data.data.bankCard;
                    this.form.bankAccount = response.data.data.accountHolder;
                    this.form.biggerAmount = response.data.data.taxAmount;
                    this.form.customer = response.data.data.accountHolder;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getManagerList() {
            const params = {
                pageNum: 1,
                pageSize: 10000,
                managerStatus: 2,
            };
            this.$api
                .getPmList(params)
                .then(response => {
                    if (response.data.respCode == 0) {
                        this.options = response.data.data.list;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        checkName(){
            if(this.isEdit){
                const params = {
                    companyName: this.form.name,
                    financeCustomerId: this.$route.params.id,
                };
                this.$api
                    .CheckPriName(params)
                    .then(response => {
                        if (response.respCode == 0) {
                            this.$message.error('字号名称已存在')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }else{
                const params = {
                    companyName: this.form.name,
                };
                this.$api
                    .CheckPriName(params)
                    .then(response => {
                        if (response.data.respCode != 0) {
                            this.$message.error('字号名称已存在')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        getCustomerList(){
            const params ={
            pageNum:1,
            pageSize:10000
            }
            this.$api.getCustomerList(params).then((response) => {
            const {
                data: {
                list,
                pages,
                total,
                pageNum,
                },
            } = response.data;
                this.cusList=list
            }).catch((error) => {
            console.log(error);
            });
        },
        checkOnly(){
            if(this.isEdit){
                const params = {
                    creditCode: this.form.code,
                    financeCustomerId: this.$route.params.id,
                };
                this.$api
                    .CheckCode(params)
                    .then(response => {
                        if (response.respCode == 0) {
                            this.$message.error('统一社会信用代码已存在')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }else{
                const params = {
                    creditCode: this.form.code,
                };
                this.$api
                    .CheckCode(params)
                    .then(response => {
                        if (response.data.respCode != 0) {
                            this.$message.error('统一社会信用代码已存在')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    },
    mounted() {
        if (this.$route.name == "editPrivately") {
            this.isEdit = true;
            this.title1 = true;
            this.getOwnDetail();
        } else {
            if (this.$route.name == "newPrivately") {
                this.isOwn = true;
                this.isEdit = false;
                this.title2 = true;
                this.getManagerList()
            }
            else if (this.$route.name == "newPlatPrivately") {
                this.isOwn = false;
                this.isEdit = false;
                this.title3 = true;
                this.bigger = true;
                this.getManagerList()
            }
            else  {
                this.isOwn = true;
                this.isEdit = false;
                this.title4 = true;
                this.bigger = true;
                this.customer = true;
                this.getManagerList()
                this.getCustomerList()
            }
        }
    },
    watch: {}
};
</script>
<style scoped>
.box-body-item-title {
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #262626;
    line-height: 40px;
}
.box-body-item {
    margin: 40px;
}
.box-body-form {
    margin: 20px;
}
.line {
    height: 1px;
    background-color: #e5e5e5;
    width: 100%;
}
.overflow-box1 {
    font-family: MicrosoftYaHei;
    background-color: #ffffff;
    /*box-shadow: 0px 2px 21px 0px rgba(156, 156, 156, 0.35);*/
    border-radius: 8px;
    margin: 70px auto;
    padding-bottom: 36px;
}
.box-title {
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
.box-title span {
    padding-bottom: 10px;
    border-bottom: 3px solid #e84518;
    border-radius: 1px;
}
.box-footer {
    text-align: center;
    margin-bottom: 40px;
}
.box-body1 {
    padding: 10px;
    /*height: 300px;*/
}
.workerInp {
    position: relative;
    width:650px
}
.yuan {
    position: absolute;
    right: -20px;
}
.dateWidth {
    width: 650px;
    height: 36px !important;
}
.yuanwidth{
    width: 690px;
}
.yuanText{
    position: absolute;
    left:654px;
    top:0
}
</style>

