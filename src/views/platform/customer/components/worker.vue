<template>
    <div>
        <!--<div>-->
            <!--<el-radio-group v-model="radio4">-->
                <!--<el-radio-button label="1">在用零工</el-radio-button>-->
                <!--<el-radio-button label="2">停用零工</el-radio-button>-->
            <!--</el-radio-group>-->
            <!--<hr class="el-radio-group-hr" />-->
        <!--</div>-->
        <el-form ref="form" :model="form" label-width="110px" label-position="left">
            <!--选择条件的单选按钮-->
            <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
                <el-radio-group class="radio-search" v-model="form.status">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">在用</el-radio>
                    <el-radio label="2">停用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="性别：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.sex">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="结算类型：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.settlementType">
                    <el-radio label="">不限</el-radio>
                    <!--<el-radio :label="item.dicVal" v-for="item in settlementTypeList">{{item.dicName}}</el-radio>-->
                    <!--<el-radio label="周结"></el-radio>-->
                    <el-radio label="2">月结</el-radio>
                    <el-radio label="4">周结</el-radio>
                    <!--<el-radio label="1">日结</el-radio>-->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="所属项目经理：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.managerName">
                    <el-radio label="">不限</el-radio>
                    <el-radio :label="item.name" v-for="item in PmList">{{item.name}}</el-radio>
                    <!--<el-radio label="周结"></el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签：" class="formSearchMargin">
                <el-radio-group class="radio-search" v-model="form.skill">
                    <el-radio label="">不限</el-radio>
                    <el-radio :label="item.skillValue" v-for="item in skillList">{{item.skillName}}</el-radio>
                    <!--<el-radio label="周结"></el-radio> &ndash;&gt;-->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="关键字：" class="formSearchMargin ">
                <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入零工姓名搜索" v-model="form.keyWord"></el-input>
                <el-button type="primary" class="searchBtn keyWBtn" @click="getList">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="splitLine"></div>
        <div class="recordNum">符合查询条件的记录{{total}}条</div>
        <el-table
                class="table-outline"
                :data="tableData"
                empty-text="暂无相关零工信息"
        >
            <el-table-column
                    prop="realNameAlias"
                    label="姓名"
                    align="center"
                    min-width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="sexName"
                    align="center"
                    label="性别"
                    min-width="80"
            >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="idCard"-->
                    <!--label="身份证号"-->
                    <!--align="center"-->
                    <!--min-width="160"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="mobile"
                    align="center"
                    label="手机号"
                    min-width="130"
            >
            </el-table-column>
            <el-table-column
                    prop="managerNameAlias"
                    label="所属项目经理"
                    align="center"
                    min-width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="skillName"
                    label="标签"
                    align="center"
                    min-width="160"
                    show-overflow-tooltip
            >
                <template scope="scope">
                    <span v-for="item in scope.row.talentSkills" style="margin: 0 2px;"><span >{{item.skillName}} </span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="empSettlementType"
                    align="center"
                    label="结算方式"
                    min-width="100"
            >
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop="bindingTime"-->
                    <!--align="center"-->
                    <!--label="最近添加时间"-->
                    <!--min-width="160"-->
            <!--&gt;-->
                <!--<template scope="scope">-->
                    <!--{{scope.row.bindingTime |formatminDate }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="customerStatus"
                    align="center"
                    show-overflow-tooltip
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    min-width="100"
            >
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            size="small"
                            @click="view(scope.row)"
                    >查看</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="page-container">
            <el-pagination
                    class="pagebox"
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-count="pageCount">
            </el-pagination>
        </div>
        <el-dialog title="" :visible.sync="disableDia" width="500px" center>
            <div class="dialog-head">
                <span>确认停用零工张三吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium" type="primary" @click="agreeVisible = true">确 认</el-button>
                <el-button round size="medium" @click="disableDia = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="ableDia" width="500px" center>
            <div class="dialog-head">
                <span>确认启用零工张三吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium" type="primary" @click="agreeVisible = true">确 认</el-button>
                <el-button round size="medium" @click="ableDia = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="scanedCodeDia" width="500px" center>
            <div class="dialog-head">
                <span>您正在手机上扫描零工身份证</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium" type="primary" @click="agreeVisible = true">已扫描完成</el-button>
                <el-button round size="medium" @click="scanedCodeDia = false">放弃扫描</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import util from "../../../../common/util"
  export default {
    name: "WorkerListAble",
    data() {
      return {
        skillList:'',
        PmList:[],
        settlementTypeList:[],
        tableData:'',
        total:0,
        currentPage: 1,
        pageCount: 1,
        radio4: 1,
        form: {
          managerName:'',
          settlementType:'',
          status:'',
          sex: "",
          skill: "",
          keyWord: ""
        },
        disableDia: false,
        ableDia: false,
        scanedCodeDia: false,
      };
    },
    props:{
      id:Number
    },
    // components: {},
    // computed: {},
    mounted() {
      this.getPmList()
      this.getSkill()
      this.getsettlement()
      this.getList()
    },
    filters:{
      formatminDate(val){
        return util.minDate(val)
      }
    },
    watch:{

      'form.sex':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
      'form.settlementType':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
      'form.managerId':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
      'form.skill':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
      'form.status':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
      'form.managerName':function (val,oldval) {
        this.currentPage=1
        this.getList()
      },
    },
    methods: {
      view(row) {
//        this.$router.push({ name: "customerworkerDetail", params: { customerId:this.$route.params.id, id: row.id} });
        const { href } = this.$router.resolve({
          name: "customerworkerDetail",
          params: {
            customerId:this.$route.params.id,
            id: row.id
          }
        });
        window.open(href, "_blank");
      },
      getsettlement(){
        this.$api.getDicList('settlementType',0).then((response) => {
          this.settlementTypeList=response.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      getSkill(){
        const params ={
          customerId:this.id
        }
        this.$api.getcustomerSkill(params).then((response) => {
          this.skillList=response.data;
        }).catch((error) => {
          console.log(error);
        });
      },
      addNewWorker() {
        this.$router.push({ name: "addWorker" });
      },
      disableWorker() {
        this.disableDia = true;
      },
      ableWorker() {
        this.ableDia = true;
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getList();
      },
      getPmList(){
        const params ={
          pageNum:1,
          pageSize:0,
          bindingStatus:1,
          customerId:this.$route.params.id
        }
        this.$api.getPmListCus(params).then((response) => {
          const {
            data: {
              list,
              pages,
              total,
              pageNum,
            },
          } = response.data;
          this.PmList=list
        }).catch((error) => {
          console.log(error);
        });
      },
      getList() {
        const params = {
          customerId:this.id,
          customerStatus:this.form.status,
          pageNum: this.currentPage,
          pageSize: 10,
          settlementType:this.form.settlementType,
          sex:this.form.sex,
          managerName:this.form.managerName,
          skill:this.form.skill,
          keyWord:this.form.keyWord,
        };
        this.$api
            .getWorkerListcustomer(params)
            .then(response => {
              this.tableData = response.data.data.list;
              this.total = response.data.data.total;
              this.pageCount=response.data.data.pages
            })
            .catch(error => {
              console.log(error);
            });
      },
    }
  };
</script>
<style scoped>
</style>
