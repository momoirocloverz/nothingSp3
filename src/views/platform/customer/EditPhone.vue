<template>
    <div>
        <div class="overflow-box pwd-box" style="margin: 20px auto">
            <div class="box-title"><span>修改手机号</span></div>
            <div class="box-body pwd-box-body">
                <el-form ref="form" :model="form" label-width="130px" label-position="left" :rules="rules">
                    <el-form-item label="绑定手机号：" class="width:100%" prop="phone">
                        <el-input class="radius-input workerInp" size="medium" v-model="form.phone"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <div class="box-footer">
                <el-button round size="medium" type="primary" @click="submit">保 存</el-button>
                <el-button round size="medium" @click="$router.go(-1)">取 消</el-button>
            </div>
        </div>
        <el-dialog title="" :visible.sync="confirmDia" width="600px" center>
            <div class="dialog-head">
                <span>密码修改成功，请重新登录</span>
                <div class="countDown">3秒后自动退出</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium" type="primary" @click="confirmDia = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: "editPsw",
    data() {
        let validNumLetter = (rule, value, callback) => {
            if(value){
                let reg = /[0-9a-zA-Z]{6,18}/;
            if (!reg.test(value)) {
                callback(new Error("账号必须是由6-18位数字和字母组合"));
            } else {
                callback();
            }
            }else{
                callback(new Error("新密码不能为空"));
            }
        };
        return {
            form: {
                psw: "",
                phone: "",
                code: "",
                newPsw: ""
            },
            confirmDia: false,
            rules: {
                phone: [
                    {
                        required: true,
                        message: "绑定手机号不能为空",
                        trigger: "blur"
                    },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: "请输入正确的手机号"
                  },
                  {pattern: /^[1-9][0-9]*$/, message: '绑定手机号必须全为数字'}
                ],
                code: [
                    {
                        required: true,
                        message: "短信验证码不能为空",
                        trigger: "blur"
                    }
                ],
                newPsw: [
                    {
                        required: true,
                        // message: "新密码不能为空",
                        trigger: "blur",
                        validator:validNumLetter
                    },
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                     const params = {
                       userId:this.$route.params.userId,
                       mobile:this.form.phone,
                     };
                     this.$api
                         .updateCusPhone(params)
                         .then(response => {
                           if(response.data.respCode==0){
                             this.$message.success(`修改成功`);
                             this.$router.go(-1)
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
        }
    }
};
</script>
<style scoped>
.pwd-box {
    width: 454px;
    height: 446px;
}
.pwd-box1 {
    width: 504px;
    height: 446px;
}
.pwd-box-body {
    height: 150px;
    margin: 0 40px;
}
.pwd-box-body {
    height: 150px;
    margin: 0 40px;
}
.overflow-box {
    background-color: #ffffff;
    box-shadow: 0px 2px 21px 0px rgba(156, 156, 156, 0.35);
    border-radius: 8px;
    margin: 0 auto;
    padding-bottom: 30px;
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
}
.box-body {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    margin-top: 20px;
}
.msg-btn {
    display: inline-block;
    padding: 12px 8px;
    margin-left: 5px;
    height: 40px;
}
.inputWid {
    width: 140px;
}
.countDown {
    font-size: 18px;
    color: #262626;
    margin-top: 50px;
}
</style>

