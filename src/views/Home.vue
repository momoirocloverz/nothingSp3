<template>
  <div class="home">
    <div class="headerNav clearfix header-height" :style="{width: headerWidth}">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" router text-color="#262626" active-text-color="#e84518">

        <el-dropdown class="drop" @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            {{realName ? realName : username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPsw" class="item2">
              <img src="../assets/images/password.png" alt="密码" class="pswIcon">
              <img src="../assets/images/password_pre.png" alt="密码" class="pswIconActived">
              修改密码
            </el-dropdown-item>

            <el-dropdown-item command="bindPhone" class="item3">
              <img src="../assets/images/phone.png" alt="密码" class="pswIcon">
              <img src="../assets/images/phone_pre.png" alt="密码" class="pswIconActived">
              更换绑定手机号
            </el-dropdown-item>
            <el-dropdown-item command="logout" class="item4">
              <img src="../assets/images/logout.png" alt="密码" class="pswIcon">
              <img src="../assets/images/quit_pre.png" alt="密码" class="pswIconActived">
              退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </div>
    <div class="clearfix bodyBox">
      <div class="nav-left">
        <el-menu default-active="2" style="overflow-y: scroll;" class="el-menu-vertical-demo scroll" router background-color="#252a2e" text-color="#fff" active-text-color="#e84518">
          <template v-for="(item, index) in $router.options.routes" v-if="logintype==1">
              <el-menu-item v-if="item.meta.isShow && item.path != '/invoice' && item.path != '/account' && item.path != '/fuFudo' && item.path != '/customer' &&  item.path != '/hantan' && item.path != '/managerAccount' && item.path != '/classManager' "   :index="item.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.alias}}</span>
            </el-menu-item>
              <el-submenu :index="index+''" v-if="item.path == '/customer'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>经理人管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="index+''" v-if="item.path == '/fuFudo'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>薪福多管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="index+''" v-if="item.path == '/hantan'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>汉唐信通管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="index+''" v-if="item.path == '/managerAccount'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>管理费账户</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="index+''" v-if="item.path == '/invoice'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>开票管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>
            <el-submenu :index="index+''" v-if="item.path == '/account'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>账户管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>

             <el-submenu :index="index+''" v-if="item.path == '/classManager'">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>班务经理管理</span>
              </template>
              <el-menu-item v-for="(child,index) in item.children" :key="index" v-if="!child.hidden && child.meta" :index="item.path + '/' + child.path">
                {{child.meta.breadName}}
              </el-menu-item>
            </el-submenu>


          </template>
        </el-menu>
      </div>
      <div class="nav-right">
        <div class="logBox header-height">
          <img src="../assets/images/logo.png" alt="logo" class="logo">
          <span class="title">万才网</span>
        </div>
        <div class="panel" style="overflow-y: scroll; height: 95%;">
          <transition name="router-fade" mode="out-in">　
            <router-view></router-view>　
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/api/api.js";
import util from "@/common/util.js";
import { mapGetters, mapActions } from "vuex";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "home",
  components: {
    Footer: Footer,
    Breadcrumb: Breadcrumb
  },
  data() {
    return {
      headerWidth: '',
      username: '',
      realName: '',
      activeIndex2: "/login",
      logintype: "",
      breadList:'',
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.logout();
      }
      if (command === "modifyPsw") {
        this.handleSetPassword();
      }
      if (command === "viewInfo") {
        this.viewInfo();
      }
      if (command === "editPsw") {
        this.editPsw();
      }
      if (command === "bindPhone") {
        this.bindPhone();
      }
    },
    logout() {
      this.$api
        .LoginOut()
        .then(response => {
          sessionStorage.removeItem("token");
          this.$router.replace({ name: "login" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    add() {
      this.$store.dispatch("increment", 5);
    },
    getCurrentPath() {
      let parentPath = this.$route.matched[0].path;
      this.activeIndex2 = parentPath;
    },
    viewInfo() {
      this.$router.push({ name: "viewCompanyInfo" });
    },
    editPsw() {
      this.$router.push({ name: "editPsw" });
    },
    bindPhone() {
      this.$router.push({ name: "bindPhone" });
    }
  },
  watch: {
    $route(to, from) { }
  },
  mounted() {
    this.headerWidth = document.body.clientWidth - 240 + 'px'
    this.logintype = sessionStorage.getItem("logintype");
    this.username = JSON.parse(sessionStorage.getItem("userInfo")).username;
    this.realName = JSON.parse(sessionStorage.getItem("userInfo")).realName;
    this.getCurrentPath();
  },
  computed: {
    ...mapGetters(["count"])
  }
};
</script>
<style>
.dropClass {
  display: inline-block;
}
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.headerNav {
  position: fixed;
  width: 87%;
  height: 40px;
  left: 210px;
  background: #ffffff;
  z-index: 99;
  box-shadow: 0px 0px 13px 0px #dcdcdc;
}

.home {
  position: relative;
  width: 100%;

  height: 100%;
  overflow: hidden;
}

.el-menu-demo {
  height: 82px;
  margin: 0 auto;
  position: relative;
}

.el-menu-item {
  font-size: 14px;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  height: 82px;
  line-height: 82px;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 82px;
  line-height: 82px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  border-bottom-color: transparent !important;
}

.menu-line {
  width: 1px;
  height: 10px;
  background: #262626;
  margin-left: 19px;
  margin-right: -19px;
  display: inline-block;
}

.el-menu-item:nth-last-child(2) .menu-line {
  background: #ffffff;
}

.logo {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  margin: 10px 24px 0 20px;
}

.title {
  display: block;
  float: left;
  font-size: 20px;
  font-weight: 700;
  color: #e84518;
  line-height: 60px;
  width: 100px;
}

.marginWidth {
  width: 100%;
  margin: 0 auto;
}
.drop {
  position: absolute;
  right: 40px;
  margin-top: 12px;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: #666;
}
.router-link-active {
  text-decoration: none;
  color: #e84518;
}
.el-dropdown-link {
  font-size: 16px;
  color: #e84518;
}
.pswIcon {
  vertical-align: middle;
  margin-right: 10px;
}
.pswIconActived {
  display: none;
}
.item1:hover .pswIconActived {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.item1:hover .pswIcon {
  display: none;
}
.item2:hover .pswIconActived {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.item2:hover .pswIcon {
  display: none;
}
.item3:hover .pswIconActived {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.item3:hover .pswIcon {
  display: none;
}
.item4:hover .pswIconActived {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.item4:hover .pswIcon {
  display: none;
}

.nav-left {
  width: 210px;
  /* height: 100%; */
  position: absolute;
  left: 0;
  top: 40px;
  bottom: 0;
}
.nav-right {
  width: 100%;
  height: 100%;
}
.el-menu {
  height: 100%;
}
.logBox {
  position: absolute;
  top: 0;
  left: 0;
  background: #252a2e;
  z-index: 1000;
  width: 209px;
}
.bodyBox {
  height: 100%;
  width: 100%;
}
.panel {
  padding: 48px 20px 0 230px;
  height: 100%;
}
.header-height {
  height: 40px;
}
.scroll {
  overflow: scroll;
}
.scroll::-webkit-scrollbar {
  display: none;
}

</style>

