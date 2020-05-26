<template>
  <div class="newAddCusCon">
    <div class="overflow-box input-box">
      <div class="box-title"><span>经理人审核确认</span></div>
      <div class="box-body1">
        <div class="box-body-item">        
          <div class="box-body-form">
            <el-form ref="form1" :model="form" label-width="150px" label-position="right" :rules="rules">
              <el-form-item label="公司简称：" prop="shortName">
                <el-input class="radius-input workerInp" disabled v-model="form.shortName" size="medium" maxlength="50"></el-input>
              </el-form-item>
                <el-form-item label="公司全称：" prop="fullName">
                <el-input class="radius-input workerInp" placeholder="输入公司全称" disabled v-model="form.name" size="medium" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="公司所在地：" required>
                <el-row>
                  <el-col :span="8">
                    <el-form-item prop="province">
                      <el-select class="radius-input " disabled clearable v-model="form.province" placeholder="省">
                        <el-option v-for="item in provinceList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="city">
                      <el-select class="radius-input " disabled clearable v-model="form.city" placeholder="市">
                        <el-option v-for="item in cityList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item prop="region">
                      <el-select class="radius-input " disabled clearable v-model="form.region" placeholder="区县">
                        <el-option v-for="item in regionList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item prop="address">
                  <el-input class="radius-input workerInp" disabled style="margin-top: 20px" placeholder="详细地址" v-model="form.address" size="medium" maxlength="100"></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="行业：" prop="industry">
                <el-select class="radius-input " disabled placeholder="选择行业"  v-model="form.industry" style="width: 100%;">
                  <el-option v-for="item in insdutryList" :key="item.dicVal" :label="item.dicName" :value="item.dicVal">
                  </el-option>
                </el-select>
              </el-form-item> 
              <el-form-item label="统一社会信用代码：" prop="creditCode">
                <el-input placeholder="请输入内容" disabled v-model="form.creditCode">
                </el-input>
              </el-form-item>
              <el-form-item label="营业执照：" required>
                <el-input v-model="form.businessLicense" style="display: none"></el-input>
<!--
                <el-upload class="upload-demo" action="//upload.qiniu.com/" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :limit="1" :on-exceed="handleExceed" :on-success="handleAvatarScucess" :file-list="fileList" :data="upload_form">
                  <el-button size="small" type="text">上传</el-button>
                  <div slot="tip" class="el-upload__tip">只支持jpg、png格式</div>
                </el-upload>
-->
                  <img class="imgPreview" v-if="form.businessLicense" :src="form.businessLicense">
              </el-form-item>
                <el-form-item label="联系人姓名：" prop="contactName">
                <el-input  placeholder="请输入内容" disabled v-model="form.customerContact.contactName">
                </el-input>
              </el-form-item>
                 <el-form-item label="联系人电话：" prop="contactPhone">
                <el-input  placeholder="请输入内容" disabled v-model="form.customerContact.phone">
                </el-input>
              </el-form-item>
                <el-form-item label="注册绑定手机号：" prop="bindPhone">
                <el-input placeholder="请输入内容" disabled v-model="form.mobile">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <el-button round size="medium" type="primary" @click="handleAdd">审核通过</el-button>
        <el-button round size="medium" @click="$router.go(-1)">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newAddCus",
  data() {
    return {
      fileList: [],
      upload_form: {},
      upload_form_logo: {},
      rules: {
          shortName: [
              { required: true, message: '公司简称不能为空', trigger: 'blur' },
              { max: 128, message: '长度不超过128字', trigger: 'blur' },
          ],
          fullName:[
              { required: true, message: '公司全称不能为空', trigger: 'blur' },
              { max: 128, message: '长度不超过128字', trigger: 'blur' },
          ],
          creditCode:[
              { required: true, message: '统一社会信用代码不能为空', trigger: 'blur' },
              { max: 128, message: '长度不超过128字', trigger: 'blur' },
              { pattern: /^[A-Za-z0-9]{18}$/, message: '请填写正确的社会统一信用代码' },
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
          bindPhone:[
              { required: true, message: '注册绑定手机号不能为空', trigger: 'blur' },
              { pattern: /^1[3456789]\d{9}$/,message: "注册绑定手机号格式不正确" },
          ],
          contactName:[
              { required: true, message: '联系人姓名不能为空', trigger: 'blur' },
              { max: 128, message: '长度不超过128字', trigger: 'blur' }
          ],
          contactPhone:[
              { required: true, message: '联系人电话不能为空', trigger: 'blur' },
              { max: 128, message: '长度不超过128字', trigger: 'blur' }
          ],
      },
      form: {
          customerContact:{},
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
      this.getInsdustry();
      this.getProvince();
      this.getData();
  },
  methods: {
      getData(){          
          let params = {
              id: this.$route.query.id,
          }
          this.$api.detailCustomer(params).then((res) => {
              let { respCode,data } = res;
              if( respCode === 0 ){
                  this.form = data;
                  let watermark = sessionStorage.getItem('watermark')
                  this.form.businessLicense = this.form.businessLicense + watermark;
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
    handleAdd() {
        let params = {
            customerId:Number(this.$route.query.id),
            status:3,
            failReason:'',
        }; 
        this.$api.setExamine(params).then(res=>{
            let { data:layer1 } = res;
            let { respCode,data } = layer1;
            if( respCode === 0 ){
                this.$message({
                    message: '操作成功。',
                    type: 'success'
                });
                this.$router.go(-1);
            }
        }).catch(err=>{
            console.log('err',err);
        })
    },
  }
}
</script>
<style scoped lang="scss">
.box-body-item {
  margin: 40px;
}
.box-body-form {
  margin: 20px;
}
.overflow-box {
  font-family: MicrosoftYaHei;
  background-color: #ffffff;
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
}
    .imgPreview {
        width: 500px;
    }
</style>