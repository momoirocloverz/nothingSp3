<template>
    <div>
        <div style="margin-bottom:20px">
            <el-form ref="form" :model="form" label-width="110px">
                <!--选择条件的单选按钮-->
                <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
                    <el-radio-group class="radio-search" v-model="form.status">
                        <el-radio label="">不限</el-radio>
                        <el-radio label="1">可用</el-radio>
                        <el-radio label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色：" class="formSearchMargin">
                    <el-radio-group class="radio-search" v-model="form.role">
                        <el-radio label="">不限</el-radio>
                        <el-radio :label="item.id" v-for="item in roleList">{{item.roleName}}</el-radio>
                        <!-- <el-radio label="30">30天内</el-radio>
                        <el-radio label="7">7天内</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="姓名：" class="formSearchMargin parentPO">
                    <el-input class="rant-input inputWidth inputAb" v-model="form.userName"></el-input>
                    <el-button type="primary" class="searchBtn keyWBtn" @click="getList">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button class="myplain-btn1" style="margin: 8px 14px 18px 14px" @click="addNew">新增系统用户</el-button>
        <el-table class="table-outline" :data="tableDataPlat" empty-text="暂无相关用户信息">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column prop="realName" :show-overflow-tooltip="true" label="姓名" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="roleName" :show-overflow-tooltip="true" label="角色" align="center" min-width="180">
                <template slot-scope="scope">
                    <span v-for="item in scope.row.roleList">{{item.roleName}}&nbsp;</span>
                </template>
            </el-table-column>
            <el-table-column prop="loginName" :show-overflow-tooltip="true" label="账号" align="center" min-width="140">
            </el-table-column>
            <el-table-column prop="mobile" :show-overflow-tooltip="true" label="绑定手机号" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="status" :show-overflow-tooltip="true" label="状态" :formatter="formatStatus" align="center" min-width="80">
            </el-table-column>
            <el-table-column prop="createdAt" :show-overflow-tooltip="true" label="创建时间" align="center" min-width="140">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | formatminDate}}</span>

                </template>
                </el-table-column>
            <el-table-column prop="lastLoginTime" :show-overflow-tooltip="true" label="最近登录时间" align="center" min-width="140">
                <template slot-scope="scope">
                <span>{{scope.row.lastLoginTime | formatminDate}}</span>
                   </template>
                </el-table-column>
            <el-table-column prop="loginIp" :show-overflow-tooltip="true" label="最近登录IP" align="center" min-width="120">
            </el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
                    <!--<el-button type="text" size="small" @click="reset(scope.row)">重置密码</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" @current-change="changePagePlat" :current-page="currentPagePlat" :page-count="pageCountPlat" background layout="prev, pager, next">
            </el-pagination>
        </div>

        <el-dialog
                title=""
                :visible.sync="resetVisible"
                width="450px"
                center
        >
            <div class="dialog-head">
                <span>重置密码</span>
            </div>
            <el-form ref="form" :model="addForm" label-width="100px" label-position="left" :rules="rules" style="margin-top: 30px;padding: 40px;">
                <el-form-item label="新密码：" prop="NewPassword">
                <el-input type="password" class="radius-input workerInp" placeholder="" size="medium" v-model="addForm.NewPassword " autocomplete = 'new-password'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" @click="handleReset">确 定</el-button>
                <el-button round size="medium"  @click="resetVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../../../common/util'
export default {
    name: "UserList",
    data() {
        return {
          addForm:{},
          rules:{
            NewPassword :[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {
              pattern: /^[a-zA-Z0-9]{6,18}$/,
              message: "密码应为6-18位数字或字母",
            },
          ],
          },
          resetVisible:false,
            form: {
                status: "",
                role: "",
                name: ""
            },
            tableDataPlat: [],
            currentPagePlat: 1,
            pageCountPlat: 1,
            total: 0,
          roleList:[],
          selectItem:{},
        };
    },
  watch:{
      'form.role':function(val,oldval){
        this.currentPage=1
          this.getList()
      },
    'form.status':function(val,oldval){
      this.currentPage=1
          this.getList()
      }
  },
  filters:{
    formatminDate(val){
      if(val){
        return util.minDate(val)
      }else{
        return ''
      }
    },
  },
    methods: {
      reset(row){
        this.resetVisible=true
        this.selectItem=row
      },
      handleReset(){
        const params = {
          id: this.selectItem.id,
          NewPassword:this.addForm.NewPassword
        };
        this.$api
            .EditUser(params)
            .then(response => {
              if(response.data.respCode==0) {
                this.$message.success(`密码重置成功`);
                this.resetVisible=false
              }
            })
            .catch(error => {
              console.log(error);
            });
      },
      getRoleList() {
        const params = {
          pageNum: 1,
          pageSize: 999,
        };
        this.$api
            .RoleList(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.roleList = response.data.data.list;
              }
            })
            .catch(error => {
              console.log(error);
            });
      },
      formatStatus(row){
        let val = row.status
        if(val==1){
          return '可用'
        }else if(val==2){
          return '冻结'
        }
      },
        getList() {
            const params = {
                pageNum: this.currentPagePlat,
                pageSize: 20,
              userName: this.form.userName,
              roleId: this.form.role,
                status: this.form.status
            };
            this.$api
                .UserList(params)
                .then(response => {
                    if (response.data.respCode == 0) {
                        this.tableDataPlat = response.data.data.list;
                        this.total = response.data.data.total;
                        this.pageCountPlat=response.data.data.pages
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        changePagePlat(val) {
            this.currentPagePlat = val;
            this.getList();
        },
        addNew(){
            this.$router.push({ name: "addUser" });
        },
        editItem(row){
          this.$router.push({ name: "editUser" ,params:{id:row.id}});
        },
    },
    mounted() {
        this.getList();
        this.getRoleList();
    }
};
</script>
<style scoped>
.myplain-btn1 {
    padding: 10px 12px;
    color: #e84518;
    width: 150px;
    height: 32px;
    background-color: #ffffff;
    border: solid 1px #e84518;
    border-radius: 0;
    font-size: 12px !important;
}
.bodyDiv {
    padding: 20px 26px 0;
}
</style>
