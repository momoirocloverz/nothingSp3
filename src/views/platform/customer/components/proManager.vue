<template>
    <div><el-form ref="form" :model="form" label-width="90px">
        <!--选择条件的单选按钮-->
        <el-form-item label="绑定状态：" class="formSearchMargin formSearchMarginTop">
            <el-radio-group class="radio-search" v-model="form.bindingStatus">
                <el-radio label="">不限</el-radio>
                <el-radio label="1">服务中</el-radio>
                <el-radio label="2">待项目经理同意解绑</el-radio>
                <el-radio label="3">待客户同意解绑</el-radio>
                <el-radio label="4">已解绑</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="关键字：" class="formSearchMargin ">
            <el-input class="rant-input inputWidth keyWFormParent" placeholder="输入项目经理姓名搜索"  v-model="form.nameAlias"></el-input>
            <el-button type="primary" class="searchBtn keyWBtn" @click="getPmList">搜索</el-button>
        </el-form-item>
    </el-form>
        <div class="splitLine"></div>
        <el-table
                class="table-outline"
                :data="tabledata"
                empty-text="暂无相关经理人信息"
        >
            <el-table-column prop="nameAlias" label="姓名" align="center" min-width="180">
            </el-table-column>
            <el-table-column prop="accountMobile" label="手机号"  align="center" min-width="180">
            </el-table-column>
            <el-table-column prop="empCount" label="客户分配的员工数" align="center"  min-width="180">
            </el-table-column>
            <el-table-column prop="bindingTime" label="最近绑定时间" align="center" min-width="180">
            </el-table-column>
            <el-table-column prop="bindingStatus" label="绑定状态" :formatter="formatbindingStatus" align="center" min-width="180">
            </el-table-column>
            <el-table-column label="操作" align="center" width="280">
                <template scope="scope">
                    <el-button size="small" v-if="scope.row.bindingStatus!=4" type="text" @click="routeToDetail( scope.row)">查看</el-button>

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
        <el-dialog
                title=""
                :visible.sync="boundDialogVisible"
                width="500px"
                center
                >
            <div class="dialog-head">
                <span>绑定验证码：123456</span>
                <p>（验证码30分钟内有效）</p>
            </div>
            <div class="dialog-body">
                <span>绑定步骤：</span>
                <p>1.将此验证码告知需绑定的项目经理；</p>
                <p>2.项目经理登录经理人APP，进入个人中心-我服务的公司页面，点击右上角绑定按钮；</p>
                <p>3.输入此验证码并提交进行绑定；</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="large" class="dialog-large-button" type="primary" @click="boundDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title=""
                :visible.sync="unboundDialogVisible"
                width="500px"
                center
                >
            <div class="dialog-head">
                <span>确认要与项目经理李四解绑？</span>
                <h4>确认后需要项目经理在经理人APP上点击同意才算解绑完成</h4>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" @click="agreeVisible = true">确 定</el-button>
                <el-button round size="medium"  @click="CancelVisible = true">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title=""
                :visible.sync="CancelVisible"
                width="500px"
                center
                >
            <div class="dialog-head">
                <span>确认取消与项目经理李四的解绑？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" @click="CancelVisible = false">确 定</el-button>
                <el-button round size="medium"  @click="CancelVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title=""
                :visible.sync="agreeVisible"
                width="500px"
                center
        >
            <div class="dialog-head">
                <span>确认同意项目经理李四的解绑要求？</span>
                <h4>确认后您与该项目经理将解绑</h4>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button round size="medium"  type="primary" @click="agreeVisible = false">确 定</el-button>
                <el-button round size="medium"  @click="agreeVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
  export default {
    name: "Unbound",
    component: {
      //someComponent
    },
    data() {
      return {
        currentPage:1,
        pageSize:20,
        radio4: 1,
        boundDialogVisible:false,
        unboundDialogVisible:false,
        tabledata:[],
        CancelVisible:false,
        agreeVisible:false,
        pageCount:10,
        form: {
          firstShow:true,
          secondShow:false,
          sex: "不限",
          settleType: "不限",
          manager: "不限",
          tag: "不限",
          keyWord: "",
          bindingStatus:'',
        }
      }
    },
    props:{
      id:Number
    },
    mounted(){
      this.getPmList();
    },
    watch:{
      'form.bindingStatus':function (val,oldval) {
          this.getPmList();
      }
    },
    methods: {
      routeToDetail(row){
//        this.$router.push({name:'pmDetail',params:{id:row.id}})
        const { href } = this.$router.resolve({
          name: "pmDetail",
          params: {
            id:row.id
          }
        });
        window.open(href, "_blank");
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.getPmList();
      },
      getPmList(){
        const params ={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          customerId:this.id,
          bindingStatus:this.form.bindingStatus,
//          bindingStatus: 4 ,
          nameAlias:this.form.nameAlias,
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
          this.tabledata=list
//          if(this.tabledata%2!=0){
//            this.tabledata.push(
//                {}
//            )
//          }
//          console.log(this.tabledata[0])
//          if(this.tabledata[0]==null){
//            this.tabledata=[
//
//            ]
//
//          }
          this.pageCount=pages
          console.log(this.tabledata)
        }).catch((error) => {
          console.log(error);
        });
      },
      formatbindingStatus(row){
        let val = row.bindingStatus
        if(val==1){
          return '服务中'
        }else if(val==2){
          return '待项目经理同意解绑'
        }else if(val==3){
          return '待客户同意解绑'
        }else if(val==4){
          return '已解绑'
        }else{
          return ''
        }
      },
      routeTowoker(){
        this.$router.push({name:'myworker'})
      },
      handleClose(){

      }
    }
  }
</script>

<style scoped>
    .vp-table{
        width:100%;
        display: flex;
        flex-wrap:wrap;
        justify-content:center;
    }
    .vp-table-info-anction{
        margin-right: 36px;
        position: absolute;
        top: 0;
        right: 0px;
        bottom: 0px;
        width: 150px;
        padding-top: 65px;
    }
    .vp-table-item{
        width:47%;
        background-color: #ffffff;
        border-left: solid 1px #eeeeee;
        border-top: solid 1px #eeeeee;
        padding: 20px 0px 20px 15px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: normal;
        font-stretch: normal;
        line-height: 20px;
        letter-spacing: 0px;
        color: #666666;
        position: relative;
    }
    .vp-table-item:nth-child(2n){
        border-right: solid 1px #eeeeee;
    }
    .vp-table-item:last-child{
        border-bottom: solid 1px #eeeeee;
    }
    .vp-table-item:nth-last-child(2){
        border-bottom: solid 1px #eeeeee;
    }
    .vp-table-header{
        font-family: PingFang-SC-Heavy;
        font-size: 18px;
        font-weight: 600;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #262626;
    }
    .vp-table-tag{
        font-family: PingFang-SC-Medium;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #666666;
        position: absolute;
        top: 18px;
        left: 72px;
    }
    .vp-table-info{
        margin-top: 15px;
    }
    .vp-table-info span{
        display: inline-block;
    }
    .vp-table-infoitem{
        margin-right:6px;
    }
    .vp-table-infoitem1{
        width:102px;
    }
    .vp-table-infoitem2{
        width:124px;
        margin-right: 15px;
    }

</style>