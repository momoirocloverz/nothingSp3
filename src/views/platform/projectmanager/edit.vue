<template>
    <div>
        <div class="overflow-box" style="width:646px;" >
            <div class="box-title" ><span>编辑经理人认证信息</span></div>
            <div class="box-body1">
                <div class="box-body-item">
                    <div class="box-body-form">
                    <el-form ref="form1" :model="form" label-width="125px" label-position="left" :rules="rules">
                        <el-form-item label="姓名：" prop="name">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.name" size="medium" ></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号：" prop="idCard">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.idCard" size="medium" ></el-input>
                        </el-form-item>
                        <el-form-item label="所在位置：" prop="address">
                            <el-input class="radius-input workerInp" placeholder="" disabled v-model="form.address" size="medium" ></el-input>
                        </el-form-item>
                        <!--<el-form-item label="是否拥有小规模纳税人企业:" prop="hasCompany">-->
                            <!--<el-radio-group v-model="form.hasCompany">-->
                                <!--<el-radio :label="2">是</el-radio>-->
                                <!--<el-radio :label="1">否</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->

                        <el-form-item label="公司名称：：" prop="financeCustomer.name">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.name" size="medium" ></el-input>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码：" prop="financeCustomer.creditCode">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.creditCode" size="medium" ></el-input>
                        </el-form-item>
                        <!--<el-form-item label="项目行业：" prop="managerProjectVO.industry">-->
                            <!--<el-select  class="radius-input " clearable v-model="form.managerProjectVO.industry" style="width: 100%;" placeholder="">-->
                                <!--<el-option-->
                                        <!--v-for="item in insdutryList"-->
                                        <!--:key="item.dicVal"-->
                                        <!--:label="item.dicName"-->
                                        <!--:value="item.dicVal">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="项目开始时间：" prop="managerProjectVO.startDate">-->
                            <!--<el-date-picker-->
                                    <!--class="radius-input workerInp"-->
                                    <!--style="width: 100%;"-->
                                    <!--v-model="form.managerProjectVO.startDate"-->
                                    <!--type="date"-->
                                    <!--value-format="yyyy-MM-dd"-->
                                    <!--format="yyyy-MM-dd"-->
                                    <!--:picker-options="pickerOptions1"-->
                                    <!--placeholder="选择日期">-->
                            <!--</el-date-picker>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="项目结束时间：" prop="managerProjectVO.endDate">-->
                            <!--<el-date-picker-->
                                    <!--class="radius-input workerInp"-->
                                    <!--style="width: 85%;"-->
                                    <!--v-model="form.managerProjectVO.endDate"-->
                                    <!--value-format="yyyy-MM-dd"-->
                                    <!--format="yyyy-MM-dd"-->
                                    <!--type="date"-->
                                    <!--placeholder="选择日期">-->
                            <!--</el-date-picker>-->
                            <!--<el-checkbox v-model="checked" style="float: right;">至今</el-checkbox>-->
                        <!--</el-form-item>-->
                        <el-form-item label="注册地址：" prop="financeCustomer.registeAddress">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.registeAddress" size="medium"  ></el-input>
                        </el-form-item>
                        <el-form-item label="注册电话：" prop="financeCustomer.phone">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.phone" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="开户银行：" prop="financeCustomer.bankName">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.bankName" size="medium"  ></el-input>
                        </el-form-item>
                        <el-form-item label="银行账号：" prop="financeCustomer.bankCard">
                            <el-input class="radius-input workerInp" placeholder="" v-model="form.financeCustomer.bankCard" size="medium"  maxlength="20"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="营业执照：" prop="financeCustomer.businessLicense">-->
                            <!--<el-input class="radius-input workerInp" placeholder="" v-model.number="form.financeCustomer.businessLicense" size="medium"  ></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="营业执照："required>
                            <el-input v-model="form.financeCustomer.businessLicense" style="display: none"></el-input>
                            <!--<img style="visibility: hidden" :src="form.businessLicense">-->
                            <el-upload
                                    class="upload-demo"
                                    action="//upload.qiniu.com/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeAvatarUpload"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-success="handleAvatarScucess"
                                    :file-list="fileList"
                                    :data="upload_form">
                                <!--<img v-if="false" :src="form.businessLicense">-->
                                <el-button size="small" type="text">上传</el-button>
                                <div slot="tip" class="el-upload__tip">只支持jpg、png格式</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    </div>
                </div>

            </div>
            <div class="box-footer">
                <el-button round size="medium" type="primary" @click="updatePm">保 存</el-button>
                <el-button round size="medium"  @click="$router.go(-1)">取 消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import util from "../../../common/util"

  export default {
    name: "",
    components: {
      ElButton,
      ElRow},
    data() {
      let checkAccount = (rule, value, callback) => {
        // console.log(value)
        // _this.form.acountId = value.replace(/^(0+)|[^\d]+/g,'')
        if (value.length == 1) {
          _this.customerBill.creditCode = value.replace(/[^1-9]/g, "");
        } else {
          _this.customerBill.creditCode = value.replace(/\D/g, "");
        }
        callback();
      };
      return {
        currentDisabled:false,
        pickerOptions1: {
          disabledDate(time) {
            let endDate=that.form.managerProjectVO.endDate
            if(endDate){
              return time.getTime() > new Date(endDate).getTime();
            }

          }
        },
        pickerOptions0: {
          disabledDate(time) {
            let startTime=that.form.managerProjectVO.startDate
            if(startTime){
              return time.getTime() < new Date(startTime).getTime();
            }

          }
        },
        checked:false,
        isEdit:false,
        fileList: [],
        upload_form:{},
        rules:{
          name:[
            { required: true, message: '姓名不能为空', trigger: 'blur' },
          ],
          idCard:[
            { required: true, message: '身份证号不能为空', trigger: 'blur' },
            {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号'}
          ],

          address:[
            { required: true, message: '所在位置不能为空', trigger: 'blur' },
          ],
          "financeCustomer.name":[
            { required: true, message: '公司名称不能为空', trigger: 'change' }
          ],
          "financeCustomer.creditCode":[
            { required: true, message: '统一社会信用代码不能为空', trigger: 'change' }
          ],
          "financeCustomer.registeAddress":[
            { required: true, message: '注册地址不能为空', trigger: 'blur' }
          ],
          "financeCustomer.phone":[
            { required: true, message: '注册电话不能为空', trigger: 'blur' },
          ],
          "financeCustomer.bankName":[
            { required: true, message: '开户银行不能为空', trigger: 'blur' }
          ],
          "financeCustomer.bankCard":[
            { required: true, message: '银行账号不能为空', trigger: 'blur' },
            {
              pattern: /^[0-9]{1,20}$/,
              message: "请输入正确的银行账号",
            },
          ],
          "financeCustomer.businessLicense":[
            { required: true, message: '营业执照不能为空', trigger: 'blur' }
          ],
        },
        form:{
          financeCustomer:{},
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        provinceList:[],
        cityList:[],
        regionList:[],
        insdutryList:[],
        value: '',
        customerId:'',
      }
    },
    watch:{
      checked:function (val,oldval) {
        if(val){
          this.form.managerProjectVO.endDate=util.onlyDate(new Date())
        }
      }
    },
    mounted(){
      this.getInsdustry();
      this.getDetail();
      this.getToken();
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(this.form.financeCustomer.businessLicense)
        this.form.financeCustomer.businessLicense="";
        console.log(this.form.financeCustomer.businessLicense)
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarScucess(response, file) {
        console.log(file);
        const key = response.key;
        const img = `http://${this.bucketHost}/${key}`;
        this.form.financeCustomer.businessLicense = img;
        this.getToken()
      },
      handleExceed(files, fileList) {
        console.log(files)
        console.log(fileList)
        console.log('2222')
        this.$message.warning(`请删除当前文件再重新上传！`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeRemove2(file, fileList) {
        return false;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M && (isPNG || isJPG);
//        if(!isJPG && !isLt2M){
//          this.fileList=[{}];
//        }
      },
      getRegion(){
        this.$api.getDicList('city',this.form.city).then((response) => {
          this.regionList=response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getCity(){
        this.$api.getDicList('city',this.form.province).then((response) => {
          this.cityList=response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getProvince(){
        this.$api.getDicList('city','0').then((response) => {
          this.provinceList=response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getInsdustry(){
        this.$api.getDicList('industry','0').then((response) => {
          this.insdutryList=response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getDetail(){
        const params = {
          id:this.$route.params.id,
        }
        this.$api.detailPm(params).then((response) => {
          console.log(response)
          this.form=response.data;
          if(!this.form.financeCustomer){
            console.log('sssss')
            this.form.financeCustomer={}
          }
          if(this.form.financeCustomer.businessLicense){
            this.fileList=[
              {url:this.form.financeCustomer.businessLicense,
                name:'营业执照.jpg'}
            ]
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getToken() {
        this.$api.getToken().then((response) => {
          const {
            data: {
              fileName, upToken,
            },
          } = response.data;
          this.upload_form = {
            key: fileName,
            token: upToken,
          };
        });
      },

      updatePm(){
        let valid1;
        this.$refs.form1.validate((valid) => {
          valid1 =valid;
        });
        console.log(this.form.financeCustomer.businessLicense)
        if(!this.form.financeCustomer.businessLicense){
          this.$message.error('营业执照不能为空')
          return false;
        }


          if (valid1) {
            const params = this.form
            this.$api.updatePm(params).then((response) => {
              if(response.data.respCode==0){
                this.$message.success('编辑成功！')
                this.$router.go(-1)
              }

            }).catch((error) => {
              console.log(error);
            });
          } else {
            return false;
          }

      },

      handleEdit(){
        let valid1,valid2,valid3,valid4;
        this.$refs.form1.validate((valid) => {
          valid1 =valid;
        });
        this.$refs.form2.validate((valid) => {
          valid2 =valid;
        });
        this.$refs.form3.validate((valid) => {
          valid3 =valid;
        });

          if (valid1 && valid2 && valid3 ) {
            const params = this.form
            this.$api.editCustomer(params).then((response) => {
              if(response.data.respCode==0){
                this.$message.success('编辑成功！')
                this.$router.go(-1)
              }

            }).catch((error) => {
              console.log(error);
            });
          } else {
            return false;
          }

      },
      handleRemove(file, fileList) {
        this.form.financeCustomer.businessLicense="";
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleAvatarScucess(response, file) {
        console.log(file);
        const key = response.key;
        const img = `http://${this.bucketHost}/${key}`;
        this.form.financeCustomer.businessLicense = img;
        this.getToken()
      },
      handleExceed(files, fileList) {
        console.log(files)
        console.log(fileList)
        console.log('2222')
        this.$message.warning(`请删除当前文件再重新上传！`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeRemove2(file, fileList) {
        return false;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M && (isPNG || isJPG);
//        if(!isJPG && !isLt2M){
//          this.fileList=[{}];
//        }
      },
      getToken() {
        this.$api.getToken().then((response) => {
          const {
            data: {
              fileName, upToken,
            },
          } = response.data;
          this.upload_form = {
            key: fileName,
            token: upToken,
          };
        });
      },
    }
  }
</script>

<style scoped>

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
        /*box-shadow: 0px 2px 21px 0px*/
        /*rgba(156, 156, 156, 0.35);*/
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
    /*.dialog-head h4{*/
        /*color: #262626;*/
    /*}*/
    /*.msgText{*/
        /*display: inline-block;*/
        /*width:64%;*/
    /*}*/
    /*.msg-btn{*/
        /*display: inline-block;*/
        /*padding: 12px 8px;*/
        /*margin-left: 5px;*/
        /*height:40px;*/
    /*}*/
    /*.pwd-box{*/
        /*width: 454px;*/
        /*height: 446px;*/
    /*}*/
    /*.pwd-box-body{*/
        /*height: 150px;*/
        /*margin:0 40px;*/
    /*}*/
    /*.pwd-box-body{*/
        /*height: 150px;*/
        /*margin:0 40px;*/
    /*}*/
    /*.overflow-box{*/
        /*background-color: #ffffff;*/
        /*box-shadow: 0px 2px 21px 0px*/
        /*rgba(156, 156, 156, 0.35);*/
        /*border-radius: 8px;*/
        /*margin:0 auto;*/
        /*padding-bottom: 30px;*/
        /*!*margin: 82px auto 0;*!*/
        /*width: 626px;*/
    /*}*/
    /*.box-title{*/
        /*text-align: center;*/
        /*padding-top: 35px;*/
        /*width: 100%;*/
        /*font-family: PingFang-SC-Medium;*/
        /*font-size: 24px;*/
        /*font-weight: normal;*/
        /*font-stretch: normal;*/
        /*line-height: 24px;*/
        /*letter-spacing: 1px;*/
        /*color: #262626;*/
    /*}*/
    /*.box-title span{*/
        /*padding-bottom: 10px;*/
        /*border-bottom: 3px solid #e84518;*/
        /*border-radius: 1px;*/
    /*}*/
    /*.box-footer{*/
        /*text-align: center;*/
    /*}*/
    /*.box-body{*/
        /*display: flex;*/
        /*display: -webkit-flex; !* Safari *!*/
        /*flex-direction:column;*/
        /*justify-content:center;*/
        /*align-items: center;*/
        /*height:300px;*/
        /*margin-top: 20px;*/
    /*}*/
</style>