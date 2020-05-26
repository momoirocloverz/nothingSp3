<template>
    <div class="login">
        <div class="head">
            <Header />
        </div>
        <div class="banner" :style="note">
            <div class="panelBody flexSafari">
                <div class="loginPanel">
                    <div class="marginA">
                        <div class="log">登录</div>
                        <div class="redLine"></div>
                    </div>
                    <div class="marginC">
                        <el-form ref="form" :model="form" label-width="100px" label-position="left" :rules="rules">
                            <el-form-item prop="userName" class="userDiv">
                                <el-input type="text" v-model="form.userName" class="icon radius-input" placeholder="请输入登录账号" />
                                <img src="../assets/images/input_icon_1.png" alt="icon" class="imgIcon">
                            </el-form-item>
                            <el-form-item prop="password" class="userDiv">
                                <el-input type="password" v-model="form.password" class="icon radius-input" placeholder="请输入登录密码" />
                                <img src="../assets/images/input_icon_lock.png" alt="icon" class="imgIcon">
                            </el-form-item>
                        </el-form>
                    </div>

                    <!-- <div class="marginC">
                            <input type="text" v-model="userName" class="icon" placeholder="请输入登录账号" />
                        </div>
                        <div class="marginB">
                            <input type="password" v-model="password" class="lock" placeholder="请输入登录密码" />
                        </div> -->
                    <div class="marginB">
                        <el-button type="primary" class="logBtn" @click="login">登 录</el-button>
                    </div>
                    <div class="psw marginB" @click="findPwd">忘记密码</div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Heaader";
import Footer from "../components/Footer";
export default {
    name: "login",
    data() {
        return {
            form: {
                userName: "",
                password: ""
            },
            note: {
                backgroundImage:
                    "url(" +
                    require("../../src/assets/images/banner.png") +
                    ")",
                backgroundRepeat: "no-repeats",
                backgroundSize: "cover",
                width: "100%",
                height: "100%"
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "登录账号不能为空",
                        trigger: "blur",
                    },
                    {  min:1,max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' },
                    {pattern: /^[A-Za-z0-9]+$/, message: '请输入正确的账号'}
                ],
                password: [
                    {
                        required: true,
                        message: "登录密码不能为空",
                        trigger: "blur"
                    },
                    {  min:1,max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        Header,
        Footer
    },
    // computed: {},
    // mounted: {},
    methods: {
        login() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const params = {
                        username: `${this.form.userName},1`,
                        password: this.form.password
                    };
                    this.$api
                        .login(params)
                        .then(response => {
                            // console.log(response.headers)
                            sessionStorage.setItem(
                                "token",
                                response.headers.authorization
                            );
                            sessionStorage.setItem(
                                "logintype",
                                response.data.data.loginType
                            );
                          sessionStorage.setItem('userInfo',JSON.stringify(response.data.data))
                            this.$router.push('/customer');
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
        findPwd() {
            this.$router.push({ name: "FindPwd" });
        }
    },
    mounted() {
        sessionStorage.removeItem("token");
    }
};
</script>
<style lang='scss' scoped>
.head {
    // height: 100%;
}
.login {
    height: 100%;
    width: 100%;
    // position: relative;
}
.loginPanel {
    width: 400px;
    height: 416px;
    background-color: #fff;
    box-shadow: 0px 2px 21px 0px rgba(156, 156, 156, 0.35);
    border-radius: 8px;
    // position: absolute;
    // top: 50%;
    // margin-top: 222px;
    // right: 0;
    align-items: center;
}
.banner {
    // padding-top: 82px;
    width: 100%;
    min-height: 400px;
    height: 100%;
    background: #999;
    // position: relative;
}
.full {
    // position: fixed;
    background: #fff;
    width: 100%;
    // z-index: 999;
}
.panelBody {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    // position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.redLine {
    width: 32px;
    height: 4px;
    background-color: #e84518;
    border-radius: 1px;
}
.log {
    font-size: 16px;
    color: #262626;
    margin: 32px 0 6px;
}
input:focus {
    outline: none;
}
.logBtn {
    width: 256px;
    height: 38px;
    background-color: #e84518;
    border-radius: 19px;
    margin: 36px 0 24px;
}
.psw {
    cursor: pointer;
    font-size: 14px;
    color: #666666;
}
.marginA {
    width: 32px;
    margin: 0 auto;
    text-align: center;
}
.marginB {
    width: 254px;
    margin: 0 auto;
    text-align: center;
}
.marginC {
    width: 348px;
        margin-left: -24px;
    text-align: center;
}
.mtop {
    width: 254px;
    margin: -10px auto 0;
    text-align: center;
}
.imgIcon{
    position: absolute;
    top: 10px;
    left: 18px;
}
.userDiv{
    position: relative;
}
</style>