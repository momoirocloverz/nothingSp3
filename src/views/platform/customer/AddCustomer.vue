<template>
  <div>
    <div class="overflow-box input-box">
      <div class="box-title" v-if="!isEdit"><span>添加客户</span></div>
      <div class="box-title" v-else><span>编辑客户</span></div>
      <div class="box-body1">
        <div class="box-body-item">
          <span class="box-body-item-title">客户基本信息</span>
          <div class="line"></div>
          <div class="box-body-form">
            <el-form ref="form1" :model="form" label-width="130px" label-position="right" :rules="rules">
              <el-form-item label="公司简称：" prop="shortName">
                <el-input class="radius-input workerInp" placeholder="" @blur="validateRepeat" v-model="form.shortName" size="medium" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="公司所在地：" required>
                <el-row>
                  <el-col :span="8">
                    <el-form-item prop="province">
                      <el-select class="radius-input " clearable v-model="form.province" placeholder="省">
                        <el-option v-for="item in provinceList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="city">
                      <el-select class="radius-input " clearable v-model="form.city" placeholder="市">
                        <el-option v-for="item in cityList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="region">
                      <el-select class="radius-input " clearable v-model="form.region" placeholder="区县">
                        <el-option v-for="item in regionList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item prop="address">
                  <el-input class="radius-input workerInp" style="margin-top: 20px" placeholder="详细地址" v-model="form.address" size="medium" maxlength="100"></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="所属行业：" prop="industry">
                <el-select class="radius-input " v-model="form.industry" style="width: 100%;" placeholder="">
                  <el-option v-for="item in insdutryList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型：" prop="customerType">
                <el-select class="radius-input " v-model="form.customerType" style="width: 100%;">
                  <el-option v-for="item in customerTypeList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否上市：" prop="isListed">
                <el-radio-group v-model="form.isListed">
                  <el-radio :label="2">未上市</el-radio>
                  <el-radio :label="1">上市</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="规模：" prop="size">
                <el-select class="radius-input " v-model="form.size" style="width: 100%;">
                  <el-option v-for="item in sizeList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="简介：" prop="profile">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="form.profile">
                </el-input>
              </el-form-item>

              <el-form-item label="营业执照：" required>
                <el-input v-model="form.businessLicense" style="display: none"></el-input>
                <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed" :on-success="handleAvatarScucess" :file-list="fileList" :data="upload_form">
                  <el-button size="small" type="text">上传</el-button>
                  <div slot="tip" class="el-upload__tip">只支持jpg、png格式</div>
                </el-upload>
              </el-form-item>

              <el-form-item label="企业logo：">
                <el-input v-model="form.logo" style="display: none"></el-input>
                <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemoveLogo" :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed" :on-success="handleLogoScucess" :file-list="fileListLogo" :data="upload_form_logo">
                  <el-button size="small" type="text">上传</el-button>
                  <div slot="tip" class="el-upload__tip">只支持jpg、png格式</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="box-body-item">
          <span class="box-body-item-title">客户开票信息</span>
          <div class="line"></div>
          <div class="box-body-form">
            <el-form ref="form2" :model="form" label-width="150px" label-position="right" :rules="rules">
              <el-form-item label="公司全称：" prop="customerBill.name">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.customerBill.name" maxlength="100" @blur="validateRepeatF"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码：" prop="customerBill.creditCode">
                <el-input class="radius-input workerInp" placeholder="" v-model="form.customerBill.creditCode" size="medium" maxlength="20" @blur="validateRepeatC"></el-input>
              </el-form-item>
              <el-form-item label="注册地址：" prop="customerBill.registeAddress">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.customerBill.registeAddress" maxlength="128"></el-input>
              </el-form-item>
              <el-form-item label="注册电话：" prop="customerBill.phone">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.customerBill.phone" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="开户银行：" prop="customerBill.bankName">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.customerBill.bankName" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="银行账号：" prop="customerBill.bankCard">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.customerBill.bankCard" maxlength="20"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="box-body-item">
          <span class="box-body-item-title">客户联系人信息</span>
          <div class="line"></div>
          <div class="box-body-form">
            <el-form ref="form3" :model="form" label-width="150px" label-position="right" :rules="rules">
              <el-form-item label="联系人：" prop="customerContact.contactName">
                <el-input class="radius-input workerInp" placeholder="" v-model="form.customerContact.contactName" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="customerContact.phone">
                <el-input class="radius-input workerInp" placeholder="" v-model="form.customerContact.phone" size="medium"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="box-body-item" v-if="!isEdit">
          <span class="box-body-item-title">客户账号信息</span>
          <div class="line"></div>
          <div class="box-body-form">
            <el-form ref="form4" :model="form" label-width="150px" label-position="right" :rules="rules">
              <el-form-item label="登录账号：" prop="userInfo.loginName">
                <el-input class="radius-input workerInp" placeholder="" v-model="form.userInfo.loginName" size="medium" @blur="validateRepeatA"></el-input>
              </el-form-item>
              <el-form-item label="登录密码：" prop="userInfo.password">
                <el-input class="radius-input workerInp" type="password" placeholder="6-18位数字或字母" v-model="form.userInfo.password" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="绑定手机号：" prop="userInfo.mobile">
                <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="form.userInfo.mobile"></el-input>
                <span class="el-form-item__label">建议使用公司董事长手机号</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <el-button round size="medium" v-if="!isEdit" type="primary" @click="handleAdd">保 存</el-button>
        <el-button round size="medium" v-else type="primary" @click="handleEdit">保 存</el-button>
        <el-button round size="medium" @click="$router.go(-1)">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ElRow from "element-ui/packages/row/src/row";

