<template>
    <div>
        <div style="margin-top:20px">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="角色名称：" class="formSearchMargin parentPO">
                    <el-input class="rant-input inputWidth inputAb" v-model="form.name"></el-input>
                    <el-button type="primary" class="searchBtn keyWBtn" @click="getList">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button class="myplain-btn1" style="margin: 8px 14px 18px 14px" @click="addNew">新增角色</el-button>
        <el-table class="table-outline" :data="tableDataPlat" empty-text="暂无相关角色信息">
            <el-table-column prop="roleName" :show-overflow-tooltip="true" label="角色名" align="center" min-width="180"></el-table-column>
            <!--<el-table-column prop="description" :show-overflow-tooltip="true" label="角色描述" align="center" min-width="180">-->
            <!--</el-table-column>-->
            <el-table-column prop="createdAt" :show-overflow-tooltip="true" label="创建时间" align="center" min-width="180">
            </el-table-column>
            <el-table-column label="操作" min-width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
                    <!--<el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination class="pagebox" @current-change="changePagePlat" :current-page="currentPagePlat" :page-count="pageCountPlat" background layout="prev, pager, next">
            </el-pagination>
        </div>
        <el-dialog title="" :visible.sync="confirmDia" width="500px" center>
            <div class="dialog-head">
                <span>新增角色</span>
            </div>
            <div class="bodyDiv">
                <el-form ref="formManger" :model="addForm" label-width="80px" label-position="left" :rules="managerFormrules">
                    <el-form-item label="角色：" style="margin-top:30px" prop="name">
                        <el-input class="radius-input workerInp" placeholder="" size="medium" v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium" type="primary" @click="save">确 认</el-button>
                <el-button round size="medium" @click="confirmDia = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "RoleList",
    data() {
        return {
            form: {
                name: ""
            },
            confirmDia:false,
            tableDataPlat: [],
            currentPagePlat: 1,
            pageCountPlat: 1,
            total: 0,
            addForm:{
                name:''
            },
            managerFormrules: {
                name: [
                    {
                        required: true,
                        message: "角色不能为空",
                        trigger: "blur"
                    }
                ]
            },
        };
    },
    methods: {
      editRole(row){
        this.$router.push({name:'editRole',params:{id:row.id}})
      },
      deleteRole(row){
        const params={
          id:row.id,
          status:2
        }
        this.$api
            .EditUser(params)
            .then(response => {
              if (response.data.respCode == 0) {
                this.$message.success('删除成功！')
                this.getList()
              }
            })
            .catch(error => {
              console.log(error);
            });
      },
        getList() {
            const params = {
                pageNum: this.currentPagePlat,
                pageSize: 20,
              roleName: this.form.name,
            };
            this.$api
                .RoleList(params)
                .then(response => {
                    if (response.data.respCode == 0) {
                        this.tableDataPlat = response.data.data.list;
                        this.pageCountPlat=response.data.data.pages;
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
        this.$router.push({ name: "addRole" });
      },
        save() {
            this.$refs.formManger.validate(valid => {
                if (valid) {
                    const params = {
                        managerId: this.addForm.name,
                    };
                    this.$api
                        .AddRole(params)
                        .then(response => {
                            if (response.data.respCode == 0) {
                                this.$message.success("新增成功");
                                this.getList();
                                this.confirmDia = false;
                                this.addForm.name = "";
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
    },
    mounted() {
        this.getList();
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
