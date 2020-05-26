<template>
    <div>
        <div style="margin-top: 20px">
            <!-- <span style="font-size: 18px">{{this.form.shortName}}</span> -->
            <br>
            <br>
            <el-radio-group v-model="radio4" @change="TabClick">
                <el-radio-button label="1">基本信息</el-radio-button>
                <el-radio-button label="4">管理员账号信息</el-radio-button>
                <el-radio-button label="5">管理费</el-radio-button>
                <el-radio-button class="super-width" label="6">外包费用付款手续费</el-radio-button>
                <el-radio-button label="7">零工收费</el-radio-button>
                <el-radio-button label="8">功能设置</el-radio-button>
                <el-radio-button class="" label="9">付款手续费</el-radio-button>
                <!--          <el-radio-button label="9">班务经理设置</el-radio-button>-->
                <!--<el-radio-button label="10">会员管理</el-radio-button>-->
            </el-radio-group>
            <hr class="el-radio-group-hr"/>
            <baseInfo v-if="first" :form="form"></baseInfo>
            <proManager v-if="second" :id="form.id"></proManager>
            <worker v-if="third" :id="form.id"></worker>
            <adminInfo v-if="fourth" :form="form"></adminInfo>
            <manageCost v-if="five" :customerId="customerId" @funcVal="getVal" @funcNeed="getNeed"></manageCost>
            <invoiceServeFee v-if="six" :customerId="customerId" @funcDouble="getDouble"></invoiceServeFee>
            <generalWorker v-if="serven" :customerId="customerId"></generalWorker>
            <functionSet v-if="eight" :customerId="customerId" @funcQiyong="getQiyong"></functionSet>
            <serveFee v-if="nine" :customerId="customerId" @funcSetPayFee="funcServerFee"></serveFee>
            <!--        <classManager v-if="nine" :customerId="customerId"></classManager>-->
        </div>
    </div>
</template>

<script>
    import baseInfo from './components/baseInfo.vue'
    import adminInfo from './components/adminInfo.vue'
    import proManager from './components/proManager.vue'
    import worker from './components/worker.vue'
    import manageCost from './components/manageCost.vue'
    import invoiceServeFee from './components/invoiceServeFee.vue'
    import generalWorker from './components/generalWorker.vue'
    import functionSet from './components/functionSet.vue'
    import classManager from './components/classManager.vue'
    import serveFee from './components/serveFee.vue'

    export default {
        name: "",
        components: {
            baseInfo,
            proManager,
            adminInfo,
            worker,
            manageCost,
            invoiceServeFee,
            generalWorker,
            functionSet,
            classManager,
            serveFee
        },
        data() {
            return {
                first: '',
                second: '',
                third: '',
                fourth: '',
                five: '',
                six: '',
                serven: '',
                eight: '',
                nine: '',
                radio4: '',
                customerId: '',
                needManagerFee: '',
                managerFee: 0,
                serveFee: '',
                double: '',
                qiyong: '',
                form: {
                    customerBill: {},
                    customerContact: {}
                },
            }
        },
        mounted() {
            this.customerId = this.$route.params.id
            this.needManagerFee = this.$route.params.needManagerFee
            this.managerFee = this.$route.params.managerFee,
                this.double = this.$route.params.double
            this.serveFee = this.$route.params.serveFee
            this.qiyong = this.$route.params.qiyong
            this.getCustomerDetail()
        },
        methods: {
            getVal(val) {
                this.managerFee = val
                this.$route.params.managerFee = this.managerFee
                // console.log(val)
            },
            getNeed(val) {
                this.needManagerFee = val
                // console.log(val)
                this.$route.params.needManagerFee = this.needManagerFee
            },
            getDouble(val) {
                // console.log(val)
                this.double = val
                this.$route.params.double = this.double
            },
            funcServerFee(val) {
                this.serveFee = val
                this.$route.params.serveFee = this.serveFee
            },
            getQiyong(val) {
                this.qiyong = val
                this.$route.params.qiyong = this.qiyong
            },
            getCustomerDetail() {
                const params = {
                    id: this.$route.params.id,
                }
                this.$api.detailCustomer(params).then((response) => {
                    this.form = response.data;
                    if (this.form.businessLicense) {
                        let watermark = sessionStorage.getItem('watermark')
                        this.form.businessLicense = this.form.businessLicense + watermark
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            TabClick() {
                this.first = false;
                this.second = false;
                this.third = false;
                this.fourth = false;
                this.five = false;
                this.six = false;
                this.serven = false;
                this.eight = false
                this.nine = false;
                switch (this.radio4) {
                    case '1':
                        this.first = true;
                        break;
                    case '2':
                        this.second = true;
                        break;
                    case '3':
                        this.third = true;
                        break;
                    case '4':
                        this.fourth = true;
                        break;
                    case '5':
                        this.five = true;
                        break;
                    case '6':
                        this.six = true;
                        break;
                    case '7':
                        this.serven = true;
                        break;
                    case '8':
                        this.eight = true
                        break;
                    case '9':
                        this.nine = true
                        break;
                }
            }
        },
        beforeRouteEnter(to, form, next) {
            next(vm => {
                if (form.name == 'editPwd' || form.name == 'editPhone') {
                    vm.radio4 = 4
                    vm.fourth = true;
                    vm.first = false;
                } else {
                    vm.radio4 = 1
                    vm.first = true;
                }
            })
        }
    }
</script>

<style scoped lang="scss">
</style>