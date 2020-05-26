<template>
    <div><el-form ref="form" :model="form" label-width="100px" labelPosition="left">
        <!--选择条件的单选按钮-->
        <el-form-item label="状态：" class="formSearchMargin formSearchMarginTop">
            <el-radio-group class="radio-search" v-model="form.bindingStatus">
                <el-radio label="-1">不限</el-radio>
                <el-radio label="1">待领取</el-radio>
                <el-radio label="2">领取完毕</el-radio>
                <el-radio label="3">已关闭</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="结算方式：" class="formSearchMargin">
            <el-radio-group class="radio-search" v-model="form.bindingStatus">
                <el-radio label="-1">不限</el-radio>
                <el-radio label="1">日结</el-radio>
                <el-radio label="2">月结</el-radio>
                <el-radio label="4">周结</el-radio>
                <!-- <el-radio label="2">实时结</el-radio> -->
            </el-radio-group>
        </el-form-item>
        <el-form-item label="关键字：" class="formSearchMargin ">

            <el-input placeholder="输入关键字搜索" v-model="input5" size="mini" class="input-with-select select-input">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="任务名称" value="1"></el-option>
                    <el-option label="发布人" value="2"></el-option>
                    <el-option label="任务所属" value="3"></el-option>
                </el-select>
            </el-input>
            <el-button type="primary" class="searchBtn" @click="getPmList">搜索</el-button>
        </el-form-item>
    </el-form>
        <div class="splitLine"></div>
        <div class="workerListBox fontClass" >
            <div
                    class="flexSafari"
                    v-for="item in tableData"

            >
        <span class="vw-left flexSafari leftdiv-width">
          <span class="vw-name heavey-font">{{item.shortName}}</span>
          <span class="vw-sex clearfix">
            <span class="vw-projectmanager">项目经理:&nbsp;&nbsp;{{item.name}}</span>
          </span>
        </span>
                <span class="vw-center flexSafari"></span>
                <span class="vw-right flexSafari centerdiv-width">
          <span class="vw-right-t ">
            <span class="vw-right-t-tel floatLeft ">开始时间：</span>
            <span class="vw-right-t-num floatLeft ">
2018-11-08 7:00
               <!--<el-tooltip class="item" effect="dark" :content="item.provinceName+item.cityName+item.regionName+item.address" placement="top-start">-->
                    <!--<span class="text-overflow">{{item.provinceName}}{{item.cityName}}{{item.regionName}}{{item.address}}</span>-->
                <!--</el-tooltip>-->
            </span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">结束时间：</span>
            <span class="vw-right-t-num floatLeft">{{item.contactName | formatminDate}}</span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">任务结算方式：</span>
            <span class="vw-right-t-num floatLeft">{{item.phone2}}</span>
          </span>
        </span>
                <span class="vw-center flexSafari"></span>
                <span class="vw-right flexSafari rightdivWidth">
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft ">任务单价：</span>
            <span class="vw-right-t-num floatLeft priceWidth text-overflow">
                 <el-tooltip class="item" effect="dark" :content="item.processingTaskCount" placement="top-start">
                <span class="text-overflow">{{item.processingTaskCount}}</span>
                </el-tooltip>
                </span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">工作地点：</span>
            <span class="vw-right-t-num floatLeft">{{item.createdAt }}</span>
          </span>
          <span class="vw-right-t">
            <span class="vw-right-t-tel floatLeft">状态：</span>
            <span class="vw-right-t-num floatLeft">待领取</span>
          </span>
        </span>
                <span class="wl-btnGroup flexSafari marginleft50">
          <el-button class="wl-btn" @click="routeToDetail(item)">查看</el-button>

        </span>
            </div>
        </div>
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
        input5:'',
        select:'',
        radio4: 1,
        boundDialogVisible:false,
        unboundDialogVisible:false,
        tableData:[{
          address: "会通过对手的防守1",
          bankCard: "87623414354674561",
          bankName: "回复对方巨化股",
          businessLicense: "http://img.10000rc.com/MQgGbt-1543564917116",
          city: "120100",
          cityName: "天津市",
          contactName: "2018-11-30 16:06",
          createdAt: "中心局",
          createdBy: 4,
          creditCode: "53242356756453421",
          customerId: 3,
          id: 3,
          industry: "4",
          industryName: "二次元行业",
          name: "张三",
          phone: "132435443441",
          phone2: "月结",
          processingTaskCount: '10000件以下(含)， 0.3元/件 fffff',
          province: "120000",
          provinceName: "天津市",
          region: "120102",
          regionName: "河东区",
          registeAddress: "看过覆盖广泛",
          shortName: "中心局进口晚班",
          status: 1,
          updatedAt: "2018-11-30 16:06:39",
          updatedBy: 4,
        }],
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
          bindingStatus:'-1',
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
        if(val){
          this.getPmList();
        }
      }
    },
    methods: {
      routeToDetail(row){
        this.$router.push({name:'pmDetail',params:{id:row.id}})
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
    .el-input  .el-select{
        width: 100px;
    }
    .select-input {
        width: 396px;
        margin-right: 20px;
        padding-left: 10px;
    }


</style>