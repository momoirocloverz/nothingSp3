<template>
    <div>
        <div>
            <el-radio-group v-model="radio4">
                <el-radio-button label="1">系统用户</el-radio-button>
                <el-radio-button label="2">角色</el-radio-button>
                <el-radio-button label="3">权限</el-radio-button>
                <el-radio-button label="4">参数</el-radio-button>
                <el-radio-button label="5">字典</el-radio-button>
            </el-radio-group>
            <hr class="el-radio-group-hr" />
        </div>
        <PerList v-if="radio4 == 3"/>
        <UserList v-if="radio4 == 1"/>
        <RoleList v-if="radio4 == 2"/>
        <ParamsList v-if="radio4 == 4"/>
        <DictionaryList v-if="radio4 == 5"/>
    </div>
</template>
<script>
import PerList from '../system/permission/permissionList'
import UserList from '../system/user/UserList'
import RoleList from '../system/role/RoleList'
import ParamsList from '../system/params/ParamsList'
import DictionaryList from '../system/dictionary/DictionaryList'
export default {
    name: "SystemList",
    components:{
        PerList,
        UserList,
        RoleList,
        ParamsList,
        DictionaryList,
    },
    data() {
        return {
            radio4:'',
        };
    },
  beforeRouteEnter(to,form,next){
    next(vm=>{
      if(form.name=='addRole' || form.name=='editRole'){
        vm.radio4=2
      }else{
        vm.radio4=1
      }
    })
  }
};
</script>
<style scoped>
</style>