export default {
  name: "",
  components: { ElRow },
  data() {
    const validateRepeat = (rule, value, callback) => {
      if (value != null && value != "") {
        const params = {
          shortName: value,
          id: this.customerId
        }
        this.$api.checkShortName(params).then((response) => {
          if (response.data == true) {
            callback(new Error('公司简称已存在!'))
          } else {
            callback()
          }
        }).catch((error) => {
          console.log(error);
        });

      }
      else {
        callback();
      }
    }
    const validateRepeatF = (rule, value, callback) => {
      if (value != null && value != "") {
        const params = {
          fullName: value,
          id: this.customerId
        }
        this.$api.checkFullName(params).then((response) => {
          if (response.data == true) {
            callback(new Error('公司全称已存在!'))
          } else {
            callback()
          }
        }).catch((error) => {
          console.log(error);
        });

      }
      else {
        callback();
      }
    }
    return {
      isEdit: false,
      fileList: [],
      fileListLogo: [],
      upload_form: {},
      upload_form_logo: {},
      customerTypeList: [
        { id: 1, name: '民营' },
        { id: 2, name: '国企' },
        { id: 3, name: '外资' },
        { id: 4, name: '其他' },
      ],
      sizeList: [
        { id: 1, name: '少于15人' },
        { id: 2, name: '15-50人' },
        { id: 3, name: '50-150人' },
        { id: 4, name: '150-500人' },
        { id: 5, name: '500-2000人' },
        { id: 6, name: '2000人以上' },
      ],
      rules: {
        shortName: [
          { required: true, message: '公司简称不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' },
          //            { validator: validateRepeat, trigger: 'blur' }
        ],
        province: [
          { required: true, message: '省不能为空', trigger: 'change' }
        ],
        city: [
          { required: true, message: '市不能为空', trigger: 'change' }
        ],
        region: [
          { required: true, message: '县不能为空', trigger: 'change' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'blur' },
        ],
        industry: [
          { required: true, message: '行业不能为空', trigger: 'change' }
        ],
        customerType: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        isListed: [
          { required: true, message: '是否上市不能为空', trigger: 'change' }
        ],
        size: [
          { required: true, message: '规模不能为空', trigger: 'change' }
        ],
        profile: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ],
        "customerBill.name": [
          { required: true, message: '公司全称不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' },
          //            { validator: validateRepeatF, trigger: 'blur' }
        ],
        "customerBill.creditCode": [
          { required: true, message: '统一社会信用代码不能为空', trigger: 'blur' },
          //            { validator: isvalidateInteger, trigger: 'blur' }
          { max: 128, message: '长度不超过128字', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]{18}$/, message: '请填写正确的社会统一信用代码' },
        ],
        "customerBill.registeAddress": [
          { required: true, message: '注册地址不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' }
        ],
        "customerBill.phone": [
          { required: true, message: '注册电话不能为空', trigger: 'blur' },
          //            {
          //              pattern: /^1[3456789]\d{9}$/,
          //              message: "注册电话格式不正确"
          //            },
          { max: 128, message: '长度不超过128字', trigger: 'blur' }
        ],
        "customerBill.bankName": [
          { required: true, message: '开户银行不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' }
        ],
        "customerBill.bankCard": [
          { required: true, message: '银行账号不能为空', trigger: 'blur' },
          { max: 128, message: '长度不超过128字', trigger: 'blur' },
          { pattern: /^[1-9][0-9]*$/, message: '银行账号必须全为数字' }
        ],
        "customerContact.contactName": [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
          { max: 12, message: '长度不超过12字', trigger: 'blur' }
        ],
        "customerContact.phone": [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "联系电话格式不正确"
          },
          { max: 11, message: '长度不超过12字', trigger: 'blur' }

        ],
        "userInfo.loginName": [
          { required: true, message: '登录账号不能为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{6,18}$/,
            message: "登录账号应为6-18位数字或字母",
          },
        ],
        "userInfo.password": [
          { required: true, message: '登录密码不能为空', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{6,18}$/,
            message: "登录密码应为6-18位数字或字母",
          },

        ],
        "userInfo.mobile": [
          { required: true, message: '绑定手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "绑定手机号格式不正确"
          },
          { max: 11, message: '长度不超过11字', trigger: 'blur' },
          { pattern: /^[1-9][0-9]*$/, message: '绑定手机号必须全为数字' }

        ],
      },
      form: {
        customerBill: {},
        customerContact: {},
        userInfo: {},
        isListed: 2,
      },
      provinceList: [],
      cityList: [],
      regionList: [],
      insdutryList: [],
      value: '',
      customerId: '',
      count1: '',
      count2: '',
      addDisable: false,
      editDisable: false
    }
  },
  watch: {
    'form.province': function (val, oldval) {
      if (val) {
        if (this.form.city && this.count1 != 1) {
          this.form.city = ''
        }
        this.getCity()
        this.count1++
      }
    },
    'form.city': function (val, oldval) {
      if (val) {
        if (this.form.region && this.count2 != 1) {
          this.form.region = ''
        }
        this.getRegion()
        this.count2++
      }
    },
  },
  mounted() {
    this.count1 = 1;
    this.count2 = 1;
    this.getToken();
    this.getLogoToken()
    this.isEdit = this.$route.meta.isEdit;
    this.customerId = this.$route.params.id;
    this.getInsdustry();
    if (this.isEdit) {
      this.getCustomerDetail();
    }
    this.getProvince();
  },
  methods: {
    validateRepeatC() {
      const params = {
        creditCode: this.form.customerBill.creditCode,
        id: this.customerId
      }
      this.$api.checkCreditCode(params).then((response) => {
        if (response.data == true) {
          this.$message.error('统一社会信用代码已存在!')
        }
      }).catch((error) => {
        console.log(error);
      });

    },
    validateRepeatA() {
      const params = {
        account: this.form.userInfo.loginName,
      }
      this.$api.checkAccount(params).then((response) => {
        if (response.data == true) {
          this.$message.error('登录账号已存在!')
        }
      }).catch((error) => {
        console.log(error);
      });

    },
    validateRepeat() {
      const params = {
        shortName: this.form.shortName,
        id: this.customerId
      }
      this.$api.checkShortName(params).then((response) => {
        if (response.data == true) {
          this.$message.error('公司简称已存在!')
        }
      }).catch((error) => {
        console.log(error);
      });

    },
    validateRepeatF() {
      const params = {
        fullName: this.form.customerBill.name,
        id: this.customerId
      }
      this.$api.checkFullName(params).then((response) => {
        if (response.data == true) {
          this.$message.error('公司全称已存在!')
        }
      }).catch((error) => {
        console.log(error);
      });

    },
    getRegion() {
      this.$api.getDicList('city', this.form.city).then((response) => {
        if (response.data.respCode == 0) {
          this.regionList = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCity() {
      this.$api.getDicList('city', this.form.province).then((response) => {
        if (response.data.respCode == 0) {
          this.cityList = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getProvince() {
      this.$api.getDicList('city', '0').then((response) => {
        if (response.data.respCode == 0) {
          this.provinceList = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getInsdustry() {
      this.$api.getDicList('industry', '0').then((response) => {
        if (response.data.respCode == 0) {
          this.insdutryList = response.data.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCustomerDetail() {
      const params = {
        id: this.customerId,
      }
      this.$api.detailCustomer(params).then((response) => {
        this.form = response.data;
        if (this.form.businessLicense) {
          this.fileList = [
            { url: this.form.businessLicense }
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
    getLogoToken() {
      this.$api.getToken().then((response) => {
        const {
          data: {
            fileName, upToken,
          },
        } = response.data;
        this.upload_form_logo = {
          key: fileName,
          token: upToken,
        };
      });
    },

    handleAdd() {
      if (this.addDisable) {
        return
      }

      if (!this.form.businessLicense) {
        this.$message.error('营业执照不能为空')
        return false;
      }
      let valid1, valid2, valid3, valid4;
      this.$refs.form1.validate((valid) => {
        valid1 = valid;
      });
      this.$refs.form2.validate((valid) => {
        valid2 = valid;
      });
      this.$refs.form3.validate((valid) => {
        valid3 = valid;
      });
      this.$refs.form4.validate((valid) => {
        valid4 = valid;
      });

      if (valid1 && valid2 && valid3 && valid4) {
        const params = this.form

        this.addDisable = true
        this.$api.addCustomer(params).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('添加成功！')
            this.$router.go(-1)
          }
        }).catch((error) => {
          console.log(error);
        })
          .finally(() => {
            this.addDisable = false
          })
          ;
      } else {
        return false;
      }

    },

    handleEdit() {
      if (this.editDisable) {
        return
      }
      if (!this.form.businessLicense) {
        this.$message.error('营业执照不能为空')
        return false;
      }
      let valid1, valid2, valid3, valid4;
      this.$refs.form1.validate((valid) => {
        valid1 = valid;
      });
      this.$refs.form2.validate((valid) => {
        valid2 = valid;
      });
      this.$refs.form3.validate((valid) => {
        valid3 = valid;
      });

      if (valid1 && valid2 && valid3) {
        const params = this.form
        this.editDisable = true
        this.$api.editCustomer(params).then((response) => {
          if (response.data.respCode == 0) {
            this.$message.success('编辑成功！')
            this.$router.go(-1)
          }

        }).catch((error) => {
          console.log(error);
        })
          .finally(() => {
            this.editDisable = false
          });
      } else {
        return false;
      }

    },
    handleRemove(file, fileList) {
      this.form.businessLicense = "";
    },
    handleAvatarScucess(response, file) {
      console.log(file);
      const key = response.key;
      const img = `http://${this.bucketHost}/${key}`;
      this.form.businessLicense = img;
      this.getToken()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`请删除当前文件再重新上传！`);
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
    },

    handleRemoveLogo(file, fileList) {
      this.form.logo = "";
    },
    handleLogoScucess(response, file) {
      const key = response.key;
      const img = `http://${this.bucketHost}/${key}`;
      this.form.logo = img;
      this.getLogoToken()
    },
  }
}
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
.overflow-box {
  font-family: MicrosoftYaHei;
  background-color: #ffffff;
  /*box-shadow: 0px 2px 21px 0px*/
  /*rgba(156, 156, 156, 0.35);*/
  border-radius: 8px;
  margin: 0px auto;
  padding-bottom: 36px;
}
.box-title {
  text-align: center;
  padding-top: 20px;
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